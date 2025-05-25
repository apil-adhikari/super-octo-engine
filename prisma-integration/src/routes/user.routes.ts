import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} from "../controllers/user.controller";
import {
  validateData,
  validateParams,
} from "../middlewares/validation.middleware";
import {
  createUserSchema,
  deleteUserSchema,
  getUserSchema,
  updateUserSchema,
} from "../schemas/user.schema";

const userRouter = express.Router();

userRouter
  .route("/")
  .post(validateData(createUserSchema), createUser)
  .get(getAllUsers);
userRouter
  .route("/:id")
  .patch(validateData(updateUserSchema), updateUser)
  .delete(validateParams(deleteUserSchema), deleteUser)
  .get(validateData(getUserSchema), getUser);

export default userRouter;
