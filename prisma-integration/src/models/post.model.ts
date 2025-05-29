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
    updatedPostData: Prisma.PostUpdateInput
  ) {
    return await prisma.post.update({
      where: { id: postId },
      data: updatedPostData,
    });
  }

  static async deletePostModel(postId: number) {
    return await prisma.post.delete({ where: { id: postId } });
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
