import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

// Register API
export const register = async (req: Request, res: Response) => {
  try {
    const { full_name, email, phone, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const password_hash = await bcrypt.hash(password, 100);

    
    const user = await User.create({
      full_name,
      email,
      phone,
      password_hash,
      role_id: 2,
      status: "active",
      is_verified: true,
    });
  } catch (error) {
    return res.status(500).json({ message: `Error - ${error}` });
  }
};
