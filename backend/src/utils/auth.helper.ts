import bcrypt from "bcrypt";
import crypto from "crypto";

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