/**
 * 🎨 Style Utilities for Consistent Design
 * 
 * This file provides utility functions and classes for maintaining
 * consistent styling across the entire application.
 */

import { cn } from "@/lib/utils"
import { DESIGN_TOKENS, SEMANTIC_COLORS, THEME_STYLES, buttonVariants, cardVariants, createComponentStyles } from "@/lib/design-system"

// ==============================
// 🎯 UTILITY FUNCTIONS
// ==============================

/**
 * Get consistent spacing classes
 */
export const getSpacing = {
  xs: () => "p-[var(--ds-space-xs)] gap-[var(--ds-space-xs)]",
  sm: () => "p-[var(--ds-space-sm)] gap-[var(--ds-space-sm)]", 
  md: () => "p-[var(--ds-space-md)] gap-[var(--ds-space-md)]",
  lg: () => "p-[var(--ds-space-lg)] gap-[var(--ds-space-lg)]",
  xl: () => "p-[var(--ds-space-xl)] gap-[var(--ds-space-xl)]",
}

/**
 * Get consistent border radius
 */
export const getBorderRadius = {
  sm: () => "rounded-[var(--ds-radius-sm)]",
  md: () => "rounded-[var(--ds-radius-md)]", 
  lg: () => "rounded-[var(--ds-radius-lg)]",
  xl: () => "rounded-[var(--ds-radius-xl)]",
  full: () => "rounded-full",
}

/**
 * Get consistent shadow levels
 */
export const getShadow = {
  none: () => "shadow-none",
  sm: () => "shadow-[var(--ds-shadow-sm)]",
  md: () => "shadow-[var(--ds-shadow-md)]",
  lg: () => "shadow-[var(--ds-shadow-lg)]",
  xl: () => "shadow-[var(--ds-shadow-xl)]",
}

/**
 * Status-based styling utilities
 */
export const statusStyles = {
  success: {
    bg: "bg-[hsl(var(--ds-success-50))]",
    text: "text-[hsl(var(--ds-success-700))]", 
    border: "border-[hsl(var(--ds-success-200))]",
    icon: "text-[hsl(var(--ds-success-500))]",
    button: [
      "bg-[linear-gradient(135deg,hsl(var(--ds-success-400)),hsl(var(--ds-success-600)))]",
      "text-[hsl(var(--ds-success-foreground))]",
      "shadow-[0_18px_30px_rgba(var(--ds-success-rgb),0.25)]",
      "hover:-translate-y-0.5 hover:shadow-[0_22px_38px_rgba(var(--ds-success-rgb),0.32)]",
      "transition-all duration-200 ease-out",
    ].join(" "),
  },
  error: {
    bg: "bg-[hsl(var(--ds-error-50))]",
    text: "text-[hsl(var(--ds-error-700))]",
    border: "border-[hsl(var(--ds-error-200))]", 
    icon: "text-[hsl(var(--ds-error-500))]",
    button: [
      "bg-[linear-gradient(135deg,hsl(var(--ds-error-400)),hsl(var(--ds-error-600)))]",
      "text-[hsl(var(--ds-error-foreground))]",
      "shadow-[0_18px_30px_rgba(var(--ds-error-rgb),0.25)]",
      "hover:-translate-y-0.5 hover:shadow-[0_22px_38px_rgba(var(--ds-error-rgb),0.32)]",
      "transition-all duration-200 ease-out",
    ].join(" "),
  },
  warning: {
    bg: "bg-[hsl(var(--ds-warning-50))]",
    text: "text-[hsl(var(--ds-warning-700))]",
    border: "border-[hsl(var(--ds-warning-200))]",
    icon: "text-[hsl(var(--ds-warning-500))]", 
    button: [
      "bg-[linear-gradient(135deg,hsl(var(--ds-warning-400)),hsl(var(--ds-warning-600)))]",
      "text-[hsl(var(--ds-warning-foreground))]",
      "shadow-[0_18px_30px_rgba(var(--ds-warning-rgb),0.25)]",
      "hover:-translate-y-0.5 hover:shadow-[0_22px_38px_rgba(var(--ds-warning-rgb),0.32)]",
      "transition-all duration-200 ease-out",
    ].join(" "),
  },
  info: {
    bg: "bg-[hsl(var(--ds-info-50))]",
    text: "text-[hsl(var(--ds-info-700))]",
    border: "border-[hsl(var(--ds-info-200))]",
    icon: "text-[hsl(var(--ds-info-500))]",
    button: [
      "bg-[linear-gradient(135deg,hsl(var(--ds-info-400)),hsl(var(--ds-info-600)))]",
      "text-[hsl(var(--ds-info-foreground))]",
      "shadow-[0_18px_30px_rgba(var(--ds-info-rgb),0.25)]",
      "hover:-translate-y-0.5 hover:shadow-[0_22px_38px_rgba(var(--ds-info-rgb),0.32)]",
      "transition-all duration-200 ease-out",
    ].join(" "),
  },
  neutral: {
    bg: "bg-[hsl(var(--ds-neutral-100))]",
    text: "text-[hsl(var(--ds-neutral-700))]", 
    border: "border-[hsl(var(--ds-neutral-200))]",
    icon: "text-[hsl(var(--ds-neutral-500))]",
    button: [
      "bg-[hsl(var(--ds-neutral-700))]",
      "text-[hsl(var(--ds-neutral-0))]",
      "shadow-[0_18px_30px_rgba(var(--ds-neutral-rgb),0.18)]",
      "hover:-translate-y-0.5 hover:shadow-[0_22px_38px_rgba(var(--ds-neutral-rgb),0.24)]",
      "transition-all duration-200 ease-out",
    ].join(" "),
  },
}

