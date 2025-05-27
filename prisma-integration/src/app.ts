import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import authRouter from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

export default app;
