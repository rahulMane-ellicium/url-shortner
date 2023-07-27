import { MessageHandler } from "../../app/utils/responseHandler"

export const paymentGatewayConstants = {
    CREATE_INTENT : '/createPaymentIntent',
    WEBHOOK : "/webhook",
    GET_PAYMENT_DETAILS : "/paymentDetails"
}

export const paymentGatewayCodes = {
    UPDATED : new MessageHandler(200,"payment successful!!"),
    FAILED: new MessageHandler(402,"payment failed!!"),
    NOT_FOUND : new MessageHandler(401,"No payment Found!!!")
}

export const stripeConstants = {
    SIGNATURE :"stripe-signature",
    PAYMENT_INTENT_SUCCESS:"payment_intent.succeeded",
    PAYMENT_SUCCESS : "success",
    PAYMENT_FAILED : "failed"
}