import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!); 
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "AWS Cloud Practitioner",
        imageSrc: "/aws-cloud-practitioner.svg",
      },
      {
        id: 2,
        title: "AWS Solutions Architect Associate",
        imageSrc: "/aws-solutions-architect.svg",
      },
      {
        id: 3,
        title: "AWS Developer Associate",
        imageSrc: "/aws-developer.svg",
      },
      {
        id: 4,
        title: "AWS SysOps Administrator",
        imageSrc: "/aws-sysops.svg",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, // AWS Cloud Practitioner
        title: "Cloud Concepts",
        description: "Learn AWS Cloud fundamentals and value proposition",
        order: 1,
      },
      {
        id: 2,
        courseId: 1, // AWS Cloud Practitioner
        title: "Security & Compliance",
        description: "Master AWS security and compliance concepts",
        order: 2,
      },
      {
        id: 3,
        courseId: 1, // AWS Cloud Practitioner
        title: "Technology & Services",
        description: "Explore core AWS services and technologies",
        order: 3,
      },
      {
        id: 4,
        courseId: 1, // AWS Cloud Practitioner
        title: "Billing & Pricing",
        description: "Understand AWS pricing models and cost management",
        order: 4,
      }
    ]);

    await db.insert(schema.lessons).values([
      // Cloud Concepts Unit
      {
        id: 1,
        unitId: 1,
        order: 1,
        title: "What is Cloud Computing?",
      },
      {
        id: 2,
        unitId: 1,
        order: 2,
        title: "Benefits of AWS Cloud",
      },
      {
        id: 3,
        unitId: 1,
        order: 3,
        title: "Cloud Architecture",
      },
      {
        id: 4,
        unitId: 1,
        order: 4,
        title: "AWS Global Infrastructure",
      },
      {
        id: 5,
        unitId: 1,
        order: 5,
        title: "Cloud Economics",
      },
      // Security & Compliance Unit
      {
        id: 6,
        unitId: 2,
        order: 1,
        title: "Shared Responsibility Model",
      },
      {
        id: 7,
        unitId: 2,
        order: 2,
        title: "IAM Basics",
      },
      {
        id: 8,
        unitId: 2,
        order: 3,
        title: "Security Services",
      },
      // Technology & Services Unit
      {
        id: 9,
        unitId: 3,
        order: 1,
        title: "EC2 Fundamentals",
      },
      {
        id: 10,
        unitId: 3,
        order: 2,
        title: "S3 Storage",
      },
      {
        id: 11,
        unitId: 3,
        order: 3,
        title: "RDS & Databases",
      },
      // Billing & Pricing Unit
      {
        id: 12,
        unitId: 4,
        order: 1,
        title: "Pricing Models",
      },
      {
        id: 13,
        unitId: 4,
        order: 2,
        title: "Cost Management",
      },
    ]);

    await db.insert(schema.challenges).values([
      // Lesson 1: What is Cloud Computing? - ALL QUESTION TYPES DEMO
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        order: 1,
        question: 'What is Cloud Computing?',
        hint: 'Think about accessing resources remotely via the internet rather than owning physical hardware.',
      },
      {
        id: 2,
        lessonId: 1,
        type: "ASSIST",
        order: 2,
        question: 'Complete: Cloud computing provides ____ access to IT resources',
        hint: 'Consider how you can access cloud services whenever you need them.',
      },
      {
        id: 3,
        lessonId: 1,
        type: "TRUE_FALSE",
        order: 3,
        question: 'Cloud computing eliminates the need for physical data centers completely.',
        hint: 'Cloud providers still need physical infrastructure to host services.',
      },
      {
        id: 4,
        lessonId: 1,
        type: "TEXT_INPUT",
        order: 4,
        question: 'What does AWS stand for? (Type the full name)',
        correctAnswer: 'Amazon Web Services',
        hint: 'It\'s the full name of Amazon\'s cloud platform. Think about the company name + Web Services.',
      },
      {
        id: 5,
        lessonId: 1,
        type: "DRAG_DROP",
        order: 5,
        question: 'Arrange these AWS service types by typical learning order (most basic first):',
        hint: 'Start with storage (where you keep files), then compute (where you run code), then networking (how they connect), then management tools.',
      },
      {
        id: 6,
        lessonId: 1,
        type: "IMAGE_SELECT",
        order: 6,
        question: 'Which image represents the AWS cloud icon?',
        hint: 'Look for the orange and white cloud logo that AWS uses in their branding.',
      },
      {
        id: 7,
        lessonId: 1,
        type: "LISTENING",
        order: 7,
        question: 'Listen to the audio and select the correct AWS service mentioned:',
        audioSrc: '/audio/aws-intro.mp3',
        hint: 'Listen carefully for the specific AWS service name mentioned in the audio.',
      },
      // Lesson 2: Benefits of AWS Cloud
      {
        id: 8,
        lessonId: 2,
        type: "SELECT",
        order: 1,
        question: 'What is a key benefit of AWS Cloud?',
      },
      {
        id: 9,
        lessonId: 2,
        type: "SELECT",
        order: 2,
        question: 'Trade capital expense for:',
      },
      // Lesson 3: Cloud Architecture
      {
        id: 10,
        lessonId: 3,
        type: "SELECT",
        order: 1,
        question: 'What does "elasticity" mean in cloud computing?',
      },
      // Lesson 4: AWS Global Infrastructure
      {
        id: 11,
        lessonId: 4,
        type: "SELECT",
        order: 1,
        question: 'What is an AWS Region?',
      },
      {
        id: 12,
        lessonId: 4,
        type: "SELECT",
        order: 2,
        question: 'What is an Availability Zone?',
      },
      // Lesson 6: Shared Responsibility Model
      {
        id: 13,
        lessonId: 6,
        type: "SELECT",
        order: 1,
        question: 'Who is responsible for patching the guest OS on EC2?',
      },
      {
        id: 14,
        lessonId: 6,
        type: "SELECT",
        order: 2,
        question: 'What is AWS responsible for in the Shared Responsibility Model?',
      },
      // Lesson 7: IAM Basics
      {
        id: 15,
        lessonId: 7,
        type: "SELECT",
        order: 1,
        question: 'What does IAM stand for?',
      },
      {
        id: 16,
        lessonId: 7,
        type: "SELECT",
        order: 2,
        question: 'What is the best practice for the AWS root account?',
      },
      // Lesson 9: EC2 Fundamentals
      {
        id: 17,
        lessonId: 9,
        type: "SELECT",
        order: 1,
        question: 'What does EC2 stand for?',
      },
      {
        id: 18,
        lessonId: 9,
        type: "SELECT",
        order: 2,
        question: 'What is an EC2 instance?',
      },
      // Lesson 10: S3 Storage
      {
        id: 19,
        lessonId: 10,
        type: "SELECT",
        order: 1,
        question: 'What does S3 stand for?',
      },
      {
        id: 20,
        lessonId: 10,
        type: "SELECT",
        order: 2,
        question: 'What is the storage limit for a single S3 object?',
      },
    ]);

    // Challenge 1: Multiple Choice (SELECT) - What is Cloud Computing?
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        correct: true,
        text: "On-demand delivery of IT resources over the internet",
      },
      {
        challengeId: 1,
        correct: false,
        text: "A physical data center you own",
      },
      {
        challengeId: 1,
        correct: false,
        text: "Software installed on your computer",
      },
    ]);

    // Challenge 2: Fill in the Blank (ASSIST) - Complete the sentence
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2,
        correct: true,
        text: "on-demand",
      },
      {
        challengeId: 2,
        correct: false,
        text: "scheduled",
      },
      {
        challengeId: 2,
        correct: false,
        text: "limited",
      },
    ]);

    // Challenge 3: True/False (TRUE_FALSE) - Cloud computing eliminates physical data centers
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3,
        correct: false,
        text: "True",
      },
      {
        challengeId: 3,
        correct: true,
        text: "False",
      },
    ]);

    // Challenge 4: Text Input (TEXT_INPUT) - No options needed, uses correctAnswer field

    // Challenge 5: Drag & Drop (DRAG_DROP) - AWS Service Types Learning Order
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 5,
        correct: false, // Not used for drag-drop
        text: "�️ Storage Services (S3, EBS)",
        order: 1,
      },
      {
        challengeId: 5,
        correct: false, // Not used for drag-drop
        text: "� Compute Services (EC2, Lambda)",
        order: 2,
      },
      {
        challengeId: 5,
        correct: false, // Not used for drag-drop
        text: "🌐 Networking Services (VPC, CloudFront)",
        order: 3,
      },
      {
        challengeId: 5,
        correct: false, // Not used for drag-drop
        text: "🔧 Management Services (CloudWatch, CloudFormation)",
        order: 4,
      },
    ]);

    // Challenge 6: Image Selection (IMAGE_SELECT) - AWS Cloud Icon
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 6,
        correct: true,
        text: "AWS Cloud Icon",
        imageSrc: "/aws-cloud-icon.png",
      },
      {
        challengeId: 6,
        correct: false,
        text: "Microsoft Azure Icon",
        imageSrc: "/azure-icon.png",
      },
      {
        challengeId: 6,
        correct: false,
        text: "Google Cloud Icon",
        imageSrc: "/gcp-icon.png",
      },
    ]);

    // Challenge 7: Listening (LISTENING) - AWS Service from Audio
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 19,
        correct: false,
        text: "Amazon S3",
      },
      {
        challengeId: 19,
        correct: true,
        text: "Amazon EC2",
      },
      {
        challengeId: 19,
        correct: false,
        text: "AWS Lambda",
      },
    ]);

    // Challenge 8: Benefits (Lesson 2)
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 20,
        correct: true,
        text: "Pay-as-you-go pricing",
      },
      {
        challengeId: 20,
        correct: false,
        text: "Requires large upfront investment",
      },
      {
        challengeId: 20,
        correct: false,
        text: "Limited scalability",
      },
    ]);

    // Challenge 9: CapEx vs OpEx (Lesson 2)
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 17,
        correct: true,
        text: "Variable operational expense",
      },
      {
        challengeId: 17,
        correct: false,
        text: "Fixed operational expense",
      },
      {
        challengeId: 17,
        correct: false,
        text: "Variable capital expense",
      },
    ]);

    // Challenge 10: Elasticity (Lesson 3)
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 18,
        correct: true,
        text: "Ability to scale resources up or down based on demand",
      },
      {
        challengeId: 18,
        correct: false,
        text: "Fixed resource allocation",
      },
      {
        challengeId: 18,
        correct: false,
        text: "Manual server provisioning",
      },
    ]);

    // Challenge 11: AWS Region (Lesson 4)
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 19,
        correct: true,
        text: "A geographical area with multiple Availability Zones",
      },
      {
        challengeId: 19,
        correct: false,
        text: "A single data center",
      },
      {
        challengeId: 19,
        correct: false,
        text: "A subnet within a VPC",
      },
    ]);

    // Challenge 8: Availability Zone
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 20,
        correct: true,
        text: "One or more discrete data centers with redundant power and networking",
      },
      {
        challengeId: 20,
        correct: false,
        text: "A region",
      },
      {
        challengeId: 20,
        correct: false,
        text: "An edge location",
      },
    ]);

    // Challenge 9: Shared Responsibility - Guest OS
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 17,
        correct: true,
        text: "Customer",
      },
      {
        challengeId: 17,
        correct: false,
        text: "AWS",
      },
      {
        challengeId: 17,
        correct: false,
        text: "Both AWS and Customer",
      },
    ]);

    // Challenge 10: AWS Responsibility
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 18,
        correct: true,
        text: "Physical security of data centers",
      },
      {
        challengeId: 18,
        correct: false,
        text: "Customer data encryption",
      },
      {
        challengeId: 18,
        correct: false,
        text: "Application-level security",
      },
    ]);

    // Challenge 11: IAM
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 19,
        correct: true,
        text: "Identity and Access Management",
      },
      {
        challengeId: 19,
        correct: false,
        text: "Internet Access Manager",
      },
      {
        challengeId: 19,
        correct: false,
        text: "Integrated Application Monitor",
      },
    ]);

    // Challenge 12: Root account best practice
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 20,
        correct: true,
        text: "Enable MFA and use it only for account setup",
      },
      {
        challengeId: 20,
        correct: false,
        text: "Use it for all daily operations",
      },
      {
        challengeId: 20,
        correct: false,
        text: "Share credentials with team members",
      },
    ]);

    // Challenge 13: EC2
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 17,
        correct: true,
        text: "Elastic Compute Cloud",
      },
      {
        challengeId: 17,
        correct: false,
        text: "Elastic Container Cloud",
      },
      {
        challengeId: 17,
        correct: false,
        text: "Enterprise Compute Cloud",
      },
    ]);

    // Challenge 14: EC2 instance
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 18,
        correct: true,
        text: "A virtual server in the cloud",
      },
      {
        challengeId: 18,
        correct: false,
        text: "A physical server",
      },
      {
        challengeId: 18,
        correct: false,
        text: "A storage bucket",
      },
    ]);

    // Challenge 15: S3
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 19,
        correct: true,
        text: "Simple Storage Service",
      },
      {
        challengeId: 19,
        correct: false,
        text: "Secure Storage Service",
      },
      {
        challengeId: 19,
        correct: false,
        text: "Scalable Server Service",
      },
    ]);

    // Challenge 16: S3 object size
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 20,
        correct: true,
        text: "5 TB",
      },
      {
        challengeId: 20,
        correct: false,
        text: "5 GB",
      },
      {
        challengeId: 20,
        correct: false,
        text: "Unlimited",
      },
    ]);

    // Challenge 17: True/False question
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 17,
        correct: false,
        text: "True",
      },
      {
        challengeId: 17,
        correct: true,
        text: "False",
      },
    ]);

    // Challenge 18: Text input question (no options needed as it uses correctAnswer field)

    // Challenge 19: Drag & Drop question  
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 19,
        correct: false, // Not used for drag-drop
        text: "Security",
        order: 1,
      },
      {
        challengeId: 19,
        correct: false, // Not used for drag-drop
        text: "Reliability", 
        order: 2,
      },
      {
        challengeId: 19,
        correct: false, // Not used for drag-drop
        text: "Performance Efficiency",
        order: 3,
      },
      {
        challengeId: 19,
        correct: false, // Not used for drag-drop
        text: "Cost Optimization",
        order: 4,
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();

