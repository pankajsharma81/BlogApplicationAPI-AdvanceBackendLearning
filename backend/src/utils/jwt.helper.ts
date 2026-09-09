import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import {
  JWT_ACCESS_EXPIRES_IN,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_SECRET,
} from "../config/config.js";

interface TokenPayload extends JwtPayload {
  userId: string;
}

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_ACCESS_SECRET as string, {
    expiresIn: JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"],
  });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_REFRESH_SECRET as string, {
    expiresIn: JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
  });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  const decoded = jwt.verify(token, JWT_ACCESS_SECRET as string);

  if (
    typeof decoded !== "object" ||
    decoded === null ||
    typeof decoded.userId !== "string"
  ) {
    throw new Error("Invalid Access Token Payload");
  }

  return decoded as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  const decoded = jwt.verify(token, JWT_REFRESH_SECRET as string);

  if (
    typeof decoded !== "object" ||
    decoded === null ||
    typeof decoded.userId !== "string"
  ) {
    throw new Error("Invalid Refresh Token Payload");
  }

  return decoded as TokenPayload;
};
