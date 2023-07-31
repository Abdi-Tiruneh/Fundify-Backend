import { Request, Response, NextFunction } from "express";
import authService from "../services/authService";

export default async function authUser(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { usernameOrEmail, password } = req.body;
  const token = await authService(usernameOrEmail, password);

  res.send(token);
}
