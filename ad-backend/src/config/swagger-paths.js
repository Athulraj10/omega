/**
 * @swagger
 * paths:
 *   /admin/login:
 *     post:
 *       tags: [Admin - Authentication]
 *       summary: Admin login
 *       description: Authenticate admin user and return JWT token
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *               properties:
 *                 email:
 *                   type: string
 *                   example: admin@example.com
 *                 password:
 *                   type: string
 *                   example: password123
 *                 mobile_no:
 *                   type: number
 *                   example: 1234567890
 *       responses:
 *         200:
 *           description: Login successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: Login successful
 *                   data:
 *                     $ref: '#/components/schemas/User'
 *                   meta:
 *                     type: object
 *                     properties:
 *                       token:
 *                         type: string
 *                         example: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         400:
 *           $ref: '#/components/responses/BadRequest'
 *         401:
 *           $ref: '#/components/responses/Unauthorized'
 */

// This file contains comprehensive Swagger path definitions
// Due to size, paths are defined inline in route files using JSDoc comments
// See swagger.js for main configuration

module.exports = {};
























