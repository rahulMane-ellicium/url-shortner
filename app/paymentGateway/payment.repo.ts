import { paymentGatewaySchema } from "../schemas/paymentGateway.schema";

const createPaymentInstance = async (userId: number, amount: number) =>
  paymentGatewaySchema.create({ userId, amount });

  const updatePaymentStatus = async (userId: number, paymentStatus: string) =>
  paymentGatewaySchema.update({ paymentStatus }, { where: { userId } });

  const getPaymentDetails = async (userId: number) =>
  await paymentGatewaySchema.findOne({ where: { userId } });

export default {
  createPaymentInstance,
  updatePaymentStatus,
  getPaymentDetails,
};
