import { Router } from 'express';
import adminController from '../controllers/adminController.js';
import catchAsync from '../utils/catchAsync.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin operations
 */

/**
 * @swagger
 * /admin/registration:
 *   post:
 *     summary: Register a new admin
 *     tags: [Admin]
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
 *     responses:
 *       '200':
 *         description: Admin signed up successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 admin:
 *                   $ref: '#/components/schemas/Admin'
 *       '400':
 *         description: Bad request
 */
router.post('/registration', catchAsync(adminController.adminRegistration));

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Log in as an admin
 *     tags: [Admin]
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
 *     responses:
 *       '200':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 admin:
 *                   $ref: '#/components/schemas/Admin'
 *       '400':
 *         description: Bad request
 */
router.post('/login', catchAsync(adminController.adminLogin));

/**
 * @swagger
 * /admin/logout:
 *   post:
 *     summary: Log out from the admin account
 *     tags: [Admin]
 *     responses:
 *       '200':
 *         description: Logout successful
 *       '401':
 *         description: Unauthorized
 */
router.post('/logout', catchAsync(adminController.adminLogout));

/**
 * @swagger
 * /admin/refresh:
 *   get:
 *     summary: Refresh admin tokens
 *     tags: [Admin]
 *     responses:
 *       '200':
 *         description: Refresh tokens successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 admin:
 *                   $ref: '#/components/schemas/Admin'
 *       '401':
 *         description: Unauthorized
 */
router.get('/refresh', catchAsync(adminController.adminRefreshTokens));

export default router;
