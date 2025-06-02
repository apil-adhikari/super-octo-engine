import { Prisma, PrismaClient } from "@prisma/client";
import { AppError } from "../utils/appError";
import { StatusCode } from "../constants/StatusCodes";

const prisma = new PrismaClient();

export class PostModel {
  // Check for existing post❌ -> this to the service layer -> no trycatch or throwing errors

  static async createPostModel(postData: Prisma.PostUncheckedCreateInput) {
    return await prisma.post.create({
      data: postData,
    });
  }

  static async updatePostModel(
    postId: number,
    updatePostData: Prisma.PostUncheckedUpdateInput
  ) {
    // Check for existing post❌ -> this to the service layer
    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    // If no post found, throw error
    if (!existingPost) {
      console.log("No post found");
      throw new AppError(
        `No post found with id ${postId}.`,
        StatusCode.NOT_FOUND.code
      );
    }

    // Check if the user trying to update the post is the author of the post
    // console.log("author trying to update: ", updatePostData.authorId);
    // console.log("Actual Author: ", existingPost.authorId);
    // console.log(updatePostData);

    // Check if the author of the post in db matches the user trying to update it
    if (existingPost.authorId != updatePostData.authorId) {
      throw new AppError(
        "You are not the owner or author of this post. You cannot update this post",
        StatusCode.FORBIDDEN.code
      );
    }

    // else we update the post data
    return await prisma.post.update({
      where: { id: postId },
      data: updatePostData,
    });
  }

  static async deletePostModel(postId: number, userId: number) {
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      throw new AppError(
        `No post found with id of ${postId} to delete.`,
        StatusCode.NOT_FOUND.code
      );
    }

    console.log(existingPost.authorId);
    console.log(userId);

    // Check if the user trying to delete the post is the author of the post
    if (existingPost.authorId !== userId) {
      throw new AppError(
        "Unauthorized. You are not the owner of this post. So, you cannot delete this post.",
        StatusCode.FORBIDDEN.code
      );
    }

    // Finally, delete the post
    return await prisma.post.delete({
      where: {
        id: existingPost.id,
      },
    });
  }

  // get post model
  static async getPostModel(postId: number) {
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      throw new AppError(
        `No post found with the id of ${postId}`,
        StatusCode.NOT_FOUND.code
      );
    }

    return existingPost;
  }

  // get all posts model
  static async getAllPostsModel() {
    return await prisma.post.findMany();
  }
}
