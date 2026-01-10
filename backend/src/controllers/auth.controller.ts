import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import AuthLog from "../models/AuthLog";

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

    // Auth logs (commented out because of free database)
    // await AuthLog.create({
    //   user_id: user._id,
    //   role_id: user.role_id,
    //   event: "login",
    //   status: "success",
    // });

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.full_name,
        email: user.email,
        role_id: user.role_id,
        role: user.role_id === 1 ? "Admin" : "Passenger",
      },
      message: "Login successfully",
    });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
