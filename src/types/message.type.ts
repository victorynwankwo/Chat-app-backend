// src/types/message.types.ts
import { Document, Types } from 'mongoose';

export interface IMessage extends Document {
  sender: Types.ObjectId;   // The User ID of the person who sent the message
  room: Types.ObjectId;     // The Room ID where this message was sent
  text: string;             // 👈 Changed from content to text
  isRead: boolean;          // Tracks if the receiver has opened it
  createdAt: Date;
  updatedAt: Date;
}
