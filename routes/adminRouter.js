import { Router } from 'express';
import adminController from '../controllers/adminController.js';
import catchAsync from '../utils/catchAsync.js';

const router = Router();

router.post('/registration', catchAsync(adminController.adminRegistration));
router.get('/refresh', catchAsync(adminController.adminRefreshTokens));
router.post('/login', catchAsync(adminController.adminLogin));
router.post('/logout', catchAsync(adminController.adminLogout));

export default router;
