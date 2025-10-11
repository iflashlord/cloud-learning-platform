#!/usr/bin/env tsx

import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { sql } from "drizzle-orm";

const sqlConnection = neon(process.env.DATABASE_URL!);
const db = drizzle(sqlConnection);

async function addCourseFields() {
  try {
    console.log("Adding new fields to courses table...");
    
    // Check and add category column
    await db.execute(sql`
      ALTER TABLE courses 
      ADD COLUMN IF NOT EXISTS category text DEFAULT 'General'
    `);
    
    // Check and add description column
    await db.execute(sql`
      ALTER TABLE courses 
      ADD COLUMN IF NOT EXISTS description text
    `);
    
    // Check and add level column
    await db.execute(sql`
      ALTER TABLE courses 
      ADD COLUMN IF NOT EXISTS level text DEFAULT 'Beginner'
    `);
    
    // Check and add duration column
    await db.execute(sql`
      ALTER TABLE courses 
      ADD COLUMN IF NOT EXISTS duration text
    `);
    
    console.log("[SUCCESS] Successfully added new course fields!");
    
    // Update existing courses with default values
    console.log("Updating existing courses with categories...");
    
    await db.execute(sql`
      UPDATE courses SET 
        category = CASE 
          WHEN title LIKE '%AWS%' THEN 'AWS'
          WHEN title LIKE '%Architect%' THEN 'Architecture'
          WHEN title LIKE '%Developer%' THEN 'Development'
          WHEN title LIKE '%SysOps%' OR title LIKE '%DevOps%' THEN 'DevOps'
          ELSE 'General'
        END,
        level = CASE 
          WHEN title LIKE '%Practitioner%' THEN 'Beginner'
          WHEN title LIKE '%Associate%' THEN 'Intermediate'
          WHEN title LIKE '%SysOps%' THEN 'Advanced'
          ELSE 'Beginner'
        END,
        description = CASE 
          WHEN title = 'AWS Cloud Practitioner' THEN 'Build foundational knowledge of cloud concepts and AWS services. Perfect for beginners entering the cloud computing field.'
          WHEN title = 'AWS Solutions Architect Associate' THEN 'Learn to design distributed systems and applications on AWS. Essential for cloud architects and engineers.'
          WHEN title = 'AWS Developer Associate' THEN 'Master AWS services for application development and deployment. Great for developers building cloud applications.'
          WHEN title = 'AWS SysOps Administrator' THEN 'Develop expertise in deploying, managing, and operating AWS systems. Perfect for system administrators.'
          ELSE 'Comprehensive technology course with hands-on learning and practical exercises.'
        END,
        duration = CASE 
          WHEN title = 'AWS Cloud Practitioner' THEN '2-3 hours'
          WHEN title = 'AWS Solutions Architect Associate' THEN '4-6 hours'
          WHEN title = 'AWS Developer Associate' THEN '3-5 hours'
          WHEN title = 'AWS SysOps Administrator' THEN '5-7 hours'
          ELSE '3-4 hours'
        END
      WHERE category IS NULL OR category = '';
    `);
    
    console.log("[SUCCESS] Successfully updated existing courses!");
    
  } catch (error) {
    console.error("[ERROR]", error);
  }
}

addCourseFields();
