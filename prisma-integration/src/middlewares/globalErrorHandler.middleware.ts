import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { StatusCode } from "../constants/StatusCodes";
import { Prisma } from "@prisma/client";

// GLOBAL ERROR HANDLER FUNCTION
export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("-- In global error handler function --: ", err);
  //   res.status(500).json({
  //     status: "error",
  //     message: err || "Internal Server Error",
  //   });

  //   Handle Errors:
  //   1) Custom Error
  //   if (err instanceof AppError) {
  //     // Data that come from AppError class
  //     const { statusCode, status, message } = err;

  //     res.status(statusCode).json({
  //       status,
  //       message: message,
  //     });
  //   }

  //   ---------------------------------//
  //   1) Zod Error
  if (err instanceof ZodError) {
    res.status(StatusCode.BAD_REQUEST.code).json({
      status: StatusCode.BAD_REQUEST.status,
      message: "Validation Failed",
      err: err.message,
    });
  }

  //  2) Prisma Error:
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      res.status(StatusCode.BAD_REQUEST.code).json({
        status: StatusCode.BAD_REQUEST.status,
        message: err,
      });
    }

    // res.status(StatusCode.INTERNAL_SERVER_ERROR.code).json({
    //   status: StatusCode.INTERNAL_SERVER_ERROR.status,
    //   message: "Internal Server Error",
    // });

    next();
  }

  res.status(StatusCode.BAD_REQUEST.code).json({
    status: StatusCode.BAD_REQUEST.status,
    message: err,
  });
};
