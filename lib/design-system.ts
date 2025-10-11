/**
 * Backwards compatible entry-point for the AWS Learning Platform design system.
 * The real source of truth now lives under `/design-system`. This module re-exports
 * the tokens, component recipes, and helper utilities so existing imports continue
 * to function while we transition the codebase.
 */

export {
  DESIGN_TOKENS,
  SEMANTIC_COLORS,
  THEME_MODES,
  type DesignTokens,
  type SemanticColorScale,
  type ThemeModes,
} from "@design-system/foundations";

export {
  buttonVariants,
  cardVariants,
  inputVariants,
  badgeVariants,
  progressVariants,
  type ButtonVariantProps,
  type CardVariantProps,
  type InputVariantProps,
  type BadgeVariantProps,
  type ProgressVariantProps,
} from "@design-system/components";

export { createComponentStyles, THEME_STYLES } from "@design-system/styles";
