import { Request, Response } from "express";
import { Message } from "../Model/Message.js";
import { Room } from "../Model/Room.js";

export const sendMessage = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const { text } = req.body;
  const senderId = req.user?.id;

  try {
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: "Message text is required" });
    }

    // confirm the room exists, and the sender is actually a participant
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const isParticipant = room.participants.some(
      (p: any) => String(p) === String(senderId)
    );
    if (!isParticipant) {
      return res.status(403).json({ message: "You are not a member of this room" });
    }

    const message = await Message.create({
      room: roomId,
      sender: senderId,
      text: text.trim(),
    });

    // update the room's latestMessage, so getMyRooms shows the right preview
    room.latestMessage = message._id;
    await room.save();

    const populatedMessage = await message.populate("sender", "-password");

    return res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const getMessageByRoom = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const userId = req.user?.id;
 try{
    const room = await Room.findById(roomId);
    if (!room) {  

      return res.status(404).json({ message: "Room not found" });
    }

    const isParticipant = room.participants.some(
      (p: any) => String(p) === String(userId)
    );

    if (!isParticipant) {
      return res.status(403).json({ message: "You are not a member of this room" });
    }

    const messages = await Message.find({ room: roomId })
      .populate("sender", "-password")
      .sort({ createdAt: 1 });  


    return res.status(200).json(messages);  

 }catch(error){
    console.error("Error fetching messages:", error);
    return res.status(500).json({ message: "Internal server error" });  
 }
}