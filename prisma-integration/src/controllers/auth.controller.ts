import { NextFunction, Request, Response } from "express";
import {
  loginUserService,
  registerUserService,
} from "../services/auth.service";
import { createUserSchema } from "../schemas/user.schema";
import cookieParser from "cookie-parser";
import { StatusCode } from "../constants/StatusCodes";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await registerUserService(req.body);
    console.log("---AUTH CONTROLLER: REGISTER data---\n", data);

    res.status(201).json({
      status: "success",
      data,
    });
  } catch (error) {
    // TODO: handle this in global error handler instead of using the catch async function
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw Error("check");
    const data = await loginUserService(req.body);

    console.log(data);

    if (!data) {
      next("Invalid credentials");
    }

    // if (!data) {
    //   res.status(StatusCode.NOT_FOUND.code).json({
    //     status: StatusCode.NOT_FOUND.status,
    //     message: "Invalid Credintials",
    //   });
    // }

    console.log("data in controller after returning from service: ", data);
    res
      .cookie("token", data?.token, {
        httpOnly: true,
        maxAge: 840000,
        sameSite: true,
      })
      .status(200)
      .json({
        status: "success",
        data: data,
      });
  } catch (error) {
    next(error);
  }
};

export default { register, login };
