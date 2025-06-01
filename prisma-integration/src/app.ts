import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import authRouter from "./routes/auth.routes";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.middleware";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

// Global Error Handling
app.use(globalErrorHandler);

export default app;
