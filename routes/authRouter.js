import { Router } from 'express';
import authController from '../controllers/authController.js';
import catchAsync from '../utils/catchAsync.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/registration', catchAsync(authController.moderatorRegistration));
router.get('/refresh', catchAsync(authController.moderatorRefreshTokens));
router.post('/login', catchAsync(authController.moderatorLogin));
router.post('/logout', catchAsync(authController.moderatorLogout));
router.get('/get-me', authMiddleware, catchAsync(authController.getMe));

export default router;
