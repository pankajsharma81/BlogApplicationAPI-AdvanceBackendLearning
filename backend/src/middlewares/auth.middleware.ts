import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error.js";
import { verifyAccessToken } from "../utils/jwt.helper.js";
import { authRepository } from "../modules/auth/auth.repository.js";

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new AppError("Unauthorized request", 401);
    }

    const decoded = verifyAccessToken(token);

    const user = await authRepository.findUserById(decoded.userId);

    if (!user) {
      throw new AppError("Unauthorized request", 401);
    }

    req.userId = user.id;
    next();
  } catch (error) {
    next(new AppError("Invalid Or Expired token", 401));
  }
};
