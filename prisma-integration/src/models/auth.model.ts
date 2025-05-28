import { Prisma, PrismaClient } from "@prisma/client";
import { CreateUserInput } from "../types/user.interface";

const prisma = new PrismaClient();

class AuthModel {
  // register user
  static async registerUserModel(userData: Prisma.UserCreateInput) {
    try {
      const newUser = await prisma.user.create({
        data: userData,
        omit: {
          password: true,
        },
      });

      if (!newUser) {
      }
    } catch (error) {}
  }

  // where UserWhereUniqueInput checks for unique input like for id or email
  static async loginUserModel(userData: Prisma.UserWhereUniqueInput) {
    return await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });
  }
}

export default AuthModel;
