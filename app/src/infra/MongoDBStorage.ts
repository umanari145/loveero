// MongoDB を使用したストレージ実装
import { MongoClient, Collection } from 'mongodb';

export class MongoDBStorage {
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

  async save(item:any): Promise<void> {
    try {
      const collection = await this.connect();

      // IDがある場合は一致するドキュメントを更新、なければ新規作成
      if (item._id) {
        await collection.updateOne(
          { _id: item._id },
          { $set: item },
          { upsert: true }
        );
      } else {
        await collection.insertOne(item);
      }

      console.log('データがMongoDBに保存されました');
    } catch (error) {
      console.error('MongoDB保存エラー:', error);
      throw error;
    }
  }

  async bulkSave(items: Array<any>): Promise<void> {
    try {
      const collection = await this.connect();
      const operations: any[] = [];

      items.forEach(item => {
        /*if (item._id) {
          operations.push({
            updateOne: {
              filter: { _id: item._id },
              update: { $set: item },
              upsert: false,
            },
          });
        } else {*/
          operations.push({ insertOne: { document: item } });
        //}
      });

      if (operations.length > 0) {
        const result = await collection.bulkWrite(operations);
        const insertedCount = result.insertedCount || 0;
        const modifiedCount = result.modifiedCount || 0;
        console.log(`${insertedCount + modifiedCount} 件のデータがMongoDBに保存/更新されました`);
      } else {
        console.log('保存/更新するデータはありませんでした');
      }
    } catch (error) {
      console.error('MongoDB保存エラー:', error);
      throw error;
    }
  }

  async load(page:number= 1, limit:number = 10): Promise<any> {
    try {
      const skip = (page - 1) * limit;
      const collection = await this.connect();
      const documents = await collection.find({})
        .skip(skip)
        .limit(limit)
        .toArray();

      const total = await collection.countDocuments()
      return {
        "items": documents,
        "total": total
      }
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

  async delete(): Promise<void> {
    if (this.client) {
      const collection = await this.connect();
      await collection.deleteMany({})
    }
  }
}
