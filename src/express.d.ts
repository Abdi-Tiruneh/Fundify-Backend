import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        isAdmin: boolean;
        userId: string;
        username: string;
        email: string;
      };
    }
  }
}
