import stripe from "stripe";


const { STRIPE_SECRET_KEY } = process.env;
export const stripeClient = new stripe(STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});
