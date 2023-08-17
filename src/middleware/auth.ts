import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { BadRequestError, UnauthorizedError } from "../errors/CustomErrors";

interface DecodedUser {
  isAdmin: boolean;
  userId: string;
  username: string;
  email: string;
}

export default function authenticateToken(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const token = req.header("x-auth-token");
  if (!token) throw new UnauthorizedError("No token provided.");

  const privateKey = process.env.JWT_PRIVATE_KEY;

  if (!privateKey)
    throw new Error("JWT_PRIVATE_KEY environment variable is not set.");

  try {
    const decoded = jwt.verify(token, privateKey) as DecodedUser;
    //@ts-ignore
    req.user = decoded;
    next();
  } catch (ex) {
    if (ex instanceof jwt.TokenExpiredError)
      throw new BadRequestError("Token has expired.");
    throw new BadRequestError("Invalid token.");
  }
}
