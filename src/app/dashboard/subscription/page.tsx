'use client';

import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { useState } from 'react';

const pricingTiers = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    priceId: undefined,
    features: [
      '1,000 notifications/month',
      '2 virtual events/month',
      'Basic analytics',
      'Email support'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 30,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
    features: [
      '10,000 notifications/month',
      'Unlimited virtual events',
      'Advanced analytics',
      'Priority support',
      'Custom branding',
      'API access'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 60,
    priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID,
    features: [
      'Unlimited notifications',
      'Unlimited virtual events',
      'Enterprise analytics',
      '24/7 phone support',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantee'
    ]
  }
];

export default function SubscriptionPage() {
  const session = useSessionContext();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string | undefined, tierId: string) => {
    if(session.loading) {
      setError('Please try again.');
      return;
    }
    if (!session.doesSessionExist) {
      setError('Please login to subscribe');
      return;
    }

    setError(null);
    setLoading(tierId);

    try {
      if (!priceId) {
        if (tierId === 'free') {
          const response = await fetch('/api/subscribe-free', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          
          if (response.ok) {
            window.location.href = '/dashboard';
          } else {
            throw new Error('Failed to subscribe to free tier');
          }
        }
        return;
      }

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId: session.userId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(null);
    }
  };

  // Fetch current subscription on component mount
  useState(() => {
    const fetchSubscription = async () => {
      try {
        const response = await fetch('/api/subscription-status');
        if (response.ok) {
          const data = await response.json();
          setCurrentPlan(data.planId);
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
      }
    };

    if (!session.loading && session.doesSessionExist) {
      fetchSubscription();
    }
  }, [session]);

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Choose your plan
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Select the perfect plan for your needs
          </p>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative border rounded-lg shadow-sm divide-y divide-gray-200 dark:divide-gray-700
                ${tier.id === currentPlan 
                  ? 'border-green-500 dark:border-green-400 ring-2 ring-green-500' 
                  : tier.id === 'pro'
                    ? 'border-indigo-500 dark:border-indigo-400'
                    : 'border-gray-200 dark:border-gray-700'}
                bg-white dark:bg-gray-800`}
            >
              {tier.id === currentPlan && (
                <div className="absolute top-0 right-0 -translate-y-1/2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Current Plan
                  </span>
                </div>
              )}
              {tier.id === 'pro' && tier.id !== currentPlan && (
                <div className="absolute top-0 right-0 -translate-y-1/2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                    Popular
                  </span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  {tier.name}
                </h3>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                    ${tier.price}
                  </span>
                  <span className="text-base font-medium text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </p>

                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-green-500"
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
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(tier.priceId, tier.id)}
                  disabled={loading === tier.id || tier.id === currentPlan}
                  className={`mt-8 block w-full px-6 py-3 border border-transparent text-center font-medium rounded-md
                    ${tier.id === currentPlan
                      ? 'text-green-600 bg-green-50 cursor-default dark:text-green-300 dark:bg-green-900/50'
                      : tier.id === 'pro'
                        ? 'text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
                        : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-900/50 dark:hover:bg-indigo-900'
                    } ${loading === tier.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading === tier.id ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </div>
                  ) : tier.id === currentPlan ? (
                    'Current Plan'
                  ) : (
                    tier.price === 0 ? 'Get Started' : 'Subscribe Now'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
