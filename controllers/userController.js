const UserService = require("../services/userService");

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async createUser(req, res, next) {
    const { firstName, lastName, username, email, password } = req.body;
    const user = await this.userService.createUser(
      firstName,
      lastName,
      username,
      email,
      password
    );

    res.status(201).json(user);
  }

  async getUsers(req, res, next) {
    const users = await this.userService.getUsers();
    return res.json(users);
  }

  async getUser(req, res, next) {
    const { id } = req.user;
    const user = await this.userService.getUser(id);
    return res.json(user);
  }

  async updateUser(req, res, next) {
    const { id } = req.user;
    const { firstName, lastName, username } = req.body;
    const updatedData = { firstName, lastName, username };
    const updatedUser = await this.userService.updateUser(id, updatedData);
    return res.json(updatedUser);
  }

  async deleteUser(req, res, next) {
    const { id } = req.user;
    await this.userService.deleteUser(id);
    res.sendStatus(204);
  }
}

module.exports = UserController;
