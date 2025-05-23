import { Request, Response } from "express";
import {
  CreateUserInput,
  CreateUserRequest,
  UpdateUserInput,
} from "../types/user.interface";
import { createUserService, updateUserService } from "../services/user.service";

export const createUser = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  try {
    console.log("In createUser Controller");
    // call user services
    const data = await createUserService(req.body);
    console.log(data);
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateUser = async (
  req: Request<{ id: string }, {}, UpdateUserInput>,
  res: Response
) => {
  try {
    const user = await updateUserService(parseInt(req.params.id), req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error updating user" });
  }
};
