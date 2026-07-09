// src/models/message.model.ts
import { Schema, model } from "mongoose";
import { IMessage } from "../types/message.type";

const messageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User", // Links directly to your User model
      required: [true, "A message must have a sender"],
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room", // Links directly to your Room model
      required: [true, "A message must belong to a room"],
    },
    text: {
      type: String, // 👈 Changed from content to text
      required: [true, "Message text cannot be empty"],
      trim: true, // Removes accidental extra white spaces
    },
    isRead: {
      type: Boolean,
      default: false, // Messages are unread by default when sent
    },
  },
  {
    timestamps: true, // Automatically handles createdAt (the sent timestamp)
  },
);

export const Message = model<IMessage>("Message", messageSchema);
