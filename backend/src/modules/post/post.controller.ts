import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async.js";
import { postService } from "./post.container.js";
import { AppError } from "../../utils/app-error.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const postController = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.userId;

    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const result = await postService.createPost(req.body, userId, req.file);

    sendResponse ({
      res,
      statusCode: 201,
      message: "Post Created Successfully",
      data: result,
    });
  },
);
