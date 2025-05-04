import * as fs from 'fs/promises';
import * as path from 'path';

export class FileStorage implements DataStorage {
  private filePath: string;

  constructor(fileName: string) {
    this.filePath = path.join(process.cwd(), fileName);
  }

  async save(data: any): Promise<void> {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
      console.log(`データがファイルに保存されました: ${this.filePath}`);
    } catch (error) {
      console.error('ファイル保存エラー:', error);
      throw error;
    }
  }

  async load(): Promise<any> {
    try {
      const exists = await fs.access(this.filePath).then(() => true).catch(() => false);

      if (!exists) {
        console.log(`ファイルが存在しません: ${this.filePath}`);
        return null;
      }

      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('ファイル読み込みエラー:', error);
      throw error;
    }
  }
}