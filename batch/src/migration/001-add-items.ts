export const migration: Migration = {
  id: 1,
  name: 'create-users',
  up: async (db: Db): Promise<void> => {
    console.log('Running migration: create-users (up)');
    // コレクション作成
    await db.createCollection('users');
    // インデックス作成
    const users = db.collection('users');
    await users.createIndex({ email: 1 }, { unique: true });
    // 初期データ挿入
    await users.insertOne({
      email: 'admin@example.com',
      name: '管理者',
      role: 'admin',
      createdAt: new Date()
    });
  },
  down: async (db: Db): Promise<void> => {
    console.log('Running migration: create-users (down)');
    // コレクション削除
    await db.dropCollection('users');
  }
};
