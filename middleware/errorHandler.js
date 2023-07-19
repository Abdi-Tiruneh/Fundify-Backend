const winston = require("winston");

module.exports = function (err, req, res, next) {
  const status = err.status || 500;
  const message =
    err.message || "Internal server error. Please try again later.";

  const response = {
    message,
    status,
    timestamp: new Date().toISOString(),
    requestUrl: req.originalUrl,
  };

  if (status === 500) console.log(err.message);
  //   winston.error(err.message, err);

  res.status(status).json(response);
};
