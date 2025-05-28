// import { NextFunction, Request, Response } from "express";
// import {
//   loginUserService,
//   registerUserService,
// } from "../services/auth.service";
// import cookieParser from "cookie-parser";
// import { StatusCode } from "../constants/StatusCodes";

// import { NextFunction, Request, Response } from "express";
// import { TCreateUserInput } from "../schemas/user.schema";
// import { registerUserService } from "../services/auth.service";

// const register = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const data = await registerUserService(req.body);
//     console.log("---AUTH CONTROLLER: REGISTER data---\n", data);

//     res.status(201).json({
//       status: "success",
//       data,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await loginUserService(req.body);
    console.log(data);

    if (!data) {
      throw new Error("Invalid credentials");
    }

    console.log("data in controller after returning from service: ", data);
    res
      // .cookie("token", data?.token, {
      //   httpOnly: true,
      //   maxAge: 840000,
      //   sameSite: true,
      // })
      .status(200)
      .json({
        status: "success",
        data: data,
      });
  } catch (error) {
    next(error);
  }
};

// export default { register, login };

// -------------------------------------------------------------------------------------------------------------//

import { NextFunction, Request, Response } from "express";
import { TCreateUserInput } from "../schemas/user.schema";
import {
  loginUserService,
  registerUserService,
} from "../services/auth.service";
import { StatusCode } from "../constants/StatusCodes";

// REGISTER CONTROLLER:
export async function register(
  req: Request<{}, {}, TCreateUserInput>,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await registerUserService(req.body);
    console.log("---AUTH CONTROLLER: REGISTER data---\n", data);

    res.status(StatusCode.CREATED.code).json({
      status: StatusCode.CREATED.status,
      data,
    });
  } catch (error) {
    console.log("error in auth: ", error);
    next(error);
  }
}
