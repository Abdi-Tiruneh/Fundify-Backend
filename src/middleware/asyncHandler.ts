import { Request, Response, NextFunction } from "express";

type RequestHandler = (req: Request, res: Response) => Promise<void>;

export default function asyncMiddleware(handler: RequestHandler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
}
