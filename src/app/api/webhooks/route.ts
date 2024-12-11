import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { StripeProvider } from '@/lib/payment/StripeProvider';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

const stripeProvider = new StripeProvider();

export async function POST(request: Request) {
  const body = await request.text();
  const header = await headers();
  const signature = header.get('stripe-signature')!;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    await stripeProvider.handleWebhook(event);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}
