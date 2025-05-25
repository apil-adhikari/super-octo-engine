import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.route("/").post(createUser).get(getAllUsers);
userRouter.route("/:id").patch(updateUser).delete(deleteUser).get(getUser);

export default userRouter;
