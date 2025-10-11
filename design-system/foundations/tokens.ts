/**
 * Design system token definitions.
 * These tokens power both light and dark themes and are the single source of truth
 * for spacing, typography, radii, shadows, animation timings, and semantic colors.
 */

export const DESIGN_TOKENS = {
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    "2xl": "2rem",
    "3xl": "3rem",
    "4xl": "4rem",
  },
  radius: {
    none: "0",
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    full: "9999px",
  },
  typography: {
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
    },
    lineHeight: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75",
    },
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
  animation: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
  },
};

export type DesignTokens = typeof DESIGN_TOKENS;

export const SEMANTIC_COLORS = {
  success: {
    50: "hsl(142, 76%, 96%)",
    100: "hsl(142, 76%, 90%)",
    500: "hsl(142, 76%, 45%)",
    600: "hsl(142, 76%, 40%)",
    700: "hsl(142, 76%, 35%)",
  },
  error: {
    50: "hsl(0, 86%, 96%)",
    100: "hsl(0, 86%, 90%)",
    500: "hsl(0, 86%, 55%)",
    600: "hsl(0, 86%, 50%)",
    700: "hsl(0, 86%, 45%)",
  },
  warning: {
    50: "hsl(48, 100%, 96%)",
    100: "hsl(48, 100%, 88%)",
    500: "hsl(48, 100%, 55%)",
    600: "hsl(48, 100%, 50%)",
    700: "hsl(48, 100%, 45%)",
  },
  info: {
    50: "hsl(204, 100%, 97%)",
    100: "hsl(204, 100%, 90%)",
    500: "hsl(204, 100%, 55%)",
    600: "hsl(204, 100%, 50%)",
    700: "hsl(204, 100%, 45%)",
  },
  neutral: {
    0: "hsl(0, 0%, 100%)",
    50: "hsl(210, 40%, 98%)",
    100: "hsl(210, 40%, 96%)",
    200: "hsl(214, 32%, 91%)",
    300: "hsl(213, 27%, 84%)",
    400: "hsl(215, 20%, 65%)",
    500: "hsl(215, 16%, 47%)",
    600: "hsl(215, 19%, 35%)",
    700: "hsl(215, 25%, 27%)",
    800: "hsl(217, 33%, 17%)",
    900: "hsl(222, 47%, 11%)",
  },
};

export type SemanticColorScale = typeof SEMANTIC_COLORS;

export const THEME_MODES = {
  light: {
    background: "hsl(210, 40%, 98%)",
    foreground: "hsl(222, 47%, 11%)",
    mutedBackground: "hsl(210, 40%, 96%)",
    mutedForeground: "hsl(215, 20%, 65%)",
  },
  dark: {
    background: "hsl(222, 47%, 7%)",
    foreground: "hsl(210, 40%, 96%)",
    mutedBackground: "hsl(217, 33%, 17%)",
    mutedForeground: "hsl(215, 25%, 65%)",
  },
};

export type ThemeModes = typeof THEME_MODES;
