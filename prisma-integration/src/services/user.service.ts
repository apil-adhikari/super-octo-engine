// import { UserModel } from "../models/user.model";
import { UserModel } from "../models/user.model";
import { CreateUserInput, UpdateUserInput } from "../types/user.interface";

// create user service
export const createUserService = async (userData: CreateUserInput) => {
  return await UserModel.createUserModel(userData);
};

// update user service
export const updateUserService = async (
  userId: number,
  userData: UpdateUserInput
) => {
  return await UserModel.updateUserModel(userId, userData);
};

// delete user service
export const deleteUserService = async (userId: number) => {
  return await UserModel.deleteUserModel(userId);
};

// get user service
export const getUserService = async (userId: number) => {
  return await UserModel.getUserModel(userId);
};

// get all users service
export const getAllUsersService = async () => {
  return await UserModel.getAllUsers();
};
