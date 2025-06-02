// import { NextFunction, Request, Response } from "express";

// // Higher Order Function
// // Higher-order functions are functions that operate on other functions. They either take one or more functions as arguments or return a function as their result. Essentially, they treat functions as data, making them a powerful tool in functional programming

// // It is a function that wraps async functions and forwards errors to Express error handler
// export const catchAsyncError = (
//   fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
// ) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     fn(req, res, next).catch(next);
//   };
// };
