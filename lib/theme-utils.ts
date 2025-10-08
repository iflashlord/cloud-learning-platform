import { useTheme } from "@/lib/theme";
import { useMemo } from "react";

/**
 * Utility hook for common theme patterns
 */
export const useThemeClasses = () => {
  const { getColorClass, currentTheme } = useTheme();

  return useMemo(() => ({
    // Common button styles
    primaryButton: `${getColorClass('primary', 500, 'bg')} hover:${getColorClass('primary', 600, 'bg')} ${getColorClass('primary', 50, 'text')}`,
    secondaryButton: `${getColorClass('primary', 100, 'bg')} hover:${getColorClass('primary', 200, 'bg')} ${getColorClass('primary', 700, 'text')}`,
    
    // Success states
    successButton: `${getColorClass('success', 500, 'bg')} hover:${getColorClass('success', 600, 'bg')} text-white`,
    successText: getColorClass('success', 600, 'text'),
    successBg: getColorClass('success', 100, 'bg'),
    successBorder: getColorClass('success', 200, 'border'),
    
    // Error states  
    errorButton: `${getColorClass('error', 500, 'bg')} hover:${getColorClass('error', 600, 'bg')} text-white`,
    errorText: getColorClass('error', 600, 'text'),
    errorBg: getColorClass('error', 100, 'bg'),
    errorBorder: getColorClass('error', 200, 'border'),
    
    // Info states
    infoButton: `${getColorClass('info', 500, 'bg')} hover:${getColorClass('info', 600, 'bg')} text-white`,
    infoText: getColorClass('info', 600, 'text'),
    infoBg: getColorClass('info', 100, 'bg'),
    infoBorder: getColorClass('info', 200, 'border'),
    
    // Neutral states
    neutralButton: `${getColorClass('neutral', 500, 'bg')} hover:${getColorClass('neutral', 600, 'bg')} text-white`,
    neutralText: getColorClass('neutral', 600, 'text'),
    neutralBg: getColorClass('neutral', 100, 'bg'),
    neutralBorder: getColorClass('neutral', 200, 'border'),

    // Primary accents
    primaryText: getColorClass('primary', 600, 'text'),
    primaryBg: getColorClass('primary', 100, 'bg'),
    primaryBorder: getColorClass('primary', 200, 'border'),
    
    // Theme info
    themeName: currentTheme.name,
  }), [getColorClass, currentTheme]);
};