/**
 * Status Styles Module
 * 
 * Status-based styling utilities for consistent status indication across the app.
 * Provides success, error, warning, info, and neutral status styles.
 */

import { cva } from "class-variance-authority";

/**
 * Status-based styles for consistent visual feedback
 */
export const statusStyles = {
  // Success styles
  success: {
    text: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    badge: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    icon: 'text-green-500',
    button: 'bg-green-600 hover:bg-green-700 text-white',
  },
  
  // Error styles  
  error: {
    text: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    badge: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    icon: 'text-red-500',
    button: 'bg-red-600 hover:bg-red-700 text-white',
  },
  
  // Warning styles
  warning: {
    text: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    icon: 'text-amber-500',
    button: 'bg-amber-600 hover:bg-amber-700 text-white',
  },
  
  // Info styles
  info: {
    text: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    icon: 'text-blue-500',
    button: 'bg-blue-600 hover:bg-blue-700 text-white',
  },
  
  // Neutral/default styles
  neutral: {
    text: 'text-gray-600 dark:text-gray-400',
    bg: 'bg-gray-50 dark:bg-gray-800/50',
    border: 'border-gray-200 dark:border-gray-700',
    badge: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
    icon: 'text-gray-500',
    button: 'bg-gray-600 hover:bg-gray-700 text-white',
  },
  
  // Purple styles (for special status)
  purple: {
    text: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-800',
    badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    icon: 'text-purple-500',
    button: 'bg-purple-600 hover:bg-purple-700 text-white',
  }
};

/**
 * Status badge variants using class-variance-authority
 */
export const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      status: {
        success: statusStyles.success.badge,
        error: statusStyles.error.badge,
        warning: statusStyles.warning.badge,
        info: statusStyles.info.badge,
        neutral: statusStyles.neutral.badge,
        purple: statusStyles.purple.badge,
      }
    },
    defaultVariants: {
      status: "neutral",
    },
  }
);

/**
 * Get status styles by type
 */
export const getStatusStyles = (status: keyof typeof statusStyles) => {
  return statusStyles[status];
};

/**
 * Quick status class builders
 */
export const statusClasses = {
  successText: statusStyles.success.text,
  errorText: statusStyles.error.text,
  warningText: statusStyles.warning.text,
  infoText: statusStyles.info.text,
  
  successBg: statusStyles.success.bg,
  errorBg: statusStyles.error.bg,
  warningBg: statusStyles.warning.bg,
  infoBg: statusStyles.info.bg,
  
  successBorder: statusStyles.success.border,
  errorBorder: statusStyles.error.border,
  warningBorder: statusStyles.warning.border,
  infoBorder: statusStyles.info.border,
};