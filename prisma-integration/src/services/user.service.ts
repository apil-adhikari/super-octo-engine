import { UserModel } from "../models/user.model";
import { CreateUserInput, UpdateUserInput } from "../types/user.interface";

export const createUserService = async (userData: CreateUserInput) => {
  return await UserModel.createUserModel(userData);
};

export const updateUserService = async (
  userId: number,
  userData: UpdateUserInput
) => {
  return await UserModel.updateUserModel(userId, userData);
};
