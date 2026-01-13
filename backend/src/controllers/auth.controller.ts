import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import AuthLog from "../models/AuthLog";

// Register API
export const register = async (req: Request, res: Response) => {
  try {
    const { full_name, email, phone, password } = req.body;

    const emailExist = await User.findOne({ email });
    const phoneExist = await User.findOne({ phone });

    // Registeration validations
    if (emailExist) {
      return res.status(200).json({ message: "Email already exists." });
    }

    if (phoneExist) {
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
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// Login API
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password_hash);

    if (!match) {
      return res.status(200).json({ message: "Invalid email or password" });
    }

    user.last_login_at = new Date();
    const token = generateToken(user._id.toString(), user.role_id);
    
    user.is_logged_in = true;
    await user.save();

    return res.json({
      token,
      message: "Login successfully",
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// User Details (Me) API
export const me = async (req: any, res: any) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select(
      "_id full_name email phone role_id status is_verified is_logged_in created_at last_login_at"
    );

    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }

    return res.json({
      data: {
        ...user.toObject(),
        role: user.role_id === 1 ? "Admin" : "Passenger",
      },
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// Logout API
export const logout = async (req: any, res: any) => {
  try {
    const userId = req.user.id;

    const user = await User.findByIdAndUpdate(userId, { is_logged_in: false });

    return res.json({ message: "Logged out successfully" });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
