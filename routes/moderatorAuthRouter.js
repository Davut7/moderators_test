import { Router } from 'express';
import moderatorAuthController from '../controllers/moderatorAuthController.js';
import catchAsync from '../utils/catchAsync.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post(
  '/registration',
  catchAsync(moderatorAuthController.moderatorRegistration),
);
router.get(
  '/refresh',
  catchAsync(moderatorAuthController.moderatorRefreshTokens),
);
router.post('/login', catchAsync(moderatorAuthController.moderatorLogin));
router.post('/logout', catchAsync(moderatorAuthController.moderatorLogout));
router.get(
  '/get-me',
  authMiddleware,
  catchAsync(moderatorAuthController.getMe),
);

export default router;
