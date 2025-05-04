import path from 'path';
import fs from 'fs/promises';
import { MongoClient, Db } from 'mongodb';
import { Migration } from './migration-interface';

export class MigrationManager {
  private client: MongoClient;
  private db: Db | null = null;
  private migrationsCollection: string;
  private migrationsDir: string;
  private migrations: Migration[] = [];

  constructor(
    mongoUri: string,
    dbName: string,
    migrationsCollection: string = '_migrations',
    migrationsDir: string = path.join(__dirname, 'migrations')
  ) {
    this.client = new MongoClient(mongoUri);
    this.migrationsCollection = migrationsCollection;
    this.migrationsDir = migrationsDir;
  }

  async connect(): Promise<void> {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db();
      console.log(`Connected to MongoDB: ${this.db.databaseName}`);
    }
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
      console.log('MongoDB connection closed');
    }
  }

  async loadMigrations(): Promise<void> {
    // マイグレーションファイルをロード
    const files = await fs.readdir(this.migrationsDir);
    const migrationFiles = files.filter(file => file.endsWith('.js') || file.endsWith('.ts'));

    this.migrations = [];

    for (const file of migrationFiles) {
      const filePath = path.join(this.migrationsDir, file);
      // Dynamic importを使用してマイグレーションファイルをインポート
      const module = await import(filePath);
      if (module && module.migration) {
        this.migrations.push(module.migration);
      }
    }

    // マイグレーションIDで昇順ソート
    this.migrations.sort((a, b) => a.id - b.id);
  }

  async ensureMigrationsCollection(): Promise<void> {
    if (!this.db) {
      throw new Error('Database not connected');
    }

    const collections = await this.db.listCollections().toArray();
    const exists = collections.some(col => col.name === this.migrationsCollection);

    if (!exists) {
      await this.db.createCollection(this.migrationsCollection);
      console.log(`Created migrations collection: ${this.migrationsCollection}`);
    }
  }

  async getAppliedMigrations(): Promise<MigrationRecord[]> {
    if (!this.db) {
      throw new Error('Database not connected');
    }

    return await this.db
      .collection<MigrationRecord>(this.migrationsCollection)
      .find()
      .sort({ id: 1 })
      .toArray();
  }

  async migrate(targetVersion?: number): Promise<void> {
    await this.connect();
    await this.ensureMigrationsCollection();
    await this.loadMigrations();

    const appliedMigrations = await this.getAppliedMigrations();
    const lastAppliedMigration = appliedMigrations.length > 0
      ? appliedMigrations[appliedMigrations.length - 1]
      : { id: 0 };

    // ターゲットバージョンが指定されていない場合は最新バージョンまで
    const finalTargetVersion = targetVersion !== undefined
      ? targetVersion
      : Math.max(...this.migrations.map(m => m.id));

    if (lastAppliedMigration.id === finalTargetVersion) {
      console.log(`Database is already at version ${finalTargetVersion}`);
      return;
    }

    // マイグレーションの方向を決定
    const isUpgrade = lastAppliedMigration.id < finalTargetVersion;

    if (isUpgrade) {
      // 上位バージョンへマイグレーション（up）
      const pendingMigrations = this.migrations
        .filter(m => m.id > lastAppliedMigration.id && m.id <= finalTargetVersion)
        .sort((a, b) => a.id - b.id);

      for (const migration of pendingMigrations) {
        console.log(`Applying migration ${migration.id}: ${migration.name}`);
        await migration.up(this.db);

        // マイグレーション記録の保存
        await this.db.collection(this.migrationsCollection).insertOne({
          id: migration.id,
          name: migration.name,
          appliedAt: new Date()
        });

        console.log(`Migration ${migration.id} applied successfully`);
      }
    } else {
      // 下位バージョンへマイグレーション（down）
      const migrationsToRevert = this.migrations
        .filter(m => m.id > finalTargetVersion && m.id <= lastAppliedMigration.id)
        .sort((a, b) => b.id - a.id); // 降順で実行

      for (const migration of migrationsToRevert) {
        console.log(`Reverting migration ${migration.id}: ${migration.name}`);
        await migration.down(this.db);

        // マイグレーション記録の削除
        await this.db.collection(this.migrationsCollection).deleteOne({ id: migration.id });

        console.log(`Migration ${migration.id} reverted successfully`);
      }
    }

    console.log(`Database migrated to version ${finalTargetVersion}`);
  }

  async status(): Promise<void> {
    await this.connect();
    await this.ensureMigrationsCollection();
    await this.loadMigrations();

    const appliedMigrations = await this.getAppliedMigrations();
    const lastAppliedId = appliedMigrations.length > 0
      ? appliedMigrations[appliedMigrations.length - 1].id
      : 0;

    console.log('\nMigration Status:');
    console.log('-----------------');
    console.log(`Current database version: ${lastAppliedId}`);
    console.log(`Available migrations: ${this.migrations.length}`);
    console.log(`Applied migrations: ${appliedMigrations.length}`);

    const pendingCount = this.migrations.filter(m => m.id > lastAppliedId).length;
    console.log(`Pending migrations: ${pendingCount}`);

    console.log('\nMigration Details:');
    console.log('-----------------');
    for (const migration of this.migrations) {
      const applied = appliedMigrations.find(m => m.id === migration.id);
      if (applied) {
        console.log(`[✓] ${migration.id}: ${migration.name} (applied at ${applied.appliedAt.toISOString()})`);
      } else {
        console.log(`[ ] ${migration.id}: ${migration.name} (pending)`);
      }
    }
  }
}