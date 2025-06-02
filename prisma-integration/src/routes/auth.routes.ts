import express from "express";
import { validateData } from "../middlewares/validation.middleware";
import { createUserSchema, userLoginSchema } from "../schemas/user.schema";
import { login, logout, register } from "../controllers/auth.controller";
import upload from "../middlewares/multer.middleware";
import { uploadToCloudinary } from "../middlewares/uploadToCloudinary.middleware";

const authRouter = express.Router();

// Main route: register,login,logout
authRouter.post(
  "/register",
  upload.single("profilePicture"),
  uploadToCloudinary,
  validateData(createUserSchema),
  register
);

authRouter.post(
  "/login",

  validateData(userLoginSchema),
  login
);
authRouter.post("/logout", logout);

export default authRouter;
