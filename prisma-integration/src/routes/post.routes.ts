import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
} from "../controllers/post.controller";
import { validateData } from "../middlewares/validation.middleware";
import {
  createPostSchema,
  postResponseSchema,
  updatePostSchema,
} from "../schemas/post.schema";

const postRouter = express.Router();
// postRouter.route("/").post(createPost).get(getAllPosts);
// postRouter.route("/:id").patch(updatePost).delete(deletePost).get(getPost);

postRouter.get("/", getAllPosts);
postRouter.post("/", validateData(createPostSchema), createPost);
postRouter.get("/:id", getPost);
postRouter.patch("/:id", validateData(updatePostSchema), updatePost);
postRouter.delete("/:id", deletePost);

export default postRouter;
