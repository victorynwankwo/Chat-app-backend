// src/models/user.model.ts
import { Schema, model } from 'mongoose';
import { IUser } from '../types/user.types.js';

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

// Create and export the Model tied to the IUser interface
export const User = model<IUser>('User', userSchema);
