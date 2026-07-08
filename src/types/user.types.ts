
import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string; // Storing the encrypted bcrypt password
  createdAt: Date;
  updatedAt: Date;
}
