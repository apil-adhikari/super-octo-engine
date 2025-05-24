// This will be a class

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserModel {
  static async createUserModel(userData: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data: userData,
    });
  }

  static async updateUserModel(
    userId: number,
    userData: Prisma.UserUpdateInput
  ) {
    return await prisma.user.update({
      where: { id: userId },
      data: userData,
    });
  }
}
