import { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import jwt, { JwtPayload } from "jsonwebtoken";
import { secret } from "../modules/auth/auth.service";
import { prisma } from "../lib/prisma";
export enum UserRole {
  OWNER = "OWNER",
  SITTER = "SITTER",
  ADMIN = "ADMIN",
}

const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "Unauthorized access. Token is missing.",
        });
      }

      const decode = jwt.verify(token as string, secret) as JwtPayload;

      const user = await prisma.user.findUnique({
        where: {
          email: decode.email,
        },
      });
      if (!user) {
        return sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "Unauthorized access. User not found!",
        });
      }
      if (user.status !== "ACTIVE") {
        return sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "Unauthorized access!!",
        });
      }

      if (roles.length && !roles.includes(decode.role)) {
        return sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "You are not authorized!!",
        });
      }
      req.user = decode;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