/**
 * Interactive element utilities
 */
export const interactiveStyles = {
  clickable: "cursor-pointer transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0",
  hoverable: "hover:shadow-[0_20px_36px_rgba(var(--ds-neutral-rgb),0.12)] hover:border-[hsl(var(--ds-neutral-200))] transition-all duration-200",
  focusable: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[hsl(var(--ds-primary-400))]",
  disabled: "opacity-50 cursor-not-allowed pointer-events-none",
}

/**
 * Layout utilities
 */
export const layoutStyles = {
  container: {
    page: THEME_STYLES.container.page,
    content: THEME_STYLES.container.content,
    section: THEME_STYLES.container.section, 
    card: "bg-[hsl(var(--ds-neutral-0))] rounded-2xl border border-[hsl(var(--ds-neutral-200))] shadow-[0_18px_38px_rgba(var(--ds-neutral-rgb),0.08)]",
  },
  flex: {
    center: "flex items-center justify-center",
    between: "flex items-center justify-between",
    start: "flex items-start justify-start",
    end: "flex items-end justify-end",
    col: "flex flex-col gap-[var(--ds-space-md)]",
    row: "flex flex-row gap-[var(--ds-space-md)]",
  },
  grid: {
    responsive: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--ds-space-xl)]",
    dense: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[var(--ds-space-md)]",
    list: "grid grid-cols-1 gap-[var(--ds-space-md)]",
  },
  spacing: {
    stack: "gap-[var(--ds-space-lg)]",
    stackSm: "gap-[var(--ds-space-sm)]", 
    stackLg: "gap-[var(--ds-space-xl)]",
    inline: "gap-[var(--ds-space-lg)]",
    inlineSm: "gap-[var(--ds-space-sm)]",
    inlineLg: "gap-[var(--ds-space-xl)]",
  },
}

/**
 * Typography utilities
 */
