# ☁️ CloudLingo — Browser-Native AI Coach for Cloud Skills

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-green?logo=drizzle)

**CloudLingo** is where *Duolingo meets the Cloud*—a browser-native, AI-powered coach for AWS, Azure, and GCP learners. Every workflow is optimized for production readiness so teams can deploy new content, track learner outcomes, and monetize premium offerings without leaving the platform.

> Make cloud fluency a daily habit: short lessons, instant recaps, streaks, and AI-guided support that runs locally inside Chrome.

---

## 🚀 Why CloudLingo

Learning the cloud should not feel like skimming a 600-page manual. CloudLingo delivers:

- **Daily, bite-sized challenges** driven by Chrome AI APIs that reinforce core concepts in minutes, not hours.
- **Cross-cloud mastery** with unified lesson schemas that map AWS, Azure, and GCP services side-by-side.
- **Retention loops** (Learn → Reflect → Improve) that keep learners motivated with XP, streaks, quests, and recap summaries.

CloudLingo is built for developers, students, and cloud professionals who need fast refreshers, practical context, and just enough gamification to stay consistent.

---

## 🎯 Product Pillars

- **Lesson Workspace** — Prompt Presets call Chrome’s Prompt API to break down topics (IAM roles, VPC peering, Azure AD) in plain English, complete with analogies and code-ready snippets.
- **Unit Dashboard** — Summarization API condenses highlights, clarifies misconceptions, and prioritizes next steps after each unit.
- **Gamified Progression** — Real-time XP, streak tracking, quests, and hearts ensure the platform feels rewarding without overwhelming.
- **AI-Assisted Authoring** — The admin panel uses Prompt API helpers for question generation, hints, and explanations—reducing manual content work by 70%+.
- **Monetization-Ready** — Stripe powers subscriptions, upgrades, and premium tracks; Google Ads integration is available out of the box.

---

## 🧱 Production Architecture

| Layer            | Implementation                                                                 |
| ---------------- | ------------------------------------------------------------------------------ |
| Frontend         | Next.js 14 App Router • React 18 • TypeScript 5                                 |
| Design System    | Tailwind CSS • Shadcn/UI • Radix UI • Framer Motion animations                  |
| Data & Auth      | PostgreSQL + Drizzle ORM • Clerk authentication                                 |
| AI Runtime       | Chrome Prompt API (explanations, hints) • Chrome Summarization API (recaps)     |
| Payments         | Stripe subscriptions, webhooks, and upgrade workflows                           |
| Testing          | Vitest unit/integration tests                                                   |
| Docs & Tooling   | Storybook • Typed configurations • GitHub Actions-ready scripts (coming soon)   |

All intelligence runs locally via Chrome’s built-in AI models. No external LLM services are required, keeping data private and costs predictable.

---

## 🛠️ Getting Started

### 1. Clone and install

```bash
git clone https://github.com/iflashlord/cloud-learning-platform.git
cd cloud-learning-platform
yarn install
```

### 2. Configure environment variables

Copy the example file and provide your secrets.

```bash
cp .env.example .env
```

Minimal configuration required to boot locally:

```env
# Clerk auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Database (Neon, Supabase, Vercel Postgres, etc.)
DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=require"

# Stripe subscriptions
STRIPE_API_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# App core
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

Optional:

```env
# Google Ads placements
NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID=""
NEXT_PUBLIC_GOOGLE_ADS_SLOT=""
```

### 3. Prepare the database

```bash
yarn db:push
yarn db:seed
```

### 4. Run the app

```bash
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to explore the learner dashboard and admin tools.

---

## 🔍 Key Workflows

- **Learners** progress through cloud-specific tracks, complete challenges, earn XP, and receive AI-generated recaps.
- **Authors** manage curricula in the `/admin` panel, where Chrome AI co-pilots question creation, hints, and solution explanations.
- **Operators** can enable Stripe billing, configure ads, and plug into analytics pipelines to track cohort performance.

---

## 🧪 Testing & Quality

- `yarn test` — Run Vitest unit and integration suites.
- `yarn lint` — Enforce coding standards via ESLint.
- `yarn typecheck` — Verify TypeScript boundaries across app, actions, and db layers.

CI configuration is designed to integrate easily with GitHub Actions or Vercel pipelines.

---

## 🚢 Production Deployment

### Pre-deployment

- **Environment variables**: Copy `.env.example` to `.env.production` and provide live credentials.

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."
DATABASE_URL="postgresql://prod-connection-string"
STRIPE_API_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_APP_URL="https://your-domain.com"
NODE_ENV="production"
```

- **Database**: Push schema and seed the production database.

```bash
yarn db:push
yarn db:seed
```

- **Regression tests**: Run `yarn test` with production env vars loaded so Vitest covers XP, hearts, quest flows, and UI state machines.

- **Stripe**: Configure live keys, set the webhook endpoint to `https://your-domain.com/api/webhooks/stripe`, and subscribe to `checkout.session.completed` plus `invoice.payment_succeeded`.

