import express from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { uploadImagePost } from "../../middlewares/upload.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createPostSchema, getPostsSchema, updatePostSchema } from "./post.schema.js";
import { deletePostcontroller, getPostsController, postController, updatePostController } from "./post.controller.js";

const router = express.Router();

router.post(
  "/create",
  authenticate,
  uploadImagePost.single("image"),
  validate(createPostSchema),
  postController,
);

router.get(
  "/get-post",
  authenticate,
  getPostsController
)

router.patch(
  "/:postId",
  authenticate,
  validate(updatePostSchema),
  updatePostController
)

router.delete(
  "/:postId",
  authenticate,
  deletePostcontroller
)

export default router;
