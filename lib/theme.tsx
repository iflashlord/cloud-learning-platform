/**
 * Theme system - Main export (modularized)
 * 
 * This file has been modularized into focused theme management modules.
 * Import from the main theme module for better organization:
 * 
 * @example
 * ```tsx
 * // Import provider and hooks
 * import { ThemeProvider, useTheme } from '@/lib/theme';
 * 
 * // Import specific utilities
 * import { getThemeColors, applyCssVariables } from '@/lib/theme';
 * 
 * // Import from specific modules
 * import { hexToHsl, getContrastRatio } from '@/lib/theme/color-utils';
 * import { cloneTheme, getThemeByName } from '@/lib/theme/theme-utils';
 * ```
 * 
 * Modules:
 * - types.ts: Theme types and interfaces
 * - color-utils.ts: Color conversion and contrast utilities
 * - theme-utils.ts: Theme manipulation and validation utilities
 * - css-variables.ts: CSS variable management
 * - theme-provider.tsx: React context provider
 * - hooks.ts: Specialized theme hooks for various use cases
 */

// Re-export everything from the modular theme library
export * from './theme/index';