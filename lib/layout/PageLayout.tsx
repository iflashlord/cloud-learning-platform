/**
 * Page Layout Wrapper Component
 * 
 * Main page layout wrapper that combines background and container
 */

"use client";

import * as React from "react";
import { BackgroundProvider } from "./BackgroundProvider";
import { ResponsiveContainer } from "./ResponsiveContainer";
import { type ContainerVariantProps } from "@/lib/enhanced-design-system";

interface PageLayoutProps {
  children: React.ReactNode;
  background?: "default" | "learning" | "gradient" | "solid";
  containerSize?: ContainerVariantProps["size"];
  className?: string;
  showBackground?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  background = "default",
  containerSize = "lg",
  className,
  showBackground = true,
}) => {
  if (!showBackground) {
    return (
      <ResponsiveContainer size={containerSize} className={className}>
        {children}
      </ResponsiveContainer>
    );
  }

  return (
    <BackgroundProvider variant={background}>
      <ResponsiveContainer size={containerSize} className={className}>
        {children}
      </ResponsiveContainer>
    </BackgroundProvider>
  );
};