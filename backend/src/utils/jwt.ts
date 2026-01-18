import jwt from "jsonwebtoken";

export const genrateAccessToken = (id: string, role_id: number) => {
  return jwt.sign({ id, role_id }, process.env.JWT_SECRET as string, {
    expiresIn: "15m",
  });
};

export const genrateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "7d",
  });
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);
};
