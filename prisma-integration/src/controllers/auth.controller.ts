import { Request, Response } from "express";
import {
  loginUserService,
  registerUserService,
} from "../services/auth.service";
import { createUserSchema } from "../schemas/user.schema";
import cookieParser from "cookie-parser";

const register = async (req: Request, res: Response) => {
  try {
    // console.log("In register user controller");
    const data = await registerUserService(req.body);
    console.log(data);
    // console.log(data);
    res
      .cookie("token", data.token, {
        maxAge: 840000,
        httpOnly: true,
        sameSite: true,
      })
      .status(201)
      .json({
        status: "success",
        data,
      });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const data = await loginUserService(req.body);
  } catch (error) {}
};

export default { register, login };
