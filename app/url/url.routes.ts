import { NextFunction, Router, Request, Response } from "express";
import { urlConstants } from "../../common/constants/url.constants";
import urlService from "./url.service";
import { ResponseHandler } from "../utils/responseHandler";
import { authorize } from "../utils/authorize";
import { customUrlValidators } from "../utils/body.validators";

export const urlRouter = Router();
const { SHORT_URL, REDIRECT, GET_MY_URLS, GET_REPORTS, CUSTOM_URL } =
  urlConstants;

urlRouter.post(
  SHORT_URL,
  authorize(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        user: {
          user: { id },
        },
      } = res.locals;
      const response = await urlService.getShortUrl(req.body.longUrl, id);
      res.send(new ResponseHandler(response));
    } catch (error) {
      next(error);
    }
  }
);

urlRouter.get(
  GET_MY_URLS,
  authorize(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        user: {
          user: { id },
        },
      } = res.locals;
      const response = await urlService.getAllUrls(id);
      res.send(new ResponseHandler(response));
    } catch (error) {
      next(error);
    }
  }
);

urlRouter.get(
  GET_REPORTS,
  authorize(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        user: {
          user: { id },
        },
      } = res.locals;
      const response = await urlService.getReports(id);
      res.send(new ResponseHandler(response));
    } catch (error) {
      next(error);
    }
  }
);

urlRouter.post(
  CUSTOM_URL,
  customUrlValidators,
  authorize(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        user: {
          user: { id },
        },
      } = res.locals;
      const { customName, longUrl } = req.body;
      const response = await urlService.getCustomUrl(id, customName, longUrl);
      res.send(new ResponseHandler(response));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);
urlRouter.get(
  REDIRECT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { shortUrlId } = req.params;
      const response = await urlService.redirect(shortUrlId);
      res.redirect(response.longUrl);
      res.send(new ResponseHandler(response));
    } catch (error) {
      next(error);
    }
  }
);
