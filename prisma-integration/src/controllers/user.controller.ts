import { Request, Response } from "express";
import {
  CreateUserInput,
  CreateUserRequest,
  UpdateUserInput,
} from "../types/user.interface";
import {
  createUserService,
  deleteUserService,
  getUserService,
  updateUserService,
} from "../services/user.service";

export const createUser = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  try {
    console.log("In createUser Controller");
    // call user servicesr
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
    // the fields to be updated
    const { email, name } = req.body;
    const user = await updateUserService(parseInt(req.params.id), {
      email,
      name,
    });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating user" });
  }
};

// DELETE USER
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const data = await deleteUserService(userId);

    res.status(204).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

// GET USER
export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
    const data = await getUserService(userId);
    // if (!data) {
    //   return res.status(404).json({
    //     status: "fail",
    //     message: "User not found",
    //   });
    // }

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error getting user" });
  }
};
