"use client";

import { useMemo } from "react";

/**
 * Utility hook for common theme patterns
 * Simplified version for design system compatibility
 */
export const useThemeClasses = () => {
  return useMemo(() => ({
    // Common button styles - using design system colors
    primaryButton: `bg-blue-500 hover:bg-blue-600 text-white`,
    secondaryButton: `bg-blue-100 hover:bg-blue-200 text-blue-700`,
    
    // Success states
    successButton: `bg-green-500 hover:bg-green-600 text-white`,
    successText: `text-green-600`,
    successBg: `bg-green-100`,
    successBorder: `border-green-200`,
    
    // Error states  
    errorButton: `bg-red-500 hover:bg-red-600 text-white`,
    errorText: `text-red-600`,
    errorBg: `bg-red-100`,
    errorBorder: `border-red-200`,
    
    // Info states
    infoButton: `bg-blue-500 hover:bg-blue-600 text-white`,
    infoText: `text-blue-600`,
    infoBg: `bg-blue-100`,
    infoBorder: `border-blue-200`,
    
    // Neutral states
    neutralButton: `bg-gray-500 hover:bg-gray-600 text-white`,
    neutralText: `text-gray-600`,
    neutralBg: `bg-gray-100`,
    neutralBorder: `border-gray-200`,

    // Primary accents (theme-aware through CSS variables)
    primaryText: `text-blue-600`,
    primaryBg: `bg-blue-100`,
    primaryBorder: `border-blue-200`,
    
    // Theme info
    themeName: "default",
  }), []);
};