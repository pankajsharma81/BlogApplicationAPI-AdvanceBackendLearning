import bcrypt from "bcrypt";
import crypto from "crypto";
import { env } from "../config/config.js";
import { Response } from "express";

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hashedPasswordInDb: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPasswordInDb);
};


export const hashToken = (token: string): string => {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export const setCookies = (res: Response, accessToken: string, refreshToken: string) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

export const clearCookies = (res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

}