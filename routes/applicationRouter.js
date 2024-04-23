import { Router } from 'express';
import applicationController from '../controllers/applicationController.js';
import catchAsync from '../utils/catchAsync.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Application
 *   description: Application operations
 */

/**
 * @swagger
 * /applications:
 *   post:
 *     summary: Create a new application
 *     tags: [Application]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define your request body properties here
 *     responses:
 *       '201':
 *         description: Application created successfully
 *       '500':
 *         description: Internal Server Error
 */
router.post('/', catchAsync(applicationController.createApplication));

/**
 * @swagger
 * /applications:
 *   get:
 *     summary: Get all applications
 *     tags: [Application]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: List of applications
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */
router.get(
  '/',
  authMiddleware,
  catchAsync(applicationController.getApplications),
);

// Define similar Swagger documentation for other routes...

export default router;
