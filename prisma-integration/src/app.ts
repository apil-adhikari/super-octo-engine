import express, { Request, Response } from "express";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

export default app;
