import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.route("/").post(createUser);
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

export default userRouter;
