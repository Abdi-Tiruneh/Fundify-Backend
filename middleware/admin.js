const { ForbiddenError } = require("../errors/CustomErrors");
module.exports = function (req, res, next) {
  if (!req.user.isAdmin) throw new ForbiddenError("Access denied.");

  next();
};
