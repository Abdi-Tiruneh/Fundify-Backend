const { BadRequestError } = require("../errors/CustomErrors");
module.exports = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) throw new BadRequestError(error.details[0].message);
    next();
  };
};
