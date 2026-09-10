import { prisma } from "../../lib/prisma.js";

export const authRepository = {
  findUserById: async (id: string) => {
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
  },

  findUserByUsername: async (username: string) => {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  },

  findUserByEmail: async (email: string) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  },

  createUser: async (username: string, email: string, password: string) => {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    return newUser;
  },

  createRefreshToken: async (data: {
    userId: string;
    tokenHash: string;
    expiresAt: Date;
  }) => {
    const refreshToken = await prisma.refreshToken.create({
      data,
    });
    return refreshToken;
  },

  findRefreshToken: async (tokenHash: string) => {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: { tokenHash },
    });
    return refreshToken;
  },

  findRefreshTokenByUserId: async (userId: string) => {
    return await prisma.refreshToken.findMany({
      where: { userId },
    });
  },

  deleteRefreshTokenById: async (id: string) => {
    const refreshToken = await prisma.refreshToken.delete({
      where: { id },
    });
  },

  deleteRefreshTokenByToken: async (tokenHash: string) => {
    return await prisma.refreshToken.delete({
      where: { tokenHash }
    })
  },

  deleteAllRefreshTokenByUser: async (userId: string) => {
    return await prisma.refreshToken.deleteMany({
      where: { userId }
    })
  }

};
