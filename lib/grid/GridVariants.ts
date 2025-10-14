/**
 * Grid Variants and Types
 * 
 * Contains all the CSS Grid variant definitions and types
 */

import { cva, type VariantProps } from "class-variance-authority";

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
        "grid-rows-[auto_auto_1fr_auto]",
        "lg:grid-rows-[auto_1fr_auto]",
        "lg:grid-cols-[200px_1fr_200px]"
      ].join(" "),
    },
    container: {
      none: "",
      sm: "max-w-3xl mx-auto",
      md: "max-w-4xl mx-auto", 
      lg: "max-w-6xl mx-auto",
      xl: "max-w-7xl mx-auto",
      full: "max-w-full",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-6", 
      lg: "p-8",
    }
  },
  defaultVariants: {
    template: "single",
    container: "lg",
    padding: "md"
  }
});

/**
 * Content grid variants for flexible content layouts
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
      auto: "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
      autoSm: "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]",
      autoLg: "grid-cols-[repeat(auto-fit,minmax(350px,1fr))]",
    },
    rows: {
      1: "grid-rows-1",
      2: "grid-rows-2", 
      3: "grid-rows-3",
      4: "grid-rows-4",
      auto: "grid-rows-[repeat(auto-fit,minmax(200px,1fr))]",
    },
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6", 
      xl: "gap-8",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-items-start", 
      center: "justify-items-center",
      end: "justify-items-end",
      stretch: "justify-items-stretch",
    }
  },
  defaultVariants: {
    cols: 1,
    gap: "md",
    align: "stretch",
    justify: "stretch"
  }
});

/**
 * Grid area variants for semantic grid areas
 */
export const gridAreaVariants = cva("", {
  variants: {
    area: {
      header: "[grid-area:header]",
      nav: "[grid-area:nav]", 
      main: "[grid-area:main]",
      aside: "[grid-area:aside]",
      footer: "[grid-area:footer]",
      sidebar: "[grid-area:sidebar]",
      content: "[grid-area:content]",
    }
  }
});

// ============================================================================
// VARIANT TYPES
// ============================================================================

export type AppGridVariantProps = VariantProps<typeof appGridVariants>;
export type PageGridVariantProps = VariantProps<typeof pageGridVariants>;
export type ContentGridVariantProps = VariantProps<typeof contentGridVariants>;
export type GridAreaVariantProps = VariantProps<typeof gridAreaVariants>;