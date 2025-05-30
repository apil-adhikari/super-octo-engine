import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PostModel {
  static async createPostModel(postData: Prisma.PostUncheckedCreateInput) {
    return await prisma.post.create({
      data: postData,
    });
  }

  static async updatePostModel(
    postId: number,
    updatePostData: Prisma.PostUncheckedUpdateInput
  ) {
    // Check for existing post
    const existingPost = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    // If no post found, throw error
    if (!existingPost) {
      console.log("No post found");
      throw new Error(`No post found with id ${postId}.`);
    }

    // Check if the user trying to update the post is the author of the post
    // console.log("author trying to update: ", typeof updatePostData.authorId);
    // console.log("Actual Author: ", typeof existingPost.authorId);
    // console.log(updatePostData);

    // Check if the author of the post in db matches the user trying to update it
    if (existingPost.authorId != updatePostData.authorId) {
      throw new Error(
        "You are not the owner/author of this post. You cannot update this post"
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
      throw new Error(`No post found with id of ${postId} to delete.`);
    }

    console.log(existingPost.authorId);
    console.log(userId);

    // Check if the user trying to delete the post is the author of the post
    if (existingPost.authorId !== userId) {
      throw new Error(
        "Unauthorized. You are not the owner of this post. So, you cannot delete this post."
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
    return await prisma.post.findUnique({ where: { id: postId } });
  }

  // get all posts model
  static async getAllPostsModel() {
    return await prisma.post.findMany();
  }
}
