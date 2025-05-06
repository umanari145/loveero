import { MongoClient } from "mongodb";
import 'dotenv/config'

// 接続情報の設定(admin)
const uri = "mongodb://root:pass@mongo:27017";  // MongoDBサーバーのURI
const client = new MongoClient(uri);

// データベースおよびユーザー情報
const dbName = "loveero";
const userName = process.env.DOC_DB_USER;
const password = process.env.DOC_DB_PASS;
const collectionName = "movies";

async function main() {
  try {
    // MongoDBサーバーに接続
    await client.connect();
    console.log("Connected to MongoDB");

    // データベースとユーザーの作成
    const adminDb = client.db("admin"); // 管理用データベースに接続
    await adminDb.command({
      createUser: userName,
      pwd: password,
      roles: [{ role: "readWrite", db: dbName }]
    });
    console.log(`User '${userName}' created for database '${dbName}'`);

    // データベースとコレクションの取得
    const db = client.db(dbName);

    // コレクションが存在しない場合は作成
    await db.createCollection(collectionName);
    console.log(`Collection '${collectionName}' created in database '${dbName}'`);

  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // 接続を閉じる
    await client.close();
    console.log("Connection to MongoDB closed");
  }
}

// メイン関数を実行
main().catch(console.error);