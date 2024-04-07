import { Router } from 'express';
import authRouter from './authRouter.js';
import applicationRouter from './applicationRouter.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/applications', applicationRouter);

export default router;
