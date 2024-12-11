import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from 'supertokens-node/recipe/session';
import { SessionRequest } from 'supertokens-node/framework/express';
import { cookies, headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    // Get session to verify user
    const session = await getSession(request, {
      sessionRequired: true,
      overrideGlobalClaimValidators: async function () {
        return [];
      },
    });

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Create free subscription
    const subscription = await prisma.subscription.create({
      data: {
        userId: session.getUserId(),
        status: 'ACTIVE',
        planId: 'free',
        startDate: new Date(),
        billingInterval: 'MONTHLY',
        amount: 0,
        currency: 'USD',
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      },
    });

    return NextResponse.json({ success: true, subscription });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error creating free subscription' },
      { status: 500 }
    );
  }
}
