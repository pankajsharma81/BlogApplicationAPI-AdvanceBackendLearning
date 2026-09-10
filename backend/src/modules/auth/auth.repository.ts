import { prisma } from "../../lib/prisma.js";

export const authRepository = {

  findUserById: async (id: string) => {
    const user = await prisma.user.findUnique({
      where: {id}
    })
    return user
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

  deleteRefreshToken: async (id: string) => {
    const refreshToken = await prisma.refreshToken.delete({
      where: { id },
    });
  },
};
