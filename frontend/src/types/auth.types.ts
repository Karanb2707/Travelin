export interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  message: string;
}
