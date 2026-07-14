import express from "express";

import {
  createRoom,
  getMyRooms,
  getRoomById,
} from "../Controllers/room.controler.js";
import { verifyUser } from "../Middleware/verifyUser.js";

const router = express.Router();

/**
 * @swagger
 * /rooms/createroom:
 *   post:
 *     summary: Create a new room
 *     description: Create a room by specifying other participant user IDs. The authenticated user is added automatically.
 *     tags:
 *       - Rooms
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - participants
 *             properties:
 *               participants:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of user IDs to include in the room
 *                 example:
 *                   - "641d4a1f2f8e4b0024a5b684"
 *                   - "641d4a1f2f8e4b0024a5b685"
 *     responses:
 *       200:
 *         description: Existing room already exists for the requested participants
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 participants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       username:
 *                         type: string
 *                 latestMessage:
 *                   type: object
 *                   nullable: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       201:
 *         description: Room successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 participants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       username:
 *                         type: string
 *                 latestMessage:
 *                   type: object
 *                   nullable: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: At least one participant is required or cannot create a room with only yourself
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.post("/createroom", verifyUser, createRoom);

/**
 * @swagger
 * /rooms/myrooms:
 *   get:
 *     summary: Get all rooms for the authenticated user
 *     description: Retrieve all rooms in which the authenticated user participates.
 *     tags:
 *       - Rooms
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Rooms successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   participants:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         username:
 *                           type: string
 *                   latestMessage:
 *                     type: object
 *                     nullable: true
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.get("/myrooms", verifyUser, getMyRooms);

/**
 * @swagger
 * /rooms/{roomId}:
 *   get:
 *     summary: Get a room by ID
 *     description: Retrieve details for a specific room if the authenticated user is a participant.
 *     tags:
 *       - Rooms
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
 *         description: Room successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 participants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       username:
 *                         type: string
 *                 latestMessage:
 *                   type: object
 *                   nullable: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       403:
 *         description: User is not a member of this room
 *       404:
 *         description: Room not found
 *       500:
 *         description: Internal server error
 */
router.get("/:roomId", verifyUser, getRoomById);

export default router;
