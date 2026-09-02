import { prisma } from "../../lib/prisma.js";

export const authRepository = {
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

  createRefreshToken: async ( data: {userId: string, token: string, expiresAt: Date} ) => {
    const refreshToken = await prisma.refreshToken.create({
      data,
    });
    return refreshToken;
  },
};
