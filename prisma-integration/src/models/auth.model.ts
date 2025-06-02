import { Prisma, PrismaClient, User } from "@prisma/client";
import { CreateUserInput } from "../types/user.interface";
import { AppError } from "../utils/appError";
import { StatusCode } from "../constants/StatusCodes";

const prisma = new PrismaClient();

class AuthModel {
  // register user
  static async registerUserModel(userData: Prisma.UserCreateInput) {
    // ONLY DO DB OPERATION HERE:

    // Check if the user exists with the email address:
    // const existingUser = await prisma.user.findUnique({
    //   where: {
    //     email: userData.email,
    //   },
    // });

    // if (existingUser) {
    //   throw new AppError(
    //     "User already exists with that email address. Please use different email or login",
    //     StatusCode.CONFLICT.code
    //   );
    // }

    const newUser = await prisma.user.create({
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
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
      throw new AppError(
        "Invalid credentials(no user found)",
        StatusCode.UNAUTHORIZED.code
      );
    }

    return existingUser;
  }
}

export default AuthModel;
