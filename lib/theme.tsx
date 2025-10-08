"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { COLOR_THEME, COURSE_THEMES } from "./config";

// Types
type ColorShades = {
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

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<CourseTheme>({
    name: COURSE_THEMES.default.name,
    colors: {
      primary: { ...COURSE_THEMES.default.colors.primary },
      success: { ...COURSE_THEMES.default.colors.success },
      error: { ...COURSE_THEMES.default.colors.error },
      info: { ...COURSE_THEMES.default.colors.info },
      neutral: { ...COURSE_THEMES.default.colors.neutral },
    }
  });

  const setThemeByCourse = useCallback((courseId: number | null) => {
    const themeName = courseId ? COURSE_ID_TO_THEME[courseId] || 'default' : 'default';
    const theme = COURSE_THEMES[themeName];
    setCurrentTheme({
      name: theme.name,
      colors: {
        primary: { ...theme.colors.primary },
        success: { ...theme.colors.success },
        error: { ...theme.colors.error },
        info: { ...theme.colors.info },
        neutral: { ...theme.colors.neutral },
      }
    });
  }, []);

  const setThemeByName = useCallback((themeName: keyof typeof COURSE_THEMES) => {
    const theme = COURSE_THEMES[themeName];
    setCurrentTheme({
      name: theme.name,
      colors: {
        primary: { ...theme.colors.primary },
        success: { ...theme.colors.success },
        error: { ...theme.colors.error },
        info: { ...theme.colors.info },
        neutral: { ...theme.colors.neutral },
      }
    });
  }, []);

  const getColorClass = useCallback((
    color: 'primary' | 'success' | 'error' | 'info' | 'neutral',
    shade: keyof ColorShades,
    type: 'bg' | 'text' | 'border'
  ): string => {
    // Map theme colors to Tailwind classes
    const colorMaps = {
      primary: {
        bg: {
          50: 'bg-orange-50', 100: 'bg-orange-100', 200: 'bg-orange-200', 300: 'bg-orange-300',
          400: 'bg-orange-400', 500: 'bg-orange-500', 600: 'bg-orange-600', 700: 'bg-orange-700',
          800: 'bg-orange-800', 900: 'bg-orange-900'
        },
        text: {
          50: 'text-orange-50', 100: 'text-orange-100', 200: 'text-orange-200', 300: 'text-orange-300',
          400: 'text-orange-400', 500: 'text-orange-500', 600: 'text-orange-600', 700: 'text-orange-700',
          800: 'text-orange-800', 900: 'text-orange-900'
        },
        border: {
          50: 'border-orange-50', 100: 'border-orange-100', 200: 'border-orange-200', 300: 'border-orange-300',
          400: 'border-orange-400', 500: 'border-orange-500', 600: 'border-orange-600', 700: 'border-orange-700',
          800: 'border-orange-800', 900: 'border-orange-900'
        }
      },
      success: {
        bg: {
          50: 'bg-green-50', 100: 'bg-green-100', 200: 'bg-green-200', 300: 'bg-green-300',
          400: 'bg-green-400', 500: 'bg-green-500', 600: 'bg-green-600', 700: 'bg-green-700',
          800: 'bg-green-800', 900: 'bg-green-900'
        },
        text: {
          50: 'text-green-50', 100: 'text-green-100', 200: 'text-green-200', 300: 'text-green-300',
          400: 'text-green-400', 500: 'text-green-500', 600: 'text-green-600', 700: 'text-green-700',
          800: 'text-green-800', 900: 'text-green-900'
        },
        border: {
          50: 'border-green-50', 100: 'border-green-100', 200: 'border-green-200', 300: 'border-green-300',
          400: 'border-green-400', 500: 'border-green-500', 600: 'border-green-600', 700: 'border-green-700',
          800: 'border-green-800', 900: 'border-green-900'
        }
      },
      error: {
        bg: {
          50: 'bg-red-50', 100: 'bg-red-100', 200: 'bg-red-200', 300: 'bg-red-300',
          400: 'bg-red-400', 500: 'bg-red-500', 600: 'bg-red-600', 700: 'bg-red-700',
          800: 'bg-red-800', 900: 'bg-red-900'
        },
        text: {
          50: 'text-red-50', 100: 'text-red-100', 200: 'text-red-200', 300: 'text-red-300',
          400: 'text-red-400', 500: 'text-red-500', 600: 'text-red-600', 700: 'text-red-700',
          800: 'text-red-800', 900: 'text-red-900'
        },
        border: {
          50: 'border-red-50', 100: 'border-red-100', 200: 'border-red-200', 300: 'border-red-300',
          400: 'border-red-400', 500: 'border-red-500', 600: 'border-red-600', 700: 'border-red-700',
          800: 'border-red-800', 900: 'border-red-900'
        }
      },
      info: {
        bg: {
          50: 'bg-blue-50', 100: 'bg-blue-100', 200: 'bg-blue-200', 300: 'bg-blue-300',
          400: 'bg-blue-400', 500: 'bg-blue-500', 600: 'bg-blue-600', 700: 'bg-blue-700',
          800: 'bg-blue-800', 900: 'bg-blue-900'
        },
        text: {
          50: 'text-blue-50', 100: 'text-blue-100', 200: 'text-blue-200', 300: 'text-blue-300',
          400: 'text-blue-400', 500: 'text-blue-500', 600: 'text-blue-600', 700: 'text-blue-700',
          800: 'text-blue-800', 900: 'text-blue-900'
        },
        border: {
          50: 'border-blue-50', 100: 'border-blue-100', 200: 'border-blue-200', 300: 'border-blue-300',
          400: 'border-blue-400', 500: 'border-blue-500', 600: 'border-blue-600', 700: 'border-blue-700',
          800: 'border-blue-800', 900: 'border-blue-900'
        }
      },
      neutral: {
        bg: {
          50: 'bg-gray-50', 100: 'bg-gray-100', 200: 'bg-gray-200', 300: 'bg-gray-300',
          400: 'bg-gray-400', 500: 'bg-gray-500', 600: 'bg-gray-600', 700: 'bg-gray-700',
          800: 'bg-gray-800', 900: 'bg-gray-900'
        },
        text: {
          50: 'text-gray-50', 100: 'text-gray-100', 200: 'text-gray-200', 300: 'text-gray-300',
          400: 'text-gray-400', 500: 'text-gray-500', 600: 'text-gray-600', 700: 'text-gray-700',
          800: 'text-gray-800', 900: 'text-gray-900'
        },
        border: {
          50: 'border-gray-50', 100: 'border-gray-100', 200: 'border-gray-200', 300: 'border-gray-300',
          400: 'border-gray-400', 500: 'border-gray-500', 600: 'border-gray-600', 700: 'border-gray-700',
          800: 'border-gray-800', 900: 'border-gray-900'
        }
      }
    };

    // Get dynamic class based on current theme
    if (currentTheme.colors.primary[500] !== COLOR_THEME.primary[500] && color === 'primary') {
      // Theme has custom primary color - determine which preset it matches
      if (currentTheme.colors.primary[500] === COLOR_THEME.info[500]) {
        // Blue theme
        return colorMaps.info[type][shade];
      } else if (currentTheme.colors.primary[500] === COLOR_THEME.success[500]) {
        // Green theme
        return colorMaps.success[type][shade];
      } else if (currentTheme.colors.primary[500] === COURSE_THEMES.devops.colors.primary[500]) {
        // Purple theme
        const purpleMaps = {
          bg: {
            50: 'bg-purple-50', 100: 'bg-purple-100', 200: 'bg-purple-200', 300: 'bg-purple-300',
            400: 'bg-purple-400', 500: 'bg-purple-500', 600: 'bg-purple-600', 700: 'bg-purple-700',
            800: 'bg-purple-800', 900: 'bg-purple-900'
          },
          text: {
            50: 'text-purple-50', 100: 'text-purple-100', 200: 'text-purple-200', 300: 'text-purple-300',
            400: 'text-purple-400', 500: 'text-purple-500', 600: 'text-purple-600', 700: 'text-purple-700',
            800: 'text-purple-800', 900: 'text-purple-900'
          },
          border: {
            50: 'border-purple-50', 100: 'border-purple-100', 200: 'border-purple-200', 300: 'border-purple-300',
            400: 'border-purple-400', 500: 'border-purple-500', 600: 'border-purple-600', 700: 'border-purple-700',
            800: 'border-purple-800', 900: 'border-purple-900'
          }
        };
        return purpleMaps[type][shade];
      }
    }

    return colorMaps[color][type][shade];
  }, [currentTheme]);

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
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};