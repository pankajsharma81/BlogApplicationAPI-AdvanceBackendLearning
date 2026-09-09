import { Response } from "express";

interface sendResponseOptions<T> {
  res: Response;
  statusCode: number;
  message: string;
  data?: T;
}

export const sendResponse = <T>({
  res,
  statusCode,
  message,
  data,
}: sendResponseOptions<T>) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data !== undefined && { data }),
  });
};
