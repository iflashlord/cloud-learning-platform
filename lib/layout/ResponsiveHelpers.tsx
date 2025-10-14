/**
 * Responsive Hooks and Utilities
 * 
 * Provides hooks and components for responsive behavior
 */

"use client";

import * as React from "react";

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