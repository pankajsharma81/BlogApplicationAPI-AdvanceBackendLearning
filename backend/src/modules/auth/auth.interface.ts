import { RefreshToken, User } from "../../../generated/prisma/index.js";

export interface IAuthRepository {
  findUserById(id: string): Promise<User | null>;
  findUserByUsername(username: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  createUser(username: string, email: string, password: string): Promise<User>;
  createRefreshToken(data:{ userId: string, tokenHash: string, expiresAt: Date}): Promise<RefreshToken>;
  findRefreshToken(tokenHash: string): Promise<RefreshToken | null>;
  findRefreshTokenByUserId(userId: string): Promise<RefreshToken[]>;
  deleteRefreshTokenById(id: string): Promise<RefreshToken>;
  deleteRefreshTokenByToken(tokenHash: string): Promise<RefreshToken>;
  deleteAllRefreshTokenByUser(userId: string): Promise<{ count: number}>;
}
