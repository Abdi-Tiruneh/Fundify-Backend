const winston = require("winston");
require("express-async-errors");

module.exports = function () {
  const logger = winston.createLogger({
    level: "info", 
    transports: [
      new winston.transports.Console({ colorize: true, prettyPrint: true }),
      new winston.transports.File({ filename: "logs/logs.log" }),
    ],
  });

  process.on("uncaughtException", (err) => {
    logger.error("Uncaught Exception:", err);
    process.exit(1);
  });

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
};
