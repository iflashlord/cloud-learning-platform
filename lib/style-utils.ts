/**
 * 🎨 Style Utilities for Consistent Design
 * 
 * This file provides utility functions and classes for maintaining
 * consistent styling across the entire application.
 */

import { cn } from "@/lib/utils"
import { DESIGN_TOKENS, SEMANTIC_COLORS, THEME_STYLES, createComponentStyles } from "@/lib/design-system"

// ==============================
// 🎯 UTILITY FUNCTIONS
// ==============================

/**
 * Get consistent spacing classes
 */
export const getSpacing = {
  xs: () => "p-1 gap-1",
  sm: () => "p-2 gap-2", 
  md: () => "p-4 gap-4",
  lg: () => "p-6 gap-6",
  xl: () => "p-8 gap-8",
}

/**
 * Get consistent border radius
 */
export const getBorderRadius = {
  sm: () => "rounded-sm",
  md: () => "rounded-md", 
  lg: () => "rounded-lg",
  xl: () => "rounded-xl",
  full: () => "rounded-full",
}

/**
 * Get consistent shadow levels
 */
export const getShadow = {
  none: () => "shadow-none",
  sm: () => "shadow-sm",
  md: () => "shadow-md",
  lg: () => "shadow-lg",
  xl: () => "shadow-xl",
}

/**
 * Status-based styling utilities
 */
export const statusStyles = {
  success: {
    bg: "bg-green-100",
    text: "text-green-800", 
    border: "border-green-300",
    icon: "text-green-600",
    button: "bg-green-500 hover:bg-green-600 text-white",
  },
  error: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-300", 
    icon: "text-red-600",
    button: "bg-red-500 hover:bg-red-600 text-white",
  },
  warning: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-300",
    icon: "text-yellow-600", 
    button: "bg-yellow-500 hover:bg-yellow-600 text-white",
  },
  info: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-300",
    icon: "text-blue-600",
    button: "bg-blue-500 hover:bg-blue-600 text-white",
  },
  neutral: {
    bg: "bg-gray-100",
    text: "text-gray-800", 
    border: "border-gray-300",
    icon: "text-gray-600",
    button: "bg-gray-500 hover:bg-gray-600 text-white",
  },
}

/**
 * Interactive element utilities
 */
export const interactiveStyles = {
  clickable: "cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150",
  hoverable: "hover:shadow-md hover:border-neutral-300 transition-all duration-200",
  focusable: "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
  disabled: "opacity-50 cursor-not-allowed pointer-events-none",
}

/**
 * Layout utilities
 */
export const layoutStyles = {
  container: {
    page: "min-h-screen bg-neutral-50",
    content: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
    section: "py-8 lg:py-12", 
    card: "bg-white rounded-lg border border-neutral-200 shadow-sm",
  },
  flex: {
    center: "flex items-center justify-center",
    between: "flex items-center justify-between",
    start: "flex items-start justify-start",
    end: "flex items-end justify-end",
    col: "flex flex-col",
    row: "flex flex-row",
  },
  grid: {
    responsive: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
    dense: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4",
    list: "grid grid-cols-1 gap-4",
  },
  spacing: {
    stack: "space-y-4",
    stackSm: "space-y-2", 
    stackLg: "space-y-6",
    inline: "space-x-4",
    inlineSm: "space-x-2",
    inlineLg: "space-x-6",
  },
}

/**
 * Typography utilities
 */
export const typographyStyles = {
  heading: {
    h1: "text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight",
    h2: "text-2xl lg:text-3xl font-bold text-neutral-900 tracking-tight",
    h3: "text-xl lg:text-2xl font-semibold text-neutral-900", 
    h4: "text-lg lg:text-xl font-semibold text-neutral-900",
    h5: "text-base lg:text-lg font-medium text-neutral-900",
    h6: "text-sm lg:text-base font-medium text-neutral-900",
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
    success: "text-green-600 font-medium",
    error: "text-red-600 font-medium", 
    warning: "text-yellow-600 font-medium",
  },
}

// ==============================
// 🎨 COMPONENT STYLE BUILDERS
// ==============================

/**
 * Build consistent card styles
 */
