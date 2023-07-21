import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { BadRequestError, UnauthorizedError } from "../errors/CustomErrors";

const JWT_PRIVATE_KEY: Secret | undefined = process.env.JWT_PRIVATE_KEY;

interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export default function authenticateToken(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const token = req.header("x-auth-token");
  if (!token) throw new UnauthorizedError("No token provided.");

  if (!JWT_PRIVATE_KEY)
    throw new Error("JWT_PRIVATE_KEY environment variable is not set.");

  try {
    const decoded = jwt.verify(token, JWT_PRIVATE_KEY);
    (req as CustomRequest).token = decoded;
    next();
  } catch (ex) {
    if (ex instanceof jwt.TokenExpiredError)
      throw new BadRequestError("Token has expired.");
    throw new BadRequestError("Invalid token.");
  }
}
