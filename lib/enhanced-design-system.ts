/**
 * 🎨 Enhanced Design System Foundation
 * 
 * This file provides a comprehensive, accessible design system with:
 * - Consistent component styling across light/dark modes
 * - Proper text contrast ratios (WCAG AA compliant)
 * - Responsive design patterns
 * - Theme-aware color systems
 * - Unified spacing and typography
 */

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ============================================================================
// DESIGN TOKENS
// ============================================================================

export const SPACING = {
  xs: "0.25rem",
  sm: "0.5rem", 
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  "2xl": "2rem",
  "3xl": "3rem",
  "4xl": "4rem",
} as const;

export const TYPOGRAPHY = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem", 
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
} as const;

export const RADIUS = {
  sm: "0.375rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  "2xl": "1.5rem",
} as const;

// ============================================================================
// RESPONSIVE BREAKPOINTS
// ============================================================================

export const BREAKPOINTS = {
  sm: "640px",
  md: "768px", 
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// Helper for responsive classes
export const responsive = {
  sm: (classes: string) => `sm:${classes}`,
  md: (classes: string) => `md:${classes}`, 
  lg: (classes: string) => `lg:${classes}`,
  xl: (classes: string) => `xl:${classes}`,
  "2xl": (classes: string) => `2xl:${classes}`,
};

// ============================================================================
// ENHANCED COMPONENT VARIANTS
// ============================================================================

/**
 * Enhanced Button Component with full accessibility and theme support
 */
export const enhancedButtonVariants = cva(
  [
    // Base styles - consistent across all variants
    "relative inline-flex items-center justify-center gap-2",
    "font-semibold tracking-wide transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    "active:translate-y-0.5 active:scale-[0.98]",
    "group",
  ],
  {
    variants: {
      variant: {
        // Primary - High contrast, accessible
        primary: [
          "bg-primary text-primary-foreground",
          "border-2 border-primary/20 border-b-4 border-b-primary/40",
          "shadow-[0_4px_0_theme(colors.primary.DEFAULT/0.3)]",
          "hover:bg-primary/90 hover:shadow-[0_6px_0_theme(colors.primary.DEFAULT/0.3)]",
          "hover:-translate-y-0.5 focus-visible:ring-primary/50",
          "dark:bg-primary dark:text-primary-foreground",
          "dark:border-primary/30 dark:border-b-primary/50",
        ],
        
        // Secondary - Subtle but clear
        secondary: [
          "bg-secondary text-secondary-foreground",
          "border-2 border-secondary/20 border-b-4 border-b-secondary/40", 
          "shadow-[0_4px_0_theme(colors.secondary.DEFAULT/0.3)]",
          "hover:bg-secondary/90 hover:shadow-[0_6px_0_theme(colors.secondary.DEFAULT/0.3)]",
          "hover:-translate-y-0.5 focus-visible:ring-secondary/50",
        ],
        
        // Success - Green, accessible
        success: [
          "bg-green-500 text-white",
          "border-2 border-green-600 border-b-4 border-b-green-700",
          "shadow-[0_4px_0_theme(colors.green.700)]",
          "hover:bg-green-400 hover:shadow-[0_6px_0_theme(colors.green.700)]",
          "hover:-translate-y-0.5 focus-visible:ring-green-500/50",
          "dark:bg-green-600 dark:border-green-700 dark:border-b-green-800",
        ],
        
        // Error - Red, accessible  
        error: [
          "bg-red-500 text-white",
          "border-2 border-red-600 border-b-4 border-b-red-700",
          "shadow-[0_4px_0_theme(colors.red.700)]",
          "hover:bg-red-400 hover:shadow-[0_6px_0_theme(colors.red.700)]",
          "hover:-translate-y-0.5 focus-visible:ring-red-500/50",
          "dark:bg-red-600 dark:border-red-700 dark:border-b-red-800",
        ],
        
        // Warning - Orange/Yellow, accessible
        warning: [
          "bg-amber-500 text-amber-950",
          "border-2 border-amber-600 border-b-4 border-b-amber-700", 
          "shadow-[0_4px_0_theme(colors.amber.700)]",
          "hover:bg-amber-400 hover:shadow-[0_6px_0_theme(colors.amber.700)]",
          "hover:-translate-y-0.5 focus-visible:ring-amber-500/50",
          "dark:bg-amber-600 dark:text-amber-50 dark:border-amber-700 dark:border-b-amber-800",
        ],
        
        // Info - Blue, accessible
        info: [
          "bg-blue-500 text-white",
          "border-2 border-blue-600 border-b-4 border-b-blue-700",
          "shadow-[0_4px_0_theme(colors.blue.700)]", 
          "hover:bg-blue-400 hover:shadow-[0_6px_0_theme(colors.blue.700)]",
          "hover:-translate-y-0.5 focus-visible:ring-blue-500/50",
          "dark:bg-blue-600 dark:border-blue-700 dark:border-b-blue-800",
        ],
        
        // Ghost - Minimal, subtle
        ghost: [
          "bg-transparent text-foreground",
          "border-2 border-transparent",
          "hover:bg-muted hover:text-muted-foreground",
          "focus-visible:ring-muted-foreground/50",
        ],
        
        // Outline - Border focus
        outline: [
          "bg-background text-foreground",
          "border-2 border-border border-b-4 border-b-border/60",
          "shadow-[0_4px_0_theme(colors.border)]",
          "hover:bg-muted hover:shadow-[0_6px_0_theme(colors.border)]", 
          "hover:-translate-y-0.5 focus-visible:ring-border/50",
        ],
      },
      
      size: {
        sm: "px-3 py-1.5 text-sm rounded-lg h-8",
        md: "px-4 py-2 text-base rounded-xl h-10", 
        lg: "px-6 py-3 text-lg rounded-xl h-12",
        xl: "px-8 py-4 text-xl rounded-2xl h-14",
        icon: "w-10 h-10 rounded-lg",
      },
      
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
      
      loading: {
        true: "cursor-wait",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      loading: false,
    },
  }
);

/**
 * Enhanced Card Component with proper elevation and spacing
 */
export const enhancedCardVariants = cva(
  [
    "relative rounded-xl border bg-card text-card-foreground",
    "transition-all duration-200 ease-out",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-border/50 shadow-sm",
          "hover:shadow-md hover:border-border/70",
        ],
        elevated: [
          "border-border/30 shadow-lg",
          "hover:shadow-xl hover:border-border/50",
        ],
        interactive: [
          "border-border/50 shadow-sm cursor-pointer",
          "hover:shadow-lg hover:border-border/80 hover:-translate-y-1",
          "active:translate-y-0 active:shadow-md",
        ],
        success: [
          "border-green-200 bg-green-50/50 shadow-sm",
          "dark:border-green-800 dark:bg-green-950/20",
        ],
        error: [
          "border-red-200 bg-red-50/50 shadow-sm", 
          "dark:border-red-800 dark:bg-red-950/20",
        ],
        warning: [
          "border-amber-200 bg-amber-50/50 shadow-sm",
          "dark:border-amber-800 dark:bg-amber-950/20", 
        ],
        info: [
          "border-blue-200 bg-blue-50/50 shadow-sm",
          "dark:border-blue-800 dark:bg-blue-950/20",
        ],
      },
      
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-4", 
        lg: "p-6",
        xl: "p-8",
      },
      
      spacing: {
        none: "space-y-0",
        sm: "space-y-2",
        md: "space-y-4",
        lg: "space-y-6", 
        xl: "space-y-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      spacing: "md",
    },
  }
);

