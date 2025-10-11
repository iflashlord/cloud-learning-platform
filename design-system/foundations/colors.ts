/**
 * Color system for AWS Learning Platform
 * 
 * Provides a comprehensive color palette with semantic naming,
 * accessibility-first contrast ratios, and both light/dark mode support.
 */

// Brand Colors - Primary brand identity
export const BRAND_COLORS = {
  primary: {
    50: "hsl(142, 76%, 96%)",
    100: "hsl(142, 76%, 90%)", 
    200: "hsl(142, 76%, 80%)",
    300: "hsl(142, 76%, 70%)",
    400: "hsl(142, 76%, 60%)",
    500: "hsl(142, 76%, 45%)", // Main brand green
    600: "hsl(142, 76%, 40%)",
    700: "hsl(142, 76%, 35%)",
    800: "hsl(142, 76%, 30%)",
    900: "hsl(142, 76%, 20%)",
  },
  secondary: {
    50: "hsl(220, 90%, 97%)",
    100: "hsl(220, 85%, 92%)",
    200: "hsl(220, 80%, 85%)",
    300: "hsl(220, 75%, 75%)",
    400: "hsl(220, 70%, 65%)",
    500: "hsl(220, 65%, 55%)", // AWS Blue
    600: "hsl(220, 60%, 45%)",
    700: "hsl(220, 55%, 35%)",
    800: "hsl(220, 50%, 25%)",
    900: "hsl(220, 45%, 15%)",
  },
  accent: {
    50: "hsl(45, 100%, 96%)",
    100: "hsl(45, 100%, 88%)",
    200: "hsl(45, 100%, 80%)",
    300: "hsl(45, 100%, 72%)",
    400: "hsl(45, 100%, 64%)",
    500: "hsl(45, 100%, 55%)", // Gold accent
    600: "hsl(45, 100%, 50%)",
    700: "hsl(45, 100%, 45%)",
    800: "hsl(45, 100%, 40%)",
    900: "hsl(45, 100%, 30%)",
  },
} as const;

// AWS Service Colors - For course-specific theming
export const AWS_SERVICE_COLORS = {
  compute: {
    primary: "hsl(14, 100%, 57%)", // EC2 Orange
    secondary: "hsl(14, 80%, 47%)",
    light: "hsl(14, 100%, 95%)",
    dark: "hsl(14, 100%, 20%)",
  },
  storage: {
    primary: "hsl(142, 71%, 45%)", // S3 Green
    secondary: "hsl(142, 71%, 35%)",
    light: "hsl(142, 71%, 95%)",
    dark: "hsl(142, 71%, 20%)",
  },
  database: {
    primary: "hsl(220, 90%, 56%)", // RDS Blue
    secondary: "hsl(220, 90%, 46%)",
    light: "hsl(220, 90%, 95%)",
    dark: "hsl(220, 90%, 20%)",
  },
  networking: {
    primary: "hsl(276, 100%, 54%)", // VPC Purple
    secondary: "hsl(276, 100%, 44%)",
    light: "hsl(276, 100%, 95%)",
    dark: "hsl(276, 100%, 20%)",
  },
  security: {
    primary: "hsl(0, 84%, 60%)", // IAM Red
    secondary: "hsl(0, 84%, 50%)",
    light: "hsl(0, 84%, 95%)",
    dark: "hsl(0, 84%, 20%)",
  },
  analytics: {
    primary: "hsl(45, 100%, 51%)", // Analytics Gold
    secondary: "hsl(45, 100%, 41%)",
    light: "hsl(45, 100%, 95%)",
    dark: "hsl(45, 100%, 20%)",
  },
  ml: {
    primary: "hsl(168, 76%, 42%)", // ML/AI Teal
    secondary: "hsl(168, 76%, 32%)",
    light: "hsl(168, 76%, 95%)",
    dark: "hsl(168, 76%, 20%)",
  },
} as const;

