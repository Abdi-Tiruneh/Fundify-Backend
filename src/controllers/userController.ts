import { Request, Response, NextFunction } from "express";

import {
  createUserService,
  getUsersService,
  getUserService,
  updateUserService,
  deleteUserService,
} from "../services/userService";

export async function createUser(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { firstName, lastName, username, email, password } = req.body;
  const user = await createUserService({
    firstName,
    lastName,
    username,
    email,
    password,
  });
  return res.status(201).json(user);
}

export async function getUsers(
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const users = await getUsersService();
  return res.json(users);
}

export async function getUser(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  //@ts-ignore
  const { userId } = req.user;
  const user = await getUserService(userId);
  return res.json(user);
}

export async function updateUser(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  //@ts-ignore
  const { userId } = req.user;
  const { firstName, lastName, username } = req.body;
  const updatedData = { firstName, lastName, username };
  const updatedUser = await updateUserService(userId, updatedData);
  return res.json(updatedUser);
}

export async function deleteUser(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const { id } = req.params;
  await deleteUserService(id);
  return res.sendStatus(204);
}
