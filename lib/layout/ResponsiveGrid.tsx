/**
 * Responsive Grid Component
 * 
 * Provides responsive grid with configurable breakpoints
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ResponsiveGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | "auto";
  gap?: "sm" | "md" | "lg" | "xl";
  className?: string;
  breakpoints?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  columns = "auto",
  gap = "md",
  className,
  breakpoints,
}) => {
  const gridClasses = React.useMemo(() => {
    const gapClasses = {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    };

    if (columns === "auto") {
      return cn(
        "grid",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        gapClasses[gap]
      );
    }

    const colClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    };

    return cn(
      "grid",
      colClasses[columns],
      gapClasses[gap]
    );
  }, [columns, gap]);

  return (
    <div className={cn(gridClasses, className)}>
      {children}
    </div>
  );
};