import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
} from "../controllers/post.controller";

const postRouter = express.Router();
postRouter.route("/").post(createPost).get(getAllPosts);
postRouter.route("/:id").patch(updatePost).delete(deletePost).get(getPost);

export default postRouter;
