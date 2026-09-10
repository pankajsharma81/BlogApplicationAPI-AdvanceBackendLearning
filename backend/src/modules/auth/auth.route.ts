import express from "express";
import {
  getCurrentUserController,
  loginUserController,
  refreshTokenController,
  registerUserController,
} from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { loginUserSchema, refreshTokenSchema, registerUserSchema } from "./auth.schema.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", validate(registerUserSchema), registerUserController);

router.post("/login", validate(loginUserSchema), loginUserController);

router.post("/refresh", validate(refreshTokenSchema), refreshTokenController )

router.get("/me", authenticate, getCurrentUserController)

export default router;
