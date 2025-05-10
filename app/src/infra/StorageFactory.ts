import { MongoDBStorage } from "./MongoDBStorage";

export class StorageFactory {
  static getStorage() {
    const environment = process.env.NODE_ENV;
    const mongoUri = `${process.env.DOC_DB_PROTOCOL}://${process.env.DOC_DB_USER}:${process.env.DOC_DB_PASS}@${process.env.DOC_DB_HOST}:27017`;
    const dbName = process.env.DOC_DB_NAME || 'myapp';
    const collectionName = process.env.DOC_DB_COLLECTION || 'data';
    if (environment === 'test') {
      console.log(`${environment}  MongoDBストレージを使用します (${mongoUri})`);
    }
    return new MongoDBStorage(mongoUri, dbName, collectionName);
  }
}