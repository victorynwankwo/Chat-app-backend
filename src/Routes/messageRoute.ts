import {sendMessage, getMessageByRoom} from "../Controllers/message.controler.js";
import express from 'express';
import {verifyUser} from '../Middleware/verifyUser.js';

const router = express.Router();

// Route for sending a message in a specific room
router.post('/:roomId/messages', verifyUser, sendMessage);
// Route for fetching messages in a specific room
router.get('/:roomId/messages', verifyUser, getMessageByRoom);

export default router;