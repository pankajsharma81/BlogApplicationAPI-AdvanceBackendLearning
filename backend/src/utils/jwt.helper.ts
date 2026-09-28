import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { env } from "../config/config.js";
import { AppError } from "./app-error.js";

interface TokenPayload extends JwtPayload {
  userId: string;
}

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"],
  });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
  });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);

  if (
    typeof decoded !== "object" ||
    decoded === null ||
    typeof decoded.userId !== "string"
  ) {
    throw new AppError("Invalid Access Token Payload", 401);
  }

  return decoded as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET);

  if (
    typeof decoded !== "object" ||
    decoded === null ||
    typeof decoded.userId !== "string"
  ) {
    throw new AppError("Invalid Refresh Token Payload", 401);
  }

  return decoded as TokenPayload;
};
