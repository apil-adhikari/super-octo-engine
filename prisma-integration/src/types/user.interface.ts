import { Request } from "express";

export interface CreateUserInput {
  name: string;
  email: string;
}

export interface CreateUserRequest extends Request {
  body: CreateUserInput;
}

export interface UpdateUserInput {
  name: string;
  email: string;
}
