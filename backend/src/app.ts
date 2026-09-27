import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import authRouter from "./modules/auth/auth.route.js"
import postRouter from "./modules/post/post.route.js"
import commentRouter from "./modules/comment/comment.route.js"
import { env } from "./config/config.js"

export const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use(cors({
    origin: env.FRONTEND_URL,
}));

app.get("/health-check", (req: Request, res: Response) => {
    return res.status(200).json({
        success: true,
        message: "Api is working fine!"
    })
});

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/post", postRouter)
app.use("/api/v1/comment", commentRouter)

app.use(globalErrorHandler)
