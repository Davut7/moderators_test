import { Router } from 'express';
import userController from '../controllers/userController.js';
import catchAsync from '../utils/catchAsync.js';
import upload from '../services/multer.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post(
  '/upload-users',
  upload.single('file'),
  catchAsync(userController.uploadUsers),
);
router.get('', catchAsync(userController.getUsers));
router.get('/:userId', catchAsync(userController.getUser));
router.patch(
  '/:userId/verify',
  authMiddleware,
  catchAsync(userController.verifyUsers),
);

export default router;
