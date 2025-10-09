#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Hardcoded color patterns to find
const colorPatterns = [
  /bg-(blue|green|red|yellow|purple|indigo|gray)-\d+/g,
  /border-(blue|green|red|yellow|purple|indigo|gray)-\d+/g,
  /text-(blue|green|red|yellow|purple|indigo|gray)-\d+/g,
];

const excludePatterns = [
  /node_modules/,
  /\.next/,
  /\.git/,
  /drizzle/,
  /public/,
];

function shouldExclude(filePath) {
  return excludePatterns.some(pattern => pattern.test(filePath));
}

function findHardcodedColors(dir, results = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    
    if (shouldExclude(fullPath)) continue;
    
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      findHardcodedColors(fullPath, results);
    } else if (item.endsWith('.tsx') || item.endsWith('.ts') || item.endsWith('.jsx') || item.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      for (const pattern of colorPatterns) {
        const matches = content.match(pattern);
        if (matches) {
          const uniqueMatches = [...new Set(matches)];
          if (uniqueMatches.length > 0) {
            results.push({
              file: fullPath.replace(process.cwd() + '/', ''),
              matches: uniqueMatches,
              count: matches.length
            });
            break; // Don't duplicate files
          }
        }
      }
    }
  }
  
  return results;
}

const results = findHardcodedColors(process.cwd());

console.log('\n🎨 HARDCODED COLORS AUDIT\n');
console.log(`Found ${results.length} files with hardcoded colors:\n`);

results.forEach(result => {
  console.log(`📁 ${result.file}`);
  console.log(`   Colors: ${result.matches.join(', ')}`);
  console.log(`   Count: ${result.count}\n`);
});

console.log(`\nTotal files with hardcoded colors: ${results.length}`);
console.log(`Priority files to update:`);
results
  .filter(r => r.file.includes('app/') || r.file.includes('components/'))
  .slice(0, 10)
  .forEach(r => console.log(`  - ${r.file}`));