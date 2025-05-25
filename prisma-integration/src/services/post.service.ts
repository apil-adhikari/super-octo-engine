import { PostModel } from "../models/post.model";
import {
  CreatePostInputInterface,
  UpdatePostInterface,
} from "../types/post.interface";

export const createPostService = async (postData: CreatePostInputInterface) => {
  return await PostModel.createPostModel(postData);
};

export const updatePostService = async (
  postId: number,
  updatedPostData: UpdatePostInterface
) => {
  return await PostModel.updatePostModel(postId, updatedPostData);
};

export const deletePostService = async (postId: number) => {
  return await PostModel.deletePostModel(postId);
};
