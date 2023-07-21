import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/CustomErrors";

export default function validateUUIDMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (!validateUUID(req.params.id)) throw new BadRequestError("Invalid ID.");
  next();
}

function validateUUID(uuid: string): boolean {
  const UUID_REGEX =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  return UUID_REGEX.test(uuid);
}
