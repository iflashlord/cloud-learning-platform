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
    "inline-flex items-center justify-center rounded-full",
    "font-semibold tracking-wide transition-all duration-200 ease-out",
    "px-[var(--ds-space-lg)] py-[calc(var(--ds-space-sm)*1.5)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[linear-gradient(140deg,hsl(var(--ds-primary-400)),hsl(var(--ds-primary-600)))]",
          "text-[hsl(var(--ds-primary-foreground))]",
          "shadow-[0_18px_32px_rgba(var(--ds-primary-rgb),0.28)]",
          "hover:-translate-y-0.5 hover:shadow-[0_24px_40px_rgba(var(--ds-primary-rgb),0.35)]",
          "focus-visible:ring-[hsl(var(--ds-primary-500))]",
        ],
        secondary: [
          "border-2 border-[hsl(var(--ds-primary-200))]",
          "bg-[hsl(var(--ds-primary-50))]",
          "text-[hsl(var(--ds-primary-600))]",
          "hover:-translate-y-0.5 hover:bg-[hsl(var(--ds-primary-100))]",
          "focus-visible:ring-[hsl(var(--ds-primary-200))]",
        ],
        success: [
          "bg-[linear-gradient(140deg,hsl(var(--ds-success-400)),hsl(var(--ds-success-600)))]",
          "text-[hsl(var(--ds-success-foreground))]",
          "shadow-[0_18px_32px_rgba(var(--ds-success-rgb),0.25)]",
          "hover:-translate-y-0.5 hover:shadow-[0_24px_40px_rgba(var(--ds-success-rgb),0.32)]",
          "focus-visible:ring-[hsl(var(--ds-success-500))]",
        ],
        error: [
          "bg-[linear-gradient(140deg,hsl(var(--ds-error-400)),hsl(var(--ds-error-600)))]",
          "text-[hsl(var(--ds-error-foreground))]",
          "shadow-[0_18px_32px_rgba(var(--ds-error-rgb),0.25)]",
          "hover:-translate-y-0.5 hover:shadow-[0_24px_40px_rgba(var(--ds-error-rgb),0.32)]",
          "focus-visible:ring-[hsl(var(--ds-error-500))]",
        ],
        warning: [
          "bg-[linear-gradient(140deg,hsl(var(--ds-warning-400)),hsl(var(--ds-warning-600)))]",
          "text-[hsl(var(--ds-warning-foreground))]",
          "shadow-[0_18px_32px_rgba(var(--ds-warning-rgb),0.25)]",
          "hover:-translate-y-0.5 hover:shadow-[0_24px_40px_rgba(var(--ds-warning-rgb),0.32)]",
          "focus-visible:ring-[hsl(var(--ds-warning-500))]",
        ],
        ghost: [
          "bg-transparent border-transparent",
          "text-[hsl(var(--ds-neutral-600))]",
          "hover:bg-[hsl(var(--ds-neutral-100))]",
          "focus-visible:ring-[hsl(var(--ds-neutral-300))]",
        ],
        outline: [
          "border-2 border-[hsl(var(--ds-neutral-300))]",
          "text-[hsl(var(--ds-neutral-700))]",
          "bg-[hsl(var(--ds-neutral-0))]",
          "hover:bg-[hsl(var(--ds-neutral-100))]",
          "focus-visible:ring-[hsl(var(--ds-neutral-400))]",
        ],
        link: [
          "bg-transparent border-transparent p-0 h-auto",
          "text-[hsl(var(--ds-info-600))]",
          "hover:text-[hsl(var(--ds-info-500))] hover:underline",
          "focus-visible:ring-offset-0 focus-visible:ring-[hsl(var(--ds-info-500))]",
        ],
      },
      size: {
        xs: "h-8 px-[var(--ds-space-sm)] text-[length:var(--ds-text-xs)]",
        sm: "h-9 px-[var(--ds-space-md)] text-[length:var(--ds-text-sm)]",
        md: "h-11 px-[var(--ds-space-lg)] text-[length:var(--ds-text-base)]",
        lg: "h-12 px-[var(--ds-space-xl)] text-[length:var(--ds-text-lg)]",
        xl: "h-14 px-[var(--ds-space-2xl)] text-[length:var(--ds-text-xl)]",
        icon: "h-11 w-11 p-0",
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
    "bg-[hsl(var(--ds-neutral-50))] border border-[hsl(var(--ds-neutral-200))] rounded-2xl",
    "transition-all duration-200 ease-out shadow-[0_16px_32px_rgba(var(--ds-neutral-rgb),0.05)]",
  ],
  {
    variants: {
      variant: {
        default: "hover:-translate-y-0.5 hover:shadow-[0_22px_40px_rgba(var(--ds-neutral-rgb),0.08)]",
        elevated: "shadow-[0_22px_45px_rgba(var(--ds-neutral-rgb),0.12)] hover:-translate-y-1",
        outline: "border-2 border-[hsl(var(--ds-neutral-300))]",
        ghost: "border-transparent shadow-none bg-transparent",
      },
      padding: {
        none: "p-0",
        sm: "p-[var(--ds-space-sm)]",
        md: "p-[var(--ds-space-md)]",
        lg: "p-[var(--ds-space-lg)]",
        xl: "p-[var(--ds-space-xl)]",
      },
      interactive: {
        true: "cursor-pointer hover:-translate-y-1 hover:shadow-[0_26px_48px_rgba(var(--ds-neutral-rgb),0.14)] active:translate-y-0",
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
    "w-full border border-[hsl(var(--ds-neutral-300))] rounded-2xl",
    "px-[var(--ds-space-md)] py-[calc(var(--ds-space-sm)*1.2)] text-[length:var(--ds-text-sm)]",
    "text-[hsl(var(--ds-neutral-800))] placeholder:text-[hsl(var(--ds-neutral-500))]",
    "bg-[hsl(var(--ds-neutral-0,var(--ds-neutral-50)))] transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ds-primary-400))] focus-visible:border-transparent",
    "disabled:bg-[hsl(var(--ds-neutral-100))] disabled:cursor-not-allowed disabled:opacity-70",
  ],
  {
    variants: {
      variant: {
        default: "",
        error: "border-[hsl(var(--ds-error-400))] focus-visible:ring-[hsl(var(--ds-error-400))]",
        success: "border-[hsl(var(--ds-success-400))] focus-visible:ring-[hsl(var(--ds-success-400))]",
      },
      size: {
        sm: "h-[2.5rem] text-[length:var(--ds-text-xs)] px-[var(--ds-space-sm)]",
        md: "h-[2.75rem] text-[length:var(--ds-text-sm)] px-[var(--ds-space-md)]",
        lg: "h-[3rem] text-[length:var(--ds-text-base)] px-[var(--ds-space-lg)]",
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
    "px-[var(--ds-space-sm)] py-[calc(var(--ds-space-xs)*0.8)] text-[length:var(--ds-text-xs)] font-semibold rounded-full",
    "border transition-colors duration-200 capitalize tracking-wide",
  ],
  {
    variants: {
      variant: {
        default: "bg-[hsl(var(--ds-neutral-100))] text-[hsl(var(--ds-neutral-700))] border-[hsl(var(--ds-neutral-200))]",
        success: "bg-[hsl(var(--ds-success-50))] text-[hsl(var(--ds-success-700))] border-[hsl(var(--ds-success-200))]",
        error: "bg-[hsl(var(--ds-error-50))] text-[hsl(var(--ds-error-700))] border-[hsl(var(--ds-error-200))]",
        warning: "bg-[hsl(var(--ds-warning-50))] text-[hsl(var(--ds-warning-700))] border-[hsl(var(--ds-warning-200))]",
        info: "bg-[hsl(var(--ds-info-50))] text-[hsl(var(--ds-info-700))] border-[hsl(var(--ds-info-200))]",
        primary: "bg-[hsl(var(--ds-primary-50))] text-[hsl(var(--ds-primary-700))] border-[hsl(var(--ds-primary-200))]",
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
    "w-full bg-[hsl(var(--ds-neutral-200))] rounded-full overflow-hidden",
    "transition-all duration-300 ease-out",
  ],
  {
    variants: {
      size: {
        sm: "h-2",
        md: "h-3",
        lg: "h-4",
      },
      variant: {
        default: "[&>*]:bg-[linear-gradient(135deg,hsl(var(--ds-primary-400)),hsl(var(--ds-primary-600)))]",
        success: "[&>*]:bg-[linear-gradient(135deg,hsl(var(--ds-success-400)),hsl(var(--ds-success-600)))]",
        error: "[&>*]:bg-[linear-gradient(135deg,hsl(var(--ds-error-400)),hsl(var(--ds-error-600)))]",
        warning: "[&>*]:bg-[linear-gradient(135deg,hsl(var(--ds-warning-400)),hsl(var(--ds-warning-600)))]",
        info: "[&>*]:bg-[linear-gradient(135deg,hsl(var(--ds-info-400)),hsl(var(--ds-info-600)))]",
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
      success: 'text-[hsl(var(--ds-success-700))] bg-[hsl(var(--ds-success-50))] border-[hsl(var(--ds-success-200))]',
      error: 'text-[hsl(var(--ds-error-700))] bg-[hsl(var(--ds-error-50))] border-[hsl(var(--ds-error-200))]',
      warning: 'text-[hsl(var(--ds-warning-700))] bg-[hsl(var(--ds-warning-50))] border-[hsl(var(--ds-warning-200))]',
      info: 'text-[hsl(var(--ds-info-700))] bg-[hsl(var(--ds-info-50))] border-[hsl(var(--ds-info-200))]',
      neutral: 'text-[hsl(var(--ds-neutral-700))] bg-[hsl(var(--ds-neutral-100))] border-[hsl(var(--ds-neutral-200))]',
    };
    return colorMap[status];
  },

  // Interactive element styles
  getInteractiveStyles: (enabled = true) => {
    if (!enabled) return 'opacity-50 cursor-not-allowed';
    return 'cursor-pointer transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0';
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
    const colorToken = {
      blue: 'var(--ds-info-500)',
      green: 'var(--ds-success-500)',
      red: 'var(--ds-error-500)',
      yellow: 'var(--ds-warning-500)',
    }[color];
    return `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[hsl(${colorToken})]`;
  },
};

// ==============================
// 🎨 THEME-AWARE STYLES
// ==============================

export const THEME_STYLES = {
  // Layout containers
  container: {
    page: "min-h-screen bg-[hsl(var(--ds-neutral-50))]",
    content: "mx-auto max-w-7xl px-[var(--ds-space-lg)] sm:px-[var(--ds-space-xl)] lg:px-[var(--ds-space-2xl)]",
    section: "py-[var(--ds-space-xl)] lg:py-[var(--ds-space-2xl)]",
  },

  // Text styles
  text: {
    heading: {
      h1: "text-[length:var(--ds-text-3xl)] lg:text-[length:var(--ds-text-4xl)] font-extrabold text-[hsl(var(--ds-neutral-900))] tracking-tight",
      h2: "text-[length:var(--ds-text-2xl)] lg:text-[length:var(--ds-text-3xl)] font-bold text-[hsl(var(--ds-neutral-900))] tracking-tight", 
      h3: "text-[length:var(--ds-text-xl)] lg:text-[length:var(--ds-text-2xl)] font-semibold text-[hsl(var(--ds-neutral-900))]",
      h4: "text-[length:var(--ds-text-lg)] lg:text-[length:var(--ds-text-xl)] font-semibold text-[hsl(var(--ds-neutral-900))]",
    },
    body: {
      large: "text-[length:var(--ds-text-lg)] text-[hsl(var(--ds-neutral-700))] leading-relaxed",
      base: "text-[length:var(--ds-text-base)] text-[hsl(var(--ds-neutral-700))] leading-normal",
      small: "text-[length:var(--ds-text-sm)] text-[hsl(var(--ds-neutral-600))] leading-normal",
      xs: "text-[length:var(--ds-text-xs)] text-[hsl(var(--ds-neutral-500))] leading-normal",
    },
    emphasis: {
      strong: "font-semibold text-[hsl(var(--ds-neutral-900))]",
      muted: "text-[hsl(var(--ds-neutral-500))]",
      accent: "text-[hsl(var(--ds-primary-600))] font-medium",
    },
  },

  // Layout patterns
  layout: {
    stack: "flex flex-col gap-[var(--ds-space-lg)]",
    stackLg: "flex flex-col gap-[var(--ds-space-xl)]",
    stackXl: "flex flex-col gap-[var(--ds-space-2xl)]",
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--ds-space-xl)]",
    flexRow: "flex items-center gap-[var(--ds-space-md)]",
    flexCol: "flex flex-col gap-[var(--ds-space-md)]",
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
