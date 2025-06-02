import { z, ZodSchema } from "zod";

import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "./protect.middleware";

/* TO VALIDATE FIRST USING ZOD
    1) Body
    2) Query
    3) Params
*/

// We can create unified schema type for validating body, params and query
// export const validateRequest = (schema: ZodSchema) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     try {
//       // we need to validate all parts of the request
//       const result = schema.parse({
//         body: req.body,
//         params: req.params,
//         query: req.query,
//       });

//       // we can alos attach the validated data back to the request
//       req.body = result.body;
//       req.params = result.params;
//       req.query = result.query;
//     } catch (error) {}
//   };
// };

// Since we are accepting the schema we need to use ZodSchema in the schema type

export const validateData = (schema: ZodSchema) => {
  // console.log("validating");
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    console.log("test");
    try {
      console.log("In validate Date Middleware", req.body);

      const updatedBodyData = {
        ...req.body,
        authorId: req.user?.id,
      };

      schema.parse(updatedBodyData);
      console.log("validated");
      next();
    } catch (error) {
      console.log(error);
      next(error);
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
      console.log("Error in validate params middleware: ", error);
      next(error); // passing error to error handler middleware
    }
  };
};

export const validateQuery = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("In validate query middleware", req.query);
      schema.parse(req.query);
      next();
    } catch (error) {
      console.log(error);
    }
  };
};
