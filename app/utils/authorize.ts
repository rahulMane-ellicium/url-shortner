import { sign, verify } from "jsonwebtoken";
import { IExcludedPaths } from "../../common/types/routes.types";
import { NextFunction, Request, Response } from "express";
import { authConstants } from "../../common/constants/auth.constants";

export const createToken = (payload: any, secret: string, expiry: string) => {
  const token = sign(payload, secret || "", { expiresIn: expiry });

  return token;
};

export const verifyToken = (token: string) => {
  const { ACCESS_TOKEN_SECRET } = process.env;
  const payload = verify(token, ACCESS_TOKEN_SECRET || "");
  return payload;
};

export const authorize = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization || "";

      const payload = verifyToken(token);

      res.locals.user = payload;

      next();
    } catch (e) {
      console.log(e);
      next(authConstants.UNAUTHORIZED);
    }
  };
};
