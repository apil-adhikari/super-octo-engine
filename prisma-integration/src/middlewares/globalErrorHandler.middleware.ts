import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { StatusCode } from "../constants/StatusCodes";
import { Prisma } from "@prisma/client";
import { AppError } from "../utils/appError";

export const globalErrorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("-- In global error handler function --: ", err);

  // Custom Error Message:
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      status: err.status,
      message: err.message,
    });
  }

  // 1) Zod Validation Error
  if (err instanceof ZodError) {
    res.status(StatusCode.BAD_REQUEST.code).json({
      status: StatusCode.BAD_REQUEST.status,
      message: err,
      errors: err.errors.map((e) => e.message),
    });
    return; // just return void after sending response
  }

  // 2) Prisma Known Request Errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002": // Unique constraint violation
        res.status(StatusCode.CONFLICT.code).json({
          status: StatusCode.CONFLICT.status,
          message: "Unique constraint violation.",
          meta: err.meta,
        });
        return;

      case "P2025": // Record not found
        res.status(StatusCode.NOT_FOUND.code).json({
          status: StatusCode.NOT_FOUND.status,
          message: "Record not found.",
        });
        return;

      case "P2003": // Foreign key constraint failed
        res.status(StatusCode.BAD_REQUEST.code).json({
          status: StatusCode.BAD_REQUEST.status,
          message: "Foreign key constraint failed.",
        });
        return;

      default:
        console.error("Unhandled Prisma error:", err);
        res.status(StatusCode.INTERNAL_SERVER_ERROR.code).json({
          status: StatusCode.INTERNAL_SERVER_ERROR.status,
          message: "Database error occurred.",
        });
        return;
    }
  }

  // 3) Fallback for any other error
  res.status(StatusCode.INTERNAL_SERVER_ERROR.code).json({
    status: "error",
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
