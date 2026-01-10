import type { LoginPayload, RegisterPayload } from "../types/auth.types";
import { api } from "./axios";

export const registerUser = async (data: RegisterPayload) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data: LoginPayload) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};
