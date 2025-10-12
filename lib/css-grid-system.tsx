/**
 * 🏗️ CSS Grid Layout System
 * 
 * Comprehensive grid-based layout system providing:
 * - Modern CSS Grid architecture
 * - Responsive breakpoint management
 * - Semantic layout patterns
 * - Performance-optimized layouts
 * - Accessibility-first design
 */

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ============================================================================
// GRID LAYOUT VARIANTS
// ============================================================================

/**
 * Main application grid container
 * Uses CSS Grid for modern, flexible layouts
 */
export const appGridVariants = cva("min-h-screen grid transition-all duration-300", {
  variants: {
    layout: {
      // Mobile-first: header + main
      mobile: [
        "grid-rows-[auto_1fr]",
        "grid-cols-1"
      ].join(" "),
      
      // Desktop: sidebar + header + main
      desktop: [
        "lg:grid-rows-[auto_1fr]", 
        "lg:grid-cols-[var(--sidebar-width,280px)_1fr]"
      ].join(" "),
      
      // Full desktop: sidebar + main (no separate header)
      desktopFull: [
        "lg:grid-rows-[1fr]",
        "lg:grid-cols-[var(--sidebar-width,280px)_1fr]"
      ].join(" "),
    },
    spacing: {
      none: "gap-0",
      sm: "gap-2 lg:gap-4",
      md: "gap-4 lg:gap-6", 
      lg: "gap-6 lg:gap-8",
    }
  },
  defaultVariants: {
    layout: "mobile",
    spacing: "none"
  }
});

/**
 * Page content grid layouts
 * Semantic layouts for different page types
 */
export const pageGridVariants = cva("grid w-full h-full", {
  variants: {
    template: {
      // Single column layout
      single: "grid-cols-1",
      
      // Two column: main content + sidebar
      twoColumn: [
        "grid-cols-1 lg:grid-cols-[1fr_320px]",
        "gap-6 lg:gap-8"
      ].join(" "),
      
      // Two column reverse: sidebar + main content  
      twoColumnReverse: [
        "grid-cols-1 lg:grid-cols-[320px_1fr]",
        "gap-6 lg:gap-8"
      ].join(" "),
      
      // Three column: sidebar + main + aside
      threeColumn: [
        "grid-cols-1 lg:grid-cols-[280px_1fr_280px]",
        "gap-4 lg:gap-6"
      ].join(" "),
      
      // Dashboard style: header + content grid
      dashboard: [
        "grid-rows-[auto_1fr]",
        "gap-4 lg:gap-6"
      ].join(" "),
      
      // Full width content
      fullWidth: "grid-cols-1",
      
      // Auto-fit grid for cards/items
      autoFit: "grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 lg:gap-6",
      
      // Holy grail layout: header + nav/main/aside + footer
      holyGrail: [
        "grid-rows-[auto_1fr_auto]",
        "lg:grid-template-areas-[header_header_header][nav_main_aside][footer_footer_footer]",
        "lg:grid-cols-[200px_1fr_200px]"
      ].join(" ")
    },
    container: {
      none: "",
      sm: "max-w-3xl mx-auto",
      md: "max-w-5xl mx-auto", 
      lg: "max-w-7xl mx-auto",
      xl: "max-w-[1400px] mx-auto",
      "2xl": "max-w-[1600px] mx-auto",
      full: "w-full"
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-4 lg:p-6",
      lg: "p-4 lg:p-8",
      xl: "p-6 lg:p-12"
    }
  },
  defaultVariants: {
    template: "single",
    container: "lg", 
    padding: "md"
  }
});

/**
 * Content area grid layouts  
 * For organizing content within pages
 */
export const contentGridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2", 
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5",
      6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6",
      auto: "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
    },
    rows: {
      auto: "grid-rows-[repeat(auto,1fr)]",
      1: "grid-rows-1",
      2: "grid-rows-2", 
      3: "grid-rows-3",
      4: "grid-rows-4"
    },
    gap: {
      none: "gap-0",
      xs: "gap-1 sm:gap-2",
      sm: "gap-2 sm:gap-3",
      md: "gap-3 sm:gap-4 lg:gap-6",
      lg: "gap-4 sm:gap-6 lg:gap-8", 
      xl: "gap-6 sm:gap-8 lg:gap-12"
    },
    align: {
      start: "items-start",
      center: "items-center", 
      end: "items-end",
      stretch: "items-stretch"
    },
    justify: {
      start: "justify-items-start",
      center: "justify-items-center",
      end: "justify-items-end", 
      stretch: "justify-items-stretch"
    }
  },
  defaultVariants: {
    cols: 1,
    gap: "md",
    align: "stretch"
  }
});

/**
 * Component area variants for semantic grid areas
 */
export const gridAreaVariants = cva("", {
  variants: {
    area: {
      header: "grid-area-[header]",
      nav: "grid-area-[nav]", 
      main: "grid-area-[main]",
      aside: "grid-area-[aside]",
      sidebar: "grid-area-[sidebar]",
      footer: "grid-area-[footer]",
      content: "grid-area-[content]"
    }
  }
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type AppGridVariantProps = VariantProps<typeof appGridVariants>;
export type PageGridVariantProps = VariantProps<typeof pageGridVariants>; 
export type ContentGridVariantProps = VariantProps<typeof contentGridVariants>;
export type GridAreaVariantProps = VariantProps<typeof gridAreaVariants>;

// ============================================================================
// GRID COMPONENTS
// ============================================================================

/**
 * Main Application Grid Container
 * Root grid container for the entire application
 */
interface AppGridProps extends AppGridVariantProps {
  children: React.ReactNode;
  className?: string;
  sidebarWidth?: number;
}

export const AppGrid: React.FC<AppGridProps> = ({ 
  children, 
  layout, 
  spacing, 
  className,
  sidebarWidth = 280
}) => {
  return (
    <div 
      className={cn(appGridVariants({ layout, spacing }), className)}
      style={{
        '--sidebar-width': `${sidebarWidth}px`
      } as React.CSSProperties & { '--sidebar-width': string }}
    >
      {children}
    </div>
  );
};

/**
 * Page Grid Container  
 * Grid container for page-level layouts
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
 * Content Grid Container
 * Grid for organizing content items
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
    ? `[${sidebarWidths[sidebarWidth]}_1fr]`
    : `[1fr_${sidebarWidths[sidebarWidth]}]`;

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
  gap?: ContentGridVariantProps["gap"];
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
      className={cn(contentGridVariants({ gap }), className)}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}px, 1fr))`
      }}
    >
      {children}
    </div>
  );
};