"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { COLOR_THEME, COURSE_THEMES } from "./config";

// Types
type ColorShades = {
  0?: string;
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

interface CourseTheme {
  name: string;
  colors: {
    primary: ColorShades;
    success: ColorShades;
    error: ColorShades;
    info: ColorShades;
    neutral: ColorShades;
  };
}

interface ThemeContextType {
  currentTheme: CourseTheme;
  setThemeByCourse: (courseId: number | null) => void;
  setThemeByName: (themeName: keyof typeof COURSE_THEMES) => void;
  getColorClass: (color: 'primary' | 'success' | 'error' | 'info' | 'neutral', shade: keyof ColorShades, type: 'bg' | 'text' | 'border') => string;
  getColorValue: (color: 'primary' | 'success' | 'error' | 'info' | 'neutral', shade: keyof ColorShades) => string;
}

// Course ID to theme mapping
const COURSE_ID_TO_THEME: Record<number, keyof typeof COURSE_THEMES> = {
  1: "cloud",        // Cloud Fundamentals
  2: "architecture", // System Architecture  
  3: "development",  // Development
  4: "devops",       // DevOps & Operations
};

const ThemeContext = createContext<ThemeContextType | null>(null);

type ColorCategory = keyof CourseTheme["colors"];

const COLOR_CATEGORIES: ColorCategory[] = ["primary", "success", "error", "info", "neutral"];

const COLOR_SHADES: Array<keyof ColorShades> = [
  0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
];

const getCssVariableClass = (
  color: 'primary' | 'success' | 'error' | 'info' | 'neutral',
  shade: keyof ColorShades,
  type: 'bg' | 'text' | 'border'
) => {
  const cssVar = `--ds-${color}-${shade}`;
  if (type === "bg") {
    return `bg-[hsl(var(${cssVar}))]`;
  }
  if (type === "text") {
    return `text-[hsl(var(${cssVar}))]`;
  }
  return `border-[hsl(var(${cssVar}))]`;
};

const ensureFullHex = (hex: string) => {
  let normalized = hex.replace("#", "");
  if (normalized.length === 3) {
    normalized = normalized.split("").map((char) => `${char}${char}`).join("");
  }
  return `#${normalized}`;
};

const hexToRgb = (hex: string) => {
  const normalized = ensureFullHex(hex).replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return { r, g, b };
};

const hexToHsl = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

const toCssHsl = (hex: string) => {
  const { h, s, l } = hexToHsl(hex);
  return `${h} ${s}% ${l}%`;
};

const toCssRgb = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  return `${r}, ${g}, ${b}`;
};

const getContrastingForeground = (hex: string) => {
  const { r, g, b } = hexToRgb(hex);
  const [rLin, gLin, bLin] = [r, g, b].map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  const luminance = 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
  return luminance > 0.55 ? "222 47% 11%" : "0 0% 100%";
};

const cloneTheme = (theme: CourseTheme): CourseTheme => ({
  name: theme.name,
  colors: {
    primary: { ...theme.colors.primary },
    success: { ...theme.colors.success },
    error: { ...theme.colors.error },
    info: { ...theme.colors.info },
    neutral: { ...theme.colors.neutral },
  },
});

