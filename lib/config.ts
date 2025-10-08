/**
 * Brand Configuration
 * 
 * This file contains all branding and naming configuration for the platform.
 * Change these values to rebrand the entire application.
 */

export const BRAND_CONFIG = {
  // Platform name - used throughout the application
  PLATFORM_NAME: "TechLingo",
  
  // Platform description/tagline
  PLATFORM_DESCRIPTION: "Interactive Technology Learning Platform",
  
  // Platform URL slug (used in package.json, URLs, etc.)
  PLATFORM_SLUG: "techlingo-platform",
  
  // Course/content theme
  CONTENT_THEME: "Technology",
  
  // Primary domain focus (appears in course descriptions, etc.)
  DOMAIN_FOCUS: "cloud computing and modern technology",
  
  // Company/Organization name (if different from platform name)
  COMPANY_NAME: "TechLingo",
  
  // Short description for metadata/SEO
  META_DESCRIPTION: "Learn technology concepts through interactive lessons, quests, and challenges",
  
  // GitHub/repository related
  REPO_NAME: "techlingo-platform",
  
  // File/asset naming patterns
  ASSET_PREFIX: "techlingo",
} as const;

// Derived values - automatically generated from the main config
export const DERIVED_CONFIG = {
  // Full platform title with description
  FULL_TITLE: `${BRAND_CONFIG.PLATFORM_NAME} - ${BRAND_CONFIG.PLATFORM_DESCRIPTION}`,
  
  // Platform name in lowercase for technical use
  PLATFORM_NAME_LOWER: BRAND_CONFIG.PLATFORM_NAME.toLowerCase(),
  
  // Platform name in uppercase for constants
  PLATFORM_NAME_UPPER: BRAND_CONFIG.PLATFORM_NAME.toUpperCase(),
  
  // CSS class prefix
  CSS_PREFIX: BRAND_CONFIG.PLATFORM_NAME.toLowerCase(),
  
  // Environment variable prefix
  ENV_PREFIX: BRAND_CONFIG.PLATFORM_NAME.toUpperCase(),
} as const;

// Export a combined config object for convenience
export const CONFIG = {
  ...BRAND_CONFIG,
  ...DERIVED_CONFIG,
} as const;

// Type definitions for TypeScript
export type BrandConfig = typeof BRAND_CONFIG;
export type DerivedConfig = typeof DERIVED_CONFIG;
export type AppConfig = typeof CONFIG;