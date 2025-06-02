import { NextFunction, Request, Response } from "express";
import {
  CreateUserInput,
  CreateUserRequest,
  UpdateUserInput,
} from "../types/user.interface";
import {
  createUserService,
  deleteUserService,
  getAllUsersService,
  getUserService,
  updateUserService,
} from "../services/user.service";
import { createUserSchema } from "../schemas/user.schema";

// export const createUser = async (
//   req: Request<{}, {}, CreateUserInput>,
//   res: Response
// ) => {
//   try {
//     console.log("In createUser Controller");
//     // call user servicesr
//     const data = await createUserService(req.body);
//     console.log(data);
//     res.status(200).json({
//       status: "success",
//       data,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };
// -------------------------------------------------------------- //
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: Difference between .parse and .safeParse
    const parsedInput = createUserSchema.parse(req.body);
    const data = await createUserService(parsedInput);

    console.log(data);
    res.status(201).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
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

// GET ALL USERS
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const data = await getAllUsersService();

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: "Error getting users" });
  }
};
