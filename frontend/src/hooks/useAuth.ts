import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../api/auth.api";
import type { AxiosError } from "axios";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "../types/auth.types";

export const useRegister = () => {
  return useMutation<
    RegisterResponse,
    AxiosError<{ message: string }>,
    RegisterPayload
  >({
    mutationFn: registerUser,
  });
};

export const useLogin = () => {
  return useMutation<
    LoginResponse,
    AxiosError<{ message: string }>,
    LoginPayload
  >({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
    },
  });
};
