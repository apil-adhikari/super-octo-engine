import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller";

const postRouter = express.Router();
postRouter.route("/").post(createPost);
postRouter.route("/:id").patch(updatePost).delete(deletePost);

export default postRouter;
