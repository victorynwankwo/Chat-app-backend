import { Request, Response } from "express";
import { Message } from "../Model/Message.js";
import { Room } from "../Model/Room.js";
import {uploadImageToCloudinary} from "../util/cloudinary.helper.js";

export const sendMessage = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const { text } = req.body;
  const senderId = req.user?.id;


  console.log("req.file is:", req.file)
   console.log("req.body:", req.body);
  // console.log("req.file:", req.file);
  console.log("Content-Type header:", req.headers["content-type"]);
  

  try {
    if ((!text || text.trim().length === 0) && !req.file) {
      return res.status(400).json({ message: "Message must include text or an image" });
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

    let imageUrl: string | null = null;
    if (req.file) {
      imageUrl = await uploadImageToCloudinary(req.file.buffer);
    }

    const message = await Message.create({
      room: roomId,
      sender: senderId,
      text: text ? text.trim() : undefined,
      image: imageUrl,
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


// PATCH /api/messages/:messageId/read
export const markMessageAsRead = async (req: Request, res: Response) => {
  const { messageId } = req.params;
  const userId = req.user?.id;

  try {
    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // don't let someone mark their own sent message as "read"
    if (String(message.sender) === String(userId)) {
      return res.status(400).json({ message: "You cannot mark your own message as read" });
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { isRead: true },
      { new: true } // return the UPDATED document, not the old one
    ).populate("sender", "-password");

    return res.status(200).json(updatedMessage);
  } catch (error) {
    console.error("Error marking message as read:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};