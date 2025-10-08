#!/usr/bin/env node

/**
 * Sync Script - Updates package.json with current branding configuration
 * 
 * This script reads the brand configuration and updates package.json
 * to ensure consistency across all branding elements.
 */

const fs = require('fs');
const path = require('path');

// Read the current brand configuration
const configPath = path.join(__dirname, '../lib/config.ts');
const packagePath = path.join(__dirname, '../package.json');

try {
  // Extract PLATFORM_SLUG from the config file
  const configContent = fs.readFileSync(configPath, 'utf8');
  const slugMatch = configContent.match(/PLATFORM_SLUG:\s*["']([^"']+)["']/);
  
  if (!slugMatch) {
    console.error('Could not find PLATFORM_SLUG in config.ts');
    process.exit(1);
  }
  
  const newSlug = slugMatch[1];
  
  // Read and update package.json
  const packageContent = fs.readFileSync(packagePath, 'utf8');
  const packageJson = JSON.parse(packageContent);
  
  const oldName = packageJson.name;
  packageJson.name = newSlug;
  
  // Write back to package.json
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
  
  console.log(`✅ Updated package.json name from "${oldName}" to "${newSlug}"`);
  console.log('📦 Please run "npm install" to update package-lock.json if needed');
  
} catch (error) {
  console.error('❌ Error updating package.json:', error.message);
  process.exit(1);
}