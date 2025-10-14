/**
 * 🎯 Enhanced Layout System
 * 
 * Provides unified layout components with:
 * - Single background system across the app
 * - Responsive design patterns
 * - Proper dark mode support
 * - Consistent spacing and structure
 * - Mobile-first approach
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { containerVariants, type ContainerVariantProps } from "@/lib/enhanced-design-system";

// ============================================================================
// MAIN BACKGROUND PROVIDER
// ============================================================================

interface BackgroundProviderProps {
  children: React.ReactNode;
  variant?: "default" | "learning" | "gradient" | "solid";
  className?: string;
}

/**
 * Single source of truth for app backgrounds
 * Handles both light and dark modes with proper contrast
 */
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

// ============================================================================
// RESPONSIVE CONTAINER
// ============================================================================

interface ResponsiveContainerProps extends ContainerVariantProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Responsive container with consistent padding and max-widths
 */
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

// ============================================================================
// PAGE LAYOUT WRAPPER
// ============================================================================

interface PageLayoutProps {
  children: React.ReactNode;
  background?: "default" | "learning" | "gradient" | "solid";
  containerSize?: ContainerVariantProps["size"];
  className?: string;
  showBackground?: boolean;
}

/**
 * Main page layout wrapper - combines background and container
 */
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

// ============================================================================
// ENHANCED STICKY WRAPPER
// ============================================================================

interface EnhancedStickyWrapperProps {
  children: React.ReactNode;
  className?: string;
  offset?: "none" | "header" | "custom";
  customOffset?: string;
  zIndex?: number;
}

/**
 * Enhanced sticky wrapper with proper positioning and backdrop
 */
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
        return "top-[50px] lg:top-0"; // Account for mobile header
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

// ============================================================================
// ENHANCED FEED WRAPPER
// ============================================================================

interface EnhancedFeedWrapperProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

/**
 * Enhanced feed wrapper with proper responsive behavior
 */
export const EnhancedFeedWrapper: React.FC<EnhancedFeedWrapperProps> = ({
  children,
  className,
  padding = true,
}) => {
  return (
    <div className={cn(
      "flex-1 relative",
      padding && "pb-10",
      className
    )}>
      {children}
    </div>
  );
};

// ============================================================================
// RESPONSIVE GRID SYSTEM
// ============================================================================

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

/**
 * Responsive grid with configurable breakpoints
 */
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

// ============================================================================
// ENHANCED APP LAYOUT
// ============================================================================

interface EnhancedAppLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  background?: "default" | "learning" | "gradient" | "solid";
  className?: string;
  stickyOffset?: "none" | "header" | "custom";
  customStickyOffset?: string;
}

/**
 * Enhanced main app layout with proper responsive behavior
 */
export const EnhancedAppLayout: React.FC<EnhancedAppLayoutProps> = ({
  children,
  sidebar,
  background = "learning",
  className,
  stickyOffset = "header",
  customStickyOffset,
}) => {
  return (
    <BackgroundProvider variant={background}>
      <div className={cn(
        "flex flex-row-reverse gap-[48px] px-4 sm:px-6",
        "max-w-[1920px] mx-auto", // Prevent ultra-wide layouts
        className
      )}>
        {sidebar && (
          <EnhancedStickyWrapper 
            offset={stickyOffset}
            customOffset={customStickyOffset}
            className="hidden lg:block"
          >
            {sidebar}
          </EnhancedStickyWrapper>
        )}
        
        <EnhancedFeedWrapper>
          {children}
        </EnhancedFeedWrapper>
      </div>
    </BackgroundProvider>
  );
};

// ============================================================================
// ENHANCED STICKY HEADER
// ============================================================================

interface EnhancedStickyHeaderProps {
  children: React.ReactNode;
  className?: string;
  blur?: boolean;
  border?: boolean;
  zIndex?: number;
}

/**
 * Enhanced sticky header with proper background and blur
 */
export const EnhancedStickyHeader: React.FC<EnhancedStickyHeaderProps> = ({
  children,
  className,
  blur = true,
  border = true,
  zIndex = 50,
}) => {
  return (
    <div 
      className={cn(
        "sticky top-0 w-full",
        // Proper background with theme support
        "bg-background/80 dark:bg-background/80",
        // Backdrop blur for modern feel
        blur && "backdrop-blur-md supports-[backdrop-filter]:bg-background/60",
        // Border for definition
        border && "border-b border-border/40",
        // Spacing
        "pb-4 lg:pt-[28px] lg:mt-[-28px] mb-6",
        className
      )}
      style={{ zIndex }}
    >
      {children}
    </div>
  );
};

// ============================================================================
// MOBILE RESPONSIVE HELPERS
// ============================================================================

/**
 * Hook to detect screen size for responsive behavior
 */
export const useResponsive = () => {
  const [screenSize, setScreenSize] = React.useState<"sm" | "md" | "lg" | "xl">("lg");
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    const checkScreenSize = () => {
      if (window.innerWidth < 640) setScreenSize("sm");
      else if (window.innerWidth < 768) setScreenSize("md"); 
      else if (window.innerWidth < 1024) setScreenSize("lg");
      else setScreenSize("xl");
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const width = isClient && typeof window !== 'undefined' ? window.innerWidth : 1024;
  const shouldShowSidebar = width >= 1024;

  return {
    screenSize,
    isMobile: screenSize === "sm",
    isTablet: screenSize === "md", 
    isDesktop: screenSize === "lg" || screenSize === "xl",
    isLarge: screenSize === "xl",
    width,
    shouldShowSidebar,
    isClient,
  };
};

/**
 * Component that only renders on specified screen sizes
 */
interface ShowOnProps {
  children: React.ReactNode;
  breakpoint: "sm" | "md" | "lg" | "xl";
  direction?: "up" | "down" | "only";
}

export const ShowOn: React.FC<ShowOnProps> = ({
  children,
  breakpoint,
  direction = "up",
}) => {
  const { screenSize } = useResponsive();
  const breakpoints = ["sm", "md", "lg", "xl"];
  const currentIndex = breakpoints.indexOf(screenSize);
  const targetIndex = breakpoints.indexOf(breakpoint);

  const shouldShow = React.useMemo(() => {
    switch (direction) {
      case "up":
        return currentIndex >= targetIndex;
      case "down":
        return currentIndex <= targetIndex;
      case "only":
        return currentIndex === targetIndex;
      default:
        return false;
    }
  }, [currentIndex, targetIndex, direction]);

  return shouldShow ? <>{children}</> : null;
};

// ============================================================================
// ACCESSIBILITY HELPERS
// ============================================================================

/**
 * Skip to main content link
 */
export const SkipToContent: React.FC<{ href?: string }> = ({ href = "#main-content" }) => {
  return (
    <a
      href={href}
      className="absolute left-0 top-0 z-[100] -translate-y-full px-4 py-2 bg-primary text-primary-foreground rounded-br-lg focus:translate-y-0 transition-transform"
    >
      Skip to main content
    </a>
  );
};

/**
 * Main content wrapper with proper landmarks
 */
interface MainContentProps {
  children: React.ReactNode;
  className?: string;
}

export const MainContent: React.FC<MainContentProps> = ({ children, className }) => {
  return (
    <main id="main-content" className={cn("focus:outline-none", className)} tabIndex={-1}>
      {children}
    </main>
  );
};