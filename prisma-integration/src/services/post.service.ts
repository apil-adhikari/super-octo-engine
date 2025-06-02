import { PostModel } from "../models/post.model";
import { TCreatePostInput, TUpdatePostInput } from "../schemas/post.schema";
import {
  CreatePostInputInterface,
  UpdatePostInterface,
} from "../types/post.interface";

export const createPostService = async (postData: TCreatePostInput) => {
  return await PostModel.createPostModel(postData);
};

export const updatePostService = async (
  postId: number,
  updatePostData: TUpdatePostInput
) => {
  const data = await PostModel.updatePostModel(postId, updatePostData);
  return data;
};

export const deletePostService = async (postId: number, userId: number) => {
  return await PostModel.deletePostModel(postId, userId);
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
