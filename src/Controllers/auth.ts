import { Request, Response } from "express";
import { User } from "../Model/User";
import {hashPassword, comparePassword} from "../util/bycrypt";
import jwt from "jsonwebtoken";

export const registerNewUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }
  try{
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = User.create({
        username,
     password: hashedPassword
    }
   
    )
     console.log(newUser)

  }catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const LoginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // 1. Validate that input fields are not blank
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    // 2. Lookup the user account in MongoDB Atlas
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // 3. Verify password against the stored password hash
    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // 4. Generate your JWT Access Token (saving only id and username inside)
    const accessToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || "your_fallback_development_secret_key",
      { expiresIn: "7d" } // Token expires in 7 days
    );

    // 5. Send clean response back to the phone/client app
    return res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      accessToken,
      user: {
        username: user.username
      }
    });

  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
