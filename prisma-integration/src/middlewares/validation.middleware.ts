import { z, ZodSchema } from "zod";

import { NextFunction, Request, Response } from "express";

/* TO VALIDATE FIRST USING ZOD
    1) Body
    2) Query
    3) Params
*/

// Sinc we are accepting the schema we need to use ZodSchema in the schema type

export const validateData = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("In validate Date Middleware", req.body);
      schema.parse(req.body);
      console.log("validated");
      next();
    } catch (error) {
      console.log(error);
    }
  };
};

export const validateParams = (schema: z.ZodSchema) => {
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

export const validateQuery = (schema: z.ZodSchema) => {
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
