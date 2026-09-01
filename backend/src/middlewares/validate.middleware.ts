import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { AppError } from "../utils/app-error.js";
import { StatusCodes } from "http-status-codes";

export const validate = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if(!result.success) {
            const errors = result.error.issues.map((issue)=>({
                field: issue.path.join("."),
                message: issue.message
            }));
            
            return next(new AppError("Request Validation Failed", StatusCodes.BAD_REQUEST, errors));
        }

        req.body = result.data
        next();
    }
}
