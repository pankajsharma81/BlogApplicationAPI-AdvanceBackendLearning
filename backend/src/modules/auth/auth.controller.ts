import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async.js";
import { authService } from "./auth.service.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { LoginResponse, RegisterResponse } from "./auth.response.js";
import { AppError } from "../../utils/app-error.js";

export const registerUserController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.registerUser(req.body);

    sendResponse<RegisterResponse>({
      res,
      statusCode: 201,
      message: "User Created Successfully",
      data: result,
    });
  },
);

export const loginUserController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.loginUser(req.body);

    sendResponse<LoginResponse>({
      res,
      statusCode: 200,
      message: "User loggedIn Successfully",
      data: result,
    });
  },
);

export const refreshTokenController = catchAsync(
  async(req: Request, res: Response) => {
    const result = await authService.refreshToken(req.body)

    sendResponse({
      res,
      statusCode: 200,
      message: "Access token refreshed successfully",
      data: result
    });
  }
)

export const getCurrentUserController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.getCurrentUser(req?.userId as string);

    sendResponse({
      res,
      statusCode: 200,
      message: "User details fetched Successfully",
      data: result
    })
  }
)

export const logoutController = catchAsync(
  async (req: Request, res: Response) => {

    const {refreshToken} = req.body;

    const result = await authService.logout(refreshToken);

    sendResponse({
      res,
      statusCode: 200,
      message: "User logged out Successfully",
      data: result
    })
  }
)

export const logoutAllController = catchAsync (
  async (req: Request, res: Response) => {
    const result = await authService.logoutAll(req?.userId as string);

    sendResponse( {
      res,
      statusCode:200,
      message: "All user logged out Successfully",
      data: result
    })
  }
)