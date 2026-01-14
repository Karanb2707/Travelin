import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_SECRET as string;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const genrateAccessToken = (id: string, role_id: number) => {
  return jwt.sign({ id, role_id }, ACCESS_SECRET, { expiresIn: "15m" });
};

export const genrateRefreshToken = (id: string) => {
  return jwt.sign({ id }, REFRESH_SECRET, { expiresIn: "7d" });
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET);
};


