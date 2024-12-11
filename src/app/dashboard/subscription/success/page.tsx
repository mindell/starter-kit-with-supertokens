'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SubscriptionSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) {
      router.push('/dashboard/subscription');
      return;
    }

    // Verify the session status
    const verifySession = async () => {
      try {
        const response = await fetch('/api/verify-subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sessionId }),
        });

        if (response.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Error:', error);
        setStatus('error');
      }
    };

    verifySession();
  }, [router, searchParams]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-4">We couldn't verify your subscription.</p>
          <button
            onClick={() => router.push('/dashboard/subscription')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Return to Subscription Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-16 w-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Subscription Successful!
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Thank you for subscribing. Your account has been upgraded.
        </p>
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
