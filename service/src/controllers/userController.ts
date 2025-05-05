import { Request, Response } from 'express';

export const createUser =　async (req: Request, res: Response) => {
  const { name, email, role } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: '名前とメールアドレスは必須です' });
  }

  let users = []

  users.push({
    name: "aaaa",
    age: 35
  });

  users.push({
    name: "bbbb",
    age: 45
  });

  res.status(201).json(users);
};