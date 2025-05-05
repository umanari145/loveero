import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './routes';
import { createUser } from './controllers/userController';

const app = express();
const PORT = process.env.PORT || 5000;

// CORS設定とJSONパーシング
app.use(cors());
app.use(express.json());



app.use('/api/users', createUser);


app.listen(PORT, () => {
  console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});