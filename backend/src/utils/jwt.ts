import jwt, { SignOptions } from "jsonwebtoken";

export const generateToken = (id: string, role_id: number) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (!secret || !expiresIn) {
    throw new Error("JWT environment variables are not defined");
  }

  const options: SignOptions = {
    expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
  };

  return jwt.sign({ id, role_id }, secret, options);
};
