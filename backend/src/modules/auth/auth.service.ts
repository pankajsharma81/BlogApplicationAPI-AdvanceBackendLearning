import { AppError } from "../../utils/app-error.js";
import { comparePassword, hashPassword, hashToken } from "../../utils/auth.helper.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/jwt.helper.js";
import { IAuthRepository } from "./auth.interface.js";
import { mapUserResponse } from "./auth.mapper.js";
import { loginUserDTO, refreshTokenDTO, registerUserDTO } from "./auth.schema.js";

export class AuthService {
  constructor(private repo: IAuthRepository) {}

  async registerUser (body: registerUserDTO) {
    const { username, email, password } = body;

    const existingUserByUsername =
      await this.repo.findUserByUsername(username);

    if (existingUserByUsername) {
      throw new AppError("User Already Exist", 409);
    }

    const existingUserByEmail = await this.repo.findUserByEmail(email);

    if (existingUserByEmail) {
      throw new AppError("User Already Exist", 409);
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await this.repo.createUser(
      username,
      email,
      hashedPassword,
    );

    const accessToken = generateAccessToken(newUser.id);
    const refreshToken = generateRefreshToken(newUser.id);

    const hashedToken = hashToken(refreshToken);

    await this.repo.createRefreshToken({
      tokenHash: hashedToken,
      userId: newUser.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      user: mapUserResponse(newUser),
      accessToken,
      refreshToken,
    };
  }

  async loginUser(body: loginUserDTO){
    const { email, password } = body;

    const user = await this.repo.findUserByEmail(email);

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

    await this.repo.createRefreshToken({
      tokenHash: hashedToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 25 * 60 * 60 * 1000),
    });

    return {
      user: mapUserResponse(user),
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(body: refreshTokenDTO){
    const { refreshToken } = body;

    let payload;

    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new AppError("Invalid or expired refresh Token", 401);
    }

    const tokenHash = hashToken(refreshToken);

    const storedToken = await this.repo.findRefreshToken(tokenHash);

    if (!storedToken) {
      throw new AppError("Invalid or expired refresh Token", 401);
    }

    if (storedToken.expiresAt < new Date()) {
      await this.repo.deleteRefreshTokenById(storedToken.id);

      throw new AppError("Refresh token has expired", 401);
    }

    if (storedToken.userId !== payload.userId) {
      throw new AppError("Invalid Refresh Token", 401);
    }

    // Rotate refresh token
    await this.repo.deleteRefreshTokenById(storedToken.id);

    const newAccessToken = generateAccessToken(payload.userId);
    const newRefreshToken = generateRefreshToken(payload.userId);

    const hashedToken = hashToken(newRefreshToken);

    await this.repo.createRefreshToken({
      tokenHash: hashedToken,
      userId: payload.userId,
      expiresAt: new Date(Date.now() + 7 * 25 * 60 * 60 * 1000),
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async getCurrentUser(userId: string){
    const user = await this.repo.findUserById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return mapUserResponse(user);
  }
  
  async logout(refreshToken: string){
    if (!refreshToken) {
      throw new AppError("Refresh token required", 401);
    }

    const refreshTokenHashed = hashToken(refreshToken);

    const existingToken =
      await this.repo.findRefreshToken(refreshTokenHashed);

    if (!existingToken) {
      throw new AppError("Invalid Refresh Token", 401);
    }

    await this.repo.deleteRefreshTokenById(existingToken.id);

    return true;
  }

  async logoutAll(userId: string){
    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }

    await this.repo.deleteAllRefreshTokenByUser(userId);

    return true;
  }

}
