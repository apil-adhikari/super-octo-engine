import { NextFunction, Request, Response } from "express";
import { TCreateUserInput } from "../schemas/user.schema";
import {
  loginUserService,
  registerUserService,
} from "../services/auth.service";
import { StatusCode } from "../constants/StatusCodes";

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
      .cookie("token", data?.token, {
        httpOnly: true,
        maxAge: 840000,
        sameSite: true,
      })
      .status(200)
      .json({
        statusCode: StatusCode.OK.code,
        status: "success",
        data,
      });
  } catch (error) {
    next(error);
  }
};
// REGISTER CONTROLLER:
export async function register(
  req: Request<{}, {}, TCreateUserInput>,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await registerUserService({
      ...req.body,
      profilePicture: req.file?.filename,
    });
    console.log("---AUTH CONTROLLER: REGISTER data---\n", data);

    res.status(StatusCode.CREATED.code).json({
      statusCode: StatusCode.CREATED.code,
      status: StatusCode.CREATED.status,
      data,
    });
  } catch (error) {
    console.log("error in auth: ", error);
    next(error);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    const data = res.cookie("token", "loggedout", {
      httpOnly: true,
      sameSite: true,
    });
  } catch (error) {}
}
