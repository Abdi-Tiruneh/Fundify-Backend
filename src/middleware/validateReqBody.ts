import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/CustomErrors";

type ValidatorFunction = (data: any) => { error?: any };

export default function validationMiddleware(validator: ValidatorFunction) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = validator(req.body);
    if (error) throw new BadRequestError(error.details[0].message);

    next();
  };
}
