import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async.js";
import { success } from "zod";

export const registerUserController = catchAsync(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    res.status(201).json({
      success: true,
      message: "User Created",
    });
  },
);
