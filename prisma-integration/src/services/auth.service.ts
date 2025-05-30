import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import AuthModel from "../models/auth.model";
import {
  TCreateUserInput,
  TUserLoginInput,
  TUserParam,
} from "../schemas/user.schema";
import generateToken from "../utils/generateToken";
import { User } from "@prisma/client";
import { AppError } from "../utils/appError";
import { StatusCode } from "../constants/StatusCodes";

// Hash Password before creating a user
async function hashPassword(plainPassword: string) {
  return bcrypt.hash(plainPassword, 12);
}

export async function registerUserService(userData: TCreateUserInput) {
  //   console.log(userData);
  //   console.log("in register user service");

  const hashedPassword = await hashPassword(userData.password);

  const user = await AuthModel.registerUserModel({
    ...userData,
    password: hashedPassword,
  });

  // if (!user) {
  //   throw new Error("Could not create user");
  // }

  const token = generateToken(user.id);

  const response = {
    user,
    token,
  };

  return response;
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
