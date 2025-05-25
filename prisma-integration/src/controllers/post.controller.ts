import { Request, response, Response } from "express";
import {
  CreatePostInputInterface,
  UpdatePostInterface,
} from "../types/post.interface";
import {
  createPostService,
  deletePostService,
  updatePostService,
} from "../services/post.service";

export const createPost = async (
  req: Request<{}, {}, CreatePostInputInterface>,
  res: Response
) => {
  try {
    const data = await createPostService(req.body);
    console.log(data);

    res.status(201).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
};

export const updatePost = async (
  req: Request<{ id: string }, {}, UpdatePostInterface>,
  res: Response
) => {
  try {
    console.log("HERE at updatePost");
    const postId = parseInt(req.params.id);
    const { title, description, content, status } = req.body;
    const data = await updatePostService(postId, {
      title,
      description,
      content,
      status,
    });

    console.log(data);
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
};

export const deletePost = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  try {
    const postId = parseInt(req.params.id);
    const data = await deletePostService(postId);
    res.status(204).json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
};
