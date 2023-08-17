import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "../errors/CustomErrors";

export default function checkAdmin(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  //@ts-ignore
  if (!req.user.isAdmin) throw new ForbiddenError("Access denied.");

  next();
}