// Neutral Colors - Grayscale palette
export const NEUTRAL_COLORS = {
  0: "hsl(0, 0%, 100%)", // Pure white
  50: "hsl(210, 40%, 98%)",
  100: "hsl(210, 40%, 96%)",
  200: "hsl(214, 32%, 91%)",
  300: "hsl(213, 27%, 84%)",
  400: "hsl(215, 20%, 65%)",
  500: "hsl(215, 16%, 47%)",
  600: "hsl(215, 19%, 35%)",
  700: "hsl(215, 25%, 27%)",
  800: "hsl(217, 33%, 17%)",
  900: "hsl(222, 47%, 11%)",
  950: "hsl(222, 47%, 7%)", // Pure black
} as const;

// Semantic Status Colors
export const STATUS_COLORS = {
  success: {
    50: "hsl(142, 76%, 96%)",
    100: "hsl(142, 76%, 90%)",
    200: "hsl(142, 76%, 80%)",
    300: "hsl(142, 76%, 70%)",
    400: "hsl(142, 76%, 60%)",
    500: "hsl(142, 76%, 45%)",
    600: "hsl(142, 76%, 40%)",
    700: "hsl(142, 76%, 35%)",
    800: "hsl(142, 76%, 30%)",
    900: "hsl(142, 76%, 20%)",
  },
  error: {
    50: "hsl(0, 86%, 97%)",
    100: "hsl(0, 93%, 94%)",
    200: "hsl(0, 96%, 89%)",
    300: "hsl(0, 94%, 82%)",
    400: "hsl(0, 91%, 71%)",
    500: "hsl(0, 84%, 60%)",
    600: "hsl(0, 72%, 51%)",
    700: "hsl(0, 74%, 42%)",
    800: "hsl(0, 70%, 35%)",
    900: "hsl(0, 63%, 31%)",
  },
  warning: {
    50: "hsl(48, 100%, 96%)",
    100: "hsl(48, 96%, 89%)",
    200: "hsl(48, 97%, 77%)",
    300: "hsl(46, 97%, 65%)",
    400: "hsl(43, 96%, 56%)",
    500: "hsl(38, 92%, 50%)",
    600: "hsl(32, 95%, 44%)",
    700: "hsl(26, 90%, 37%)",
    800: "hsl(23, 83%, 31%)",
    900: "hsl(22, 78%, 26%)",
  },
  info: {
    50: "hsl(204, 100%, 97%)",
    100: "hsl(204, 94%, 94%)",
    200: "hsl(201, 94%, 86%)",
    300: "hsl(199, 95%, 74%)",
    400: "hsl(198, 93%, 60%)",
    500: "hsl(198, 89%, 48%)",
    600: "hsl(200, 98%, 39%)",
    700: "hsl(201, 96%, 32%)",
    800: "hsl(201, 90%, 27%)",
    900: "hsl(202, 80%, 24%)",
  },
} as const;

