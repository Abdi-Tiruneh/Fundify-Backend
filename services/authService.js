const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const {
  UnauthorizedError,
  BadRequestError,
} = require("../errors/CustomErrors");

class AuthService {
  async authUser(usernameOrEmail, password) {
    if (!usernameOrEmail || !password)
      throw new BadRequestError("Username/Email and password are required.");

    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });
    if (!user) throw new UnauthorizedError("Invalid credential.");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new UnauthorizedError("Invalid credential.");

    return {
      "x-auth-token": generateAuthToken(user),
    };
  }
}

function generateAuthToken(user) {
  const expirationTime = "7d"; // Set the expiration time to one week

  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: expirationTime }
  );
}

module.exports = AuthService;
