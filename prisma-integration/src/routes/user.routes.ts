import express from "express";
import { createUser, updateUser } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.route("/").post(createUser);
userRouter.route("/:id").patch(updateUser);

export default userRouter;
