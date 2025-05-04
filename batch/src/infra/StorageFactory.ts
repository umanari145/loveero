import { FileStorage } from "./FileStorage";
import { MongoDBStorage } from "./MongoDBStorage";

export class StorageFactory {
  static getStorage(): DataStorage {
    const environment = process.env.NODE_ENV || 'development';

    if (environment === 'production') {
      const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
      const dbName = process.env.DB_NAME || 'myapp';
      const collectionName = process.env.COLLECTION_NAME || 'data';

      console.log(`本番環境: MongoDBストレージを使用します (${mongoUri})`);
      return new MongoDBStorage(mongoUri, dbName, collectionName);
    } else {
      const fileName = process.env.FILE_NAME || 'data.json';

      console.log(`開発環境: ファイルストレージを使用します (${fileName})`);
      return new FileStorage(fileName);
    }
  }
}