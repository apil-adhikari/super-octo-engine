import { Prisma, PrismaClient, User } from "@prisma/client";
import { CreateUserInput } from "../types/user.interface";

const prisma = new PrismaClient();

class AuthModel {
  // register user
  static async registerUserModel(userData: Prisma.UserCreateInput) {
    const newUser = await prisma.user.create({
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return newUser;
  }

  // where UserWhereUniqueInput checks for unique input like for id or email
  static async loginUserModel(userData: Prisma.UserWhereUniqueInput) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });
    console.log("Login Model: user data: ", existingUser);

    // If we dont find the user using the email address we give an error
    if (!existingUser) {
      throw new Error("Invalid credentials , no user found");
    }

    return existingUser;
  }
}

export default AuthModel;
