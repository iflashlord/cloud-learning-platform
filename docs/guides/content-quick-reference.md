# 📘 Quick Reference - AWS Cloud Practitioner Content

## Course Structure Overview

```
AWS Cloud Practitioner
│
├─── Unit 1: Cloud Concepts (5 lessons)
│    ├── Lesson 1: What is Cloud Computing?
│    ├── Lesson 2: Benefits of AWS Cloud
│    ├── Lesson 3: Cloud Architecture
│    ├── Lesson 4: AWS Global Infrastructure
│    └── Lesson 5: Cloud Economics
│
├─── Unit 2: Security & Compliance (3 lessons)
│    ├── Lesson 6: Shared Responsibility Model
│    ├── Lesson 7: IAM Basics
│    └── Lesson 8: Security Services
│
├─── Unit 3: Technology & Services (3 lessons)
│    ├── Lesson 9: EC2 Fundamentals
│    ├── Lesson 10: S3 Storage
│    └── Lesson 11: RDS & Databases
│
└─── Unit 4: Billing & Pricing (2 lessons)
     ├── Lesson 12: Pricing Models
     └── Lesson 13: Cost Management
```

## Sample Questions by Topic

### Cloud Computing Basics
- What is Cloud Computing?
- Cloud deployment models (Public, Private, Hybrid)
- On-demand resource access

### AWS Benefits
- Pay-as-you-go pricing
- CapEx vs OpEx
- Scalability and elasticity

### Infrastructure
- AWS Regions
- Availability Zones
- Edge Locations

### Security
- Shared Responsibility Model
- IAM (Identity and Access Management)
- Root account best practices

### Core Services
- **EC2**: Elastic Compute Cloud (Virtual servers)
- **S3**: Simple Storage Service (Object storage, 5TB limit per object)
- **RDS**: Relational Database Service

## Key AWS Concepts to Know

### Compute
- EC2 instances are virtual servers
- Different instance types for different workloads
- Pay only for what you use

### Storage
- S3 for object storage
- EBS for block storage
- Glacier for archival

### Database
- RDS for relational databases
- DynamoDB for NoSQL
- Aurora for MySQL/PostgreSQL compatible DB

### Networking
- VPC (Virtual Private Cloud)
- Security Groups
- Route 53 for DNS

### Security
- IAM for access management
- MFA (Multi-Factor Authentication)
- Encryption at rest and in transit

### Pricing
- On-Demand: Pay by the hour/second
- Reserved: 1-3 year commitment, discount
- Spot: Bid for unused capacity
- Savings Plans: Flexible pricing

## Question Types in the App

### SELECT (Multiple Choice)
User selects one correct answer from multiple options.

Example:
```
Q: What does EC2 stand for?
A) Elastic Compute Cloud ✓
B) Elastic Container Cloud
C) Enterprise Compute Cloud
```

### ASSIST (Fill in the Blank)
User completes a sentence or matches terms.

Example:
```
Q: Complete: Cloud computing provides ____ access to IT resources
A) on-demand ✓
B) scheduled
C) limited
```

## Adding New Questions - Quick Template

```typescript
// In scripts/seed.ts

// 1. Add Challenge (Question)
{
  id: NEXT_ID,
  lessonId: LESSON_ID,
  type: "SELECT", // or "ASSIST"
  order: ORDER_NUMBER,
  question: 'Your question here?',
}

// 2. Add Challenge Options (Answers)
{
  challengeId: CHALLENGE_ID,
  correct: true, // or false
  text: "Answer text",
  imageSrc: "/optional-image.svg", // optional
  audioSrc: "/optional-audio.mp3", // optional
}
```

## Exam Domain Weights (for reference)

Based on AWS Cloud Practitioner exam:
1. **Cloud Concepts**: 26%
2. **Security & Compliance**: 25%
3. **Technology**: 33%
4. **Billing & Pricing**: 16%

Your content distribution:
- Cloud Concepts: 5 lessons (38%)
- Security: 3 lessons (23%)
- Technology: 3 lessons (23%)
- Billing: 2 lessons (15%)

## Tips for Creating Questions

1. **Be Specific**: Avoid ambiguous questions
2. **Use Real Scenarios**: Base questions on real AWS use cases
3. **Verify Accuracy**: Cross-reference with AWS documentation
4. **Good Distractors**: Wrong answers should be plausible
5. **One Correct Answer**: Only one option should be clearly correct
6. **Appropriate Level**: Match the certification level (foundational)

## Common Question Patterns

### Definition Questions
"What is [AWS Service]?"
"What does [Acronym] stand for?"

### Comparison Questions
"What is the difference between [A] and [B]?"
"When would you use [Service A] vs [Service B]?"

### Best Practice Questions
"What is the best practice for [scenario]?"
"Which approach is recommended for [use case]?"

### Scenario Questions
"You need to [requirement]. Which service would you use?"
"A company wants to [goal]. What should they do?"

### Responsibility Questions
"Who is responsible for [task]?"
"What is [AWS/Customer] responsible for?"

## Useful AWS Resources

- **Documentation**: docs.aws.amazon.com
- **FAQs**: Each service has an FAQ page
- **Whitepapers**: aws.amazon.com/whitepapers
- **Well-Architected**: Framework for best practices
- **Skill Builder**: Free AWS training

## Quick Commands

```bash
# Reset and reseed database
npm run db:reset
npm run db:seed

# View database in browser
npm run db:studio

# Run development server
npm run dev

# Build for production
npm run build
```

---

**Keep this file handy when creating new content!** 📌
