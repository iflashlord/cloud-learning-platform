# 🌩️ CloudLingo — Cloud Technology Learning Platform

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-green?logo=drizzle)

**CloudLingo** is a gamified, interactive learning platform for mastering **cloud technologies** and **certifications** — inspired by *Duolingo*, built for engineers.
Learn **AWS**, **Azure**, and **Google Cloud** through bite-sized, hands-on lessons that make learning fun, fast, and unforgettable.

---

## 🚀 Key Features

* 🎮 **Gamified Learning System** — Earn **XP**, collect **Gems**, maintain **Streaks**, and complete **Quests**. Learning feels like a game, not a chore.
* ☁️ **Multi-Cloud Tracks** — From fundamentals to advanced paths for **AWS**, **Azure**, and **Google Cloud**.
* 🧠 **Interactive Lessons** — Practice with multiple-choice, fill-in-the-blank, and drag-and-drop challenges.
* 🏆 **Leaderboards & Competitions** — Compete with other learners globally and climb the ranks.
* 🛒 **Shop & Power-Ups** — Use gems to refill hearts or unlock boosts.
* 💎 **Pro Subscription** — Unlimited hearts, premium courses, ad-free learning, and more (via **Stripe**).
* 🧰 **Admin Dashboard** — Manage courses, units, lessons, and challenges from `/admin`.
* 🎨 **Theme Customization** — Configure unique course themes directly in the dashboard.
* 💰 **Monetization Ready** — Supports **Stripe payments** and **Google Ads** out of the box.

---

## 🧱 Tech Stack

| Category              | Technology                               |
| --------------------- | ---------------------------------------- |
| **Framework**         | Next.js 14 (App Router)                  |
| **Language**          | TypeScript 5                             |
| **UI & Styling**      | Tailwind CSS + Shadcn/UI + Radix UI      |
| **Database**          | PostgreSQL (Neon/Postgres) + Drizzle ORM |
| **Auth**              | Clerk                                    |
| **Payments**          | Stripe                                   |
| **Testing**           | Vitest                                   |
| **Docs & Components** | Storybook                                |

---

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/iflashlord/cloud-learning-platform.git
cd cloud-learning-platform
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Configure environment variables

Copy `.env.example` → `.env` and fill in your credentials.

```bash
cp .env.example .env
```

### 4. Setup the database

```bash
yarn db:push
yarn db:seed
```

### 5. Start the dev server

```bash
yarn dev
```

Your app runs at: **[http://localhost:3000](http://localhost:3000)**

---

## 🔧 Example `.env`

```env
# Clerk (https://clerk.com/)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Database (Neon, Vercel Postgres, etc.)
DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=require"

# Stripe (https://stripe.com/)
STRIPE_API_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# Google Ads
NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID=""
NEXT_PUBLIC_GOOGLE_ADS_SLOT=""
```

---

## 📘 Documentation

* [📚 Main Docs](./docs/README.md)
* [🚀 Getting Started (AWS)](./docs/getting-started-aws.md)
* [🛠️ Admin Guide](./docs/admin/guide.md)
* [🎨 Branding System](./docs/BRANDING_SYSTEM.md)

---

## 🤝 Contributing

We welcome contributions!
You can:

* Add new cloud lessons or quizzes
* Improve UX and gamification
* Help with backend or testing

---

## ⚠️ Disclaimer

CloudLingo is an **independent educational project**.
It is not affiliated with or endorsed by **AWS**, **Microsoft Azure**, or **Google Cloud**.
No official exam questions are used — always study from the **official sources** alongside this app.

---

## 🌥️ Vision

> “Our goal is to make cloud learning as fun and addictive as scrolling TikTok — but a lot more useful.”

---

**Happy Learning! ☁️**
Made with ❤️ by [Behrouz](https://behrouz.nl)
