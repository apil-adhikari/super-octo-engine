import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// export interface JwtUserPayload extends JwtPayload {
//   id: number;
// }

export interface AuthRequest extends Request {
  user?: {
    id: number;
  };
}
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

export async function protect(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  console.log("In protecte middleware:");
  let token: string = "";
  console.log(req.headers);
  // check in request header and as well as in cookies if the token exists
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    // res.status(401).json({
    //   status: "fail",
    //   message: "Not authorized, token missing",
    // });

    throw new Error(
      "Access token missing! Please login again to get access token."
    );
  }

  console.log("TOKEN: ", token);

  try {
    // Get the decoded value using jwt and verify it:
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
    console.log("USER ID: ", decoded.id);

    if (!decoded) {
      throw new Error("token expired,please login again");
    }

    // FIXME: Confirm should I check the if the user exists with that id in the database?
    // PROBLEM: since we use models for db operation,
    // should we be checking if user exists here in protect middleware?
    // CHECK IF THERE IS USER ASSOCIATED WITH THAT TOKEN:[]
    const currentUser = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!currentUser) {
      throw new Error("The user belonging to this token does no loger exists.");
    }

    // // TODO: How do I do this type of checks???
    // if (!currentUser) {
    //   return res.status(401).json({
    //     status: "fail",
    //     message: "The user belonging to this user does no loger exists.",
    //   });
    // }

    /*--- OTHER CHECKS TO PERFORM ---
     - check if the user has changed the password after token was issued
    */

    //  If we have user logged in, we grant access to do certain operations:
    // req.user = currentUser; // req.user.id = currentUser.id;

    // ATTACH TO THE req
    // req ma user xa vanye, we put the decoded id in the req.user.id

    req.user = {
      id: currentUser.id,
    };
    console.log("REQUEST . USER -> ", req.user.id);

    next();
  } catch (error) {
    next(error);
  }
}
