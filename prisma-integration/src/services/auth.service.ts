import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import AuthModel from "../models/auth.model";
import { TAddUserSchema } from "../schemas/user.schema";
import generateToken from "../utils/generateToken";

// Hash Password before creating a user
async function hashPassword(plainPassword: string) {
  return bcrypt.hash(plainPassword, 12);
}

export async function registerUserService(userData: TAddUserSchema) {
  //   console.log(userData);
  //   console.log("in register user service");

  const hashedPassword = await hashPassword(userData.password);

  const data = await AuthModel.registerUserModel({
    ...userData,
    password: hashedPassword,
  });

  const token = generateToken(data.id);
  return {
    data,
    token,
  };
}
