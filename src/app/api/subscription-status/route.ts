import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withSession } from "supertokens-node/nextjs";
import { ensureSuperTokensInit } from '@/app/config/backend';

ensureSuperTokensInit();

export function GET(request: NextRequest) {
  return withSession(request, async (err, session) => {
    if (err) {
      console.error('Session error:', err);
      return NextResponse.json(
        { error: 'Session error', details: err.message },
        { status: 500 }
      );
    }
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    try {
      // Ensure userId is a string
      const userId = session.getUserId().toString();
      console.log('Processing request for userId:', userId);

      // Get the latest active subscription for the user
      const subscription = await prisma.subscription.findFirst({
        where: {
          userId: userId,
          status: 'ACTIVE',
        },
        orderBy: {
          startDate: 'desc',
        },
      });

      if (!subscription) {
        console.log('No active subscription found for user:', userId);
        return NextResponse.json({
          planId: 'free',
          status: 'ACTIVE',
        });
      }

      return NextResponse.json({
        planId: subscription.planId,
        status: subscription.status,
        startDate: subscription.startDate,
        nextBillingDate: subscription.nextBillingDate,
      });
    } catch (error:any) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        type: error.name,
        userId: session.getUserId()
      });
      
      return NextResponse.json(
        { error: 'Internal server error', details: error.message },
        { status: 500 }
      );
    }
  });
}