export const buildCardStyles = (options: {
  variant?: 'default' | 'elevated' | 'outline' | 'interactive'
  padding?: 'sm' | 'md' | 'lg'
  shadow?: boolean
}) => {
  const { variant = 'default', padding = 'md', shadow = true } = options
  
  return cn(
    "bg-white border border-neutral-200 rounded-lg transition-all duration-200",
    shadow && getShadow.sm(),
    variant === 'elevated' && "shadow-md hover:shadow-lg",
    variant === 'outline' && "border-2 border-neutral-300",
    variant === 'interactive' && interactiveStyles.clickable,
    padding === 'sm' && "p-3",
    padding === 'md' && "p-4", 
    padding === 'lg' && "p-6"
  )
}

/**
 * Build consistent button styles (supplement to design system)
 */
export const buildButtonStyles = (options: {
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}) => {
  const { variant = 'primary', size = 'md', fullWidth = false } = options
  
  return cn(
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
    variant === 'primary' && "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500",
    variant === 'secondary' && "bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-50 focus:ring-neutral-500",
    variant === 'success' && statusStyles.success.button + " focus:ring-green-500",
    variant === 'error' && statusStyles.error.button + " focus:ring-red-500", 
    variant === 'warning' && statusStyles.warning.button + " focus:ring-yellow-500",
    variant === 'ghost' && "bg-transparent text-neutral-600 hover:bg-neutral-100 focus:ring-neutral-500",
    size === 'sm' && "h-8 px-3 text-sm",
    size === 'md' && "h-10 px-4 text-sm",
    size === 'lg' && "h-12 px-6 text-base",
    fullWidth && "w-full"
  )
}

/**
 * Build status indicator styles
 */
export const buildStatusStyles = (status: 'success' | 'error' | 'warning' | 'info' | 'neutral') => {
  const styles = statusStyles[status]
  return {
    container: cn(styles.bg, styles.border, "border rounded-lg p-3"),
    text: styles.text,
    icon: styles.icon,
    badge: cn(styles.bg, styles.text, "px-2 py-1 rounded-full text-xs font-medium"),
  }
}

/**
 * Build form field styles
 */
export const buildFormFieldStyles = (options: {
  error?: boolean
  success?: boolean
  disabled?: boolean
}) => {
  const { error, success, disabled } = options
  
  return {
    input: cn(
      "w-full border rounded-lg px-3 py-2 text-sm transition-colors duration-200",
      "focus:outline-none focus:ring-2 focus:ring-offset-0",
      !error && !success && "border-neutral-300 focus:ring-blue-500 focus:border-blue-500",
      error && "border-red-500 focus:ring-red-500 focus:border-red-500",
      success && "border-green-500 focus:ring-green-500 focus:border-green-500", 
      disabled && "bg-neutral-50 cursor-not-allowed opacity-75"
    ),
    label: cn(
      "block text-sm font-medium mb-1",
      error ? "text-red-700" : success ? "text-green-700" : "text-neutral-900"
    ),
    error: "text-red-600 text-sm mt-1",
    success: "text-green-600 text-sm mt-1",
  }
}

// ==============================
// 🎯 QUICK ACCESS UTILITIES
// ==============================

export const quickStyles = {
  // Common combinations
  cardDefault: buildCardStyles({}),
  cardInteractive: buildCardStyles({ variant: 'interactive' }),
  cardElevated: buildCardStyles({ variant: 'elevated' }),
  
  buttonPrimary: buildButtonStyles({}), 
  buttonSecondary: buildButtonStyles({ variant: 'secondary' }),
  buttonSuccess: buildButtonStyles({ variant: 'success' }),
  buttonError: buildButtonStyles({ variant: 'error' }),
  
  // Layout patterns
  pageContainer: layoutStyles.container.page,
  contentContainer: layoutStyles.container.content,
  flexCenter: layoutStyles.flex.center,
  flexBetween: layoutStyles.flex.between,
  
  // Typography shortcuts
  h1: typographyStyles.heading.h1,
  h2: typographyStyles.heading.h2, 
  h3: typographyStyles.heading.h3,
  bodyText: typographyStyles.body.base,
  smallText: typographyStyles.body.small,
  mutedText: typographyStyles.emphasis.muted,
}