import { NextFunction, Request, Response, Router, response } from "express";
import {
  paymentGatewayConstants,
  stripeConstants,
} from "../../common/constants/paymentGateway.constants";
import { authorize } from "../utils/authorize";
import { stripeClient } from "../utils/stripe.config";
import paymentService from "./payment.service";
import { ResponseHandler } from "../utils/responseHandler";
import { amountValidator } from "../utils/body.validators";

export const paymentRouter = Router();
const { CREATE_INTENT, WEBHOOK, GET_PAYMENT_DETAILS } = paymentGatewayConstants;
const { SIGNATURE, PAYMENT_INTENT_SUCCESS, PAYMENT_SUCCESS, PAYMENT_FAILED } =
  stripeConstants;

const { STRIPE_WEBHOOK_KEY } = process.env;
paymentRouter.post(
  CREATE_INTENT,
  authorize(),
  amountValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        user: {
          user: { id },
        },
      } = res.locals;
      const { amount } = req.body;
      const paymentIntent = await paymentService.createPaymentIntent(
        id,
        amount
      );
      res.send(
        new ResponseHandler({ clientSecret: paymentIntent.client_secret })
      );
    } catch (error) {
      next(error);
    }
  }
);

paymentRouter.post(
  WEBHOOK,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sig = req.headers[SIGNATURE] as string;
      try {
        const event: any = stripeClient.webhooks.constructEvent(
          req.body,
          sig,
          STRIPE_WEBHOOK_KEY as string
        );

        const userId = event.data.object.metadata.id;
        if (event.type === PAYMENT_INTENT_SUCCESS) {
          const response = await paymentService.updatePaymentStatus(
            userId,
            PAYMENT_SUCCESS
          );
          res.send(new ResponseHandler(response));
        }
        const response = await paymentService.updatePaymentStatus(
          userId,
          PAYMENT_FAILED
        );

        res.send(new ResponseHandler(response));
      } catch (error) {
        res.sendStatus(400);
      }
    } catch (error) {
      next(error);
    }
  }
);

paymentRouter.get(
  GET_PAYMENT_DETAILS,
  authorize(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        user: {
          user: { id },
        },
      } = res.locals;
    } catch (error) {
      next(error);
    }
  }
);
