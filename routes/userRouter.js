import { Router } from 'express';
import userController from '../controllers/userController.js';
import catchAsync from '../utils/catchAsync.js';
import upload from '../services/multer.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User Management
 *   description: User management operations
 */

/**
 * @swagger
 * /users/upload-users:
 *   post:
 *     summary: Upload users from a file
 *     tags: [User Management]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Users registered successfully
 *       '500':
 *         description: Internal Server Error
 */
router.post(
  '/upload-users',
  upload.single('file'),
  catchAsync(userController.uploadUsers),
);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [User Management]
 *     responses:
 *       '200':
 *         description: Retrieved all users successfully
 *       '500':
 *         description: Internal Server Error
 */
router.get('', catchAsync(userController.getUsers));

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User Management]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Retrieved user successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 */
router.get('/:userId', catchAsync(userController.getUser));

/**
 * @swagger
 * /users/{userId}/verify:
 *   patch:
 *     summary: Verify a user by ID
 *     tags: [User Management]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               denialReason:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User verified successfully
 *       '400':
 *         description: Bad Request
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal Server Error
 */
router.patch(
  '/:userId/verify',
  authMiddleware,
  catchAsync(userController.verifyUsers),
);

export default router;
