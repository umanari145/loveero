// MongoDB を使用したストレージ実装
import { MongoClient, Collection } from 'mongodb';

export class MongoDBStorage implements DataStorage {
  private collection: Collection | null = null;
  private client: MongoClient | null = null;
  private dbName: string;
  private collectionName: string;
  private uri: string;

  constructor(uri: string, dbName: string, collectionName: string) {
    this.uri = uri;
    this.dbName = dbName;
    this.collectionName = collectionName;
  }

  private async connect(): Promise<Collection> {
    if (this.collection) return this.collection;

    try {
      this.client = new MongoClient(this.uri);
      await this.client.connect();
      console.log('MongoDBに接続しました');

      const db = this.client.db(this.dbName);
      this.collection = db.collection(this.collectionName);
      return this.collection;
    } catch (error) {
      console.error('MongoDB接続エラー:', error);
      throw error;
    }
  }

  async save(data: any): Promise<void> {
    try {
      const collection = await this.connect();

      // IDがある場合は一致するドキュメントを更新、なければ新規作成
      if (data._id) {
        await collection.updateOne(
          { _id: data._id },
          { $set: data },
          { upsert: true }
        );
      } else {
        await collection.insertOne(data);
      }

      console.log('データがMongoDBに保存されました');
    } catch (error) {
      console.error('MongoDB保存エラー:', error);
      throw error;
    }
  }

  async load(): Promise<any> {
    try {
      const collection = await this.connect();
      const documents = await collection.find({}).toArray();
      return documents;
    } catch (error) {
      console.error('MongoDB読み込みエラー:', error);
      throw error;
    }
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
      console.log('MongoDB接続を閉じました');
    }
  }
}
