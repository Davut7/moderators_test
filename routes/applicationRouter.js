import { Router } from 'express';
import applicationController from '../controllers/applicationController.js';
import catchAsync from '../utils/catchAsync.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', catchAsync(applicationController.createApplication));
router.get(
  '/',
  authMiddleware,
  catchAsync(applicationController.getApplications),
);
router.delete(
  '/:applicationId',
  authMiddleware,
  catchAsync(applicationController.deleteApplication),
);
router.get(
  '/:applicationId',
  authMiddleware,
  catchAsync(applicationController.getOneApplication),
);
router.patch(
  '/:applicationId',
  authMiddleware,
  catchAsync(applicationController.updateApplication),
);
router.patch(
  '/:applicationId/verify',
  authMiddleware,
  catchAsync(applicationController.verifyApplication),
);

router.post(
  '/generate-qrcode',
  catchAsync(applicationController.generateQrCode),
);

export default router;
