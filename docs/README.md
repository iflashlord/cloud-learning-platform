# 📚 AWS Cloud Academy - Documentation Index

Welcome to the AWS Cloud Academy documentation! This index will help you find the information you need.

## 🎯 New User? Start Here!

1. **[Getting Started (AWS)](./getting-started-aws.md)** ⭐
   - Quick setup instructions
   - How to run the project
   - First steps guide

2. **[Setup Script](../setup-aws.sh)**
   - Run `./setup-aws.sh` to automate local setup
   - Installs dependencies and seeds data

3. **[view-summary.sh](../view-summary.sh)**
   - Run `./view-summary.sh` for a quick overview
   - Shows transformation summary in terminal

4. **[Project Checklist](./checklist.md)**
   - Track outstanding tasks and testing status
   - Handy reference during development

## 📖 Detailed Documentation

### Platform Guides
- **[Getting Started (AWS)](./getting-started-aws.md)** - Environment setup and first steps
- **[Content Quick Reference](./guides/content-quick-reference.md)** - Templates and examples for adding content
- **[AWS Transformation Guide](./guides/aws-transformation-guide.md)** - Content structure and expansion strategy
- **[Project Checklist](./checklist.md)** - Todo items and progress tracking

### Design System
- **[Design System Overview](./design-system-overview.md)** - Semantic tokens, component recipes, and accessibility baselines

### Admin Panel
- **[Admin Guide](./admin/guide.md)** - Complete walkthrough of the admin experience
- **[Quick Reference](./admin/quick-reference.md)** - One-page workflow card for content creators
- **[Testing Checklist](./admin/testing-checklist.md)** - Regression checklist for releases
- **Feature Deep Dives:** [Lesson Edit Enhancements](./admin/lesson-edit-enhancement.md), [Unified Course Management](./admin/unified-course-management.md), [Workflow Improvements](./admin/workflow-improvements-visual.md)
- **Transformation Reports:** [Complete Transformation](./admin/complete-transformation.md), [Transformation Complete](./admin/transformation-complete.md), [Unified View Summary](./admin/unified-view-summary.md), [Improvements Summary](./admin/improvements-summary.md), [Fixes – 2025-10-07](./admin/fixes-2025-10-07.md)

### Historical Reports
- **[Complete Changelog](./history/complete-changelog.md)** - Every file changed, line by line
- **[Phase 2 Complete](./history/phase2-complete.md)** - UI/UX transformation details
- **[Transformation Summary](./history/transformation-summary.md)** - Phase 1 database changes
- **[Transformation Complete](./history/transformation-complete.md)** - Overall completion summary
- **[README Expansion](./history/readme-expansion.md)** & [Expansion Complete](./history/readme-expansion-complete.md) - README planning work

## 🚀 Quick Commands

```bash
# Setup (first time)
npm install
npm run db:push
npm run db:seed

# Or use automation
./setup-aws.sh

# Development
npm run dev                # Start dev server
npm run db:studio          # View database

# Database operations
npm run db:reset           # Reset database
npm run db:seed            # Seed with AWS content
npm run db:prod            # Production seed

# View summary
./view-summary.sh
```

## 📋 Documentation by Purpose

### I want to...

#### ...understand what changed
→ Read **[Complete Changelog](./history/complete-changelog.md)**

#### ...get started quickly
→ Read **[Getting Started (AWS)](./getting-started-aws.md)**
→ Run **[setup-aws.sh](../setup-aws.sh)**

#### ...add more questions
→ Read **[Content Quick Reference](./guides/content-quick-reference.md)**
→ Edit `scripts/seed.ts`

#### ...add a new certification
→ Read **[AWS Transformation Guide](./guides/aws-transformation-guide.md)**
→ Follow the course structure pattern

#### ...work inside the admin panel
→ Read **[Admin Guide](./admin/guide.md)**
→ Keep **[Quick Reference](./admin/quick-reference.md)** open while editing

#### ...track my progress
→ Use **[Project Checklist](./checklist.md)**

#### ...understand the content structure
→ Read **[Content Quick Reference](./guides/content-quick-reference.md)**

#### ...see all UI changes
→ Read **[Phase 2 Complete](./history/phase2-complete.md)** and **[Lesson Edit Enhancements](./admin/lesson-edit-enhancement.md)**

#### ...customize the branding
→ See customization section in **[AWS Transformation Guide](./guides/aws-transformation-guide.md)**

## 🗂️ File Structure

