import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { MessageHandler, ResponseHandler } from "./responseHandler";

export const validateBody = [
  body("email").notEmpty().isEmail(),
  body("password").notEmpty().isLength({ min: 5 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new MessageHandler(
          422,
          "Either email is Invalid or password length is less than 5"
        )
      );
    }
    next();
  },
];

export const amountValidator = [
  body("amount").notEmpty().equals("300"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new MessageHandler(422, "Please Enter Correct Amount!!!"));
    }
    next();
  },
];


export const customUrlValidators = [
  body('customName').notEmpty().withMessage('customName is required'),
  body('longUrl').notEmpty().withMessage('longUrl is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new MessageHandler(422, errors.array()));
    }
    next();
  },
];