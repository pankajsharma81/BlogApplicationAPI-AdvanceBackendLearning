import express from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { uploadImagePost } from "../../middlewares/upload.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createPostSchema } from "./post.schema.js";
import { postController } from "./post.controller.js";

const router = express.Router();

router.post(
  "/create",
  authenticate,
  uploadImagePost.single("image"),
  validate(createPostSchema),
  postController,
);

export default router;
