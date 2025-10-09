/**
 * 🎨 Comprehensive Design System for AWS Learning Platform
 * 
 * This file defines all design tokens, spacing, typography, and component patterns
 * to ensure consistency across the entire application.
 */

import { cva, type VariantProps } from "class-variance-authority";

// ==============================
// 🎯 DESIGN TOKENS
// ==============================

export const DESIGN_TOKENS = {
  // Spacing scale (rem units for accessibility)
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.5rem',     // 24px
    '2xl': '2rem',    // 32px
    '3xl': '3rem',    // 48px
    '4xl': '4rem',    // 64px
  },
  
  // Border radius scale
  radius: {
    none: '0',
    sm: '0.125rem',   // 2px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    full: '9999px',
  },
  
  // Typography scale
  typography: {
    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },
  
  // Shadow scale
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  
  // Animation durations
  animation: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
};

// ==============================
// 🎨 SEMANTIC COLOR SYSTEM
// ==============================

export const SEMANTIC_COLORS = {
  // Status colors
  success: {
    50: 'hsl(142, 76%, 96%)',
    100: 'hsl(142, 76%, 90%)',
    500: 'hsl(142, 76%, 45%)',
    600: 'hsl(142, 76%, 40%)',
    700: 'hsl(142, 76%, 35%)',
  },
  error: {
    50: 'hsl(0, 86%, 96%)',
    100: 'hsl(0, 86%, 90%)',
    500: 'hsl(0, 86%, 55%)',
    600: 'hsl(0, 86%, 50%)',
    700: 'hsl(0, 86%, 45%)',
  },
  warning: {
    50: 'hsl(48, 100%, 96%)',
    100: 'hsl(48, 100%, 88%)',
    500: 'hsl(48, 100%, 55%)',
    600: 'hsl(48, 100%, 50%)',
    700: 'hsl(48, 100%, 45%)',
  },
  info: {
    50: 'hsl(204, 100%, 97%)',
    100: 'hsl(204, 100%, 90%)',
    500: 'hsl(204, 100%, 55%)',
    600: 'hsl(204, 100%, 50%)',
    700: 'hsl(204, 100%, 45%)',
  },
  
  // Neutral colors
  neutral: {
    0: 'hsl(0, 0%, 100%)',      // Pure white
    50: 'hsl(210, 40%, 98%)',   // Off white
    100: 'hsl(210, 40%, 96%)',  // Light gray
    200: 'hsl(214, 32%, 91%)',  // Light gray
    300: 'hsl(213, 27%, 84%)',  // Medium light gray
    400: 'hsl(215, 20%, 65%)',  // Medium gray
    500: 'hsl(215, 16%, 47%)',  // Medium dark gray
    600: 'hsl(215, 19%, 35%)',  // Dark gray
    700: 'hsl(215, 25%, 27%)',  // Darker gray
    800: 'hsl(217, 33%, 17%)',  // Very dark gray
    900: 'hsl(222, 47%, 11%)',  // Almost black
  },
};

// ==============================
// 🧩 COMPONENT VARIANTS (CVA)
// ==============================

