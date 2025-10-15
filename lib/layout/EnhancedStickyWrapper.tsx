/**
 * Enhanced Sticky Wrapper Component
 * 
 * Provides proper positioning and backdrop for sticky elements
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface EnhancedStickyWrapperProps {
  children: React.ReactNode;
  className?: string;
  offset?: "none" | "header" | "custom";
  customOffset?: string;
  zIndex?: number;
}

export const EnhancedStickyWrapper: React.FC<EnhancedStickyWrapperProps> = ({
  children,
  className,
  offset = "header",
  customOffset,
  zIndex = 40,
}) => {
  const offsetClasses = React.useMemo(() => {
    switch (offset) {
      case "none":
        return "top-0";
      case "header":
        return "top-[60px]"; // Always account for mobile header (60px) since we always use mobile layout
      case "custom":
        return customOffset || "top-0";
      default:
        return "top-0";
    }
  }, [offset, customOffset]);

  return (
    <div 
      className={cn(
        "sticky w-[368px] self-start",
        offsetClasses,
        className
      )}
      style={{ zIndex }}
    >
      <div className="flex flex-col gap-y-4">
        {children}
      </div>
    </div>
  );
};