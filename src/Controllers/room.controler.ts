
import { Request, Response } from "express";
import {Room} from "../Model/Room.js";
// POST /api/rooms
// body: { participants: string[] }  -> array of OTHER users' ids
export const createRoom = async (req: Request, res: Response) => {
  const { participants } = req.body;
  const userId = req.user?.id; // logged-in user, from auth middleware

  try {
    if (!participants || participants.length === 0) {
      return res.status(400).json({ message: "At least one participant is required" });
    }

    // combine logged-in user with participants sent from frontend, remove duplicates
    const allParticipants = Array.from(new Set([userId, ...participants]));

    if (allParticipants.length === 1) {
      return res.status(400).json({ message: "Cannot create a room with only yourself" });
    }

    // only check for an existing room when it's a 1:1 chat (2 people total)
    if (allParticipants.length === 2) {
      const existingRoom = await Room.findOne({
        participants: { $all: allParticipants, $size: 2 },
      }).populate("participants", "-password");

      if (existingRoom) {
        return res.status(200).json(existingRoom);
      }
    }

    let room = await Room.create({ participants: allParticipants });
    room = await room.populate("participants", "-password");

    return res.status(201).json(room);
  } catch (error) {
    console.error("Error creating room:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyRooms = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  try {
    const rooms = await Room.find({ participants: userId })
      .populate("participants", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    return res.status(200).json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


// GET /api/rooms/:roomId
export const getRoomById = async (req: Request, res: Response) => {
  const { roomId } = req.params;   // the Room's own _id, from the URL
  const userId = req.user?.id;     

  try {
    const room = await Room.findById(roomId)
      .populate("participants", "-password")
      .populate("latestMessage");

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const isParticipant = room.participants.some(
      (p: any) => String(p._id) === String(userId)
    );

    if (!isParticipant) {
      return res.status(403).json({ message: "You are not a member of this room" });
    }

    return res.status(200).json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};