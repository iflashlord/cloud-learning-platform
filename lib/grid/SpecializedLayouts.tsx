/**
 * Specialized Layout Components
 * 
 * Higher-level layout patterns built on the grid system
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { PageGrid, ContentGrid } from "./BaseGridComponents";

// ============================================================================
// SPECIALIZED LAYOUT COMPONENTS
// ============================================================================

/**
 * Sidebar Layout
 * Two-column layout with sidebar and main content
 */
interface SidebarLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  sidebarPosition?: "left" | "right";
  sidebarWidth?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  sidebar,
  children,
  sidebarPosition = "left",
  sidebarWidth = "md", 
  className
}) => {
  const sidebarWidths = {
    sm: "280px",
    md: "320px", 
    lg: "380px",
    xl: "420px"
  };

  const gridTemplate = sidebarPosition === "left" 
    ? `${sidebarWidths[sidebarWidth]} 1fr`
    : `1fr ${sidebarWidths[sidebarWidth]}`;

  return (
    <div 
      className={cn("grid gap-6 lg:gap-8", className)}
      style={{
        gridTemplateColumns: `1fr`,
        [`@media (min-width: 1024px)`]: {
          gridTemplateColumns: gridTemplate
        }
      } as React.CSSProperties}
    >
      {sidebarPosition === "left" && (
        <aside className="order-2 lg:order-1">
          {sidebar}
        </aside>
      )}
      <main className="order-1 lg:order-2">
        {children}
      </main>
      {sidebarPosition === "right" && (
        <aside className="order-2">
          {sidebar}
        </aside>
      )}
    </div>
  );
};

/**
 * Dashboard Grid Layout
 * Common dashboard layout with header and main grid
 */
interface DashboardLayoutProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  header,
  children,
  className
}) => {
  return (
    <PageGrid template="dashboard" className={className}>
      {header && (
        <header className="w-full">
          {header}
        </header>
      )}
      <main className="w-full min-h-0">
        {children}
      </main>
    </PageGrid>
  );
};

/**
 * Card Grid Layout 
 * Auto-fitting grid for card layouts
 */
interface CardGridProps {
  children: React.ReactNode;
  minCardWidth?: number;
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const CardGrid: React.FC<CardGridProps> = ({
  children,
  minCardWidth = 280,
  gap = "md",
  className
}) => {
  return (
    <div 
      className={cn("grid", `gap-${gap === 'xs' ? '1' : gap === 'sm' ? '2' : gap === 'md' ? '4' : gap === 'lg' ? '6' : gap === 'xl' ? '8' : '0'}`, className)}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}px, 1fr))`
      }}
    >
      {children}
    </div>
  );
};

/**
 * Holy Grail Layout
 * Classic three-section layout with header, content area, and footer
 */
interface HolyGrailLayoutProps {
  header?: React.ReactNode;
  nav?: React.ReactNode;
  children: React.ReactNode;
  aside?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const HolyGrailLayout: React.FC<HolyGrailLayoutProps> = ({
  header,
  nav,
  children,
  aside,
  footer,
  className
}) => {
  return (
    <div className={cn(
      "min-h-screen grid",
      "grid-rows-[auto_auto_1fr_auto]",
      "lg:grid-rows-[auto_1fr_auto]",
      "lg:grid-cols-[200px_1fr_200px]",
      "gap-4 lg:gap-6",
      className
    )}>
      {header && (
        <header className="lg:col-span-3">
          {header}
        </header>
      )}
      {nav && (
        <nav className="lg:row-span-1">
          {nav}
        </nav>
      )}
      <main className="min-h-0">
        {children}
      </main>
      {aside && (
        <aside className="lg:row-span-1">
          {aside}
        </aside>
      )}
      {footer && (
        <footer className="lg:col-span-3">
          {footer}
        </footer>
      )}
    </div>
  );
};

/**
 * Split Layout
 * Two-panel layout that can be horizontal or vertical
 */
interface SplitLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  direction?: "horizontal" | "vertical";
  split?: number; // Percentage for left/top panel (0-100)
  className?: string;
}

export const SplitLayout: React.FC<SplitLayoutProps> = ({
  left,
  right,
  direction = "horizontal",
  split = 50,
  className
}) => {
  const gridTemplate = direction === "horizontal"
    ? `${split}% ${100 - split}%`
    : `${split}% ${100 - split}%`;

  return (
    <div 
      className={cn(
        "grid gap-4 h-full",
        direction === "horizontal" ? "grid-cols-2" : "grid-rows-2",
        className
      )}
      style={{
        [direction === "horizontal" ? "gridTemplateColumns" : "gridTemplateRows"]: gridTemplate
      }}
    >
      <div className="min-h-0 overflow-auto">
        {left}
      </div>
      <div className="min-h-0 overflow-auto">
        {right}
      </div>
    </div>
  );
};