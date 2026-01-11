import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "../types/auth.types";
import { api } from "./axios";

export const registerUser = async (
  payload: RegisterPayload
): Promise<RegisterResponse> => {
  const body = {
    full_name: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    password: payload.password,
  };
  const { data } = await api.post<RegisterResponse>("/auth/register", body);
  return data;
};

export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/login", payload);
  return data;
};
