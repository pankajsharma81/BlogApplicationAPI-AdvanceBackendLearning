import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async.js";
import { postService } from "./post.container.js";
import { AppError } from "../../utils/app-error.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { GetPostsDTO } from "./post.schema.js";

export const postController = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.userId;

    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    const result = await postService.createPost(req.body, userId, req.file);

    sendResponse({
      res,
      statusCode: 201,
      message: "Post Created Successfully",
      data: result,
    });
  },
);

export const getPostsController = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;

    const data: GetPostsDTO = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    };

    const result = await postService.getPosts(userId, data);

    sendResponse({
      res,
      statusCode: 200,
      message: "Posts fetched Successfully",
      data: result,
    });
  },
);

export const updatePostController = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;
    const postId = req.params.postId as string;

    const result = await postService.updatePost(userId, postId, req.body);

    sendResponse({
      res,
      statusCode: 200,
      message: "Post updated Successfully",
      data: result,
    });
  },
);

export const deletePostcontroller = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.userId as string;
    const postId = req.params.postId as string;

    const result = await postService.deletePost(userId, postId);

    sendResponse({
      res,
      statusCode: 200,
      message: "Post deleted Successfully",
    });
  },
);

export const getAllPostsController = catchAsync(
  async (req: Request, res: Response) => {
    const data: GetPostsDTO = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    };

    const result = await postService.getAllPosts(data);

    sendResponse({
      res,
      statusCode: 200,
      message: "All Posts fetched Successfully",
      data: result,
    });
  },
);
