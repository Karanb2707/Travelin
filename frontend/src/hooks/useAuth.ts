import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../api/auth.api";
import type { AxiosError } from "axios";
import type { RegisterPayload } from "../types/auth.types";

export const useRegister = () => {
  return useMutation<void, AxiosError<{ message: string }>, RegisterPayload>({
    mutationFn: registerUser,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
