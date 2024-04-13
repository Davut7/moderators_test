import { Router } from 'express';
import moderatorAuthRouter from './moderatorAuthRouter.js';
import applicationRouter from './applicationRouter.js';
import adminAuthRouter from './adminRouter.js';
import userRouter from './userRouter.js';

const router = Router();

router.use('/moderators/auth', moderatorAuthRouter);
router.use('/applications', applicationRouter);
router.use('/admins/auth', adminAuthRouter);
router.use('/users', userRouter);

export default router;