/**
 * Enhanced Input Component with proper states and accessibility
 */
export const enhancedInputVariants = cva(
  [
    "flex w-full rounded-lg border bg-background px-3 py-2 text-sm",
    "transition-all duration-200 ease-out",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "placeholder:text-muted-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-input focus-visible:ring-ring/50",
          "hover:border-input/80",
        ],
        success: [
          "border-green-300 focus-visible:ring-green-500/50", 
          "dark:border-green-700 dark:focus-visible:ring-green-400/50",
        ],
        error: [
          "border-red-300 focus-visible:ring-red-500/50",
          "dark:border-red-700 dark:focus-visible:ring-red-400/50", 
        ],
        warning: [
          "border-amber-300 focus-visible:ring-amber-500/50",
          "dark:border-amber-700 dark:focus-visible:ring-amber-400/50",
        ],
      },
      
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-10 px-3 text-sm", 
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Enhanced Badge Component with semantic colors
 */
export const enhancedBadgeVariants = cva(
  [
    "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
    "transition-all duration-200 ease-out",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-primary/10 text-primary border border-primary/20",
          "dark:bg-primary/20 dark:text-primary-foreground",
        ],
        secondary: [
          "bg-secondary/10 text-secondary-foreground border border-secondary/20",
        ],
        success: [
          "bg-green-100 text-green-800 border border-green-200",
          "dark:bg-green-950/50 dark:text-green-400 dark:border-green-800",
        ],
        error: [
          "bg-red-100 text-red-800 border border-red-200", 
          "dark:bg-red-950/50 dark:text-red-400 dark:border-red-800",
        ],
        warning: [
          "bg-amber-100 text-amber-800 border border-amber-200",
          "dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800",
        ],
        info: [
          "bg-blue-100 text-blue-800 border border-blue-200",
          "dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-800", 
        ],
        neutral: [
          "bg-gray-100 text-gray-800 border border-gray-200",
          "dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
        ],
        outline: [
          "text-foreground border border-border bg-transparent",
        ],
      },
      
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs", 
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// ============================================================================
// LAYOUT HELPERS 
// ============================================================================

