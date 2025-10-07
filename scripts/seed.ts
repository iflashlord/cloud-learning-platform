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
      // Lesson 1: What is Cloud Computing?
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        order: 1,
        question: 'What is Cloud Computing?',
      },
      {
        id: 2,
        lessonId: 1,
        type: "SELECT",
        order: 2,
        question: 'Which of these is NOT a cloud deployment model?',
      },
      {
        id: 3,
        lessonId: 1,
        type: "ASSIST",
        order: 3,
        question: 'Complete: Cloud computing provides ____ access to IT resources',
      },
      // Lesson 2: Benefits of AWS Cloud
      {
        id: 4,
        lessonId: 2,
        type: "SELECT",
        order: 1,
        question: 'What is a key benefit of AWS Cloud?',
      },
      {
        id: 5,
        lessonId: 2,
        type: "SELECT",
        order: 2,
        question: 'Trade capital expense for:',
      },
      // Lesson 3: Cloud Architecture
      {
        id: 6,
        lessonId: 3,
        type: "SELECT",
        order: 1,
        question: 'What does "elasticity" mean in cloud computing?',
      },
      // Lesson 4: AWS Global Infrastructure
      {
        id: 7,
        lessonId: 4,
        type: "SELECT",
        order: 1,
        question: 'What is an AWS Region?',
      },
      {
        id: 8,
        lessonId: 4,
        type: "SELECT",
        order: 2,
        question: 'What is an Availability Zone?',
      },
      // Lesson 6: Shared Responsibility Model
      {
        id: 9,
        lessonId: 6,
        type: "SELECT",
        order: 1,
        question: 'Who is responsible for patching the guest OS on EC2?',
      },
      {
        id: 10,
        lessonId: 6,
        type: "SELECT",
        order: 2,
        question: 'What is AWS responsible for in the Shared Responsibility Model?',
      },
      // Lesson 7: IAM Basics
      {
        id: 11,
        lessonId: 7,
        type: "SELECT",
        order: 1,
        question: 'What does IAM stand for?',
      },
      {
        id: 12,
        lessonId: 7,
        type: "SELECT",
        order: 2,
        question: 'What is the best practice for the AWS root account?',
      },
      // Lesson 9: EC2 Fundamentals
      {
        id: 13,
        lessonId: 9,
        type: "SELECT",
        order: 1,
        question: 'What does EC2 stand for?',
      },
      {
        id: 14,
        lessonId: 9,
        type: "SELECT",
        order: 2,
        question: 'What is an EC2 instance?',
      },
      // Lesson 10: S3 Storage
      {
        id: 15,
        lessonId: 10,
        type: "SELECT",
        order: 1,
        question: 'What does S3 stand for?',
      },
      {
        id: 16,
        lessonId: 10,
        type: "SELECT",
        order: 2,
        question: 'What is the storage limit for a single S3 object?',
      },
    ]);

    // Challenge 1: What is Cloud Computing?
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

    // Challenge 2: Cloud deployment models
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2,
        correct: false,
        text: "Public Cloud",
      },
      {
        challengeId: 2,
        correct: false,
        text: "Private Cloud",
      },
      {
        challengeId: 2,
        correct: false,
        text: "Hybrid Cloud",
      },
      {
        challengeId: 2,
        correct: true,
        text: "Local Cloud",
      },
    ]);

    // Challenge 3: Complete the sentence
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3,
        correct: true,
        text: "on-demand",
      },
      {
        challengeId: 3,
        correct: false,
        text: "scheduled",
      },
      {
        challengeId: 3,
        correct: false,
        text: "limited",
      },
    ]);

    // Challenge 4: Benefits
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 4,
        correct: true,
        text: "Pay-as-you-go pricing",
      },
      {
        challengeId: 4,
        correct: false,
        text: "Requires large upfront investment",
      },
      {
        challengeId: 4,
        correct: false,
        text: "Limited scalability",
      },
    ]);

    // Challenge 5: CapEx vs OpEx
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 5,
        correct: true,
        text: "Variable operational expense",
      },
      {
        challengeId: 5,
        correct: false,
        text: "Fixed operational expense",
      },
      {
        challengeId: 5,
        correct: false,
        text: "Variable capital expense",
      },
    ]);

    // Challenge 6: Elasticity
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 6,
        correct: true,
        text: "Ability to scale resources up or down based on demand",
      },
      {
        challengeId: 6,
        correct: false,
        text: "Fixed resource allocation",
      },
      {
        challengeId: 6,
        correct: false,
        text: "Manual server provisioning",
      },
    ]);

    // Challenge 7: AWS Region
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 7,
        correct: true,
        text: "A geographical area with multiple Availability Zones",
      },
      {
        challengeId: 7,
        correct: false,
        text: "A single data center",
      },
      {
        challengeId: 7,
        correct: false,
        text: "A subnet within a VPC",
      },
    ]);

    // Challenge 8: Availability Zone
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 8,
        correct: true,
        text: "One or more discrete data centers with redundant power and networking",
      },
      {
        challengeId: 8,
        correct: false,
        text: "A region",
      },
      {
        challengeId: 8,
        correct: false,
        text: "An edge location",
      },
    ]);

    // Challenge 9: Shared Responsibility - Guest OS
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 9,
        correct: true,
        text: "Customer",
      },
      {
        challengeId: 9,
        correct: false,
        text: "AWS",
      },
      {
        challengeId: 9,
        correct: false,
        text: "Both AWS and Customer",
      },
    ]);

    // Challenge 10: AWS Responsibility
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 10,
        correct: true,
        text: "Physical security of data centers",
      },
      {
        challengeId: 10,
        correct: false,
        text: "Customer data encryption",
      },
      {
        challengeId: 10,
        correct: false,
        text: "Application-level security",
      },
    ]);

    // Challenge 11: IAM
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 11,
        correct: true,
        text: "Identity and Access Management",
      },
      {
        challengeId: 11,
        correct: false,
        text: "Internet Access Manager",
      },
      {
        challengeId: 11,
        correct: false,
        text: "Integrated Application Monitor",
      },
    ]);

    // Challenge 12: Root account best practice
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 12,
        correct: true,
        text: "Enable MFA and use it only for account setup",
      },
      {
        challengeId: 12,
        correct: false,
        text: "Use it for all daily operations",
      },
      {
        challengeId: 12,
        correct: false,
        text: "Share credentials with team members",
      },
    ]);

    // Challenge 13: EC2
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 13,
        correct: true,
        text: "Elastic Compute Cloud",
      },
      {
        challengeId: 13,
        correct: false,
        text: "Elastic Container Cloud",
      },
      {
        challengeId: 13,
        correct: false,
        text: "Enterprise Compute Cloud",
      },
    ]);

    // Challenge 14: EC2 instance
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 14,
        correct: true,
        text: "A virtual server in the cloud",
      },
      {
        challengeId: 14,
        correct: false,
        text: "A physical server",
      },
      {
        challengeId: 14,
        correct: false,
        text: "A storage bucket",
      },
    ]);

    // Challenge 15: S3
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 15,
        correct: true,
        text: "Simple Storage Service",
      },
      {
        challengeId: 15,
        correct: false,
        text: "Secure Storage Service",
      },
      {
        challengeId: 15,
        correct: false,
        text: "Scalable Server Service",
      },
    ]);

    // Challenge 16: S3 object size
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 16,
        correct: true,
        text: "5 TB",
      },
      {
        challengeId: 16,
        correct: false,
        text: "5 GB",
      },
      {
        challengeId: 16,
        correct: false,
        text: "Unlimited",
      },
    ]);
    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();

