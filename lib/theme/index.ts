/**
 * Theme Module - Main Export
 * 
 * Barrel export for the modular theme system.
 */

// Export the main ThemeProvider and hook that components need
export { ThemeProvider, useTheme } from './theme-provider';

// For backward compatibility, also provide some basic theme utilities
export const themeUtils = {
  getSystemTheme: () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  },
  
  applyTheme: (theme: 'light' | 'dark') => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }
};

// Color utilities
export const colorUtils = {
  hexToRgb: (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },
  
  rgbToHex: (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
};