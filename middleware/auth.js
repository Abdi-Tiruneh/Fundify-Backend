const jwt = require("jsonwebtoken");
const {
  BadRequestError,
  UnauthorizedError,
} = require("../errors/CustomErrors");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) throw new UnauthorizedError("No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    throw new BadRequestError("Invalid token.");
  }
};
