import { NextFunction, Request, Response } from "express";
import { exit } from "process";
import { z } from "zod/v4";
import { ZodError } from "zod/v4";

/* TO VALIDATE FIRST USING ZOD
    1) Body
    2) Query
    3) Params
*/

export const validateData = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("In validate Date Middleware", req.body);
      schema.parse(req.body);
      next();
      console.log("validated");
    } catch (error) {
      console.log(error);
    }
  };
};

export const validateParams = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("In validate params middleware", req.params);
      //   console.log(req.params);
      schema.parse(req.params);
      next();
    } catch (error) {
      console.log(error);
    }
  };
};

export const validateQuery = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("In validate query middleware", requestAnimationFrame);
      schema.parse(req.query);
      next();
    } catch (error) {
      console.log(error);
    }
  };
};
