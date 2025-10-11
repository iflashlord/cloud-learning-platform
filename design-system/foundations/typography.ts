/**
 * Typography system for AWS Learning Platform
 * 
 * Provides a comprehensive typography scale with semantic naming,
 * responsive sizing, and accessibility-first design.
 */

// Font Family Definitions
export const FONT_FAMILIES = {
  sans: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
  ],
  mono: [
    '"SF Mono"',
    'Consolas',
    '"Liberation Mono"',
    'Menlo',
    'Courier',
    'monospace',
  ],
  display: [
    '"Inter Display"',
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    'sans-serif',
  ],
} as const;

// Font Weight Scale
export const FONT_WEIGHTS = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

// Font Size Scale - Mobile First with rem units
export const FONT_SIZES = {
  xs: {
    fontSize: '0.75rem',    // 12px
    lineHeight: '1rem',     // 16px
  },
  sm: {
    fontSize: '0.875rem',   // 14px
    lineHeight: '1.25rem',  // 20px
  },
  base: {
    fontSize: '1rem',       // 16px
    lineHeight: '1.5rem',   // 24px
  },
  lg: {
    fontSize: '1.125rem',   // 18px
    lineHeight: '1.75rem',  // 28px
  },
  xl: {
    fontSize: '1.25rem',    // 20px
    lineHeight: '1.75rem',  // 28px
  },
  '2xl': {
    fontSize: '1.5rem',     // 24px
    lineHeight: '2rem',     // 32px
  },
  '3xl': {
    fontSize: '1.875rem',   // 30px
    lineHeight: '2.25rem',  // 36px
  },
  '4xl': {
    fontSize: '2.25rem',    // 36px
    lineHeight: '2.5rem',   // 40px
  },
  '5xl': {
    fontSize: '3rem',       // 48px
    lineHeight: '1',        // 48px
  },
  '6xl': {
    fontSize: '3.75rem',    // 60px
    lineHeight: '1',        // 60px
  },
  '7xl': {
    fontSize: '4.5rem',     // 72px
    lineHeight: '1',        // 72px
  },
  '8xl': {
    fontSize: '6rem',       // 96px
    lineHeight: '1',        // 96px
  },
  '9xl': {
    fontSize: '8rem',       // 128px
    lineHeight: '1',        // 128px
  },
} as const;

// Line Height Scale
export const LINE_HEIGHTS = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const;

// Letter Spacing Scale
export const LETTER_SPACING = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