// Theme Mode Colors - Light and Dark variants
export const THEME_COLORS = {
  light: {
    background: NEUTRAL_COLORS[0],
    foreground: NEUTRAL_COLORS[900],
    muted: {
      background: NEUTRAL_COLORS[100],
      foreground: NEUTRAL_COLORS[500],
    },
    card: {
      background: NEUTRAL_COLORS[0],
      foreground: NEUTRAL_COLORS[900],
    },
    popover: {
      background: NEUTRAL_COLORS[0],
      foreground: NEUTRAL_COLORS[900],
    },
    border: NEUTRAL_COLORS[200],
    input: NEUTRAL_COLORS[200],
    primary: {
      background: BRAND_COLORS.primary[500],
      foreground: NEUTRAL_COLORS[0],
    },
    secondary: {
      background: NEUTRAL_COLORS[100],
      foreground: NEUTRAL_COLORS[900],
    },
    accent: {
      background: NEUTRAL_COLORS[100],
      foreground: NEUTRAL_COLORS[900],
    },
    destructive: {
      background: STATUS_COLORS.error[500],
      foreground: NEUTRAL_COLORS[0],
    },
    ring: BRAND_COLORS.primary[500],
  },
  dark: {
    background: NEUTRAL_COLORS[950],
    foreground: NEUTRAL_COLORS[50],
    muted: {
      background: NEUTRAL_COLORS[800],
      foreground: NEUTRAL_COLORS[400],
    },
    card: {
      background: NEUTRAL_COLORS[950],
      foreground: NEUTRAL_COLORS[50],
    },
    popover: {
      background: NEUTRAL_COLORS[950],
      foreground: NEUTRAL_COLORS[50],
    },
    border: NEUTRAL_COLORS[800],
    input: NEUTRAL_COLORS[800],
    primary: {
      background: BRAND_COLORS.primary[500],
      foreground: NEUTRAL_COLORS[0],
    },
    secondary: {
      background: NEUTRAL_COLORS[800],
      foreground: NEUTRAL_COLORS[50],
    },
    accent: {
      background: NEUTRAL_COLORS[800],
      foreground: NEUTRAL_COLORS[50],
    },
    destructive: {
      background: STATUS_COLORS.error[600],
      foreground: NEUTRAL_COLORS[0],
    },
    ring: BRAND_COLORS.primary[400],
  },
} as const;

// Gamification Colors - For streaks, XP, achievements
export const GAMIFICATION_COLORS = {
  streak: {
    bronze: "hsl(30, 67%, 52%)",
    silver: "hsl(0, 0%, 66%)",
    gold: "hsl(45, 100%, 51%)",
    diamond: "hsl(193, 82%, 31%)",
  },
  xp: {
    background: "hsl(142, 76%, 45%)",
    progress: "hsl(45, 100%, 51%)",
    glow: "hsl(142, 76%, 70%)",
  },
  achievement: {
    locked: NEUTRAL_COLORS[300],
    unlocked: BRAND_COLORS.accent[500],
    rare: "hsl(276, 100%, 54%)",
    legendary: "hsl(45, 100%, 51%)",
  },
} as const;

// Type definitions
export type BrandColor = keyof typeof BRAND_COLORS;
export type AWSServiceColor = keyof typeof AWS_SERVICE_COLORS;
export type NeutralColor = keyof typeof NEUTRAL_COLORS;
export type StatusColor = keyof typeof STATUS_COLORS;
export type ThemeMode = keyof typeof THEME_COLORS;
export type GamificationColor = keyof typeof GAMIFICATION_COLORS;

// Color utility functions
export const colorUtils = {
  /**
   * Get color value by path (e.g., "brand.primary.500")
   */
  getColor: (path: string): string => {
    const keys = path.split('.');
    let value: any = {
      brand: BRAND_COLORS,
      aws: AWS_SERVICE_COLORS,
      neutral: NEUTRAL_COLORS,
      status: STATUS_COLORS,
      theme: THEME_COLORS,
      gamification: GAMIFICATION_COLORS,
    };
    
    for (const key of keys) {
      value = value?.[key];
    }
    
    return typeof value === 'string' ? value : '';
  },

  /**
   * Generate color scale variations
   */
  generateScale: (baseColor: string, steps: number = 9): string[] => {
    // This would implement HSL manipulation to generate scales
    // For now, return the base color
    return Array(steps).fill(baseColor);
  },

  /**
   * Check if color meets WCAG accessibility standards
   */
  isAccessible: (foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): boolean => {
    // This would implement contrast ratio calculation
    // For now, return true as a placeholder
    return true;
  },

  /**
   * Get semantic color for component state
   */
  getSemanticColor: (state: 'default' | 'success' | 'error' | 'warning' | 'info'): string => {
    const stateMap = {
      default: NEUTRAL_COLORS[500],
      success: STATUS_COLORS.success[500],
      error: STATUS_COLORS.error[500],
      warning: STATUS_COLORS.warning[500],
      info: STATUS_COLORS.info[500],
    };
    return stateMap[state];
  },
} as const;