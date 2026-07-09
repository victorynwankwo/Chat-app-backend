// src/types/room.types.ts
import { Document, Types } from 'mongoose';

export interface IRoom extends Document {        // Optional name (only used for Group Chats)        // true = Group Chat, false = 1-on-1 Private DM
  participants: Types.ObjectId[]; // Array of User IDs belonging to this chat room
  latestMessage?: Types.ObjectId; // Reference to the most recent message document
  createdAt: Date;
  updatedAt: Date;
}
