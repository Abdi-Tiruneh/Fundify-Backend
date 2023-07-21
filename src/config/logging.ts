import winston from "winston";
import "express-async-errors";

export default function () {
  const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}`;
      })
    ),
    transports: [
      new winston.transports.Console({ format: winston.format.cli() }),
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
}
