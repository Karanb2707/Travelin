import mongoose from "mongoose";
import { create } from "node:domain";

const AuthLogSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  role_id: Number,
  event: String,
  status: String,
  ip: String,
  user_agent: String,
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model("AuthLog", AuthLogSchema);
