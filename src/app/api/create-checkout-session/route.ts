import { NextResponse } from 'next/server';
import { StripeProvider } from '@/lib/payment/StripeProvider';

const stripeProvider = new StripeProvider();

export async function POST(request: Request) {
  try {
    const { priceId } = await request.json();

    // In a real application, you would get the customer ID from your database
    // based on the authenticated user
    const customerId = 'cus_example'; // Replace with actual customer ID

    const { url } = await stripeProvider.createCheckoutSession(priceId, customerId);

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