### Deployment targets

- **Vercel** (recommended): Connect the repository, add env vars via the dashboard, and deploy on push to `main`.
- **Docker**: `docker build -t cloudlingo .` then `docker run -p 3000:3000 --env-file .env.production cloudlingo`.
- **Node server**: `yarn build` followed by `yarn start`.

### Post-deployment checks

- `https://your-domain.com/api/health` responds with 200.
- Clerk sign-up and login succeed.
- Seeded course data renders as expected.
- Stripe checkout completes (run with test card before going live).
- Webhooks arrive; verify logs and Stripe dashboard events.

### Security hardening

- Production env vars stored securely.
- Database credentials restricted to the app.
- HTTPS certificates in place plus security headers configured.
- Stripe webhook secret validated on every call.
- CORS limited to the production domain.

### Monitoring ideas

- Error tracking with Sentry.
- Performance metrics via Vercel Analytics or your APM tool.
- Database dashboards (Neon, Supabase, etc.).
- Stripe dashboard alerts for payment failures.

### Common production issues

- Build failures: usually missing imports or TypeScript drifts—rerun `yarn build` locally.
- Database connection errors: inspect `DATABASE_URL` syntax or firewall rules.
- Stripe webhook 4xx: confirm the secret and public endpoint visibility.
- CORS complaints: ensure `NEXT_PUBLIC_APP_URL` matches the deployed hostname.

---

## 🧩 Environment Matrix

| Environment | Purpose | Deployment | Data Source | Notes |
| ----------- | ------- | ---------- | ----------- | ----- |
| `local`     | Day-to-day development | `yarn dev` | Docker/Postgres or Neon dev | Uses `.env` with test Clerk/Stripe keys |
| `staging`   | Pre-production QA, integration with partner services | Vercel preview or long-lived branch | Managed Postgres schema copy | Mirrors production configuration minus billing charges |
| `production`| Customer-facing traffic | Vercel production / Docker stack | Primary managed Postgres | Requires live Clerk + Stripe credentials and observability hooks |

- Keep schema migrations synchronized across environments with `yarn db:push`.
- Use dedicated Clerk instances per environment to avoid leaking users between spaces.
- Stripe test mode should back staging; enable `STRIPE_WEBHOOK_SECRET` for each stage.

---

## 🔒 Security & Compliance

- Enforce HTTPS everywhere; block plain HTTP at your CDN/load balancer.
- Rotate Clerk and Stripe credentials quarterly; store them in your secret manager (Vercel, Doppler, AWS Secrets Manager).
- Enable Clerk session JWT expiry and revoke tokens on password resets.
- Limit database roles: the app user should only have CRUD access to application schemas—no superuser privileges.
- Run `yarn lint` and `yarn test --run` as part of CI gating before main merges.
- Capture consent for analytics or tracking features in accordance with GDPR/CCPA if you enable them.

---

## 📈 Observability & Monitoring

- **Logging:** Forward `stdout`/`stderr` to your log service (Vercel Log Drains, Datadog, or OpenSearch). Include request IDs via Next.js middleware for traceability.
- **Metrics:** Track key counters—lesson completions, XP awards, failed payments. Stripe’s dashboard plus custom analytics events cover revenue and churn.
- **Tracing:** When deployed on Vercel, integrate OpenTelemetry export to your APM (ex: New Relic) for slow action tracing.
- **Alerts:** Configure:
  - Uptime monitor for `/api/health`
  - Stripe webhook delivery failures
  - Database connection pool saturation
  - Clerk authentication anomalies (sudden spike in failures)
- **Backups:** Ensure your Postgres provider retains daily snapshots. Test restoration quarterly.

---

## 🧭 Roadmap

- Team challenges with leaderboards for collaborative learning.
- Voice-driven sessions leveraging ElevenLabs or Web Speech API.
- Adaptive skill trees that update dynamically based on performance signals.
- DevOps expansion tracks (Kubernetes, Terraform, CI/CD).
- Certification prep mode with partner-backed micro-credentials.
- Chrome extension for on-page explanations inside consoles and docs.

Have an idea? Open an issue or start a discussion.

---

## 🤝 Contributing

Contributions are welcome—whether you are improving lesson content, shipping new tracks, refining the gamification layer, or hardening infrastructure. Please review the [docs](./docs/README.md) and open a PR.

---

## ⚠️ Disclaimer

CloudLingo is an independent educational product. It is not affiliated with or endorsed by Amazon Web Services, Microsoft Azure, or Google Cloud. Study with official certification resources alongside this platform.

---

**Happy learning. Stay curious.**

–– Built with ❤️ by [Behrouz](https://behrouz.nl)
