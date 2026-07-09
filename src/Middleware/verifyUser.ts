// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express"; 
import jwt from "jsonwebtoken"; 

export const verifyUser = (req: Request, res: Response, next: NextFunction) => { 
  // . Safely extract Bearer Token from HTTP Headers
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) { 
    return res.status(401).json({ message: "Access denied. No token provided." }); 
  } 

  try { 
    //. Validate token validity using your secret key
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || "your_fallback_development_secret_key"
    ); 

    // . Attach payload to the request object (Type error is now fixed!)
    req.user = decoded; 
    
    next(); 
  } catch (error) { 
    return res.status(401).json({ message: "Invalid or expired token." }); 
  } 
};
