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
import { protect } from "../middlewares/protect.middleware";

const postRouter = express.Router();
// postRouter.route("/").post(createPost).get(getAllPosts);
// postRouter.route("/:id").patch(updatePost).delete(deletePost).get(getPost);

postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPost);

postRouter.post("/", protect, validateData(createPostSchema), createPost);
postRouter.patch("/:id", protect, validateData(updatePostSchema), updatePost);
postRouter.delete("/:id", protect, deletePost);

export default postRouter;
