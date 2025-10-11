/**
 * Spacing system for AWS Learning Platform
 * 
 * Provides a comprehensive spacing scale for consistent layouts,
 * responsive design, and visual rhythm.
 */

// Base spacing scale - using rem units for accessibility
export const SPACING_SCALE = {
  0: '0rem',
  px: '0.0625rem',  // 1px
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
} as const;

// Semantic spacing for specific use cases
export const SEMANTIC_SPACING = {
  // Component internal spacing
  component: {
    xs: SPACING_SCALE[1],    // 4px - tight spacing
    sm: SPACING_SCALE[2],    // 8px - small spacing
    md: SPACING_SCALE[4],    // 16px - default spacing
    lg: SPACING_SCALE[6],    // 24px - comfortable spacing
    xl: SPACING_SCALE[8],    // 32px - generous spacing
  },

  // Layout spacing
  layout: {
    xs: SPACING_SCALE[4],    // 16px - minimal sections
    sm: SPACING_SCALE[8],    // 32px - small sections
    md: SPACING_SCALE[16],   // 64px - default sections
    lg: SPACING_SCALE[24],   // 96px - large sections
    xl: SPACING_SCALE[32],   // 128px - major sections
    xxl: SPACING_SCALE[48],  // 192px - hero sections
  },

  // Container spacing
  container: {
    xs: SPACING_SCALE[4],    // 16px - mobile
    sm: SPACING_SCALE[6],    // 24px - small screens
    md: SPACING_SCALE[8],    // 32px - medium screens
    lg: SPACING_SCALE[12],   // 48px - large screens
    xl: SPACING_SCALE[16],   // 64px - extra large screens
  },

  // Interactive elements
  interactive: {
    button: {
      padding: {
        x: SPACING_SCALE[4],    // 16px horizontal
        y: SPACING_SCALE[2],    // 8px vertical
      },
      gap: SPACING_SCALE[2],    // 8px between icon and text
    },
    input: {
      padding: {
        x: SPACING_SCALE[3],    // 12px horizontal
        y: SPACING_SCALE[2.5],  // 10px vertical
      },
    },
    card: {
      padding: {
        x: SPACING_SCALE[6],    // 24px horizontal
        y: SPACING_SCALE[6],    // 24px vertical
      },
    },
  },

  // Gamification elements
  gamification: {
    streak: {
      gap: SPACING_SCALE[1],     // 4px - tight for numbers
      padding: SPACING_SCALE[2], // 8px - badge padding
    },
    progress: {
      height: SPACING_SCALE[2],   // 8px - progress bar height
      gap: SPACING_SCALE[2],      // 8px - between elements
    },
    achievement: {
      grid: SPACING_SCALE[4],     // 16px - grid gap
      padding: SPACING_SCALE[4],  // 16px - card padding
    },
  },
} as const;

// Responsive spacing breakpoints
export const RESPONSIVE_SPACING = {
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Container max-widths
  containers: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1400px',
    full: '100%',
  },

  // Responsive padding/margin scales
  responsive: {
    xs: {
      base: SPACING_SCALE[4],    // 16px on mobile
      sm: SPACING_SCALE[6],      // 24px on tablet
      lg: SPACING_SCALE[8],      // 32px on desktop
    },
    sm: {
      base: SPACING_SCALE[6],    // 24px on mobile
      sm: SPACING_SCALE[8],      // 32px on tablet
      lg: SPACING_SCALE[12],     // 48px on desktop
    },
    md: {
      base: SPACING_SCALE[8],    // 32px on mobile
      sm: SPACING_SCALE[12],     // 48px on tablet
      lg: SPACING_SCALE[16],     // 64px on desktop
    },
    lg: {
      base: SPACING_SCALE[12],   // 48px on mobile
      sm: SPACING_SCALE[16],     // 64px on tablet
      lg: SPACING_SCALE[24],     // 96px on desktop
    },
    xl: {
      base: SPACING_SCALE[16],   // 64px on mobile
      sm: SPACING_SCALE[24],     // 96px on tablet
      lg: SPACING_SCALE[32],     // 128px on desktop
    },
  },
} as const;

// Border radius scale
export const BORDER_RADIUS = {
  none: '0rem',
  sm: '0.125rem',    // 2px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px',    // Fully rounded
} as const;

// Shadow system
export const SHADOWS = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  
  // Colored shadows for gamification
  colored: {
    success: '0 10px 15px -3px rgb(34 197 94 / 0.2), 0 4px 6px -4px rgb(34 197 94 / 0.1)',
    error: '0 10px 15px -3px rgb(239 68 68 / 0.2), 0 4px 6px -4px rgb(239 68 68 / 0.1)',
    warning: '0 10px 15px -3px rgb(245 158 11 / 0.2), 0 4px 6px -4px rgb(245 158 11 / 0.1)',
    info: '0 10px 15px -3px rgb(59 130 246 / 0.2), 0 4px 6px -4px rgb(59 130 246 / 0.1)',
    primary: '0 10px 15px -3px rgb(34 197 94 / 0.2), 0 4px 6px -4px rgb(34 197 94 / 0.1)',
  },
  
  // Duolingo-style 3D shadows
  duolingo: {
    button: '0 4px 0 0 currentColor',
    buttonPressed: '0 2px 0 0 currentColor',
    card: '0 8px 0 0 rgb(0 0 0 / 0.1)',
    cardHover: '0 12px 0 0 rgb(0 0 0 / 0.15)',
  },
} as const;

// Z-index scale
export const Z_INDEX = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Type definitions
export type SpacingScale = keyof typeof SPACING_SCALE;
export type SemanticSpacing = keyof typeof SEMANTIC_SPACING;
export type BorderRadius = keyof typeof BORDER_RADIUS;
export type Shadow = keyof typeof SHADOWS;
export type ZIndex = keyof typeof Z_INDEX;

// Spacing utility functions
export const spacingUtils = {
  /**
   * Get spacing value by key
   */
  getSpacing: (key: SpacingScale): string => {
    return SPACING_SCALE[key];
  },

  /**
   * Get semantic spacing
   */
  getSemantic: (category: string, size?: string): string => {
    const keys = [category, size].filter(Boolean) as string[];
    let value: any = SEMANTIC_SPACING;
    
    for (const key of keys) {
      value = value?.[key];
    }
    
    return typeof value === 'string' ? value : SPACING_SCALE[4]; // fallback
  },

  /**
   * Generate responsive spacing classes
   */
  getResponsive: (size: keyof typeof RESPONSIVE_SPACING.responsive): Record<string, string> => {
    return RESPONSIVE_SPACING.responsive[size];
  },

  /**
   * Create custom spacing scale
   */
  createCustomScale: (base: number, multiplier: number = 0.25): Record<string, string> => {
    const scale: Record<string, string> = {};
    
    for (let i = 0; i <= 96; i++) {
      scale[i.toString()] = `${base * i * multiplier}rem`;
    }
    
    return scale;
  },

  /**
   * Get border radius value
   */
  getBorderRadius: (key: BorderRadius): string => {
    return BORDER_RADIUS[key];
  },

  /**
   * Get shadow value
   */
  getShadow: (key: string): string => {
    const keys = key.split('.');
    let value: any = SHADOWS;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return typeof value === 'string' ? value : SHADOWS.none;
  },

  /**
   * Get z-index value
   */
  getZIndex: (key: ZIndex): number => {
    return Z_INDEX[key];
  },
} as const;