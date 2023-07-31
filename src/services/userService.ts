import bcrypt from "bcrypt";
import { User } from "../models/user";
import { ResourceNotFoundError, ConflictError } from "../errors/CustomErrors";

User.initModel();

interface CreateUserInput {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

interface UpdatedData {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  password?: string;
}

export async function createUserService({
  firstName,
  lastName,
  username,
  email,
  password,
}: CreateUserInput) {
  const existingEmailUser = await User.findOne({ where: { email } });
  if (existingEmailUser)
    throw new ConflictError("User with the provided email already exists.");

  const existingUsernameUser = await User.findOne({ where: { username } });
  if (existingUsernameUser)
    throw new ConflictError("User with the provided username already exists.");

  // Hash the password using bcrypt before creating the new user
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
  });

  const { password: _password, ...userWithoutPassword } = user.get();

  return userWithoutPassword;
}

export async function getUsersService() {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });
  return users;
}

export async function getUserService(id: string) {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  if (!user) throw new ResourceNotFoundError("User not found");
  return user;
}

export async function updateUserService(id: string, updatedData: UpdatedData) {
  const user = await getUserService(id);
  const updatedUser = await user.update(updatedData);
  const { password: _password, ...userWithoutPassword } = updatedUser.get();

  return userWithoutPassword;
}

export async function deleteUserService(id: string) {
  const user = await getUserService(id);
  await user.destroy();
}
