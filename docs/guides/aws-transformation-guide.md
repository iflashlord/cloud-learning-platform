# AWS Learning Game Transformation Guide

## Overview
This project has been transformed from a Duolingo language learning clone into an AWS certification learning game. Each "course" represents an AWS certification path, starting with AWS Cloud Practitioner.

## Current Course Structure

### Course 1: AWS Cloud Practitioner
The foundational AWS certification, divided into 4 main units:

#### Unit 1: Cloud Concepts (5 lessons)
- What is Cloud Computing?
- Benefits of AWS Cloud
- Cloud Architecture
- AWS Global Infrastructure
- Cloud Economics

#### Unit 2: Security & Compliance (3 lessons)
- Shared Responsibility Model
- IAM Basics
- Security Services

#### Unit 3: Technology & Services (3 lessons)
- EC2 Fundamentals
- S3 Storage
- RDS & Databases

#### Unit 4: Billing & Pricing (2 lessons)
- Pricing Models
- Cost Management

## Images Needed

Create or download SVG icons for the following and place them in the `/public` folder:

### Certification Badges
- `aws-cloud-practitioner.svg` - Cloud Practitioner badge
- `aws-solutions-architect.svg` - Solutions Architect badge
- `aws-developer.svg` - Developer badge
- `aws-sysops.svg` - SysOps Administrator badge

### Optional Service Icons
You can add AWS service icons for a richer experience:
- `aws-ec2.svg`
- `aws-s3.svg`
- `aws-rds.svg`
- `aws-iam.svg`
- `aws-lambda.svg`
- etc.

## How to Add More Content

### Adding More Lessons
Edit `scripts/seed.ts` and add more lessons to existing units:

```typescript
{
  id: 14,
  unitId: 3, // Technology & Services
  order: 4,
  title: "Lambda Serverless",
}
```

### Adding More Challenges
Add challenges for your lessons:

```typescript
{
  id: 17,
  lessonId: 14, // Lambda Serverless lesson
  type: "SELECT",
  order: 1,
  question: 'What is AWS Lambda?',
}
```

### Adding Challenge Options
Add answer choices:

```typescript
{
  challengeId: 17,
  correct: true,
  text: "A serverless compute service",
},
{
  challengeId: 17,
  correct: false,
  text: "A database service",
}
```

## Future Certification Courses

### Course 2: AWS Solutions Architect Associate
Units to add:
- Design Resilient Architectures
- Design High-Performing Architectures
- Design Secure Applications
- Design Cost-Optimized Architectures

### Course 3: AWS Developer Associate
Units to add:
- Deployment
- Security
- Development with AWS Services
- Refactoring
- Monitoring and Troubleshooting

### Course 4: AWS SysOps Administrator
Units to add:
- Monitoring and Reporting
- High Availability
- Deployment and Provisioning
- Storage and Data Management
- Security and Compliance
- Networking
- Automation and Optimization

## Running the Seed Script

After making changes, reseed your database:

```bash
npm run db:seed
```

## Customization Tips

1. **Update mascot**: Replace `/mascot.svg` with an AWS-themed character
2. **Update hero**: Replace `/hero.svg` with AWS cloud imagery
3. **Sound effects**: Keep the existing success/failure sounds or replace with AWS-themed ones
4. **Colors**: Update the theme in `tailwind.config.ts` to match AWS brand colors (orange/blue)
5. **Naming**: Update app title in `app/layout.tsx` from "Lingo" to "AWS Cloud Academy" or similar

## Challenge Types

The app supports two challenge types:
- `SELECT`: Multiple choice questions
- `ASSIST`: Fill-in-the-blank or matching questions

You can expand these in `db/schema.ts` by adding more enum values to `challengesEnum`.

## XP and Progression

- Each correct answer grants XP (points)
- Hearts represent lives (incorrect answers reduce hearts)
- Quests incentivize consistent learning
- Leaderboard encourages competition

## Recommended Question Sources

1. AWS Official Practice Exams
2. AWS Whitepapers
3. AWS Documentation
4. AWS Skill Builder courses
5. AWS Certified Cloud Practitioner Exam Guide

## Legal Note

Make sure to:
- Not use actual AWS exam questions (violation of AWS testing policies)
- Create original questions inspired by AWS documentation
- Consider adding a disclaimer that this is not official AWS training
- Review AWS trademark usage guidelines if publishing publicly
