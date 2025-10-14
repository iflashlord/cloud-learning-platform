/**
 * Background Provider Component
 * 
 * Single source of truth for app backgrounds
 * Handles both light and dark modes with proper contrast
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BackgroundProviderProps {
  children: React.ReactNode;
  variant?: "default" | "learning" | "gradient" | "solid";
  className?: string;
}

export const BackgroundProvider: React.FC<BackgroundProviderProps> = ({
  children,
  variant = "default",
  className,
}) => {
  const backgroundClasses = React.useMemo(() => {
    const baseClasses = "min-h-screen transition-colors duration-300";
    
    switch (variant) {
      case "learning":
        return cn(
          baseClasses,
          // Light mode - subtle learning gradient
          "bg-gradient-to-br from-blue-50 via-green-50 to-purple-50",
          // Dark mode - deep learning gradient
          "dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950",
          className
        );
        
      case "gradient":
        return cn(
          baseClasses,
          // Light mode - vibrant gradient
          "bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50",
          // Dark mode - muted gradient
          "dark:bg-gradient-to-br dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/20",
          className
        );
        
      case "solid":
        return cn(
          baseClasses,
          "bg-background",
          className
        );
        
      default:
        return cn(
          baseClasses,
          // Light mode - clean neutral gradient
          "bg-gradient-to-br from-gray-50 via-white to-gray-50",
          // Dark mode - consistent dark gradient
          "dark:bg-gradient-to-br dark:from-gray-950 dark:via-gray-900 dark:to-gray-950",
          className
        );
    }
  }, [variant, className]);

  return (
    <div className={backgroundClasses}>
      {children}
    </div>
  );
};