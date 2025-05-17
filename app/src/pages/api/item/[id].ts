import { StorageFactory } from "@/infra/StorageFactory";
import { useRouter } from "../../../../node_modules/next/router";
import { NextApiRequest, NextApiResponse } from "../../../../node_modules/next/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    const storage = StorageFactory.getStorage();
    if (typeof id !== 'string') {
      return res.status(400).json({ message: 'ID が無効です' });
    }
    const result = await storage.get(id);
    await storage.close();
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
}