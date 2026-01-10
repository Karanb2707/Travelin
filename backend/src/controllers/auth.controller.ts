import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

// Register API
export const register = async (req: Request, res: Response) => {
  try {
    const { full_name, email, phone, password } = req.body;

    const email_exist = await User.findOne({ email });
    const phone_exist = await User.findOne({ phone });

    // Registeration validations
    if (email_exist) {
      return res.status(200).json({ message: "Email already exists." });
    }

    if (phone_exist) {
      return res.status(200).json({ message: "Phone number already exists." });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      full_name,
      email,
      phone,
      password_hash,
      role_id: 2,
      status: "active",
      is_verified: true,
    });

    return res.json({ message: "Registered successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Login API
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // Login validations
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password_hash);

    
  } catch (error) {}
};
