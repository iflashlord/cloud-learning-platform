/**
 * Brand Configuration
 * 
 * This file contains all branding and naming configuration for the platform.
 * Change these values to rebrand the entire application.
 */

export const BRAND_CONFIG = {
  // Platform name - used throughout the application
  PLATFORM_NAME: "CloudLingo",
  
  // Platform description/tagline
  PLATFORM_DESCRIPTION: "Interactive Technology Learning Platform",
  
  // Platform URL slug (used in package.json, URLs, etc.)
  PLATFORM_SLUG: "cloudlingo-platform",
  
  // Course/content theme
  CONTENT_THEME: "Technology",
  
  // Primary domain focus (appears in course descriptions, etc.)
  DOMAIN_FOCUS: "cloud computing and modern technology",
  
  // Company/Organization name (if different from platform name)
  COMPANY_NAME: "CloudLingo",
  
  // Short description for metadata/SEO
  META_DESCRIPTION: "Learn technology concepts through interactive lessons, quests, and challenges",
  
  // GitHub/repository related
  REPO_NAME: "cloudlingo-platform",
  
  // File/asset naming patterns
  ASSET_PREFIX: "cloudlingo",
} as const;

// Global Color Theme Configuration
export const COLOR_THEME = {
  // Primary brand color (main platform color)
  primary: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74", 
    400: "#fb923c",
    500: "#f97316", // Main orange
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
  },
  
  // Success color (correct answers, progress)
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e", // Main green
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },
  
  // Error color (wrong answers, failures)
  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444", // Main red
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },
  
  // Info color (hints, information)
  info: {
    50: "#eff6ff",
    100: "#dbeafe", 
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6", // Main blue
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
  
  // Neutral colors (text, borders, backgrounds)
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5", 
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
  },
} as const;

// Course-specific color overrides
export const COURSE_THEMES = {
  // Default theme (uses global COLOR_THEME)
  default: {
    name: "Default",
    colors: COLOR_THEME,
  },
  
  // Cloud Computing - Orange theme (current default)
  cloud: {
    name: "Cloud Computing",
    colors: {
      ...COLOR_THEME,
      primary: COLOR_THEME.primary, // Orange
    },
  },
  
  // System Architecture - Blue theme
  architecture: {
    name: "System Architecture", 
    colors: {
      ...COLOR_THEME,
      primary: COLOR_THEME.info, // Blue
    },
  },
  
  // Development - Green theme
  development: {
    name: "Development",
    colors: {
      ...COLOR_THEME,
      primary: COLOR_THEME.success, // Green
    },
  },
  
  // DevOps - Purple theme
  devops: {
    name: "DevOps & Operations",
    colors: {
      ...COLOR_THEME,
      primary: {
        50: "#faf5ff",
        100: "#f3e8ff",
        200: "#e9d5ff", 
        300: "#d8b4fe",
        400: "#c084fc",
        500: "#a855f7", // Main purple
        600: "#9333ea",
        700: "#7c3aed",
        800: "#6b21a8",
        900: "#581c87",
      },
    },
  },
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