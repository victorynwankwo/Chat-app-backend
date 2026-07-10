import express from 'express';

import { createRoom, getMyRooms, getRoomById } from '../Controllers/room.controler.js';
import {verifyUser} from '../Middleware/verifyUser.js';


const router = express.Router();

// Route for creating a new room
router.post('/createroom', verifyUser, createRoom);
// Route for fetching my rooms
router.get('/myrooms', verifyUser, getMyRooms);
// Route for fetching a specific room by ID
router.get('/:roomId', verifyUser, getRoomById);

export default router;