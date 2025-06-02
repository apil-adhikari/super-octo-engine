import { StatusEnum } from "../constants/StatusCodes";

// inheriting from AppError from Error class
export class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    console.log(statusCode);

    this.status = `${statusCode}`.startsWith("4")
      ? StatusEnum.FAIL
      : StatusEnum.ERROR;
    this.isOperational = true;

    console.log(this.status);

    // Printing in stack trace(only on development)
    Error.captureStackTrace(this, this.constructor);
  }
}
