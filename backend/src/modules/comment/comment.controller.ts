import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async.js";
import { commentService } from "./comment.container.js";
import { sendResponse } from "../../utils/sendResponse.js";

export const commentController = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.userId;

    const result = await commentService.createComment(userId!, req.body);

    sendResponse({
      res,
      statusCode: 201,
      message: "Comment Created Successfully",
      data: result,
    });
  },
);
