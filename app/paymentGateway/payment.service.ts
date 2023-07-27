import {
  paymentGatewayCodes,
  paymentGatewayConstants,
} from "../../common/constants/paymentGateway.constants";
import { stripeClient } from "../utils/stripe.config";
import paymentRepo from "./payment.repo";

const createPaymentIntent = async (userId: number, amount: number) => {
  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount,
      currency: "inr",
      description: "Payment for custom url",
      metadata: { userId },
    });
    await paymentRepo.createPaymentInstance(userId, amount);
    return paymentIntent;
  } catch (error) {
    throw error;
  }
};

const updatePaymentStatus = async (userId: number, status: string) => {
  try {
    await paymentRepo.updatePaymentStatus(userId, status);
    return paymentGatewayCodes.UPDATED;
  } catch (error) {
    throw error;
  }
};

const getPaymentDetails = async (userId: number) => {
  try {
    const paymentDetails = await paymentRepo.getPaymentDetails(userId);
    if (paymentDetails) return paymentDetails;
    throw paymentGatewayCodes.NOT_FOUND;
  } catch (error) {
    throw error;
  }
};
export default { createPaymentIntent, updatePaymentStatus,getPaymentDetails };
