import express from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createCommentSchema } from "./comment.schema.js";
import { commentController } from "./comment.controller.js";

const router = express.Router();

router.post(
  "/create-comment",
  authenticate,
  validate(createCommentSchema),
  commentController,
);

export default router;
