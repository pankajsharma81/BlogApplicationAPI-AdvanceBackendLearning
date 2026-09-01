import { NextFunction, Request, Response } from "express";
import { NODE_ENV } from "../config/config.js";
import { AppError } from "../utils/app-error.js";

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    
    // Development
    if(NODE_ENV === "development"){
        return res.status(err instanceof AppError ? err.statusCode : 500).json({
            success: false,
            status: err instanceof AppError ? err.status : "error",
            message: err.message,
            details: err instanceof AppError ? err.details : undefined,
            stack: err.stack,
        })
    }

    // Production
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            status: err.status,
            message: err.message,
            details: err.details,
        });
    }

    // Unknown error in production
    console.error(err)

    return res.status(500).json({
        success: false,
        status: "error",
        message: "Something went wrong"
    });
};
