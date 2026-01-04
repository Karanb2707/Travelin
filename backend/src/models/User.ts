import mongoose from "mongoose";

export interface Iuser extends mongoose.Document {
  full_name: string;
  email: string;
  phone?: string;
  password_hash: string;
  role_id: number;
  status: string;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
  last_login_at?: Date;
}

const UserSchema = new mongoose.Schema<Iuser>({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  role_id: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "active",
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  last_login_at: {
    type: Date,
  },
});

export default mongoose.model<Iuser>("User", UserSchema);
