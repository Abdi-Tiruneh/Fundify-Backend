import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { UnauthorizedError, BadRequestError } from "../errors/CustomErrors";

const EXPIRATION_TIME = "14d";

export default async function authService(
  usernameOrEmail: string,
  password: string
) {
  if (!usernameOrEmail || !password)
    throw new BadRequestError("Username/Email and password are required.");

  const user = await findUserByUsernameOrEmail(usernameOrEmail);

  if (!user) throw new UnauthorizedError("Invalid credentials.");

  const userData = user.get();
  const validPassword = await bcrypt.compare(password, userData.password);
  if (!validPassword) throw new UnauthorizedError("Invalid credentials.");

  return {
    "x-auth-token": generateAuthToken(
      userData.id,
      userData.username,
      userData.email,
      userData.isAdmin as boolean
    ),
  };
}

async function findUserByUsernameOrEmail(usernameOrEmail: string) {
  return User.findOne({
    where: {
      [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    },
  });
}

function generateAuthToken(
  userId: string,
  username: string,
  email: string,
  isAdmin: boolean
): string {
  const tokenData = {
    userId,
    username,
    email,
    isAdmin,
  };

  const privateKey = process.env.JWT_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("JWT_PRIVATE_KEY not configured.");
  }

  return jwt.sign(tokenData, privateKey, { expiresIn: EXPIRATION_TIME });
}