/**
 * Container component for consistent page layouts
 */
export const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      sm: "max-w-2xl",
      md: "max-w-4xl",
      lg: "max-w-6xl", 
      xl: "max-w-7xl",
      full: "max-w-full",
    },
    padding: {
      none: "px-0",
      sm: "px-4",
      md: "px-6", 
      lg: "px-8",
    },
  },
  defaultVariants: {
    size: "lg",
    padding: "md",
  },
});

/**
 * Responsive grid system
 */
export const gridVariants = cva("grid gap-4", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", 
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      auto: "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
    },
    gap: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8", 
    },
  },
  defaultVariants: {
    cols: "auto",
    gap: "md",
  },
});

// ============================================================================
// ACCESSIBILITY HELPERS
// ============================================================================

/**
 * Screen reader only text
 */
export const srOnly = "sr-only";

/**
 * Focus visible styles for custom components
 */
export const focusVisible = [
  "focus-visible:outline-none",
  "focus-visible:ring-2", 
  "focus-visible:ring-ring",
  "focus-visible:ring-offset-2",
].join(" ");

/**
 * Skip to main content link
 */
export const skipLink = [
  "absolute left-0 top-0 z-50",
  "translate-x-full opacity-0", 
  "focus:translate-x-0 focus:opacity-100",
  "bg-background text-foreground",
  "px-4 py-2 rounded-br-lg border-r border-b",
  focusVisible,
].join(" ");

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Combine multiple variant classes safely
 */
export function combineVariants(...variants: (string | undefined | null | false)[]) {
  return cn(...variants.filter(Boolean));
}

/**
 * Create responsive classes helper
 */
export function createResponsive(
  classes: string,
  breakpoint: keyof typeof BREAKPOINTS = "md"
) {
  return `${classes} ${breakpoint}:${classes}`;
}

/**
 * Generate color classes for theme consistency 
 */
export function getThemeColor(
  color: "primary" | "secondary" | "success" | "error" | "warning" | "info" | "neutral",
  opacity = 100
) {
  const opacityMap = {
    10: "10",
    20: "20", 
    50: "50",
    100: "100",
  };
  
  const suffix = opacity !== 100 ? `/${opacityMap[opacity as keyof typeof opacityMap] || opacity}` : "";
  
  return {
    bg: `bg-${color}${suffix}`,
    text: `text-${color}${suffix}`,
    border: `border-${color}${suffix}`,
  };
}

// Export variant props for TypeScript support
export type EnhancedButtonVariantProps = VariantProps<typeof enhancedButtonVariants>;
export type EnhancedCardVariantProps = VariantProps<typeof enhancedCardVariants>;
export type EnhancedInputVariantProps = VariantProps<typeof enhancedInputVariants>;
export type EnhancedBadgeVariantProps = VariantProps<typeof enhancedBadgeVariants>;
export type ContainerVariantProps = VariantProps<typeof containerVariants>;
export type GridVariantProps = VariantProps<typeof gridVariants>;