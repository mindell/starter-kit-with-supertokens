import Stripe from 'stripe';
import { PaymentProvider } from './PaymentProvider';

export class StripeProvider implements PaymentProvider {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-11-20.acacia',
    });
  }

  async createCheckoutSession(priceId: string, customerId: string) {
    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription`,
      customer: customerId,
    });

    return { url: session.url! };
  }

  async handleWebhook(event: Stripe.Event) {
    const { type, data } = event;

    switch (type) {
      case 'checkout.session.completed':
        const session = data.object as Stripe.Checkout.Session;
        // Update subscription status in database
        await this.handleCheckoutComplete(session);
        break;
      // Add other webhook handlers as needed
    }
  }

  private async handleCheckoutComplete(session: Stripe.Checkout.Session) {
    // Implement subscription update logic here
    // This should update the subscription status in your database
    // You can use the prisma client here
  }
}