// Button component variants
export const buttonVariants = cva(
  // Base styles - consistent for all buttons
  [
    "inline-flex items-center justify-center",
    "font-semibold text-sm leading-tight",
    "border border-transparent rounded-lg",
    "transition-all duration-200 ease-in-out",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-gradient-to-r from-blue-500 to-blue-600",
          "text-white border-blue-600",
          "hover:from-blue-600 hover:to-blue-700 hover:shadow-md hover:scale-[1.02]",
          "focus:ring-blue-500",
          "active:scale-[0.98]",
        ],
        secondary: [
          "bg-white border-neutral-200 text-neutral-700",
          "hover:bg-neutral-50 hover:border-neutral-300 hover:shadow-sm",
          "focus:ring-neutral-500",
        ],
        success: [
          "bg-gradient-to-r from-green-500 to-green-600",
          "text-white border-green-600",
          "hover:from-green-600 hover:to-green-700 hover:shadow-md hover:scale-[1.02]",
          "focus:ring-green-500",
          "active:scale-[0.98]",
        ],
        error: [
          "bg-gradient-to-r from-red-500 to-red-600",
          "text-white border-red-600",
          "hover:from-red-600 hover:to-red-700 hover:shadow-md hover:scale-[1.02]",
          "focus:ring-red-500",
          "active:scale-[0.98]",
        ],
        warning: [
          "bg-gradient-to-r from-yellow-500 to-yellow-600",
          "text-white border-yellow-600",
          "hover:from-yellow-600 hover:to-yellow-700 hover:shadow-md hover:scale-[1.02]",
          "focus:ring-yellow-500",
          "active:scale-[0.98]",
        ],
        ghost: [
          "bg-transparent text-neutral-600 border-transparent",
          "hover:bg-neutral-100 hover:text-neutral-700",
          "focus:ring-neutral-500",
        ],
        outline: [
          "bg-transparent border-neutral-300 text-neutral-700",
          "hover:bg-neutral-50 hover:border-neutral-400",
          "focus:ring-neutral-500",
        ],
        link: [
          "bg-transparent text-blue-600 border-transparent p-0 h-auto",
          "hover:text-blue-700 hover:underline",
          "focus:ring-blue-500",
        ],
      },
      size: {
        xs: "h-7 px-2 text-xs",
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
        xl: "h-12 px-8 text-base",
        icon: "h-10 w-10 p-0",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      loading: {
        true: "cursor-wait opacity-75",
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

// Card component variants
export const cardVariants = cva(
  [
    "bg-white border border-neutral-200 rounded-lg",
    "transition-all duration-200",
  ],
  {
    variants: {
      variant: {
        default: "shadow-sm",
        elevated: "shadow-md hover:shadow-lg",
        outline: "border-2 border-neutral-300",
        ghost: "border-transparent shadow-none",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
      interactive: {
        true: "cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      interactive: false,
    },
  }
);

// Input component variants
export const inputVariants = cva(
  [
    "w-full border border-neutral-300 rounded-lg",
    "px-3 py-2 text-sm text-neutral-900 placeholder-neutral-500",
    "bg-white transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
    "disabled:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-75",
  ],
  {
    variants: {
      variant: {
        default: "",
        error: "border-red-500 focus:ring-red-500",
        success: "border-green-500 focus:ring-green-500",
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

// Badge component variants
export const badgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "px-2.5 py-0.5 text-xs font-medium rounded-full",
    "border transition-colors duration-200",
  ],
  {
    variants: {
      variant: {
        default: "bg-neutral-100 text-neutral-800 border-neutral-200",
        success: "bg-green-100 text-green-800 border-green-200",
        error: "bg-red-100 text-red-800 border-red-200",
        warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
        info: "bg-blue-100 text-blue-800 border-blue-200",
        primary: "bg-blue-100 text-blue-800 border-blue-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Progress component variants
export const progressVariants = cva(
  [
    "w-full bg-neutral-200 rounded-full overflow-hidden",
    "transition-all duration-300",
  ],
  {
    variants: {
      size: {
        sm: "h-2",
        md: "h-3",
        lg: "h-4",
      },
      variant: {
        default: "",
        success: "[&>*]:bg-green-500",
        error: "[&>*]:bg-red-500",
        warning: "[&>*]:bg-yellow-500",
        info: "[&>*]:bg-blue-500",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

// ==============================
// 🎯 COMPONENT STYLES FACTORY
// ==============================

export const createComponentStyles = {
  // Status colors for different UI states
  getStatusColor: (status: 'success' | 'error' | 'warning' | 'info' | 'neutral') => {
    const colorMap = {
      success: 'text-green-700 bg-green-100 border-green-200',
      error: 'text-red-700 bg-red-100 border-red-200',
      warning: 'text-yellow-700 bg-yellow-100 border-yellow-200',
      info: 'text-blue-700 bg-blue-100 border-blue-200',
      neutral: 'text-neutral-700 bg-neutral-100 border-neutral-200',
    };
    return colorMap[status];
  },

  // Interactive element styles
  getInteractiveStyles: (enabled = true) => {
    if (!enabled) return 'opacity-50 cursor-not-allowed';
    return 'cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150';
  },

  // Shadow styles based on elevation
  getShadowLevel: (level: 0 | 1 | 2 | 3 | 4) => {
    const shadows = [
      'shadow-none',           // 0
      'shadow-sm',            // 1
      'shadow-md',            // 2
      'shadow-lg',            // 3
      'shadow-xl',            // 4
    ];
    return shadows[level];
  },

  // Focus styles for accessibility
  getFocusStyles: (color: 'blue' | 'green' | 'red' | 'yellow' = 'blue') => {
    return `focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:ring-offset-2`;
  },
};

// ==============================
// 🎨 THEME-AWARE STYLES
// ==============================

export const THEME_STYLES = {
  // Layout containers
  container: {
    page: "min-h-screen bg-neutral-50",
    content: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
    section: "py-8 lg:py-12",
  },

  // Text styles
  text: {
    heading: {
      h1: "text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight",
      h2: "text-2xl lg:text-3xl font-bold text-neutral-900 tracking-tight", 
      h3: "text-xl lg:text-2xl font-semibold text-neutral-900",
      h4: "text-lg lg:text-xl font-semibold text-neutral-900",
    },
    body: {
      large: "text-lg text-neutral-700 leading-relaxed",
      base: "text-base text-neutral-700 leading-normal",
      small: "text-sm text-neutral-600 leading-normal",
      xs: "text-xs text-neutral-500 leading-normal",
    },
    emphasis: {
      strong: "font-semibold text-neutral-900",
      muted: "text-neutral-500",
      accent: "text-blue-600 font-medium",
    },
  },

  // Layout patterns
  layout: {
    stack: "space-y-4",
    stackLg: "space-y-6",
    stackXl: "space-y-8",
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
    flexRow: "flex items-center space-x-3",
    flexCol: "flex flex-col space-y-3",
    flexBetween: "flex items-center justify-between",
    flexCenter: "flex items-center justify-center",
  },
};

// Export type for component props
export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
export type CardVariantProps = VariantProps<typeof cardVariants>;
export type InputVariantProps = VariantProps<typeof inputVariants>;
export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
export type ProgressVariantProps = VariantProps<typeof progressVariants>;