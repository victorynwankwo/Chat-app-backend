// src/models/room.model.ts
import { Schema, model } from "mongoose";
import { IRoom } from "../types/room.type.js";

const roomSchema = new Schema<IRoom>(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", 
        required: true,
      },
    ],
    latestMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message", // Reference to the most recent message document using your 'text' model
    },
  },
  {
    timestamps: true, // Automatically manages your createdAt and updatedAt Date fields
  },
);

export const Room = model<IRoom>("Room", roomSchema);
