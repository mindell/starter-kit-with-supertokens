export interface PaymentProvider {
  createCheckoutSession(priceId: string, customerId: string): Promise<{ url: string }>;
  handleWebhook(event: any): Promise<void>;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  priceId?: string; // Provider-specific price ID
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free Tier',
    price: 0,
    interval: 'month',
    features: [
      '100 notifications/month',
      '1 virtual event/month',
      'Basic support',
      'Email notifications'
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 30,
    interval: 'month',
    features: [
      '10,000 notifications/month',
      '10 virtual events/month',
      'Priority support',
      'SMS & Email notifications',
      'Custom branding',
      'Analytics dashboard'
    ],
    priceId: process.env.STRIPE_PRO_PRICE_ID
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 60,
    interval: 'month',
    features: [
      'Unlimited notifications',
      'Unlimited virtual events',
      '24/7 Premium support',
      'All notification channels',
      'Advanced analytics',
      'Custom integration',
      'Dedicated account manager'
    ],
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID
  }
];
