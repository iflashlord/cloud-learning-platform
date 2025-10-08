# TechLingo - Interactive Technology Learning Platform

![TechLingo](https://img.shields.io/badge/TechLingo-Learning%20Platform-orange)

🎓 **Learn Technology Skills through Gamified Learning!**

This platform transforms the language learning experience into an engaging technology skill development tool. Master cloud computing, system architecture, development, and DevOps through interactive quizzes, challenges, and a gamified learning experience.

Originally based on a Duolingo clone, now fully transformed into a comprehensive technology learning platform.

## 🎨 Easy Rebranding System

**Change the platform name in one place and update everywhere!**

- 📝 Edit `/lib/config.ts` to change `PLATFORM_NAME` and other branding
- 🔄 Run `npm run sync:branding` to update package.json
- ✅ All components, pages, and metadata update automatically

**[📖 Full Branding Guide](./docs/BRANDING_SYSTEM.md)**

## 🚀 Key Features

### Technology Learning Content
- ☁️ **4 Technology Learning Paths**: Cloud Fundamentals, System Architecture, Development, DevOps & Operations
- 📚 **Structured Learning**: Units, lessons, and quizzes covering technology concepts
- 🎯 **Interactive Quizzes**: Multiple choice and fill-in-the-blank questions
- 🌟 **Cloud Fundamentals**: Complete starter content with 4 units and 13 lessons

### Gamification
- ❤️ **Hearts System**: Lives that make learning engaging
- ⭐ **XP/Points System**: Earn points for correct answers
- 🏆 **Leaderboard**: Compete with other technology learners
- 🎯 **Daily Quests**: Bonus challenges for consistent learning
- 🛍 **Shop System**: Exchange points for hearts and power-ups
- 💳 **Pro Tier**: Unlimited hearts via Stripe subscription

### Technical Stack
- � **Next.js 14** with Server Actions
- 🎨 **Shadcn UI** for beautiful components
- 🔐 **Clerk** for authentication
- 🌧 **DrizzleORM** for database operations
- 💾 **PostgreSQL** (NeonDB)
- � **React Admin** dashboard for content management
- 🚀 **Vercel** ready for deployment
- 📱 **Mobile responsive** design

## 📚 Technology Content Included

### Cloud Fundamentals (Foundational)
- **Unit 1: Cloud Concepts** - 5 lessons covering fundamentals, benefits, architecture
- **Unit 2: Security & Compliance** - 3 lessons on shared responsibility, IAM, security
- **Unit 3: Technology & Services** - 3 lessons covering EC2, S3, RDS
- **Unit 4: Billing & Pricing** - 2 lessons on pricing models and cost management

**Total: 13 lessons with 16 interactive quiz questions**

### Coming Soon
- System Architecture
- Software Development
- DevOps & Operations

## 🚀 Quick Start

### Prerequisites

**Node version 14.x or higher**

### Install packages

```shell
npm install
```

### Setup .env file


```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
DATABASE_URL="postgresql://..."
STRIPE_API_KEY=""
NEXT_PUBLIC_APP_URL="http://localhost:3000"
STRIPE_WEBHOOK_SECRET=""
```

### Setup Database

Push the schema to your database:

```shell
npm run db:push
```

Seed with technology content:

```shell
npm run db:seed
```

### Start the Development Server

```shell
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to start learning technology skills!

## 📖 Documentation

For detailed information about the AWS transformation:

- **[Documentation Index](./docs/README.md)** - Map of every guide and report
- **[Getting Started (AWS)](./docs/getting-started-aws.md)** - Quick start guide
- **[AWS Transformation Guide](./docs/guides/aws-transformation-guide.md)** - Content structure and expansion
- **[Content Quick Reference](./docs/guides/content-quick-reference.md)** - Handy reference for adding content
- **[Project Checklist](./docs/checklist.md)** - Todo items and testing checklist
- **[Admin Guide](./docs/admin/guide.md)** - ⭐ Complete admin panel user guide (NEW!)
- **[Admin Quick Reference](./docs/admin/quick-reference.md)** - One-page workflow card

## 🎓 How It Works

1. **Select Your Path**: Choose an AWS certification (start with Cloud Practitioner)
2. **Learn by Doing**: Complete interactive lessons with quiz questions
3. **Earn XP**: Get points for correct answers
4. **Stay Engaged**: Hearts system keeps you focused
5. **Compete**: Climb the leaderboard
6. **Complete Quests**: Daily challenges for bonus XP
7. **Track Progress**: See your advancement through certification domains

## 🛠 Admin Dashboard

**✨ NEWLY IMPROVED!** Professional, intuitive interface for content management.

Access the admin panel at `/admin` to:

- **Unified Course View** ⭐ NEW! - See ALL content for a certification in one place
- **Manage AWS Certifications**: Add and edit certification paths
- **Create Questions**: Streamlined workflow with inline answer management
- **Edit Answers**: Visual badges showing correct/incorrect status
- **Search & Filter**: Find content quickly with advanced filters
- **Review Content**: Statistics dashboard with content counts

### Latest Admin Features (October 2025)

- 🎯 **Unified Course Management** ⭐ NEW! - All units, lessons, and questions for a certification in one tabbed view
- 📊 **Statistics Dashboard**: See content counts at a glance (Units, Lessons, Questions)
- 🎨 **AWS-Themed UI**: Orange/blue color scheme matching AWS brand
- 📋 **Tabbed Interface**: Question details, answers, and preview in one place
- ✅ **Visual Status Badges**: Instantly see correct answers with green checkmarks
- 🔍 **Advanced Filters**: Search by question text, lesson, or type
- 📊 **Inline Management**: Add/edit/delete answers without leaving the question page
- 💡 **Smart Guidance**: Step-by-step hints and quality reminders
- 🚀 **80% Faster**: Unified view eliminates navigation between sections

**📖 Documentation:**
- [Admin Guide](./docs/admin/guide.md) - Complete admin panel guide
- [Unified Course Management](./docs/admin/unified-course-management.md) - ⭐ Unified view guide (NEW!)

## 💳 Monetization

Pro subscription includes:
- Unlimited hearts
- Access to all certification paths
- Priority support
- Ad-free experience

## 🤝 Contributing

Contributions are welcome! Areas to contribute:
- More AWS questions for existing lessons
- New certification content
- UI/UX improvements
- Bug fixes

## ⚠️ Disclaimer

This is a technology learning platform. Content is based on industry best practices and documentation from various technology providers.

## 📝 License

For educational purposes.

## 📋 Development Plan & Roadmap

### Phase 1: Foundation ✅ COMPLETE
**Goal:** Transform the base platform from language learning to AWS certification prep

- [x] Database schema transformation with AWS content
- [x] Create 4 AWS certification courses structure
- [x] Build AWS Cloud Practitioner base content (4 units, 13 lessons)
- [x] Add 16 starter quiz questions with accurate answers
- [x] Update all UI components with AWS branding
- [x] Change color scheme to AWS orange theme
- [x] Create AWS certification badge SVGs
- [x] Write comprehensive documentation
- [x] Create setup automation scripts

### Phase 2: Content Expansion 🔄 IN PROGRESS
**Goal:** Build comprehensive question banks for each certification

#### Cloud Practitioner (Target: 250 questions)
- [x] Unit 1: Cloud Concepts - 16 questions (Target: 65)
  - [ ] Add deployment models questions
  - [ ] Add well-architected framework questions
  - [ ] Add cloud economics scenarios
  - [ ] Add global infrastructure deep dive

- [ ] Unit 2: Security & Compliance - 0 additional (Target: 60)
  - [ ] Expand IAM policies and permissions
  - [ ] Add compliance programs (HIPAA, PCI-DSS, etc.)
  - [ ] Add encryption and data protection
  - [ ] Add security services (WAF, Shield, GuardDuty)

- [ ] Unit 3: Technology & Services - 0 additional (Target: 85)
  - [ ] Add compute services (Lambda, ECS, EKS)
  - [ ] Expand storage services (EFS, FSx, Storage Gateway)
  - [ ] Add database services (DynamoDB, Aurora, ElastiCache)
  - [ ] Add networking (VPC, Route 53, CloudFront)
  - [ ] Add application integration (SQS, SNS, EventBridge)

- [ ] Unit 4: Billing & Pricing - 0 additional (Target: 40)
  - [ ] Add cost optimization strategies
  - [ ] Add AWS Organizations and consolidated billing
  - [ ] Add Cost Explorer and budgets
  - [ ] Add pricing calculators and TCO

#### Solutions Architect Associate (Target: 400 questions)
- [ ] Design Resilient Architectures (30%)
  - [ ] Multi-tier architecture design
  - [ ] Disaster recovery strategies
  - [ ] High availability and fault tolerance
  - [ ] Decoupling mechanisms

- [ ] Design High-Performance Architectures (28%)
  - [ ] Scalable storage solutions
  - [ ] Elastic and scalable compute
  - [ ] High-performing database solutions
  - [ ] Network architecture optimization

- [ ] Design Secure Applications (24%)
  - [ ] Secure access to AWS resources
  - [ ] Security controls for applications
  - [ ] Data encryption strategies

- [ ] Design Cost-Optimized Architectures (18%)
  - [ ] Cost-effective storage solutions
  - [ ] Cost-effective compute resources
  - [ ] Design cost-optimized database solutions

#### Developer Associate (Target: 350 questions)
- [ ] Development with AWS Services (32%)
- [ ] Security (26%)
- [ ] Deployment (24%)
- [ ] Troubleshooting & Optimization (18%)

#### SysOps Administrator (Target: 350 questions)
- [ ] Monitoring, Logging & Remediation (20%)
- [ ] Reliability & Business Continuity (16%)
- [ ] Deployment, Provisioning & Automation (18%)
- [ ] Security & Compliance (16%)
- [ ] Networking & Content Delivery (18%)
- [ ] Cost & Performance Optimization (12%)

### Phase 3: Enhanced Learning Features 📅 PLANNED
**Goal:** Improve the learning experience with advanced features

#### Q4 2025
- [ ] **Answer Explanations System**
  - [ ] Add detailed explanations for correct answers
  - [ ] Add explanations for why wrong answers are incorrect
  - [ ] Include AWS documentation links
  - [ ] Add visual diagrams where helpful

- [ ] **Practice Exam Mode**
  - [ ] Timed exam simulation (90 minutes)
  - [ ] Random question selection
  - [ ] Exam-like interface
  - [ ] Score calculation and pass/fail indication
  - [ ] Review mode after completion

- [ ] **Study Tools**
  - [ ] Flashcard system for key concepts
  - [ ] Bookmarking difficult questions
  - [ ] Notes feature for each lesson
  - [ ] Progress tracking by exam domain

#### Q1 2026
- [ ] **Content Enhancements**
  - [ ] Add AWS service icons to questions
  - [ ] Include scenario-based questions
  - [ ] Add code snippet questions
  - [ ] Video explanations for complex topics

- [ ] **Performance Analytics**
  - [ ] Detailed progress dashboard
  - [ ] Weak areas identification
  - [ ] Study recommendations
  - [ ] Certification readiness score

- [ ] **Social Features**
  - [ ] Study groups/teams
  - [ ] Discussion forums per question
  - [ ] Share achievements
  - [ ] Mentor/mentee matching

### Phase 4: Advanced Features 📅 FUTURE
**Goal:** Create a comprehensive AWS learning ecosystem

#### Q2-Q3 2026
- [ ] **AI-Powered Features**
  - [ ] AI tutor chatbot (using AWS Bedrock)
  - [ ] Personalized learning paths
  - [ ] Adaptive difficulty based on performance
  - [ ] Natural language question answering

- [ ] **Professional Features**
  - [ ] Study plan generator
  - [ ] Certification exam scheduling integration
  - [ ] Corporate/team accounts
  - [ ] Learning analytics for organizations
  - [ ] Custom content creation for enterprises

- [ ] **Content Integration**
  - [ ] AWS hands-on labs integration
  - [ ] Real AWS console simulations
  - [ ] Integration with AWS Skill Builder
  - [ ] Partnership with training providers

- [ ] **Specialty Certifications**
  - [ ] AWS Security Specialty
  - [ ] AWS Machine Learning Specialty
  - [ ] AWS Data Analytics Specialty
  - [ ] AWS Database Specialty
  - [ ] AWS Advanced Networking Specialty

### Phase 5: Ecosystem & Community 📅 2027
**Goal:** Build a thriving learning community

- [ ] **Mobile Applications**
  - [ ] Native iOS app
  - [ ] Native Android app
  - [ ] Offline mode for studying
  - [ ] Push notifications for daily quests

- [ ] **Community Platform**
  - [ ] Community-contributed questions (reviewed)
  - [ ] Expert Q&A sessions
  - [ ] Success stories and testimonials
  - [ ] Blog with AWS tips and tricks

- [ ] **Partnerships & Integrations**
  - [ ] Integration with LinkedIn Learning
  - [ ] Credly badges for certifications
  - [ ] Employer verification system
  - [ ] Corporate training partnerships

## 🎯 Short-Term Roadmap (Next 3 Months)

### Month 1: Content Foundation
- [ ] Add 50 more Cloud Practitioner questions (Total: 66)
- [ ] Add explanations to all existing questions
- [ ] Create 5 more lessons for Cloud Practitioner
- [ ] Beta test with 10 AWS-certified users

### Month 2: Feature Development
- [ ] Implement answer explanations system
- [ ] Add AWS documentation links
- [ ] Create practice exam mode (beta)
- [ ] Improve mobile responsiveness
- [ ] Add progress tracking dashboard

### Month 3: Content & Polish
- [ ] Complete Cloud Practitioner content (150+ questions)
- [ ] Begin Solutions Architect content (50 questions)
- [ ] User testing and feedback incorporation
- [ ] Performance optimization
- [ ] Deploy to production

## 📊 Success Metrics

### User Engagement
- **Target:** 1,000 active users in first 3 months
- **Daily Active Users:** Track daily engagement
- **Completion Rate:** % of users completing lessons
- **Return Rate:** % of users returning within 7 days

### Learning Outcomes
- **Certification Pass Rate:** Track users who pass AWS exams
- **Average Score:** Track quiz performance
- **Time to Completion:** Average time to complete a certification path
- **User Satisfaction:** Net Promoter Score (NPS)

### Content Quality
- **Question Accuracy:** 99%+ technically accurate
- **Content Coverage:** 100% of exam objectives covered
- **Update Frequency:** Quarterly content reviews
- **Community Contribution:** User-submitted questions reviewed

### Business Metrics
- **Conversion Rate:** Free to Pro subscription
- **Monthly Recurring Revenue:** Pro subscriptions
- **Customer Acquisition Cost:** Marketing efficiency
- **Lifetime Value:** Average user revenue

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Content Contributions
- **Add Questions:** Submit AWS certification questions (original only)
- **Review Content:** Help verify technical accuracy
- **Write Explanations:** Add detailed answer explanations
- **Create Diagrams:** Visual aids for complex concepts

### Code Contributions
- **Bug Fixes:** Help identify and fix issues
- **Feature Development:** Implement new features from roadmap
- **UI/UX Improvements:** Enhance user experience
- **Performance Optimization:** Speed improvements

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Do NOT use actual AWS exam questions
- Ensure content accuracy with AWS documentation

## ⚠️ Disclaimer

This is an unofficial AWS learning tool created for educational purposes. Content is based on publicly available AWS documentation and is not affiliated with, endorsed by, or sponsored by Amazon Web Services, Inc. or its affiliates.

**Important:**
- This platform does NOT contain actual AWS exam questions
- All content is created independently based on AWS documentation
- Passing exams requires comprehensive study beyond this platform
- Always refer to official AWS resources for exam preparation

## 📝 License

MIT License

Copyright (c) 2025 AWS Cloud Academy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 🙏 Acknowledgments

- Original Duolingo clone tutorial by [Antonio Erdeljac](https://github.com/AntonioErdeljac)
- AWS Documentation team for comprehensive resources
- All contributors and beta testers
- The AWS certification community

## 📞 Contact & Support

- **Documentation:** See [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)
- **Issues:** Report bugs via GitHub Issues
- **Discussions:** Join discussions in GitHub Discussions
- **Email:** support@awscloudacademy.example (update with actual email)

## 🌟 Show Your Support

If this project helps you prepare for AWS certifications:
- ⭐ Star this repository
- 🐦 Share on Twitter
- 💼 Share on LinkedIn
- 📝 Write a review or testimonial
- 🤝 Contribute to the project

---

**Happy Learning!** ☁️ Master AWS certifications one question at a time!

Made with ❤️ for the AWS learning community
