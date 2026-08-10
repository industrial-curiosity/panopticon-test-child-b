import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

export async function createPaymentIntent(amount: number, currency = 'usd'): Promise<Stripe.PaymentIntent> {
  return stripe.paymentIntents.create({ amount, currency });
}

export async function confirmPayment(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
  return stripe.paymentIntents.confirm(paymentIntentId);
}

export async function refundPayment(paymentIntentId: string, amount?: number): Promise<Stripe.Refund> {
  return stripe.refunds.create({ payment_intent: paymentIntentId, amount });
}
