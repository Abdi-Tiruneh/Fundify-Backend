const AuthService = require("../services/authService");

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async authUser(req, res, next) {
    const { usernameOrEmail, password } = req.body;
    const token = await this.authService.authUser(usernameOrEmail, password);

    res.send(token);
  }
}

module.exports = AuthController;
