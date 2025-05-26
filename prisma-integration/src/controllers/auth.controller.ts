import { Request, Response } from "express";
import { registerUserService } from "../services/auth.service";
import { createUserSchema } from "../schemas/user.schema";

const register = async (req: Request, res: Response) => {
  try {
    // console.log("In register user controller");
    const data = await registerUserService(req.body);
    console.log(data);
    // console.log(data);
    res.cookie("token", data.token).status(201).json({
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

export default { register };
