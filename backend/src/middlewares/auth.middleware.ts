import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error.js";
import { verifyAccessToken } from "../utils/jwt.helper.js";
import { authService } from "../modules/auth/auth.container.js";

export const authenticate = async ( req: Request, _res: Response, next: NextFunction ) => {
  try {

    const authHeader = req.header("Authorization")

    let token = req.cookies?.accessToken;


    if(authHeader){
      if(!authHeader.startsWith("Bearer ")){
        throw new AppError("Invalid authorization header", 401)
      }
      token = authHeader.slice(7)
    }     

    // const token =
    // req.header("Authorization")?.replace("Bearer ", "") ||
    // req.cookies?.accessToken;

    if (!token) {
      throw new AppError("Unauthorized request", 401);
    }

    const decoded = verifyAccessToken(token);

    const user = await authService.getCurrentUser(decoded.userId);

    if (!user) {
      throw new AppError("Unauthorized request", 401);
    }

    req.userId = user.id;
    next();
  } catch (error) {
    // if(error instanceof AppError){
    //   return next(error);
    // }
    next(error);
  }
};
