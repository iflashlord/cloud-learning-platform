/**
 * Style utilities - Main export (modularized)
 * 
 * This file has been modularized into focused style utility modules.
 * Import from the main style-utils module for better organization:
 * 
 * @example
 * ```typescript
 * // Import specific utilities
 * import { getSpacing, buildCardStyles } from '@/lib/style-utils';
 * 
 * // Import from specific modules
 * import { statusStyles } from '@/lib/style-utils/status-styles';
 * import { layoutStyles } from '@/lib/style-utils/layout-utilities';
 * 
 * // Import everything
 * import * as styleUtils from '@/lib/style-utils';
 * ```
 * 
 * Modules:
 * - basic-utilities.ts: Spacing, borders, shadows, and interactive styles
 * - status-styles.ts: Status-based styling (success, error, warning, etc.)
 * - layout-utilities.ts: Layout, flex, grid, and spacing utilities
 * - typography-utilities.ts: Typography and text styling utilities
 * - component-builders.ts: Component style builders for consistent styling
 * - quick-styles.ts: Quick access utilities and common combinations
 */

// Re-export everything from the modular style utilities library
export * from './style-utils/index';