/**
 * Style Utilities - Modular Export System
 * 
 * This is the main barrel export for the modular style utilities system.
 * All style utility modules are re-exported here for easy access.
 */

// Import and re-export the main statusStyles that components are looking for
import { statusStyles, statusBadgeVariants, getStatusStyles, statusClasses } from './status-styles';

export { statusStyles, statusBadgeVariants, getStatusStyles, statusClasses };

// For now, we'll also provide some basic utilities that were in the original file
export const basicUtils = {
  // Spacing utilities
  spacing: {
    xs: 'p-2',
    sm: 'p-4', 
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12'
  },
  
  // Shadow utilities
  shadows: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  },
  
  // Border utilities
  borders: {
    sm: 'border border-gray-200 dark:border-gray-700',
    md: 'border-2 border-gray-300 dark:border-gray-600',
    lg: 'border-4 border-gray-400 dark:border-gray-500'
  }
};

// Quick access exports for common patterns
export const cardStyles = 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm';
export const buttonBaseStyles = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';
export const inputStyles = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

// Legacy compatibility - re-export everything under different names too
export const styleUtils = {
  statusStyles,
  basicUtils,
  cardStyles,
  buttonBaseStyles,
  inputStyles
};