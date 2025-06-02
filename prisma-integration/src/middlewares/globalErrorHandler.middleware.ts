import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { StatusCode } from "../constants/StatusCodes";
import { Prisma } from "@prisma/client";
import { AppError } from "../utils/appError";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
): void => {
  console.error("-- In global error handler function --: ", err);

  // Custom AppError
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      status: err.status,
      message: err.message,
    }) as unknown as void;
  }

  // 1) Zod Validation Error
  if (err instanceof ZodError) {
    return res.status(StatusCode.BAD_REQUEST.code).json({
      status: StatusCode.BAD_REQUEST.status,
      message: "Validation error",
      errors: err.errors.map((e) => e.message),
    }) as unknown as void;
  }

  // 2) Prisma Known Request Errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return res.status(StatusCode.CONFLICT.code).json({
          status: StatusCode.CONFLICT.status,
          message: "Unique constraint violation.",
          meta: err.meta,
        }) as unknown as void;

      case "P2025":
        return res.status(StatusCode.NOT_FOUND.code).json({
          status: StatusCode.NOT_FOUND.status,
          message: "Record not found.",
        }) as unknown as void;

      case "P2003":
        return res.status(StatusCode.BAD_REQUEST.code).json({
          status: StatusCode.BAD_REQUEST.status,
          message: "Foreign key constraint failed.",
        }) as unknown as void;

      default:
        console.error("Unhandled Prisma error:", err);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR.code).json({
          status: StatusCode.INTERNAL_SERVER_ERROR.status,
          message: "Database error occurred.",
        }) as unknown as void;
    }
  }

  // 3) Fallback for any other error
  return res.status(StatusCode.INTERNAL_SERVER_ERROR.code).json({
    status: "error",
    fallback: true,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  }) as unknown as void;
};