// Semantic Typography Variants
export const TYPOGRAPHY_VARIANTS = {
  // Headings
  heading: {
    h1: {
      fontFamily: FONT_FAMILIES.display,
      fontSize: FONT_SIZES['4xl'].fontSize,
      lineHeight: FONT_SIZES['4xl'].lineHeight,
      fontWeight: FONT_WEIGHTS.black,
      letterSpacing: LETTER_SPACING.tight,
      responsive: {
        sm: {
          fontSize: FONT_SIZES['5xl'].fontSize,
          lineHeight: FONT_SIZES['5xl'].lineHeight,
        },
        lg: {
          fontSize: FONT_SIZES['6xl'].fontSize,
          lineHeight: FONT_SIZES['6xl'].lineHeight,
        },
      },
    },
    h2: {
      fontFamily: FONT_FAMILIES.display,
      fontSize: FONT_SIZES['3xl'].fontSize,
      lineHeight: FONT_SIZES['3xl'].lineHeight,
      fontWeight: FONT_WEIGHTS.extrabold,
      letterSpacing: LETTER_SPACING.tight,
      responsive: {
        sm: {
          fontSize: FONT_SIZES['4xl'].fontSize,
          lineHeight: FONT_SIZES['4xl'].lineHeight,
        },
        lg: {
          fontSize: FONT_SIZES['5xl'].fontSize,
          lineHeight: FONT_SIZES['5xl'].lineHeight,
        },
      },
    },
    h3: {
      fontFamily: FONT_FAMILIES.sans,
      fontSize: FONT_SIZES['2xl'].fontSize,
      lineHeight: FONT_SIZES['2xl'].lineHeight,
      fontWeight: FONT_WEIGHTS.bold,
      letterSpacing: LETTER_SPACING.tight,
      responsive: {
        sm: {
          fontSize: FONT_SIZES['3xl'].fontSize,
          lineHeight: FONT_SIZES['3xl'].lineHeight,
        },
      },
    },
    h4: {
      fontFamily: FONT_FAMILIES.sans,
      fontSize: FONT_SIZES.xl.fontSize,
      lineHeight: FONT_SIZES.xl.lineHeight,
      fontWeight: FONT_WEIGHTS.bold,
      letterSpacing: LETTER_SPACING.normal,
      responsive: {
        sm: {
          fontSize: FONT_SIZES['2xl'].fontSize,
          lineHeight: FONT_SIZES['2xl'].lineHeight,
        },
      },
    },
    h5: {
      fontFamily: FONT_FAMILIES.sans,
      fontSize: FONT_SIZES.lg.fontSize,
      lineHeight: FONT_SIZES.lg.lineHeight,
      fontWeight: FONT_WEIGHTS.semibold,
      letterSpacing: LETTER_SPACING.normal,
    },
    h6: {
      fontFamily: FONT_FAMILIES.sans,
      fontSize: FONT_SIZES.base.fontSize,
      lineHeight: FONT_SIZES.base.lineHeight,
      fontWeight: FONT_WEIGHTS.semibold,
      letterSpacing: LETTER_SPACING.wide,
      textTransform: 'uppercase' as const,
    },
  },

  // Body Text
  body: {
    large: {
      fontFamily: FONT_FAMILIES.sans,
      fontSize: FONT_SIZES.lg.fontSize,
      lineHeight: LINE_HEIGHTS.relaxed,
      fontWeight: FONT_WEIGHTS.normal,
    },
    base: {
      fontFamily: FONT_FAMILIES.sans,
      fontSize: FONT_SIZES.base.fontSize,
      lineHeight: LINE_HEIGHTS.normal,
      fontWeight: FONT_WEIGHTS.normal,
    },
    small: {
      fontFamily: FONT_FAMILIES.sans,
      fontSize: FONT_SIZES.sm.fontSize,
      lineHeight: LINE_HEIGHTS.normal,
      fontWeight: FONT_WEIGHTS.normal,
    },
    xs: {
      fontFamily: FONT_FAMILIES.sans,
      fontSize: FONT_SIZES.xs.fontSize,
      lineHeight: LINE_HEIGHTS.normal,
      fontWeight: FONT_WEIGHTS.normal,
    },
  },

  // UI Elements
  ui: {
    button: {
      fontFamily: FONT_FAMILIES.sans,
      fontSize: FONT_SIZES.base.fontSize,
      lineHeight: LINE_HEIGHTS.none,
      fontWeight: FONT_WEIGHTS.semibold,
      letterSpacing: LETTER_SPACING.wide,
    },
    label: {
      fontFamily: FONT_FAMILIES.sans,
      fontSize: FONT_SIZES.sm.fontSize,
      lineHeight: LINE_HEIGHTS.normal,
      fontWeight: FONT_WEIGHTS.medium,
    },
    caption: {
      fontFamily: FONT_FAMILIES.sans,
      fontSize: FONT_SIZES.xs.fontSize,
      lineHeight: LINE_HEIGHTS.tight,
      fontWeight: FONT_WEIGHTS.normal,
    },
    overline: {
      fontFamily: FONT_FAMILIES.sans,
      fontSize: FONT_SIZES.xs.fontSize,
      lineHeight: LINE_HEIGHTS.tight,
      fontWeight: FONT_WEIGHTS.bold,
      letterSpacing: LETTER_SPACING.widest,
      textTransform: 'uppercase' as const,
    },
  },

  // Code and Technical
  code: {
    inline: {
      fontFamily: FONT_FAMILIES.mono,
      fontSize: '0.875em', // Relative to parent
      lineHeight: LINE_HEIGHTS.normal,
      fontWeight: FONT_WEIGHTS.normal,
    },
    block: {
      fontFamily: FONT_FAMILIES.mono,
      fontSize: FONT_SIZES.sm.fontSize,
      lineHeight: LINE_HEIGHTS.relaxed,
      fontWeight: FONT_WEIGHTS.normal,
    },
  },

  // Gamification Elements
  gamification: {
    score: {
      fontFamily: FONT_FAMILIES.display,
      fontSize: FONT_SIZES['2xl'].fontSize,
      lineHeight: LINE_HEIGHTS.none,
      fontWeight: FONT_WEIGHTS.black,
      letterSpacing: LETTER_SPACING.tight,
    },
    streak: {
      fontFamily: FONT_FAMILIES.sans,
      fontSize: FONT_SIZES.lg.fontSize,
      lineHeight: LINE_HEIGHTS.tight,
      fontWeight: FONT_WEIGHTS.bold,
    },
    level: {
      fontFamily: FONT_FAMILIES.sans,
      fontSize: FONT_SIZES.sm.fontSize,
      lineHeight: LINE_HEIGHTS.tight,
      fontWeight: FONT_WEIGHTS.semibold,
      letterSpacing: LETTER_SPACING.wide,
      textTransform: 'uppercase' as const,
    },
  },
} as const;

// Type definitions
export type FontFamily = keyof typeof FONT_FAMILIES;
export type FontWeight = keyof typeof FONT_WEIGHTS;
export type FontSize = keyof typeof FONT_SIZES;
export type LineHeight = keyof typeof LINE_HEIGHTS;
export type LetterSpacing = keyof typeof LETTER_SPACING;
export type TypographyVariant = keyof typeof TYPOGRAPHY_VARIANTS;

// Typography utility functions
export const typographyUtils = {
  /**
   * Get typography styles for a specific variant
   */
  getVariant: (variant: string): any => {
    const keys = variant.split('.');
    let value: any = TYPOGRAPHY_VARIANTS;
    
    for (const key of keys) {
      value = value?.[key];
    }
    
    return value || {};
  },

  /**
   * Generate responsive font sizes
   */
  getResponsiveFontSize: (base: keyof typeof FONT_SIZES, breakpoints?: Record<string, keyof typeof FONT_SIZES>) => {
    const baseSize = FONT_SIZES[base];
    const responsive: any = { ...baseSize };
    
    if (breakpoints) {
      responsive.responsive = {};
      Object.entries(breakpoints).forEach(([bp, size]) => {
        responsive.responsive[bp] = FONT_SIZES[size];
      });
    }
    
    return responsive;
  },

  /**
   * Create custom typography scale
   */
  createScale: (base: number, ratio: number = 1.25, steps: number = 9): Record<string, { fontSize: string; lineHeight: string }> => {
    const scale: Record<string, { fontSize: string; lineHeight: string }> = {};
    const sizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'];
    
    sizes.slice(0, steps).forEach((size, index) => {
      const fontSize = base * Math.pow(ratio, index - 2); // base is at index 2
      scale[size] = {
        fontSize: `${fontSize / 16}rem`,
        lineHeight: `${Math.ceil(fontSize * 1.5) / 16}rem`,
      };
    });
    
    return scale;
  },

  /**
   * Get font stack as CSS string
   */
  getFontStack: (family: FontFamily): string => {
    return FONT_FAMILIES[family].join(', ');
  },
} as const;