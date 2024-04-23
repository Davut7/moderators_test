import { Router } from 'express';
import moderatorAuthController from '../controllers/moderatorAuthController.js';
import catchAsync from '../utils/catchAsync.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Moderator Authentication
 *   description: Moderator authentication operations
 */

/**
 * @swagger
 * /moderator-auth/registration:
 *   post:
 *     summary: Register a new moderator
 *     tags: [Moderator Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               verifyLevel:
 *                 type: integer
 *               firstName:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - firstName
 *               - password
 *     responses:
 *       '200':
 *         description: Moderator signed up successfully
 *       '400':
 *         description: Bad Request
 *       '409':
 *         description: Conflict
 *       '500':
 *         description: Internal Server Error
 */
router.post('/registration', catchAsync(moderatorAuthController.moderatorRegistration));

/**
 * @swagger
 * /moderator-auth/login:
 *   post:
 *     summary: Log in as a moderator
 *     tags: [Moderator Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - firstName
 *               - password
 *     responses:
 *       '200':
 *         description: Login successful
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */
router.post('/login', catchAsync(moderatorAuthController.moderatorLogin));

/**
 * @swagger
 * /moderator-auth/refresh:
 *   get:
 *     summary: Refresh moderator tokens
 *     tags: [Moderator Authentication]
 *     responses:
 *       '200':
 *         description: Refresh tokens successful
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */
router.get('/refresh', catchAsync(moderatorAuthController.moderatorRefreshTokens));

/**
 * @swagger
 * /moderator-auth/logout:
 *   post:
 *     summary: Log out as a moderator
 *     tags: [Moderator Authentication]
 *     responses:
 *       '200':
 *         description: Logout successful
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */
router.post('/logout', catchAsync(moderatorAuthController.moderatorLogout));

/**
 * @swagger
 * /moderator-auth/get-me:
 *   get:
 *     summary: Get current moderator
 *     tags: [Moderator Authentication]
 *     responses:
 *       '200':
 *         description: Moderator retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */
router.get('/get-me', catchAsync(moderatorAuthController.getMe));

export default router;
