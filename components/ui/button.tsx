import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/lib/design-system"

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  // Legacy support for existing app variants
  legacyVariant?: "locked" | "sidebar" | "sidebarOutline"
  // Animation support for Duolingo-style interactions
  animateSuccess?: boolean
  animateError?: boolean
  // Course theme support
  courseTheme?: "compute" | "storage" | "security" | "networking" | "management" | "aiml"
  // Override disabled to allow boolean or undefined
  disabled?: boolean
  // Allow overriding the default min-width constraints
  noMinWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    loading = false,
    leftIcon,
    rightIcon,
    legacyVariant,
    disabled,
    animateSuccess = false,
    animateError = false,
    courseTheme,
    children,
    noMinWidth = false,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading
    
    // Use course theme as variant if provided
    const effectiveVariant = courseTheme || variant

    const getLegacyVariantClasses = () => {
      switch (legacyVariant) {
        case "locked":
          return "bg-muted text-muted-foreground/60 border-border border-2 border-b-4 cursor-not-allowed rounded-xl font-bold";
        case "sidebar":
          return "bg-card border-border border-2 border-b-4 active:border-b-2 active:translate-y-1 hover:bg-muted hover:-translate-y-0.5 hover:shadow-[0_6px_0_hsl(var(--border))] text-muted-foreground rounded-xl font-bold shadow-[0_4px_0_hsl(var(--border))]";
        case "sidebarOutline":
          return "bg-card border-border border-2 border-b-4 active:border-b-2 active:translate-y-1 hover:bg-muted hover:-translate-y-0.5 hover:shadow-[0_6px_0_hsl(var(--primary))] text-primary rounded-xl font-bold shadow-[0_4px_0_hsl(var(--primary))]";
        default:
          return "";
      }
    };

    if (asChild) {
      const Comp = Slot;
      return (
        <Comp
          className={cn(
            legacyVariant 
              ? cn("inline-flex items-center justify-center text-base transition-all duration-150 ease-out h-11 px-6 py-3", getLegacyVariantClasses())
              : buttonVariants({ variant, size, fullWidth: false, loading: false }),
            noMinWidth && "min-w-0",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <button
        className={cn(
          legacyVariant 
            ? cn("inline-flex items-center justify-center text-base transition-all duration-150 ease-out h-11 px-6 py-3", getLegacyVariantClasses())
            : buttonVariants({ variant: effectiveVariant, size, fullWidth: false, loading, disabled: isDisabled }),
          "button-duolingo", // Add Duolingo-style base class
          {
            "button-success-animate": animateSuccess && !loading && !disabled,
            "button-error-animate": animateError && !loading && !disabled,
            "button-loading": loading,
          },
          noMinWidth && "min-w-0",
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <div className="loading-spinner mr-2 flex items-center">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
        )}
        {!loading && leftIcon && <span className="mr-2 flex items-center relative z-10">{leftIcon}</span>}
        <span className={cn("relative z-10 flex items-center", loading ? "opacity-80" : "")}>{children}</span>
        {!loading && rightIcon && <span className="ml-2 flex items-center relative z-10">{rightIcon}</span>}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
