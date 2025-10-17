import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

import * as schema from "../db/schema"

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql, { schema })

type ChallengeType = (typeof schema.challenges.$inferInsert)["type"]

type ChallengeOptionSeed = {
  text: string
  correct?: boolean
  imageSrc?: string | null
  audioSrc?: string | null
  guide?: string | null
  order?: number
  value?: string | null
}

type ChallengeSeed = {
  type: ChallengeType
  order: number
  question: string
  hint?: string
  audioSrc?: string
  videoSrc?: string
  correctAnswer?: string
  options?: ChallengeOptionSeed[]
}

type LessonSeed = {
  title: string
  order: number
  challenges: ChallengeSeed[]
}

type UnitSeed = {
  title: string
  description: string
  order: number
  lessons: LessonSeed[]
}

type CourseSeed = {
  id: number
  title: string
  imageSrc: string
  category: string
  description: string
  level: string
  duration: string
  units: UnitSeed[]
}

const courseSeeds: CourseSeed[] = [
  {
    id: 1,
    title: "AWS Cloud Practitioner",
    imageSrc: "/aws-cloud-practitioner.svg",
    category: "AWS",
    description:
      "Build foundational knowledge of cloud concepts and AWS services. Perfect for beginners entering the cloud computing field.",
    level: "Beginner",
    duration: "2-3 hours",
    units: [
      {
        title: "Cloud Concepts",
        description: "Learn AWS Cloud fundamentals and value proposition",
        order: 1,
        lessons: [
          {
            title: "What is Cloud Computing?",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "What is Cloud Computing?",
                hint: "Think about accessing resources remotely via the internet rather than owning physical hardware.",
                options: [
                  {
                    text: "On-demand delivery of IT resources over the internet",
                    correct: true,
                  },
                  {
                    text: "A physical data center you own",
                  },
                  {
                    text: "Software installed on your computer",
                  },
                ],
              },
              {
                type: "ASSIST",
                order: 2,
                question: "Complete: Cloud computing provides ____ access to IT resources",
                hint: "Consider how you can access cloud services whenever you need them.",
                options: [
                  { text: "on-demand", correct: true },
                  { text: "scheduled" },
                  { text: "limited" },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 3,
                question:
                  "Cloud computing eliminates the need for physical data centers completely.",
                hint: "Cloud providers still need physical infrastructure to host services.",
                options: [{ text: "True" }, { text: "False", correct: true }],
              },
              {
                type: "TEXT_INPUT",
                order: 4,
                question: "What does AWS stand for? (Type the full name)",
                correctAnswer: "Amazon Web Services",
                hint: "It's the full name of Amazon's cloud platform. Think about the company name + Web Services.",
              },
              {
                type: "DRAG_DROP",
                order: 5,
                question:
                  "Arrange these AWS service types by typical learning order (most basic first):",
                hint: "Start with storage (where you keep files), then compute (where you run code), then networking (how they connect), then management tools.",
                options: [
                  {
                    text: "Storage Services (S3, EBS)",
                    order: 1,
                  },
                  {
                    text: "Compute Services (EC2, Lambda)",
                    order: 2,
                  },
                  {
                    text: "Networking Services (VPC, CloudFront)",
                    order: 3,
                  },
                  {
                    text: "Management Services (CloudWatch, CloudFormation)",
                    order: 4,
                  },
                ],
              },
              {
                type: "IMAGE_SELECT",
                order: 6,
                question: "Which image represents the AWS cloud icon?",
                hint: "Look for the orange and white cloud logo that AWS uses in their branding.",
                options: [
                  {
                    text: "AWS Cloud Icon",
                    imageSrc: "/aws-cloud-icon.png",
                    correct: true,
                  },
                  {
                    text: "Microsoft Azure Icon",
                    imageSrc: "/azure-icon.png",
                  },
                  {
                    text: "Google Cloud Icon",
                    imageSrc: "/gcp-icon.png",
                  },
                ],
              },
              {
                type: "LISTENING",
                order: 7,
                question:
                  "Listen to the audio introduction about AWS compute services. Which service is being described for running virtual machines?",
                audioSrc: "/audio/aws-intro.mp3",
                hint: "Pay attention to the description of virtual machines and on-demand compute capacity. The audio mentions the most fundamental AWS compute service.",
                options: [
                  { text: "Amazon S3 - Simple Storage Service" },
                  { text: "Amazon EC2 - Elastic Compute Cloud", correct: true },
                  { text: "AWS Lambda - Serverless Computing" },
                  { text: "Amazon RDS - Relational Database Service" },
                ],
              },
              {
                type: "SPEECH_INPUT",
                order: 8,
                question:
                  "Speak the full name of the AWS compute service that provides virtual machines in the cloud:",
                correctAnswer: "Amazon Elastic Compute Cloud",
                hint: "This service is commonly abbreviated as EC2. Speak clearly into your microphone.",
              },
              {
                type: "VIDEO",
                order: 9,
                question:
                  "Watch this video about AWS Global Infrastructure and answer: How many Availability Zones does AWS have?",
                videoSrc:
                  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                hint: "Pay attention to the numbers mentioned in the video about AWS data centers and availability zones.",
                options: [
                  { text: "50-100" },
                  { text: "80+", correct: true },
                  { text: "100-150" },
                  { text: "200+" },
                ],
              },
            ],
          },
          {
            title: "Benefits of AWS Cloud",
            order: 2,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "What is a key benefit of AWS Cloud?",
                options: [
                  { text: "Pay-as-you-go pricing", correct: true },
                  { text: "Requires large upfront investment" },
                  { text: "Limited scalability" },
                ],
              },
              {
                type: "DRAG_DROP",
                order: 2,
                question: "Order the benefits from immediate to strategic impact:",
                options: [
                  { text: "Elastic scalability", order: 1 },
                  { text: "Global reach", order: 2 },
                  { text: "Cost optimization", order: 3 },
                  { text: "Innovation speed", order: 4 },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 3,
                question:
                  "AWS automatically provisions capacity ahead of demand, so you never have to scale services yourself.",
                options: [
                  { text: "True" },
                  {
                    text: "False",
                    correct: true,
                  },
                ],
              },
              {
                type: "TEXT_INPUT",
                order: 4,
                question:
                  "Fill in the blank: AWS allows you to trade capital expense for ______ expense.",
                correctAnswer: "operational",
              },
            ],
          },
          {
            title: "Cloud Architecture",
            order: 3,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: 'What does "elasticity" mean in cloud computing?',
                options: [
                  {
                    text: "Ability to scale resources up or down based on demand",
                    correct: true,
                  },
                  { text: "Fixed resource allocation" },
                  { text: "Manual server provisioning" },
                ],
              },
              {
                type: "SELECT",
                order: 2,
                question: "Which AWS service helps decouple application tiers?",
                options: [
                  { text: "Amazon SQS", correct: true },
                  { text: "Amazon RDS" },
                  { text: "Amazon S3" },
                ],
              },
              {
                type: "ASSIST",
                order: 3,
                question: "Complete: A well-architected system is designed for ______ failures.",
                options: [
                  { text: "automatic" },
                  { text: "planned", correct: true },
                  { text: "rare" },
                ],
              },
              {
                type: "DRAG_DROP",
                order: 4,
                question:
                  "Arrange the AWS Well-Architected Framework pillars in alphabetical order:",
                options: [
                  { text: "Cost Optimization", order: 1 },
                  { text: "Operational Excellence", order: 2 },
                  { text: "Performance Efficiency", order: 3 },
                  { text: "Reliability", order: 4 },
                  { text: "Security", order: 5 },
                ],
              },
            ],
          },
          {
            title: "AWS Global Infrastructure",
            order: 4,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "What is an AWS Region?",
                options: [
                  {
                    text: "A geographical area with multiple Availability Zones",
                    correct: true,
                  },
                  { text: "A single data center" },
                  { text: "A subnet within a VPC" },
                ],
              },
              {
                type: "SELECT",
                order: 2,
                question: "What is an Availability Zone?",
                options: [
                  {
                    text: "One or more discrete data centers with redundant power and networking",
                    correct: true,
                  },
                  { text: "A region" },
                  { text: "An edge location" },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 3,
                question: "Edge locations are only used for caching static content.",
                options: [{ text: "True" }, { text: "False", correct: true }],
              },
              {
                type: "DRAG_DROP",
                order: 4,
                question:
                  "Place the global infrastructure components from smallest to largest scope:",
                options: [
                  { text: "Availability Zone", order: 1 },
                  { text: "Region", order: 2 },
                  { text: "Geographic Area", order: 3 },
                  { text: "Global Network", order: 4 },
                ],
              },
            ],
          },
          {
            title: "Cloud Economics",
            order: 5,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question:
                  "Which pricing model provides the deepest discount for steady-state workloads?",
                options: [
                  { text: "Reserved Instances", correct: true },
                  { text: "On-Demand Instances" },
                  { text: "Spot Instances" },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 2,
                question: "AWS pricing includes charges for data transfer into the cloud.",
                options: [{ text: "True" }, { text: "False", correct: true }],
              },
              {
                type: "ASSIST",
                order: 3,
                question:
                  "Fill the blank: AWS Cost Explorer helps you understand your ____ trends.",
                options: [{ text: "budget" }, { text: "cost", correct: true }, { text: "ticket" }],
              },
              {
                type: "TEXT_INPUT",
                order: 4,
                question: "Name the AWS service used to set up automatic billing alerts.",
                correctAnswer: "AWS Budgets",
              },
              {
                type: "DRAG_DROP",
                order: 5,
                question: "Arrange the cost-optimization process in the recommended order:",
                options: [
                  { text: "Visibility and reporting", order: 1 },
                  { text: "Right-size resources", order: 2 },
                  { text: "Purchase commitment", order: 3 },
                  { text: "Optimize over time", order: 4 },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Security & Compliance",
        description: "Master AWS security and compliance concepts",
        order: 2,
        lessons: [
          {
            title: "Shared Responsibility Model",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Who is responsible for patching the guest OS on EC2?",
                options: [
                  { text: "Customer", correct: true },
                  { text: "AWS" },
                  { text: "Both AWS and Customer" },
                ],
              },
              {
                type: "SELECT",
                order: 2,
                question: "What is AWS responsible for in the Shared Responsibility Model?",
                options: [
                  { text: "Physical security of data centers", correct: true },
                  { text: "Customer data encryption" },
                  { text: "Application-level security" },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 3,
                question: "Customers are responsible for configuring security groups.",
                options: [{ text: "True", correct: true }, { text: "False" }],
              },
              {
                type: "TEXT_INPUT",
                order: 4,
                question:
                  "What term describes AWS’s responsibility to protect the hardware, software, and facilities?",
                correctAnswer: "Security of the cloud",
              },
            ],
          },
          {
            title: "IAM Basics",
            order: 2,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "What does IAM stand for?",
                options: [
                  { text: "Identity and Access Management", correct: true },
                  { text: "Internet Access Manager" },
                  { text: "Integrated Application Monitor" },
                ],
              },
              {
                type: "SELECT",
                order: 2,
                question: "What is the best practice for the AWS root account?",
                options: [
                  {
                    text: "Enable MFA and use it only for account setup",
                    correct: true,
                  },
                  { text: "Use it for all daily operations" },
                  { text: "Share credentials with team members" },
                ],
              },
              {
                type: "DRAG_DROP",
                order: 3,
                question: "Arrange IAM components from most general to most specific:",
                options: [
                  { text: "Account", order: 1 },
                  { text: "User", order: 2 },
                  { text: "Group", order: 3 },
                  { text: "Policy", order: 4 },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 4,
                question: "IAM roles can be assumed by services and users.",
                options: [{ text: "True", correct: true }, { text: "False" }],
              },
            ],
          },
          {
            title: "Security Services",
            order: 3,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Which service provides centralized governance across AWS accounts?",
                options: [
                  { text: "AWS Organizations", correct: true },
                  { text: "AWS Shield" },
                  { text: "Amazon Inspector" },
                ],
              },
              {
                type: "ASSIST",
                order: 2,
                question: "Complete: AWS WAF protects applications from ______ attacks.",
                options: [
                  { text: "application layer", correct: true },
                  { text: "network layer" },
                  { text: "hardware" },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 3,
                question:
                  "Amazon GuardDuty is a log archiving service that stores CloudTrail events.",
                options: [{ text: "True" }, { text: "False", correct: true }],
              },
              {
                type: "TEXT_INPUT",
                order: 4,
                question: "Name the AWS service used to manage encryption keys.",
                correctAnswer: "AWS Key Management Service",
              },
              {
                type: "DRAG_DROP",
                order: 5,
                question: "Match each service with its primary purpose by ordering appropriately:",
                options: [
                  { text: "AWS Shield - DDoS protection", order: 1 },
                  { text: "AWS WAF - Web firewall", order: 2 },
                  { text: "Amazon Macie - Data discovery", order: 3 },
                  { text: "Amazon Inspector - Vulnerability scanning", order: 4 },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Technology & Services",
        description: "Explore core AWS services and technologies",
        order: 3,
        lessons: [
          {
            title: "EC2 Fundamentals",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "What does EC2 stand for?",
                options: [
                  { text: "Elastic Compute Cloud", correct: true },
                  { text: "Elastic Container Cloud" },
                  { text: "Enterprise Compute Cloud" },
                ],
              },
              {
                type: "SELECT",
                order: 2,
                question: "What is an EC2 instance?",
                options: [
                  { text: "A virtual server in the cloud", correct: true },
                  { text: "A physical server" },
                  { text: "A storage bucket" },
                ],
              },
              {
                type: "DRAG_DROP",
                order: 3,
                question: "Order the EC2 purchasing options from most to least flexible:",
                options: [
                  { text: "On-Demand", order: 1 },
                  { text: "Savings Plans", order: 2 },
                  { text: "Reserved Instances", order: 3 },
                  { text: "Spot Instances", order: 4 },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 4,
                question: "EC2 Auto Scaling can increase and decrease capacity automatically.",
                options: [{ text: "True", correct: true }, { text: "False" }],
              },
            ],
          },
          {
            title: "S3 Storage",
            order: 2,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "What does S3 stand for?",
                options: [
                  { text: "Simple Storage Service", correct: true },
                  { text: "Secure Storage Service" },
                  { text: "Scalable Server Service" },
                ],
              },
              {
                type: "SELECT",
                order: 2,
                question: "What is the storage limit for a single S3 object?",
                options: [
                  { text: "5 TB", correct: true },
                  { text: "100 GB" },
                  { text: "1 TB" },
                  { text: "10 TB" },
                ],
              },
              {
                type: "ASSIST",
                order: 3,
                question: "Complete: S3 Standard-IA is designed for data accessed ______.",
                options: [
                  { text: "frequently" },
                  { text: "infrequently", correct: true },
                  { text: "never" },
                ],
              },
              {
                type: "TEXT_INPUT",
                order: 4,
                question: "Name the feature that allows replication of S3 objects between regions.",
                correctAnswer: "Cross-Region Replication",
              },
            ],
          },
          {
            title: "RDS & Databases",
            order: 3,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question:
                  "Which database engines are supported by Amazon RDS? (Select the best answer)",
                options: [
                  {
                    text: "MySQL, PostgreSQL, Oracle, SQL Server, MariaDB",
                    correct: true,
                  },
                  { text: "Only Amazon Aurora" },
                  { text: "Only open-source databases" },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 2,
                question: "Amazon Aurora is compatible with both MySQL and PostgreSQL.",
                options: [{ text: "True", correct: true }, { text: "False" }],
              },
              {
                type: "ASSIST",
                order: 3,
                question:
                  "Fill the blank: Amazon DynamoDB is a fully managed ______ database service.",
                options: [
                  { text: "relational" },
                  { text: "NoSQL", correct: true },
                  { text: "graph" },
                ],
              },
              {
                type: "TEXT_INPUT",
                order: 4,
                question: "What feature of RDS provides automatic failover to a standby instance?",
                correctAnswer: "Multi-AZ",
              },
              {
                type: "DRAG_DROP",
                order: 5,
                question: "Order the database deployment steps from first to last:",
                options: [
                  { text: "Choose engine", order: 1 },
                  { text: "Configure instance class", order: 2 },
                  { text: "Set up networking", order: 3 },
                  { text: "Finalize backups", order: 4 },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Billing & Pricing",
        description: "Understand AWS pricing models and cost management",
        order: 4,
        lessons: [
          {
            title: "Pricing Models",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Which option best describes the AWS Free Tier offering?",
                options: [
                  {
                    text: "Free usage for new accounts on select services up to defined limits",
                    correct: true,
                  },
                  {
                    text: "Unlimited free usage for all services for 12 months",
                  },
                  { text: "Discounts available only through enterprise support" },
                ],
              },
              {
                type: "SELECT",
                order: 2,
                question: "Which pricing model gives you the ability to bid on unused capacity?",
                options: [
                  { text: "Spot Instances", correct: true },
                  { text: "On-Demand" },
                  { text: "Savings Plans" },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 3,
                question: "Savings Plans apply to both EC2 and Fargate usage when eligible.",
                options: [{ text: "True", correct: true }, { text: "False" }],
              },
              {
                type: "DRAG_DROP",
                order: 4,
                question: "Match the pricing model to the use case by ordering:",
                options: [
                  { text: "On-Demand - Unpredictable workloads", order: 1 },
                  { text: "Savings Plans - Steady usage", order: 2 },
                  { text: "Reserved - Long-term predictability", order: 3 },
                  { text: "Spot - Flexible, interruption-tolerant", order: 4 },
                ],
              },
            ],
          },
          {
            title: "Cost Management",
            order: 2,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Which service provides dashboards and reports for cost tracking?",
                options: [
                  { text: "AWS Cost Explorer", correct: true },
                  { text: "AWS Trusted Advisor" },
                  { text: "Amazon QuickSight" },
                ],
              },
              {
                type: "TEXT_INPUT",
                order: 2,
                question:
                  "What AWS service can send notifications when spending exceeds a threshold?",
                correctAnswer: "AWS Budgets",
              },
              {
                type: "TRUE_FALSE",
                order: 3,
                question: "AWS Cost and Usage Reports can be delivered to an S3 bucket.",
                options: [{ text: "True", correct: true }, { text: "False" }],
              },
              {
                type: "ASSIST",
                order: 4,
                question:
                  "Complete: AWS Trusted Advisor provides real-time guidance for ____ optimization.",
                options: [
                  { text: "resource" },
                  { text: "cost", correct: true },
                  { text: "ticket" },
                ],
              },
              {
                type: "DRAG_DROP",
                order: 5,
                question: "Arrange the lifecycle of cost governance from first to last:",
                options: [
                  { text: "Set budgets", order: 1 },
                  { text: "Monitor usage", order: 2 },
                  { text: "Analyze variance", order: 3 },
                  { text: "Take action", order: 4 },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "AWS Solutions Architect Associate",
    imageSrc: "/aws-solutions-architect.svg",
    category: "Architecture",
    description:
      "Learn to design distributed systems and applications on AWS. Essential for cloud architects and engineers.",
    level: "Intermediate",
    duration: "4-6 hours",
    units: [
      {
        title: "Design Resilient Architectures",
        description: "Build fault-tolerant, highly-available application stacks",
        order: 1,
        lessons: [
          {
            title: "Multi-Tier Architectures",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question:
                  "Which AWS service is commonly used as the presentation tier in a multi-tier architecture?",
                options: [
                  { text: "Amazon CloudFront", correct: true },
                  { text: "Amazon RDS" },
                  { text: "AWS Backup" },
                ],
              },
              {
                type: "DRAG_DROP",
                order: 2,
                question:
                  "Arrange the layers of a classic three-tier architecture from top to bottom:",
                options: [
                  { text: "Presentation Tier", order: 1 },
                  { text: "Application Tier", order: 2 },
                  { text: "Data Tier", order: 3 },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 3,
                question:
                  "Stateless application servers make it easier to build resilient architectures.",
                options: [{ text: "True", correct: true }, { text: "False" }],
              },
              {
                type: "TEXT_INPUT",
                order: 4,
                question:
                  "Name the AWS service that provides managed relational databases for the data tier.",
                correctAnswer: "Amazon RDS",
              },
            ],
          },
          {
            title: "Decoupling Strategies",
            order: 2,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question:
                  "Which service best enables loose coupling between application components?",
                options: [
                  { text: "Amazon SQS", correct: true },
                  { text: "Amazon EC2" },
                  { text: "AWS Backup" },
                ],
              },
              {
                type: "ASSIST",
                order: 2,
                question: "Complete: Event-driven architectures rely on ______ coupling.",
                options: [{ text: "tight" }, { text: "loose", correct: true }, { text: "manual" }],
              },
              {
                type: "DRAG_DROP",
                order: 3,
                question: "Match each service with the problem it solves by ordering:",
                options: [
                  { text: "Amazon SNS - Pub/Sub messaging", order: 1 },
                  { text: "Amazon SQS - Queue buffering", order: 2 },
                  { text: "AWS Step Functions - Workflow orchestration", order: 3 },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 4,
                question:
                  "Amazon API Gateway can throttle requests to protect downstream services.",
                options: [{ text: "True", correct: true }, { text: "False" }],
              },
            ],
          },
          {
            title: "Disaster Recovery",
            order: 3,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question:
                  "Which disaster recovery strategy provides the fastest recovery time objective (RTO)?",
                options: [
                  { text: "Multi-site active/active", correct: true },
                  { text: "Pilot light" },
                  { text: "Warm standby" },
                ],
              },
              {
                type: "VIDEO",
                order: 2,
                question:
                  "Watch the video and identify which DR strategy relies on pre-provisioned but idle infrastructure.",
                videoSrc:
                  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                options: [
                  { text: "Backup & restore" },
                  { text: "Warm standby", correct: true },
                  { text: "Multi-site active/active" },
                  { text: "Pilot light" },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 3,
                question:
                  "Recovery Time Objective (RTO) measures how much data you can afford to lose.",
                options: [{ text: "True" }, { text: "False", correct: true }],
              },
              {
                type: "TEXT_INPUT",
                order: 4,
                question: "What AWS service helps automate cross-region backups of EC2 and EBS?",
                correctAnswer: "AWS Backup",
              },
            ],
          },
        ],
      },
      {
        title: "High-Performance Architectures",
        description: "Optimize compute, storage, and networking for performance",
        order: 2,
        lessons: [
          {
            title: "Compute Selections",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Which instance family is best suited for memory-intensive workloads?",
                options: [{ text: "R5", correct: true }, { text: "T3" }, { text: "C7g" }],
              },
              {
                type: "ASSIST",
                order: 2,
                question: "Complete: AWS Lambda is ideal for ______ compute workloads.",
                options: [
                  { text: "periodic" },
                  { text: "event-driven", correct: true },
                  { text: "legacy" },
                ],
              },
              {
                type: "DRAG_DROP",
                order: 3,
                question: "Order the steps to implement Auto Scaling based on best practice:",
                options: [
                  { text: "Define metrics & alarms", order: 1 },
                  { text: "Create launch template", order: 2 },
                  { text: "Configure scaling policies", order: 3 },
                  { text: "Test scale events", order: 4 },
                ],
              },
            ],
          },
          {
            title: "Storage Optimization",
            order: 2,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Which storage option offers sub-millisecond latency for databases?",
                options: [
                  { text: "Amazon EFS" },
                  { text: "Amazon S3" },
                  { text: "Amazon EBS io2", correct: true },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 2,
                question:
                  "Amazon ElastiCache can improve read performance for frequently accessed data.",
                options: [{ text: "True", correct: true }, { text: "False" }],
              },
              {
                type: "TEXT_INPUT",
                order: 3,
                question: "Which AWS service provides a petabyte-scale data warehouse?",
                correctAnswer: "Amazon Redshift",
              },
            ],
          },
          {
            title: "Networking Patterns",
            order: 3,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Which AWS service accelerates content delivery to users worldwide?",
                options: [
                  { text: "Amazon CloudFront", correct: true },
                  { text: "AWS Direct Connect" },
                  { text: "AWS Global Accelerator" },
                ],
              },
              {
                type: "ASSIST",
                order: 2,
                question:
                  "Complete: AWS Global Accelerator uses Anycast IP addresses to improve ______.",
                options: [
                  { text: "security" },
                  { text: "availability" },
                  { text: "performance", correct: true },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 3,
                question: "VPC endpoints keep traffic to AWS services within the AWS network.",
                options: [{ text: "True", correct: true }, { text: "False" }],
              },
            ],
          },
        ],
      },
      {
        title: "Cost-Optimized Architectures",
        description: "Balance performance requirements with cost efficiency",
        order: 3,
        lessons: [
          {
            title: "Right-Sizing",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Which tool analyzes historical usage to suggest instance right-sizing?",
                options: [
                  { text: "AWS Compute Optimizer", correct: true },
                  { text: "AWS Budgets" },
                  { text: "Amazon QuickSight" },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 2,
                question: "Rightsizing should only be performed once during initial deployment.",
                options: [{ text: "True" }, { text: "False", correct: true }],
              },
              {
                type: "TEXT_INPUT",
                order: 3,
                question:
                  "Name the pricing model that offers flexibility between instance families while committing to usage (measured in $/hour).",
                correctAnswer: "Compute Savings Plans",
              },
            ],
          },
          {
            title: "Caching Strategies",
            order: 2,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Which service is best suited for caching dynamic web content?",
                options: [
                  { text: "Amazon ElastiCache", correct: true },
                  { text: "Amazon S3" },
                  { text: "AWS Backup" },
                ],
              },
              {
                type: "ASSIST",
                order: 2,
                question: "Complete: Cached data should have a defined ______ policy.",
                options: [
                  { text: "logging" },
                  { text: "invalidation", correct: true },
                  { text: "backup" },
                ],
              },
              {
                type: "DRAG_DROP",
                order: 3,
                question: "Order the steps to add an Amazon CloudFront distribution:",
                options: [
                  { text: "Create origin", order: 1 },
                  { text: "Configure behaviors", order: 2 },
                  { text: "Associate SSL/TLS", order: 3 },
                  { text: "Deploy distribution", order: 4 },
                ],
              },
            ],
          },
          {
            title: "Operational Excellence",
            order: 3,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Which AWS service helps you create operational runbooks and SOPs?",
                options: [
                  { text: "AWS Systems Manager", correct: true },
                  { text: "Amazon CloudWatch" },
                  { text: "AWS Control Tower" },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 2,
                question:
                  "AWS Trusted Advisor provides cost optimization checks only for enterprise support plans.",
                options: [{ text: "True" }, { text: "False", correct: true }],
              },
              {
                type: "TEXT_INPUT",
                order: 3,
                question:
                  "What framework provides design principles and best practices for building on AWS?",
                correctAnswer: "AWS Well-Architected Framework",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "AWS Developer Associate",
    imageSrc: "/aws-developer.svg",
    category: "Development",
    description:
      "Master AWS services for application development and deployment. Great for developers building cloud applications.",
    level: "Intermediate",
    duration: "3-5 hours",
    units: [
      {
        title: "Serverless Development",
        description: "Build scalable applications using serverless patterns",
        order: 1,
        lessons: [
          {
            title: "Lambda Fundamentals",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Which language is not natively supported by AWS Lambda?",
                options: [{ text: "Java" }, { text: "Go" }, { text: "PHP", correct: true }],
              },
              {
                type: "TRUE_FALSE",
                order: 2,
                question: "Lambda functions can be triggered by AWS Step Functions.",
                options: [{ text: "True", correct: true }, { text: "False" }],
              },
              {
                type: "TEXT_INPUT",
                order: 3,
                question:
                  "What is the maximum execution timeout for a Lambda function (in seconds)?",
                correctAnswer: "900",
              },
            ],
          },
          {
            title: "API Integrations",
            order: 2,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Which service provides fully managed APIs that integrate with Lambda?",
                options: [
                  { text: "Amazon API Gateway", correct: true },
                  { text: "Amazon EventBridge" },
                  { text: "AWS AppSync" },
                ],
              },
              {
                type: "ASSIST",
                order: 2,
                question: "Complete: REST APIs commonly use ______ methods like GET and POST.",
                options: [
                  { text: "database" },
                  { text: "HTTP", correct: true },
                  { text: "storage" },
                ],
              },
              {
                type: "DRAG_DROP",
                order: 3,
                question: "Place the steps to secure an API with IAM authorization:",
                options: [
                  { text: "Create IAM policy", order: 1 },
                  { text: "Attach policy to role/user", order: 2 },
                  { text: "Enable IAM auth on method", order: 3 },
                  { text: "Test with signed request", order: 4 },
                ],
              },
            ],
          },
          {
            title: "Event-Driven Patterns",
            order: 3,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Which service routes events between SaaS apps and AWS services?",
                options: [
                  { text: "Amazon EventBridge", correct: true },
                  { text: "Amazon Kinesis" },
                  { text: "AWS IoT Core" },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 2,
                question:
                  "EventBridge supports schema discovery to help developers generate code bindings.",
                options: [{ text: "True", correct: true }, { text: "False" }],
              },
              {
                type: "TEXT_INPUT",
                order: 3,
                question: "Name the service you would use to stream real-time data for analytics.",
                correctAnswer: "Amazon Kinesis",
              },
            ],
          },
        ],
      },
      {
        title: "Deployment & CI/CD",
        description: "Automate build, test, and deployment pipelines",
        order: 2,
        lessons: [
          {
            title: "Infrastructure as Code",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question:
                  "Which service enables declarative infrastructure deployments using templates?",
                options: [
                  { text: "AWS CloudFormation", correct: true },
                  { text: "AWS CodeCommit" },
                  { text: "AWS CodeGuru" },
                ],
              },
              {
                type: "ASSIST",
                order: 2,
                question: "Complete: CloudFormation change sets preview ______ before deployment.",
                options: [
                  { text: "logs" },
                  { text: "stack updates", correct: true },
                  { text: "billing" },
                ],
              },
              {
                type: "DRAG_DROP",
                order: 3,
                question: "Arrange the lifecycle of a CodePipeline deployment:",
                options: [
                  { text: "Source", order: 1 },
                  { text: "Build", order: 2 },
                  { text: "Test", order: 3 },
                  { text: "Deploy", order: 4 },
                ],
              },
            ],
          },
          {
            title: "Pipeline Automation",
            order: 2,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Which service provides managed build environments for CI workflows?",
                options: [
                  { text: "AWS CodeBuild", correct: true },
                  { text: "AWS Systems Manager" },
                  { text: "Amazon Inspector" },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 2,
                question:
                  "CodeDeploy can orchestrate blue/green deployments for both EC2 and Lambda.",
                options: [{ text: "True", correct: true }, { text: "False" }],
              },
              {
                type: "TEXT_INPUT",
                order: 3,
                question: "What pipeline action type runs unit or integration tests?",
                correctAnswer: "Test",
              },
            ],
          },
          {
            title: "Observability & Feedback",
            order: 3,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Which service aggregates application traces across microservices?",
                options: [
                  { text: "AWS X-Ray", correct: true },
                  { text: "Amazon QuickSight" },
                  { text: "AWS Shield" },
                ],
              },
              {
                type: "ASSIST",
                order: 2,
                question: "Complete: CloudWatch ______ collect custom business metrics.",
                options: [
                  { text: "logs" },
                  { text: "dashboards" },
                  { text: "metric filters", correct: true },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 3,
                question: "CodeGuru Reviewer can provide automated feedback on code quality.",
                options: [{ text: "True", correct: true }, { text: "False" }],
              },
            ],
          },
        ],
      },
      {
        title: "Application Security",
        description: "Secure application secrets, access, and monitoring",
        order: 3,
        lessons: [
          {
            title: "Secrets Management",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Which service rotates database credentials automatically?",
                options: [
                  { text: "AWS Secrets Manager", correct: true },
                  { text: "Amazon Cognito" },
                  { text: "AWS Certificate Manager" },
                ],
              },
              {
                type: "TEXT_INPUT",
                order: 2,
                question:
                  "Name the service that provides secure parameter storage with hierarchies.",
                correctAnswer: "AWS Systems Manager Parameter Store",
              },
              {
                type: "TRUE_FALSE",
                order: 3,
                question:
                  "Secrets should be stored in environment variables committed to source control.",
                options: [{ text: "True" }, { text: "False", correct: true }],
              },
            ],
          },
          {
            title: "Authorization Patterns",
            order: 2,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question:
                  "Which service provides user sign-up and federated identity for web apps?",
                options: [
                  { text: "Amazon Cognito", correct: true },
                  { text: "AWS Shield" },
                  { text: "Amazon Detective" },
                ],
              },
              {
                type: "ASSIST",
                order: 2,
                question: "Complete: IAM policies should follow the principle of ______ privilege.",
                options: [
                  { text: "maximum" },
                  { text: "least", correct: true },
                  { text: "shared" },
                ],
              },
              {
                type: "DRAG_DROP",
                order: 3,
                question: "Order the authorization flow for a Cognito-hosted UI:",
                options: [
                  { text: "User authenticates with provider", order: 1 },
                  { text: "Cognito issues tokens", order: 2 },
                  { text: "App exchanges token for AWS credentials", order: 3 },
                  { text: "User accesses secured resource", order: 4 },
                ],
              },
            ],
          },
          {
            title: "Monitoring & Alerts",
            order: 3,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Which AWS service detects anomalous login behavior?",
                options: [
                  { text: "Amazon GuardDuty", correct: true },
                  { text: "AWS Batch" },
                  { text: "Amazon MQ" },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 2,
                question: "Amazon CloudWatch Alarms can trigger Lambda functions for remediation.",
                options: [{ text: "True", correct: true }, { text: "False" }],
              },
              {
                type: "TEXT_INPUT",
                order: 3,
                question:
                  "Name the managed service that builds security visibility dashboards across AWS accounts.",
                correctAnswer: "AWS Security Hub",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "AWS SysOps Administrator",
    imageSrc: "/aws-sysops.svg",
    category: "DevOps",
    description:
      "Develop expertise in deploying, managing, and operating AWS systems. Perfect for system administrators.",
    level: "Advanced",
    duration: "5-7 hours",
    units: [
      {
        title: "Monitoring & Reporting",
        description: "Collect metrics, logs, and insights to operate workloads",
        order: 1,
        lessons: [
          {
            title: "CloudWatch Monitoring",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Which CloudWatch feature lets you visualize multiple metrics together?",
                options: [
                  { text: "Dashboards", correct: true },
                  { text: "Logs Insights" },
                  { text: "Contributor Insights" },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 2,
                question: "CloudWatch composite alarms can evaluate multiple alarms at once.",
                options: [{ text: "True", correct: true }, { text: "False" }],
              },
              {
                type: "TEXT_INPUT",
                order: 3,
                question:
                  "Name the feature used to create custom metric queries using SQL-like syntax.",
                correctAnswer: "CloudWatch Logs Insights",
              },
            ],
          },
          {
            title: "Logging & Metrics",
            order: 2,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question:
                  "Which service centralizes and analyzes VPC flow, DNS, and CloudTrail logs?",
                options: [
                  { text: "Amazon CloudWatch Logs" },
                  { text: "Amazon OpenSearch Service", correct: true },
                  { text: "AWS Systems Manager" },
                ],
              },
              {
                type: "ASSIST",
                order: 2,
                question:
                  "Complete: AWS CloudTrail records API activity for ______ days by default.",
                options: [{ text: "30" }, { text: "90" }, { text: "365", correct: true }],
              },
              {
                type: "DRAG_DROP",
                order: 3,
                question: "Order the steps to ship application logs to CloudWatch Logs:",
                options: [
                  { text: "Install CloudWatch agent", order: 1 },
                  { text: "Configure log file locations", order: 2 },
                  { text: "Attach IAM permissions", order: 3 },
                  { text: "Validate delivery", order: 4 },
                ],
              },
            ],
          },
          {
            title: "Incident Response",
            order: 3,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Which service helps coordinate incident response playbooks?",
                options: [
                  { text: "AWS Systems Manager Incident Manager", correct: true },
                  { text: "AWS Fault Injection Simulator" },
                  { text: "Amazon Detective" },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 2,
                question:
                  "Systems Manager OpsCenter can aggregate operational issues across accounts.",
                options: [{ text: "True", correct: true }, { text: "False" }],
              },
              {
                type: "TEXT_INPUT",
                order: 3,
                question:
                  "What AWS service provides post-incident analysis with integrated metrics and logs?",
                correctAnswer: "AWS Resilience Hub",
              },
            ],
          },
        ],
      },
      {
        title: "High Availability & Scalability",
        description: "Ensure applications remain available and responsive under varying load",
        order: 2,
        lessons: [
          {
            title: "Auto Scaling Operations",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Which scaling policy adjusts capacity based on a target metric value?",
                options: [
                  { text: "Target tracking scaling", correct: true },
                  { text: "Step scaling" },
                  { text: "Scheduled scaling" },
                ],
              },
              {
                type: "ASSIST",
                order: 2,
                question:
                  "Complete: Launch templates replace ______ for defining instance configuration.",
                options: [
                  { text: "launch configurations", correct: true },
                  { text: "IAM roles" },
                  { text: "security groups" },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 3,
                question:
                  "Auto Scaling groups can span multiple Availability Zones within a single region.",
                options: [{ text: "True", correct: true }, { text: "False" }],
              },
            ],
          },
          {
            title: "Load Balancing",
            order: 2,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Which load balancer supports routing based on URL paths and hostnames?",
                options: [
                  { text: "Application Load Balancer", correct: true },
                  { text: "Network Load Balancer" },
                  { text: "Gateway Load Balancer" },
                ],
              },
              {
                type: "TEXT_INPUT",
                order: 2,
                question: "Name the feature that checks instance health before sending traffic.",
                correctAnswer: "Health checks",
              },
              {
                type: "DRAG_DROP",
                order: 3,
                question: "Arrange the steps to configure cross-zone load balancing:",
                options: [
                  { text: "Enable setting in load balancer", order: 1 },
                  { text: "Verify AZs are enabled", order: 2 },
                  { text: "Confirm target registrations", order: 3 },
                  { text: "Test request distribution", order: 4 },
                ],
              },
            ],
          },
          {
            title: "Backup Strategies",
            order: 3,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Which service automates EBS snapshot lifecycle management?",
                options: [
                  { text: "Amazon Data Lifecycle Manager", correct: true },
                  { text: "AWS DataSync" },
                  { text: "AWS Storage Gateway" },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 2,
                question: "AWS Backup can enforce backup policies across multiple accounts.",
                options: [{ text: "True", correct: true }, { text: "False" }],
              },
              {
                type: "TEXT_INPUT",
                order: 3,
                question: "What is the recommended AWS service for centralized backup auditing?",
                correctAnswer: "AWS Backup Audit Manager",
              },
            ],
          },
        ],
      },
      {
        title: "Automation & Governance",
        description: "Automate operations and maintain compliant environments",
        order: 3,
        lessons: [
          {
            title: "Infrastructure Automation",
            order: 1,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question:
                  "Which Systems Manager feature lets you automate common tasks with documents?",
                options: [
                  { text: "Automation", correct: true },
                  { text: "Fleet Manager" },
                  { text: "Session Manager" },
                ],
              },
              {
                type: "ASSIST",
                order: 2,
                question:
                  "Complete: Systems Manager Run Command can execute tasks across ______ instances.",
                options: [
                  { text: "multiple", correct: true },
                  { text: "single" },
                  { text: "legacy" },
                ],
              },
              {
                type: "TRUE_FALSE",
                order: 3,
                question:
                  "State Manager maintains desired configuration through policy enforcement.",
                options: [{ text: "True", correct: true }, { text: "False" }],
              },
            ],
          },
          {
            title: "Compliance & Auditing",
            order: 2,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question:
                  "Which service provides a governance baseline across multi-account AWS environments?",
                options: [
                  { text: "AWS Control Tower", correct: true },
                  { text: "AWS Resource Access Manager" },
                  { text: "AWS Batch" },
                ],
              },
              {
                type: "TEXT_INPUT",
                order: 2,
                question: "Name the service that records configuration changes for AWS resources.",
                correctAnswer: "AWS Config",
              },
              {
                type: "TRUE_FALSE",
                order: 3,
                question:
                  "AWS Config conformance packs evaluate resources against compliance rules.",
                options: [{ text: "True", correct: true }, { text: "False" }],
              },
            ],
          },
          {
            title: "Cost Control",
            order: 3,
            challenges: [
              {
                type: "SELECT",
                order: 1,
                question: "Which service helps implement guardrails for cost and usage policies?",
                options: [
                  { text: "AWS Budgets", correct: true },
                  { text: "Amazon Athena" },
                  { text: "AWS Batch" },
                ],
              },
              {
                type: "ASSIST",
                order: 2,
                question: "Complete: Tagging resources enables granular ______ allocations.",
                options: [
                  { text: "security" },
                  { text: "cost", correct: true },
                  { text: "latency" },
                ],
              },
              {
                type: "DRAG_DROP",
                order: 3,
                question: "Order the steps to enforce budget alerts with automation:",
                options: [
                  { text: "Create budget and alert", order: 1 },
                  { text: "Subscribe SNS topic", order: 2 },
                  { text: "Trigger Lambda remediation", order: 3 },
                  { text: "Audit results", order: 4 },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]

const resetTables = async () => {
  await db.delete(schema.challengeOptions)
  await db.delete(schema.challengeProgress)
  await db.delete(schema.challenges)
  await db.delete(schema.lessons)
  await db.delete(schema.units)
  await db.delete(schema.userSubscription)
  await db.delete(schema.userProgress)
  await db.delete(schema.courses)
}

const seed = async () => {
  try {
    console.log("Seeding database")
    await resetTables()

    for (const course of courseSeeds) {
      await db.insert(schema.courses).values({
        id: course.id,
        title: course.title,
        imageSrc: course.imageSrc,
        category: course.category,
        description: course.description,
        level: course.level,
        duration: course.duration,
      })

      for (const unit of course.units) {
        const [unitRecord] = await db
          .insert(schema.units)
          .values({
            title: unit.title,
            description: unit.description,
            order: unit.order,
            courseId: course.id,
          })
          .returning({ id: schema.units.id })

        for (const lesson of unit.lessons) {
          const [lessonRecord] = await db
            .insert(schema.lessons)
            .values({
              title: lesson.title,
              order: lesson.order,
              unitId: unitRecord.id,
            })
            .returning({ id: schema.lessons.id })

          for (const challenge of lesson.challenges) {
            const { options = [], ...challengeData } = challenge
            const [challengeRecord] = await db
              .insert(schema.challenges)
              .values({
                lessonId: lessonRecord.id,
                type: challengeData.type,
                order: challengeData.order,
                question: challengeData.question,
                hint: challengeData.hint ?? null,
                audioSrc: challengeData.audioSrc ?? null,
                videoSrc: challengeData.videoSrc ?? null,
                correctAnswer: challengeData.correctAnswer ?? null,
              })
              .returning({ id: schema.challenges.id })

            if (options.length > 0) {
              await db.insert(schema.challengeOptions).values(
                options.map((option, index) => ({
                  challengeId: challengeRecord.id,
                  text: option.text,
                  correct: option.correct ?? false,
                  imageSrc: option.imageSrc ?? null,
                  audioSrc: option.audioSrc ?? null,
                  guide: option.guide ?? null,
                  order: option.order ?? index + 1,
                  value: option.value ?? null,
                })),
              )
            }
          }
        }
      }
    }

    console.log("Seeding finished")
  } catch (error) {
    console.error(error)
    throw new Error("Failed to seed the database")
  }
}

seed()
