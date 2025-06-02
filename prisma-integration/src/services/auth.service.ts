import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import AuthModel from "../models/auth.model";
import {
  TCreateUserInput,
  TUserLoginInput,
  TUserParam,
} from "../schemas/user.schema";
import generateToken from "../utils/generateToken";
import { Prisma, User } from "@prisma/client";
import { AppError } from "../utils/appError";
import { StatusCode } from "../constants/StatusCodes";
import { error } from "console";
import { ZodError } from "zod";

// Hash Password before creating a user
async function hashPassword(plainPassword: string) {
  return bcrypt.hash(plainPassword, 12);
}

export async function registerUserService(userData: TCreateUserInput) {
  try {
    // HASH PASSWORD
    const hashedPassword = await hashPassword(userData.password);

    // CALL THE MODEL
    const user = await AuthModel.registerUserModel({
      ...userData,
      password: hashedPassword,
    });

    /*
    user -> ✅
    user -> ❌ -> throw error based on the conditions:
    1) not unique email adddress -> unique constration volilation
    2) Invalid email address -> prisma throws errors -> we need to use that errors here in service level
    3) Invalid password -> prisma throws errors ->

  */

    // if (!user) {
    //   throw new Error("Could not create user");
    // }

    const token = generateToken(user.id);

    const response = {
      user,
      token,
    };

    return response;
  } catch (error) {
    // We need to identify errors and handle them gracefully: REFERENCE: https://www.npmjs.com/package/prisma-better-errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      /* CODES: 
      P2002	Unique constraint failed	409 ✅
      P2006	The provided value for the field is not valid	400 ✅ -> sent by zod
      */

      if (error.code === "P2002") {
        throw new AppError("User already exists with that email address", 409);
      }
    }
  }

  // ZOD ERROR
  // if (error instanceof ZodError) {
  //   new AppError(error.message, 400);
  // }
}

export async function loginUserService(userCredinitials: TUserLoginInput) {
  const data = await AuthModel.loginUserModel(userCredinitials);

  // if the data comes (ie. we found the user with email address, we check for the password)
  // if (!data) {
  //   console.log(data);
  // }

  // Check if the entered password match in the database.
  if (data) {
    const isCorrectPassword = await bcrypt.compare(
      userCredinitials.password,
      data.password
    );
    console.log("Password Matches: ", isCorrectPassword);

    // If not correct password throw error
    if (!isCorrectPassword) {
      throw new AppError("Invalid credentials.", StatusCode.UNAUTHORIZED.code);
    }

    if (isCorrectPassword) {
      const token = generateToken(data.id);

      const response = {
        user: {
          id: data.id,
          name: data.name,
          email: data.email,
        },
        token,
      };
      return response;
    } else {
      return null;
    }

    console.log("after password check: ", data);
  }
}

// export async function logoutUserService(userId:TUserParam)
//  {

//  }
