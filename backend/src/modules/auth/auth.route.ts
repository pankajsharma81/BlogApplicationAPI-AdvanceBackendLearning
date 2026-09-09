import express from "express";
import {
  loginUserController,
  refreshTokenController,
  registerUserController,
} from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { loginUserSchema, refreshTokenSchema, registerUserSchema } from "./auth.schema.js";

const router = express.Router();

router.post("/register", validate(registerUserSchema), registerUserController);

router.post("/login", validate(loginUserSchema), loginUserController);

router.post("/refresh", validate(refreshTokenSchema), refreshTokenController )

export default router;
