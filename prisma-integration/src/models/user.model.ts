// This will be a class

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserModel {
  // Create user
  static async createUserModel(userData: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data: userData,
    });
  }

  // update user
  static async updateUserModel(
    userId: number,
    userData: Prisma.UserUpdateInput
  ) {
    return await prisma.user.update({
      where: { id: userId },
      data: userData,
    });
  }

  // delete user
  static async deleteUserModel(userId: number) {
    return await prisma.user.delete({
      where: { id: userId },
    });
  }

  // get user
  static async getUserModel(userId: number) {
    return await prisma.user.findUnique({ where: { id: userId } });
  }

  // get all users
  static async getAllUsers() {
    return await prisma.user.findMany();
  }
}
