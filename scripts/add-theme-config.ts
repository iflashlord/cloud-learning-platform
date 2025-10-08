#!/usr/bin/env tsx

import db from "../db/drizzle";
import { sql } from "drizzle-orm";

async function addThemeConfigColumn() {
  try {
    console.log("Adding theme_config column to courses table...");
    
    // Check if column already exists
    const result = await db.execute(sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'courses' 
      AND column_name = 'theme_config'
    `);
    
    if (result.rows.length > 0) {
      console.log("theme_config column already exists!");
      return;
    }
    
    // Add the column
    await db.execute(sql`
      ALTER TABLE courses ADD COLUMN theme_config jsonb
    `);
    
    console.log("Successfully added theme_config column!");
    
  } catch (error) {
    console.error("Error:", error);
  }
}

addThemeConfigColumn();