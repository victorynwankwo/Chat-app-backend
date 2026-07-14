import {
  sendMessage,
  getMessageByRoom,
} from "../Controllers/message.controler.js";
import express from "express";
import { verifyUser } from "../Middleware/verifyUser.js";

const router = express.Router();

/**
 * @swagger
 * /message/{roomId}/messages:
 *   post:
 *     summary: Send a message to a room
 *     description: Post a new message into the specified chat room. Requires authentication.
 *     tags:
 *       - Messages
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the room
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *                 example: Hello, this is my message!
 *     responses:
 *       201:
 *         description: Message successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 sender:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                 room:
 *                   type: string
 *                 text:
 *                   type: string
 *                 isRead:
 *                   type: boolean
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Bad request - message text is required
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       403:
 *         description: User is not a member of this room
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 */
router.post("/:roomId/messages", verifyUser, sendMessage);

/**
 * @swagger
 * /message/{roomId}/messages:
 *   get:
 *     summary: Get messages from a room
 *     description: Retrieve all messages from the specified chat room. Requires authentication.
 *     tags:
 *       - Messages
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the room
 *     responses:
 *       200:
 *         description: Messages successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   sender:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       username:
 *                         type: string
 *                   room:
 *                     type: string
 *                   text:
 *                     type: string
 *                   isRead:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       403:
 *         description: User is not a member of this room
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 */
router.get("/:roomId/messages", verifyUser, getMessageByRoom);

export default router;
