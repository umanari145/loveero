import { Db } from 'mongodb';
import { Migration } from '../migration-interface';

export const migration: Migration = {
  id: 2,
  name: 'add-products',
  up: async (db: Db): Promise<void> => {
    console.log('Running migration: add-products (up)');
    // コレクション作成
    await db.createCollection('products');
    // インデックス作成
    const products = db.collection('products');
    await products.createIndex({ productCode: 1 }, { unique: true });
    // サンプルデータ挿入
    await products.insertMany([
      { productCode: 'P001', name: '商品1', price: 1000, stock: 50, createdAt: new Date() },
      { productCode: 'P002', name: '商品2', price: 2000, stock: 30, createdAt: new Date() }
    ]);
  },
  down: async (db: Db): Promise<void> => {
    console.log('Running migration: add-products (down)');
    // コレクション削除
    await db.dropCollection('products');
  }
};
