/**
 * Base Grid Components
 * 
 * Core grid layout components using the variant system
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  appGridVariants,
  pageGridVariants,
  contentGridVariants,
  gridAreaVariants,
  type AppGridVariantProps,
  type PageGridVariantProps,
  type ContentGridVariantProps,
  type GridAreaVariantProps
} from "./GridVariants";

// ============================================================================
// BASE GRID COMPONENTS
// ============================================================================

/**
 * Main application grid container
 */
interface AppGridProps extends AppGridVariantProps {
  children: React.ReactNode;
  className?: string;
  sidebarWidth?: number;
  as?: keyof JSX.IntrinsicElements;
}

export const AppGrid: React.FC<AppGridProps> = ({
  children,
  layout,
  spacing,
  className,
  sidebarWidth = 280,
  as: Component = "div"
}) => {
  const style = sidebarWidth ? { 
    '--sidebar-width': `${sidebarWidth}px` 
  } as React.CSSProperties : undefined;

  return (
    <Component 
      className={cn(appGridVariants({ layout, spacing }), className)}
      style={style}
    >
      {children}
    </Component>
  );
};

/**
 * Page content grid container
 */
interface PageGridProps extends PageGridVariantProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const PageGrid: React.FC<PageGridProps> = ({
  children,
  template,
  container,
  padding,
  className,
  as: Component = "div"
}) => {
  return (
    <Component className={cn(pageGridVariants({ template, container, padding }), className)}>
      {children}
    </Component>
  );
};

/**
 * Flexible content grid
 */
interface ContentGridProps extends ContentGridVariantProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const ContentGrid: React.FC<ContentGridProps> = ({
  children,
  cols,
  rows,
  gap,
  align,
  justify, 
  className,
  as: Component = "div"
}) => {
  return (
    <Component className={cn(contentGridVariants({ cols, rows, gap, align, justify }), className)}>
      {children}
    </Component>
  );
};

/**
 * Grid Area Component
 * Semantic wrapper for grid areas
 */
interface GridAreaProps extends GridAreaVariantProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const GridArea: React.FC<GridAreaProps> = ({
  children,
  area,
  className,
  as: Component = "div"
}) => {
  return (
    <Component className={cn(gridAreaVariants({ area }), className)}>
      {children}
    </Component>
  );
};