const DEFAULT_THEME_CONTEXT: ThemeContextType = {
  currentTheme: cloneTheme(COURSE_THEMES.default),
  setThemeByCourse: () => {},
  setThemeByName: () => {},
  getColorClass: (color, shade, type) => getCssVariableClass(color, shade, type),
  getColorValue: (color, shade) => COURSE_THEMES.default.colors[color][shade],
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<CourseTheme>({
    ...cloneTheme(COURSE_THEMES.default),
  });

  const applyCssVariables = useCallback((theme: CourseTheme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    COLOR_CATEGORIES.forEach((category) => {
      const shades = theme.colors[category];
      COLOR_SHADES.forEach((shade) => {
        const key = `--ds-${category}-${shade}`;
        const shadeValue = shades[shade];
        if (shadeValue) {
          root.style.setProperty(key, toCssHsl(shadeValue));
        }
      });

      const mainShade = shades[500];
      if (mainShade) {
        root.style.setProperty(`--ds-${category}-rgb`, toCssRgb(mainShade));
        root.style.setProperty(`--ds-${category}-foreground`, getContrastingForeground(mainShade));
      }
    });

    const primaryMain = theme.colors.primary[500];
    const infoMain = theme.colors.info[500];
    const neutralSurface = theme.colors.neutral[0] ?? theme.colors.neutral[50];
    const neutralSurfaceAlt = theme.colors.neutral[50] ?? theme.colors.neutral[100];
    const neutralBorder = theme.colors.neutral[200];
    const neutralMuted = theme.colors.neutral[100] ?? theme.colors.neutral[200];
    const neutralMutedForeground = theme.colors.neutral[600] ?? theme.colors.neutral[500];
    const neutralForeground = theme.colors.neutral[900] ?? theme.colors.neutral[700];

    if (primaryMain) {
      root.style.setProperty("--primary", toCssHsl(primaryMain));
      root.style.setProperty("--ring", toCssHsl(primaryMain));
      root.style.setProperty("--primary-foreground", getContrastingForeground(primaryMain));
    }

    if (infoMain) {
      root.style.setProperty("--secondary", toCssHsl(infoMain));
      root.style.setProperty("--secondary-foreground", getContrastingForeground(infoMain));
      root.style.setProperty("--accent", toCssHsl(infoMain));
      root.style.setProperty("--accent-foreground", getContrastingForeground(infoMain));
    }

    if (neutralSurface) {
      root.style.setProperty("--background", toCssHsl(neutralSurface));
      root.style.setProperty("--card", toCssHsl(neutralSurface));
      root.style.setProperty("--popover", toCssHsl(neutralSurface));
    }

    if (neutralSurfaceAlt && !infoMain) {
      root.style.setProperty("--secondary", toCssHsl(neutralSurfaceAlt));
    }

    if (neutralBorder) {
      root.style.setProperty("--border", toCssHsl(neutralBorder));
      root.style.setProperty("--input", toCssHsl(neutralBorder));
    }

    if (neutralMuted) {
      root.style.setProperty("--muted", toCssHsl(neutralMuted));
    }

    if (neutralMutedForeground) {
      const mutedForegroundHsl = toCssHsl(neutralMutedForeground);
      root.style.setProperty("--muted-foreground", mutedForegroundHsl);
      root.style.setProperty("--accent-foreground", mutedForegroundHsl);
    }

    if (neutralForeground) {
      const neutralForegroundHsl = toCssHsl(neutralForeground);
      root.style.setProperty("--foreground", neutralForegroundHsl);
      root.style.setProperty("--card-foreground", neutralForegroundHsl);
      root.style.setProperty("--popover-foreground", neutralForegroundHsl);
    }
  }, []);

  useEffect(() => {
    applyCssVariables(currentTheme);
  }, [currentTheme, applyCssVariables]);

  const setThemeByCourse = useCallback((courseId: number | null) => {
    const themeName = courseId ? COURSE_ID_TO_THEME[courseId] || 'default' : 'default';
    const theme = COURSE_THEMES[themeName];
    setCurrentTheme(cloneTheme(theme));
  }, []);

  const setThemeByName = useCallback((themeName: keyof typeof COURSE_THEMES) => {
    const theme = COURSE_THEMES[themeName];
    setCurrentTheme(cloneTheme(theme));
  }, []);

  const getColorClass = useCallback((
    color: 'primary' | 'success' | 'error' | 'info' | 'neutral',
    shade: keyof ColorShades,
    type: 'bg' | 'text' | 'border'
  ): string => getCssVariableClass(color, shade, type), []);

  const getColorValue = useCallback((
    color: 'primary' | 'success' | 'error' | 'info' | 'neutral',
    shade: keyof ColorShades
  ): string => {
    return currentTheme.colors[color][shade];
  }, [currentTheme]);

  const value: ThemeContextType = {
    currentTheme,
    setThemeByCourse,
    setThemeByName,
    getColorClass,
    getColorValue,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context ?? DEFAULT_THEME_CONTEXT;
};
