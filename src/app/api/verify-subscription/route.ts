import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json();

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      // Update subscription status in database
      const subscription = await prisma.subscription.update({
        where: {
          userId: session.client_reference_id!,
        },
        data: {
          status: 'ACTIVE',
          startDate: new Date(),
          lastBillingDate: new Date(),
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        },
      });

      return NextResponse.json({ success: true, subscription });
    }

    return NextResponse.json(
      { error: 'Payment not completed' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error verifying subscription' },
      { status: 500 }
    );
  }
}
