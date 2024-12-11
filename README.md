This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features

### Authentication with SuperTokens
This starter kit comes with SuperTokens integration for robust authentication. Features include:
- Email-password authentication
- Session management
- Protected routes
- Server-side session verification

For detailed SuperTokens implementation guides, check the `DOCS` folder:
- Configuration setup
- Adding authentication to API routes
- Session management in frontend routes
- Server component authentication
- NextJS middleware implementation

### Payment Processing with Stripe
Integrated Stripe payment processing capabilities:
- Secure payment processing
- Subscription management
- Payment intent creation
- Webhook handling

### Database with Supabase
Built-in Supabase integration for:
- Scalable PostgreSQL database
- Real-time subscriptions
- Storage capabilities
- Database backups

## Project Setup

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Docker (optional, for local development)

### Environment Variables
1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Configure the following variables in your `.env`:
- SuperTokens configuration
- Stripe API keys
- Supabase credentials
- Other application settings

### Project Structure
```
├── DOCS/               # Detailed documentation
├── prisma/             # Database schema and migrations
├── public/            # Static assets
├── src/
│   ├── app/          # Next.js app directory
│   ├── components/   # Reusable components
│   └── lib/         # Utility functions and configurations
```

### Development Workflow
1. Install dependencies:
```bash
npm install
```

2. Set up your environment variables

3. Run docker-compose
```bash
docker-compose up -d
```
4. Start the development server:
```bash
npm run dev
```

5. Access the application at http://localhost:3000

## Documentation
Detailed documentation for each feature can be found in the `DOCS` directory:
- SuperTokens authentication implementation

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
