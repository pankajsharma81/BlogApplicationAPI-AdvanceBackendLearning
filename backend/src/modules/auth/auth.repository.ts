import { prisma } from "../../lib/prisma.js";
import { IAuthRepository } from "./auth.interface.js";

export class AuthRepository implements IAuthRepository {
  async findUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }

  async findUserByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async createUser(username: string, email: string, password: string) {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    return newUser;
  }

  async createRefreshToken(data: {userId: string, tokenHash: string, expiresAt: Date }) {
    const refreshToken = await prisma.refreshToken.create({
      data,
    });
    return refreshToken;
  }

  async findRefreshToken(tokenHash: string) {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: { tokenHash },
    });
    return refreshToken;
  }

  async findRefreshTokenByUserId(userId: string) {
    return await prisma.refreshToken.findMany({
      where: { userId },
    });
  }

  async deleteRefreshTokenById(id: string) {
    return await prisma.refreshToken.delete({
      where: { id },
    });
  }

  async deleteRefreshTokenByToken(tokenHash: string) {
    return await prisma.refreshToken.delete({
      where: { tokenHash },
    });
  }

  async deleteAllRefreshTokenByUser(userId: string) {
    return await prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }
}