export const typographyStyles = {
  heading: {
    h1: THEME_STYLES.text.heading.h1,
    h2: THEME_STYLES.text.heading.h2,
    h3: THEME_STYLES.text.heading.h3, 
    h4: THEME_STYLES.text.heading.h4,
    h5: "text-[length:var(--ds-text-base)] lg:text-[length:var(--ds-text-lg)] font-medium text-[hsl(var(--ds-neutral-900))]",
    h6: "text-[length:var(--ds-text-sm)] lg:text-[length:var(--ds-text-base)] font-medium text-[hsl(var(--ds-neutral-900))]",
  },
  body: {
    large: THEME_STYLES.text.body.large,
    base: THEME_STYLES.text.body.base, 
    small: THEME_STYLES.text.body.small,
    xs: THEME_STYLES.text.body.xs,
  },
  emphasis: {
    strong: THEME_STYLES.text.emphasis.strong,
    muted: THEME_STYLES.text.emphasis.muted,
    accent: THEME_STYLES.text.emphasis.accent,
    success: "text-[hsl(var(--ds-success-600))] font-medium",
    error: "text-[hsl(var(--ds-error-600))] font-medium", 
    warning: "text-[hsl(var(--ds-warning-600))] font-medium",
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
    cardVariants({
      variant: variant === 'interactive' ? 'default' : variant,
      padding,
      interactive: variant === 'interactive',
    }),
    !shadow && "shadow-none"
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
    buttonVariants({ variant, size, fullWidth }),
    fullWidth && "w-full"
  )
}

/**
 * Build status indicator styles
 */
export const buildStatusStyles = (status: 'success' | 'error' | 'warning' | 'info' | 'neutral') => {
  const styles = statusStyles[status]
  return {
    container: cn(
      styles.bg,
      styles.border,
      "border rounded-2xl p-[var(--ds-space-md)] shadow-[0_12px_28px_rgba(var(--ds-neutral-rgb),0.06)]"
    ),
    text: styles.text,
    icon: styles.icon,
    badge: cn(
      styles.bg,
      styles.text,
      "px-[var(--ds-space-sm)] py-[calc(var(--ds-space-xs)*0.8)] rounded-full text-[length:var(--ds-text-xs)] font-semibold tracking-wide"
    ),
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
      "w-full rounded-2xl px-[var(--ds-space-md)] py-[calc(var(--ds-space-sm)*1.2)] text-[length:var(--ds-text-sm)] transition-all duration-200",
      "border border-[hsl(var(--ds-neutral-300))] bg-[hsl(var(--ds-neutral-0))]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[hsl(var(--ds-primary-400))] focus-visible:border-transparent",
      error && "border-[hsl(var(--ds-error-400))] focus-visible:ring-[hsl(var(--ds-error-400))]",
      success && "border-[hsl(var(--ds-success-400))] focus-visible:ring-[hsl(var(--ds-success-400))]", 
      disabled && "bg-[hsl(var(--ds-neutral-100))] cursor-not-allowed opacity-70"
    ),
    label: cn(
      "block text-[length:var(--ds-text-sm)] font-semibold mb-[calc(var(--ds-space-xs)*1.5)]",
      error ? "text-[hsl(var(--ds-error-600))]" : success ? "text-[hsl(var(--ds-success-600))]" : "text-[hsl(var(--ds-neutral-900))]"
    ),
    error: "text-[hsl(var(--ds-error-600))] text-[length:var(--ds-text-sm)] mt-[var(--ds-space-xs)]",
    success: "text-[hsl(var(--ds-success-600))] text-[length:var(--ds-text-sm)] mt-[var(--ds-space-xs)]",
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
  
  buttonPrimary: buttonVariants({ variant: 'primary', size: 'md' }) ?? "",
  buttonSecondary: buttonVariants({ variant: 'secondary', size: 'md' }) ?? "",
  buttonSuccess: buttonVariants({ variant: 'success', size: 'md' }) ?? "",
  buttonError: buttonVariants({ variant: 'error', size: 'md' }) ?? "",
  
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