```
my-duo-lingo/
├── docs/
│   ├── README.md
│   ├── checklist.md
│   ├── getting-started-aws.md
│   ├── admin/
│   │   ├── complete-transformation.md
│   │   ├── fixes-2025-10-07.md
│   │   ├── guide.md
│   │   ├── improvements-summary.md
│   │   ├── lesson-edit-enhancement.md
│   │   ├── quick-reference.md
│   │   ├── testing-checklist.md
│   │   ├── transformation-complete.md
│   │   ├── unified-course-management.md
│   │   ├── unified-view-summary.md
│   │   └── workflow-improvements-visual.md
│   ├── guides/
│   │   ├── aws-transformation-guide.md
│   │   └── content-quick-reference.md
│   └── history/
│       ├── complete-changelog.md
│       ├── phase2-complete.md
│       ├── readme-expansion-complete.md
│       ├── readme-expansion.md
│       ├── transformation-complete.md
│       └── transformation-summary.md
├── README.md
├── app/
├── scripts/
├── public/
├── prisma/
└── …
```

## 🎓 Content Overview

### AWS Cloud Practitioner (Current)
- **Unit 1:** Cloud Concepts (5 lessons)
- **Unit 2:** Security & Compliance (3 lessons)
- **Unit 3:** Technology & Services (3 lessons)
- **Unit 4:** Billing & Pricing (2 lessons)
- **Total:** 13 lessons, 16 questions

### Ready to Add
- AWS Solutions Architect Associate
- AWS Developer Associate
- AWS SysOps Administrator Associate

## 💡 Common Tasks

### Add a New Question
1. Open `scripts/seed.ts`
2. Find the `db.insert(schema.challenges).values([...])` section
3. Add your question following the pattern
4. Add answer options in `challengeOptions` section
5. Run `npm run db:seed`

### Add a New Lesson
1. Open `scripts/seed.ts`
2. Find the `db.insert(schema.lessons).values([...])` section
3. Add your lesson with proper `unitId` and `order`
4. Add challenges for that lesson
5. Run `npm run db:seed`

### Change Branding Colors
1. Open `tailwind.config.ts`
2. Update color theme
3. Search for `green-` in components and replace with your color
4. Rebuild the app

### Update App Name
1. Open `app/layout.tsx` - Update metadata
2. Open `app/(marketing)/header.tsx` - Update header
3. Open `components/sidebar.tsx` - Update sidebar
4. Rebuild the app

## 🎯 Next Steps

### Immediate (Today)
1. Run setup: `./setup-aws.sh`
2. Start dev server: `npm run dev`
3. Test the application
4. Review quiz questions

### Short Term (This Week)
1. Add more questions (aim for 8-12 per lesson)
2. Review content accuracy
3. Test on mobile devices
4. Get feedback from AWS users

### Medium Term (This Month)
1. Complete other certification content
2. Add answer explanations
3. Integrate AWS documentation links
4. Deploy to production

### Long Term (Next Quarter)
1. Add practice exam mode
2. Create video tutorials
3. Build community features
4. Launch marketing campaign

## 🆘 Troubleshooting

### Database Issues
- **Error during seed:** Check your DATABASE_URL in `.env`
- **Schema mismatch:** Run `npm run db:push` before seeding
- **Duplicate data:** Run `npm run db:reset` then `npm run db:seed`

### Build Issues
- **Module not found:** Run `npm install`
- **TypeScript errors:** Check imports and types
- **Linting errors:** Run `npm run lint`

### Runtime Issues
- **Auth not working:** Check Clerk API keys
- **Stripe errors:** Verify Stripe keys
- **Images not loading:** Check public folder and paths

## 📞 Getting Help

### Resources
1. **This documentation** - Start here!
2. **Code comments** - Check inline documentation
3. **Original README** - Technical setup details
4. **AWS Documentation** - For content accuracy

### Before Asking for Help
1. Check the relevant documentation file
2. Read error messages carefully
3. Search existing issues
4. Verify environment variables

## 🎊 Success!

You now have:
✅ Complete AWS learning platform
✅ Gamified experience
✅ Admin dashboard
✅ Comprehensive documentation
✅ Setup automation
✅ Ready for expansion

**Happy learning and happy coding!** ☁️🚀

---

## Quick Links

- [Main README](./README.md)
- [Quick Start](./getting-started-aws.md)
- [Content Guide](./guides/aws-transformation-guide.md)
- [Quick Reference](./guides/content-quick-reference.md)
- [Checklist](./checklist.md)
- [Complete Changes](./history/complete-changelog.md)

---

*Last updated: October 7, 2025*
*AWS Cloud Academy - Master AWS Certifications Through Gamified Learning*
