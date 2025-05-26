import express from "express";
import { validateData } from "../middlewares/validation.middleware";
import { createUserSchema } from "../schemas/user.schema";
import authController from "../controllers/auth.controller";

const authRouter = express.Router();

// Main route: register,login,logout
authRouter.post(
  "/register",
  validateData(createUserSchema),
  authController.register
);

export default authRouter;
