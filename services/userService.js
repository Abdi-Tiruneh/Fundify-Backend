const { User } = require("../models/user");
const {
  ResourceNotFoundError,
  ConflictError,
} = require("../errors/CustomErrors");

class UserService {
  async createUser(firstName, lastName, username, email, password) {
    const existingEmailUser = await User.findOne({ where: { email } });
    if (existingEmailUser)
      throw new ConflictError("User with the provided email already exists.");

    const existingUsernameUser = await User.findOne({ where: { username } });
    if (existingUsernameUser)
      throw new ConflictError(
        "User with the provided username already exists."
      );

    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    const { password: _password, ...userWithoutPassword } = user.toJSON();

    return userWithoutPassword;
  }

  async getUsers() {
    const user = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    return user;
  }

  async getUser(id) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) throw new ResourceNotFoundError("User not found");
    return user;
  }

  async updateUser(id, updatedData) {
    const user = await this.getUser(id);
    const updatedUser = await user.update(updatedData);
    const { password: _password, ...userWithoutPassword } =
      updatedUser.toJSON();

    return userWithoutPassword;
  }

  async deleteUser(id) {
    const user = await this.getUser(id);
    await user.destroy();
  }
}

module.exports = UserService;
