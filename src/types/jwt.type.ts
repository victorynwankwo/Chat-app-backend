// src/types/express.d.ts
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
      } | JwtPayload; // Matches the exact structure you saved in your login token payload
    }
  }
}
