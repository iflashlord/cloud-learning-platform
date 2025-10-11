/**
 * Comprehensive Design System for AWS Learning Platform
 * 
 * This file defines all design tokens, spacing, typography, and component patterns
 * to ensure consistency across the entire application.
 */

import { cva, type VariantProps } from "class-variance-authority";

// ==============================
// DESIGN TOKENS
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
// SEMANTIC COLOR SYSTEM
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
// COMPONENT VARIANTS (CVA)
// ==============================

// Button component variants - Duolingo Style
export const buttonVariants = cva(
  // Base styles - Duolingo-inspired design
  [
    "relative inline-flex items-center justify-center rounded-xl",
    "font-bold tracking-wide transition-all duration-150 ease-out",
    "px-6 py-3 text-base",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none",
    "disabled:hover:transform-none disabled:active:transform-none",
    "disabled:hover:shadow-none disabled:active:shadow-none",
    "active:translate-y-1 active:shadow-none",
    "border-2 border-b-4",
    "dark:focus-visible:ring-offset-gray-800",
  ],
  {
    variants: {
      variant: {
        // Primary - Duolingo green for main actions
        primary: [
          "bg-green-500 border-green-700",
          "text-white font-extrabold",
          "shadow-[0_4px_0_#15803d]",
          "hover:bg-green-400 hover:border-green-600",
          "hover:shadow-[0_6px_0_#15803d] hover:-translate-y-0.5",
          "focus-visible:ring-green-400",
          "dark:bg-green-600 dark:border-green-800",
          "dark:shadow-[0_4px_0_#15803d]",
          "dark:hover:bg-green-500 dark:hover:border-green-700",
        ],
        // Secondary - Light version for less important actions  
        secondary: [
          "bg-green-50 border-green-200",
          "text-green-800 font-extrabold",
          "shadow-[0_4px_0_#bbf7d0]",
          "hover:bg-green-100 hover:border-green-300",
          "hover:shadow-[0_6px_0_#86efac] hover:-translate-y-0.5",
          "focus-visible:ring-green-300",
          "dark:bg-gray-800 dark:border-gray-600",
          "dark:text-green-400 dark:shadow-[0_4px_0_#374151]",
          "dark:hover:bg-gray-700 dark:hover:border-gray-500",
        ],
        // Success - Bright green for correct answers
        success: [
          "bg-emerald-500 border-emerald-700",
          "text-white font-extrabold",
          "shadow-[0_4px_0_#047857]",
          "hover:bg-emerald-400 hover:border-emerald-600",
          "hover:shadow-[0_6px_0_#047857] hover:-translate-y-0.5",
          "focus-visible:ring-emerald-400",
          "dark:bg-emerald-600 dark:border-emerald-800",
          "dark:shadow-[0_4px_0_#047857]",
          "dark:hover:bg-emerald-500 dark:hover:border-emerald-700",
        ],
        // Error/Danger - Red for wrong answers and retry
        error: [
          "bg-red-500 border-red-700",
          "text-white font-extrabold",
          "shadow-[0_4px_0_#b91c1c]",
          "hover:bg-red-400 hover:border-red-600",
          "hover:shadow-[0_6px_0_#b91c1c] hover:-translate-y-0.5",
          "focus-visible:ring-red-400",
          "dark:bg-red-600 dark:border-red-800",
          "dark:shadow-[0_4px_0_#b91c1c]",
          "dark:hover:bg-red-500 dark:hover:border-red-700",
        ],
        danger: [
          "bg-red-500 border-red-700",
          "text-white font-extrabold",
          "shadow-[0_4px_0_#b91c1c]",
          "hover:bg-red-400 hover:border-red-600",
          "hover:shadow-[0_6px_0_#b91c1c] hover:-translate-y-0.5",
          "focus-visible:ring-red-400",
          "dark:bg-red-600 dark:border-red-800",
          "dark:shadow-[0_4px_0_#b91c1c]",
          "dark:hover:bg-red-500 dark:hover:border-red-700",
        ],
        // Warning - Orange/yellow for warnings
        warning: [
          "bg-yellow-400 border-yellow-600",
          "text-yellow-900 font-extrabold",
          "shadow-[0_4px_0_#ca8a04]",
          "hover:bg-yellow-300 hover:border-yellow-500",
          "hover:shadow-[0_6px_0_#ca8a04] hover:-translate-y-0.5",
          "focus-visible:ring-yellow-400",
          "dark:bg-yellow-600 dark:border-yellow-800",
          "dark:text-white dark:shadow-[0_4px_0_#ca8a04]",
          "dark:hover:bg-yellow-500 dark:hover:border-yellow-700",
        ],
        // Info - Blue for informational actions
        info: [
          "bg-blue-500 border-blue-700",
          "text-white font-extrabold",
          "shadow-[0_4px_0_#1d4ed8]",
          "hover:bg-blue-400 hover:border-blue-600",
          "hover:shadow-[0_6px_0_#1d4ed8] hover:-translate-y-0.5",
          "focus-visible:ring-blue-400",
          "dark:bg-blue-600 dark:border-blue-800",
          "dark:shadow-[0_4px_0_#1d4ed8]",
          "dark:hover:bg-blue-500 dark:hover:border-blue-700",
        ],
        // Ghost - Transparent for subtle actions
        ghost: [
          "bg-transparent border-transparent shadow-none",
          "text-gray-700 font-bold",
          "hover:bg-gray-100 hover:text-gray-800",
          "focus-visible:ring-gray-300",
          "dark:text-gray-200",
          "dark:hover:bg-gray-700 dark:hover:text-gray-100",
          "dark:focus-visible:ring-gray-500",
        ],
        // Outline variants with Duolingo style
        outline: [
          "bg-white border-gray-300",
          "text-gray-800 font-bold",
          "shadow-[0_4px_0_#d1d5db]",
          "hover:bg-gray-50 hover:border-gray-400",
          "hover:shadow-[0_6px_0_#9ca3af] hover:-translate-y-0.5",
          "focus-visible:ring-gray-400",
          "dark:bg-gray-800 dark:border-gray-500",
          "dark:text-gray-100 dark:shadow-[0_4px_0_#4b5563]",
          "dark:hover:bg-gray-700 dark:hover:border-gray-400",
          "dark:hover:shadow-[0_6px_0_#6b7280] dark:hover:text-white",
        ],
        // Legacy variants for backward compatibility
        primaryOutline: [
          "bg-white border-green-400",
          "text-green-600 font-bold",
          "shadow-[0_4px_0_#22c55e]",
          "hover:bg-green-50 hover:border-green-500",
          "hover:shadow-[0_6px_0_#16a34a] hover:-translate-y-0.5",
          "focus-visible:ring-green-400",
        ],
        secondaryOutline: [
          "bg-white border-gray-300",
          "text-gray-600 font-bold",
          "shadow-[0_4px_0_#d1d5db]",
          "hover:bg-gray-50 hover:border-gray-400",
          "hover:shadow-[0_6px_0_#9ca3af] hover:-translate-y-0.5",
          "focus-visible:ring-gray-400",
        ],
        dangerOutline: [
          "bg-white border-red-400",
          "text-red-600 font-bold",
          "shadow-[0_4px_0_#f87171]",
          "hover:bg-red-50 hover:border-red-500",
          "hover:shadow-[0_6px_0_#ef4444] hover:-translate-y-0.5",
          "focus-visible:ring-red-400",
        ],
        super: [
          "bg-gradient-to-b from-yellow-400 to-orange-500 border-orange-600",
          "text-white font-extrabold",
          "shadow-[0_4px_0_#ea580c]",
          "hover:from-yellow-300 hover:to-orange-400 hover:border-orange-500",
          "hover:shadow-[0_6px_0_#ea580c] hover:-translate-y-0.5",
          "focus-visible:ring-orange-400",
        ],
        superOutline: [
          "bg-white border-orange-400",
          "text-orange-600 font-bold",
          "shadow-[0_4px_0_#fb923c]",
          "hover:bg-orange-50 hover:border-orange-500",
          "hover:shadow-[0_6px_0_#f97316] hover:-translate-y-0.5",
          "focus-visible:ring-orange-400",
        ],
        // Sidebar specific styles (maintain existing behavior)
        sidebar: [
          "bg-white border-slate-300 shadow-[0_4px_0_#cbd5e1]",
          "text-slate-500 font-bold",
          "hover:bg-slate-50 hover:text-slate-600",
          "hover:shadow-[0_6px_0_#cbd5e1] hover:-translate-y-0.5",
          "focus-visible:ring-slate-300",
        ],
        sidebarOutline: [
          "bg-white border-slate-300 shadow-[0_4px_0_#cbd5e1]",
          "text-blue-500 font-bold",
          "hover:bg-slate-50 hover:text-blue-600",
          "hover:shadow-[0_6px_0_#cbd5e1] hover:-translate-y-0.5",
          "focus-visible:ring-blue-400",
        ],
        link: [
          "bg-transparent border-transparent shadow-none p-0 h-auto",
          "text-blue-600 font-semibold underline-offset-4",
          "hover:text-blue-500 hover:underline",
          "focus-visible:ring-offset-0 focus-visible:ring-blue-500",
          "dark:text-blue-400 dark:hover:text-blue-300",
          "dark:focus-visible:ring-blue-400",
        ],
        // Course Theme Variants - Enhanced contrast for better readability
        compute: [
          "bg-orange-600 border-orange-800",
          "text-white font-extrabold",
          "shadow-[0_4px_0_#c2410c]",
          "hover:bg-orange-500 hover:border-orange-700",
          "hover:shadow-[0_6px_0_#c2410c] hover:-translate-y-0.5",
          "focus-visible:ring-orange-400",
          "dark:bg-orange-700 dark:border-orange-900",
          "dark:shadow-[0_4px_0_#c2410c]",
          "dark:hover:bg-orange-600 dark:hover:border-orange-800",
        ],
        storage: [
          "bg-blue-600 border-blue-800",
          "text-white font-extrabold",
          "shadow-[0_4px_0_#1e40af]",
          "hover:bg-blue-500 hover:border-blue-700",
          "hover:shadow-[0_6px_0_#1e40af] hover:-translate-y-0.5",
          "focus-visible:ring-blue-400",
          "dark:bg-blue-700 dark:border-blue-900",
          "dark:shadow-[0_4px_0_#1e40af]",
          "dark:hover:bg-blue-600 dark:hover:border-blue-800",
        ],
        security: [
          "bg-purple-600 border-purple-800",
          "text-white font-extrabold",
          "shadow-[0_4px_0_#7c3aed]",
          "hover:bg-purple-500 hover:border-purple-700",
          "hover:shadow-[0_6px_0_#7c3aed] hover:-translate-y-0.5",
          "focus-visible:ring-purple-400",
          "dark:bg-purple-700 dark:border-purple-900",
          "dark:shadow-[0_4px_0_#7c3aed]",
          "dark:hover:bg-purple-600 dark:hover:border-purple-800",
        ],
        networking: [
          "bg-teal-600 border-teal-800",
          "text-white font-extrabold",
          "shadow-[0_4px_0_#0f766e]",
          "hover:bg-teal-500 hover:border-teal-700",
          "hover:shadow-[0_6px_0_#0f766e] hover:-translate-y-0.5",
          "focus-visible:ring-teal-400",
          "dark:bg-teal-700 dark:border-teal-900",
          "dark:shadow-[0_4px_0_#0f766e]",
          "dark:hover:bg-teal-600 dark:hover:border-teal-800",
        ],
        management: [
          "bg-emerald-600 border-emerald-800",
          "text-white font-extrabold",
          "shadow-[0_4px_0_#047857]",
          "hover:bg-emerald-500 hover:border-emerald-700",
          "hover:shadow-[0_6px_0_#047857] hover:-translate-y-0.5",
          "focus-visible:ring-emerald-400",
          "dark:bg-emerald-700 dark:border-emerald-900",
          "dark:shadow-[0_4px_0_#047857]",
          "dark:hover:bg-emerald-600 dark:hover:border-emerald-800",
        ],
        aiml: [
          "bg-violet-600 border-violet-800",
          "text-white font-extrabold",
          "shadow-[0_4px_0_#7c3aed]",
          "hover:bg-violet-500 hover:border-violet-700",
          "hover:shadow-[0_6px_0_#7c3aed] hover:-translate-y-0.5",
          "focus-visible:ring-violet-400",
          "dark:bg-violet-700 dark:border-violet-900",
          "dark:shadow-[0_4px_0_#7c3aed]",
          "dark:hover:bg-violet-600 dark:hover:border-violet-800",
        ],
      },
      size: {
        xs: "h-8 px-4 text-xs min-w-[80px]",
        sm: "h-9 px-5 text-sm min-w-[100px]",
        md: "h-11 px-6 text-base min-w-[120px]",
        lg: "h-12 px-7 text-lg min-w-[140px]",
        xl: "h-14 px-8 text-xl min-w-[160px]",
        icon: "h-11 w-11 p-0 min-w-[44px]",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      loading: {
        true: "cursor-wait opacity-90 pointer-events-none",
        false: "",
      },
      disabled: {
        true: "opacity-60 cursor-not-allowed pointer-events-none shadow-none active:transform-none active:shadow-none hover:transform-none hover:shadow-none",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
      loading: false,
      disabled: false,
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
    "px-3 py-1.5 text-xs font-semibold rounded-full",
    "border transition-colors duration-200 capitalize tracking-wide",
    "min-w-[60px] whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-500",
        success: "bg-green-50 text-green-800 border-green-200 dark:bg-green-600 dark:text-white dark:border-green-500",
        error: "bg-red-50 text-red-800 border-red-200 dark:bg-red-600 dark:text-white dark:border-red-500",
        warning: "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-600 dark:text-white dark:border-amber-500",
        info: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-600 dark:text-white dark:border-blue-500",
        primary: "bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-600 dark:text-white dark:border-indigo-500",
        // Course theme variants - Maximum contrast for readability
        compute: "bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-600 dark:text-white dark:border-orange-500",
        storage: "bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-600 dark:text-white dark:border-sky-500",
        security: "bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-600 dark:text-white dark:border-purple-500",
        networking: "bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-600 dark:text-white dark:border-teal-500",
        management: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-600 dark:text-white dark:border-emerald-500",
        aiml: "bg-violet-50 text-violet-800 border-violet-200 dark:bg-violet-600 dark:text-white dark:border-violet-500",
      },
      size: {
        sm: "px-2 py-1 text-xs min-w-[50px]",
        md: "px-3 py-1.5 text-xs min-w-[60px]",
        lg: "px-4 py-2 text-sm min-w-[80px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
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
// COMPONENT STYLES FACTORY
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
// THEME-AWARE STYLES
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
