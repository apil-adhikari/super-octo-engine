import { Prisma, PrismaClient } from "@prisma/client";
import { CreateUserInput } from "../types/user.interface";

const prisma = new PrismaClient();

class AuthModel {
  // register user
  static async registerUserModel(userData: Prisma.UserCreateInput) {
    // console.log("In register model", userData);
    return await prisma.user.create({
      data: userData,
      // We should not send the password in response
      omit: {
        password: true,
      },
    });
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
