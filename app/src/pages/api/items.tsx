import { StorageFactory } from '@/infra/StorageFactory';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const storage = StorageFactory.getStorage();
    const limit = req.query.limit as string || '10';
    const page = req.query.page as string || '1';
    const result = await storage.load(
      parseInt(page),
      parseInt(limit)
    );
    await storage.close();
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
}