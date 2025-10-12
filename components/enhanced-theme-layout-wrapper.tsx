/**
 * 🎨 Enhanced Theme Layout Wrapper
 * 
 * Main layout wrapper with unified background system and proper responsive behavior
 */

"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { BackgroundProvider } from "@/lib/enhanced-layout-system";

interface EnhancedThemeLayoutWrapperProps {
  children: React.ReactNode;
}

export const EnhancedThemeLayoutWrapper: React.FC<EnhancedThemeLayoutWrapperProps> = ({ 
  children 
}) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Ensure hydration safety
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {children}
      </div>
    );
  }

  return (
    <BackgroundProvider variant="learning">
      <div className={cn(
        "min-h-screen transition-colors duration-300",
        "text-foreground antialiased",
        "selection:bg-primary/20 selection:text-primary-foreground"
      )}>
        {children}
      </div>
    </BackgroundProvider>
  );
};