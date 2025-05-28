import { Response } from "express";
import { PostStatusType } from "./postStatus.type";

export interface CreatePostInputInterface {
  title: string;
  description: string;
  content?: string; // content is optional
  status?: PostStatusType;
  authorId: number;
}

export interface UpdatePostInterface {
  title: string;
  description: string;
  content?: string;
  status?: PostStatusType;
}

export interface GetUserReuest extends Request {
  params: { id: string };
}
