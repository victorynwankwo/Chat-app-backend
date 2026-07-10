// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

type AuthenticatedRequest = Request & {
  user?: { id: string; username: string };
};

export const verifyUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  // Safely extract Bearer Token from HTTP Headers
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || "your_fallback_development_secret_key",
    ) as JwtPayload;

    if (
      !decoded ||
      typeof decoded !== "object" ||
      typeof decoded.id !== "string" ||
      typeof decoded.username !== "string"
    ) {
      return res.status(401).json({ message: "Invalid token payload." });
    }

    req.user = {
      id: decoded.id,
      username: decoded.username,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
