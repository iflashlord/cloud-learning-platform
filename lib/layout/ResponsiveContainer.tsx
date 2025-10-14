/**
 * Responsive Container Component
 * 
 * Provides consistent padding and max-widths
 * with responsive behavior
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { containerVariants, type ContainerVariantProps } from "@/lib/enhanced-design-system";

interface ResponsiveContainerProps extends ContainerVariantProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className,
  size = "lg",
  padding = "md",
  as: Component = "div",
}) => {
  return (
    <Component className={cn(containerVariants({ size, padding }), className)}>
      {children}
    </Component>
  );
};