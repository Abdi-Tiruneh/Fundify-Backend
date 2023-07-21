import { Request, Response, NextFunction } from "express";
import winston from "winston";

interface CustomError extends Error {
  status?: number;
}

export default function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const status = err.status || 500;
  const message =
    err.message || "Internal server error. Please try again later.";

  const response = {
    message,
    status,
    timestamp: new Date().toISOString(),
    requestUrl: req.originalUrl,
  };

  if (status === 500) winston.error(err.message, err);

  res.status(status).json(response);
}
