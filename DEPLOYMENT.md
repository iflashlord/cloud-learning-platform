# Production Deployment Checklist

## 🔧 Pre-Deployment Setup

### 1. Environment Variables

Copy `.env.example` to `.env.production` and set:

```bash
# Required for production
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."
DATABASE_URL="postgresql://prod-connection-string"
STRIPE_API_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_APP_URL="https://your-domain.com"
NODE_ENV="production"
```

### 2. Database Setup

```bash
# Push schema to production database
npm run db:push

# Seed with initial data
npm run db:seed
```

### 3. Run Test Suite

```bash
npm test
```

Vitest validates server actions (XP, hearts, quests) and UI logic. Run the suite with production env vars loaded to catch regressions before deploying.

### 4. Stripe Configuration

1. Create Stripe account and get live API keys
2. Set up webhook endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Configure webhook events: `checkout.session.completed`, `invoice.payment_succeeded`

## 🚀 Deployment Options

### Option A: Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Option B: Docker

```bash
# Build and run container
docker build -t aws-learning-platform .
docker run -p 3000:3000 --env-file .env.production aws-learning-platform
```

### Option C: Manual Server

```bash
npm run build
npm start
```

## ✅ Post-Deployment Verification

1. **Health Check**: Visit `https://your-domain.com/api/health`
2. **Authentication**: Test Clerk sign-up/login
3. **Database**: Verify course data loads
4. **Payments**: Test Stripe checkout (use test cards first)
5. **Webhooks**: Verify Stripe webhooks are received

## 🔒 Security Checklist

- [ ] Environment variables set correctly
- [ ] Database credentials secured
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Stripe webhook endpoint secured
- [ ] CORS configured for production domain only

## 📊 Monitoring Setup (Post-Launch)

Consider adding:

- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics)
- Database monitoring (NeonDB dashboard)
- Payment monitoring (Stripe dashboard)

## 🐛 Common Issues

1. **Build failures**: Check for missing imports and TypeScript errors
2. **Database connection**: Verify DATABASE_URL format and permissions
3. **Stripe webhooks**: Ensure webhook secret matches and endpoint is accessible
4. **CORS errors**: Check NEXT_PUBLIC_APP_URL matches your domain
