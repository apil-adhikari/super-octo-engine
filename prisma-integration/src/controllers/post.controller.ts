import { NextFunction, Request, response, Response } from "express";
import {
  CreatePostInputInterface,
  UpdatePostInterface,
} from "../types/post.interface";

import { AuthRequest } from "../middlewares/protect.middleware";

import {
  createPostService,
  deletePostService,
  getAllPostsService,
  getPostService,
  updatePostService,
} from "../services/post.service";
import { StatusCode } from "../constants/StatusCodes";

export const createPost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("In create post: ", req.user?.id);
    const data = await createPostService({
      ...req.body,
      authorId: req.user?.id,
      coverImage: req.file?.filename,
    });

    res.status(StatusCode.CREATED.code).json({
      statusCode: StatusCode.CREATED.code,
      status: StatusCode.CREATED.status,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("POST UPDATE");
    const postId = parseInt(req.params.id); // post to update

    // Data to be updated(selective data)
    const { title, description, content, status } = req.body;

    const data = await updatePostService(postId, {
      title,
      description,
      content,
      status,
      authorId: req.user?.id, // we need to get the logged
      coverImage: req.file?.filename,
    });

    res.status(StatusCode.ACCEPTED.code).json({
      StatusCode: StatusCode.ACCEPTED.code,
      status: StatusCode.ACCEPTED.status,
      data,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deletePost = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Logged in user: ", req.user?.id);
    if (!req.user?.id) {
      throw new Error("Unauthorized");
    }

    const userId = req.user.id;

    const postId: number = parseInt(req.params.id);

    const data = await deletePostService(postId, userId);

    res.status(StatusCode.DELETED.code).json({
      statusCode: StatusCode.DELETED.code,
      status: StatusCode.DELETED.status,
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL POSTS
export const getPost = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const postId = parseInt(req.params.id);
    const data = await getPostService(postId);
    console.log(data);

    res.status(200).json({
      statusCode: StatusCode.OK.code,
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await getAllPostsService();
    console.log(data);

    res.status(200).json({
      total: `${data.length} posts found`,
      statusCode: StatusCode.OK.code,
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};
