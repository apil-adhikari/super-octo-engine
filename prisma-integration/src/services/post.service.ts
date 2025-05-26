import { PostModel } from "../models/post.model";
import { TCreatePostSchema, TUpdatePostSchema } from "../schemas/post.schema";
import {
  CreatePostInputInterface,
  UpdatePostInterface,
} from "../types/post.interface";

export const createPostService = async (postData: TCreatePostSchema) => {
  return await PostModel.createPostModel(postData);
};

export const updatePostService = async (
  postId: number,
  updatedPostData: TUpdatePostSchema
) => {
  return await PostModel.updatePostModel(postId, updatedPostData);
};

export const deletePostService = async (postId: number) => {
  return await PostModel.deletePostModel(postId);
};

export const getPostService = async (postId: number) => {
  return await PostModel.getPostModel(postId);
};

export const getAllPostsService = async () => {
  return await PostModel.getAllPostsModel();
};

// FIXME: Use older functions rather that using arrow function because it
// will create additional memory each type we do requests. like this:
// export function
