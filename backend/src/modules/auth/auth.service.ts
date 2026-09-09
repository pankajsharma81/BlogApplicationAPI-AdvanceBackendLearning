import { AppError } from "../../utils/app-error.js";
import {
  comparePassword,
  hashPassword,
  hashToken,
} from "../../utils/auth.helper.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.helper.js";
import { mapUserResponse } from "./auth.mapper.js";
import { authRepository } from "./auth.repository.js";
import {
  loginUserDTO,
  refreshTokenDTO,
  registerUserDTO,
} from "./auth.schema.js";

export const authService = {
  registerUser: async (body: registerUserDTO) => {
    const { username, email, password } = body;

    const existingUserByUsername =
      await authRepository.findUserByUsername(username);

    if (existingUserByUsername) {
      throw new AppError("User Already Exist", 409);
    }

    const existingUserByEmail = await authRepository.findUserByEmail(email);

    if (existingUserByEmail) {
      throw new AppError("User Already Exist", 409);
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await authRepository.createUser(
      username,
      email,
      hashedPassword,
    );

    const accessToken = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);

    const hashedToken = hashToken(refreshToken);

    await authRepository.createRefreshToken({
      tokenHash: hashedToken,
      userId: newUser.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      user: mapUserResponse(newUser),
      accessToken,
      refreshToken,
    };
  },

  loginUser: async (body: loginUserDTO) => {
    const { email, password } = body;

    const user = await authRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    const hashedToken = hashToken(refreshToken);

    await authRepository.createRefreshToken({
      tokenHash: hashedToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 25 * 60 * 60 * 1000),
    });

    return {
      user: mapUserResponse(user),
      accessToken,
      refreshToken,
    };
  },

  refreshToken: async (body: refreshTokenDTO) => {
    const { refreshToken } = body;

    let payload;

    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new AppError("Invalid or expired refresh Token", 401);
    }

    const tokenHash = hashToken(refreshToken);

    const storedToken = await authRepository.findRefreshToken(tokenHash);

    if (!storedToken) {
      throw new AppError("Invalid or expired refresh Token", 401);
    }

    if (storedToken.expiresAt < new Date()) {
      await authRepository.deleteRefreshToken(storedToken.id);

      throw new AppError("Refresh token has expired", 401);
    }

    if (storedToken.userId !== payload.userId) {
      throw new AppError("Invalid Refresh Token", 401);
    }

    // Rotate refresh token
    await authRepository.deleteRefreshToken(storedToken.id);

    const newAccessToken = generateAccessToken(payload.userId);
    const newRefreshToken = generateRefreshToken(payload.userId);

    const hashedToken = hashToken(newRefreshToken);

    await authRepository.createRefreshToken({
      tokenHash: hashedToken,
      userId: payload.userId,
      expiresAt: new Date(Date.now() + 7 * 25 * 60 * 60 * 1000),
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  },
};
