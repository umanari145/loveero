import { createUser } from '@/controllers/userController';
import express from 'express';

const router = express.Router();

router.post('/users', createUser);

export default router;