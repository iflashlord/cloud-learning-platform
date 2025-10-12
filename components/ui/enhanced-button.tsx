/**
 * 🎨 Enhanced Button Component
 * 
 * Fully accessible, theme-aware button with:
 * - Perfect contrast ratios in light/dark modes
 * - Responsive design patterns  
 * - Loading states and animations
 * - Legacy compatibility for gradual migration
 * - Course theme support
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { enhancedButtonVariants, type EnhancedButtonVariantProps } from "@/lib/enhanced-design-system";

export interface EnhancedButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof enhancedButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  // Legacy support for existing app variants
  legacyVariant?: "locked" | "sidebar" | "sidebarOutline";
  // Animation support for Duolingo-style interactions
  animateSuccess?: boolean;
  animateError?: boolean;
  // Course theme support
  courseTheme?: "compute" | "storage" | "security" | "networking" | "management" | "aiml";
  // Override disabled to allow boolean or undefined
  disabled?: boolean;
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ 
    className, 
    variant = "primary",
    size = "md", 
    asChild = false, 
    loading = false,
    leftIcon,
    rightIcon,
    legacyVariant,
    disabled,
    animateSuccess = false,
    animateError = false,
    courseTheme,
    fullWidth = false,
    children,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading;
    
    // Map course theme to valid variant
    const effectiveVariant = React.useMemo(() => {
      if (courseTheme) {
        const themeMap: Record<string, "primary" | "secondary" | "success" | "error" | "warning" | "info"> = {
          compute: "primary",
          storage: "info", 
          security: "error",
          networking: "warning",
          management: "secondary",
          aiml: "success",
        };
        return themeMap[courseTheme] || "primary";
      }
      return variant;
    }, [courseTheme, variant]);

    const getLegacyVariantClasses = () => {
      switch (legacyVariant) {
        case "locked":
          return cn(
            "bg-muted/60 text-muted-foreground/60 border-border/50",
            "border-2 border-b-4 cursor-not-allowed rounded-xl font-bold",
            "dark:bg-muted/40 dark:text-muted-foreground/40 dark:border-border/30"
          );
        case "sidebar":
          return cn(
            "bg-card text-muted-foreground border-border/60",
            "border-2 border-b-4 rounded-xl font-bold",
            "shadow-[0_4px_0_hsl(var(--border))]",
            "hover:bg-muted hover:-translate-y-0.5",
            "hover:shadow-[0_6px_0_hsl(var(--border))]",
            "active:border-b-2 active:translate-y-1",
            "transition-all duration-150",
            "dark:bg-card dark:border-border/40",
            "dark:hover:bg-muted dark:hover:shadow-[0_6px_0_hsl(var(--border))]"
          );
        case "sidebarOutline":
          return cn(
            "bg-card text-primary border-primary/60",
            "border-2 border-b-4 rounded-xl font-bold",
            "shadow-[0_4px_0_hsl(var(--primary)/0.6)]",
            "hover:bg-primary/5 hover:-translate-y-0.5",
            "hover:shadow-[0_6px_0_hsl(var(--primary)/0.6)]",
            "active:border-b-2 active:translate-y-1",
            "transition-all duration-150",
            "dark:bg-card dark:border-primary/50",
            "dark:hover:bg-primary/10 dark:hover:shadow-[0_6px_0_hsl(var(--primary)/0.5)]"
          );
        default:
          return "";
      }
    };

    // Animation classes
    const animationClasses = cn(
      animateSuccess && "animate-pulse bg-green-500 border-green-600",
      animateError && "animate-pulse bg-red-500 border-red-600"
    );

    if (asChild) {
      return (
        <Slot
          className={cn(
            legacyVariant 
              ? cn("inline-flex items-center justify-center text-base transition-all duration-150 ease-out h-11 px-6 py-3", getLegacyVariantClasses())
              : enhancedButtonVariants({ variant: effectiveVariant, size, fullWidth, loading: false }),
            animationClasses,
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <button
        className={cn(
          legacyVariant 
            ? cn("inline-flex items-center justify-center text-base transition-all duration-150 ease-out h-11 px-6 py-3", getLegacyVariantClasses())
            : enhancedButtonVariants({ variant: effectiveVariant, size, fullWidth, loading }),
          animationClasses,
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {!loading && leftIcon && (
          <span className="mr-2 flex items-center">
            {leftIcon}
          </span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="ml-2 flex items-center">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

EnhancedButton.displayName = "EnhancedButton";

export { EnhancedButton, enhancedButtonVariants };
export type { EnhancedButtonVariantProps };