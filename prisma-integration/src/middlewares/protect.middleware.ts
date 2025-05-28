import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export interface JwtUserPayload extends JwtPayload {
  id: number;
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

export async function protect(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("In protecte middleware:");
    let token: string = "";
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
      res.status(401).json({
        status: "fail",
        message: "Not authorized, token missing",
      });
    }

    // Get the decoded value using jwt and verify it:
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
    console.log(decoded.id);

    if (!decoded) {
      res.status(401).json({
        status: "fail",
        message: "token expired,please login again",
      });
    }

    // CHECK IF THERE IS USER ASSOCIATED WITH THAT TOKEN:
    const currentUser = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    // TODO: How do I do this type of checks???
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
    // req.user = currentUser; // we cannot do this: ❌ Property 'user' does not exist on type 'Request'
    // req.user = currentUser;

    next();
  } catch (error) {
    next(error);
  }
}
