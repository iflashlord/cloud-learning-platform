# 📚 CloudLingo Documentation

Welcome to the CloudLingo knowledge base. This folder is intentionally lightweight—only the core references you need to build, operate, and extend the platform are kept here.

---

## 🚀 Start Here

- **Product & Environment Setup:** [Getting Started (AWS)](./getting-started-aws.md)
- **Operational Playbook:** [Admin Guide](./admin-guide.md)

These two docs cover local setup, seeding content, running the dev server, and managing the curriculum through the admin panel.

---

## 🧠 Platform Systems

- **AI Runtime:** [Chrome AI Integration](./chrome-ai-integration.md) – How CloudLingo uses Chrome’s on-device Prompt and Summarization APIs.
- **Gamification:** [Gamification System](./GAMIFICATION_SYSTEM.md) – XP, hearts, quests, streaks, leaderboards, and shop mechanics.
- **Design Language:** [Design System Overview](./design-system-overview.md) – Semantic tokens, component recipes, motion, and accessibility patterns.

---

## ✍️ Content Authoring

- **Question & Lesson Patterns:** [Content Quick Reference](./content-quick-reference.md) – Course map, question templates, and authoring tips to keep new content on brand.

---

## 🔧 Common Commands

```bash
yarn install        # Install dependencies
yarn db:push        # Apply Drizzle schema
yarn db:seed        # Load baseline content
yarn dev            # Start the Next.js app
yarn test           # Run Vitest suites
```

Need a fully automated setup? Use `./setup-aws.sh`.

---

## 🗂️ Repository Snapshot

```
aws-learning-platform/
├── README.md                 # Product overview
├── DEPLOYMENT.md             # Hosting guidance
├── app/, components/, lib/   # Next.js application code
├── actions/, store/          # Server actions & state
├── db/, drizzle/             # Schema, migrations, seeding
├── docs/                     # You are here
└── …
```

---

## 🤝 Contribute

If you add new systems or major flows, update or extend one of the existing docs to keep this folder focused. Prefer enhancing what exists over adding brand-new files—clarity beats volume.

Need more history or migration notes? Check commit messages or the main `README.md`; everything else has been intentionally archived to keep the signal high.
