import express from "express";
import { validateData } from "../middlewares/validation.middleware";
import { createUserSchema, userLoginSchema } from "../schemas/user.schema";
import authController from "../controllers/auth.controller";

const authRouter = express.Router();

// Main route: register,login,logout
authRouter.post(
  "/register",
  validateData(createUserSchema),
  authController.register
);

authRouter.post("/login", validateData(userLoginSchema), authController.login);

export default authRouter;
