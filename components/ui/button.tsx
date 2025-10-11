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
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading
    
    // Use course theme as variant if provided
    const effectiveVariant = courseTheme || variant

    const getLegacyVariantClasses = () => {
      switch (legacyVariant) {
        case "locked":
          return "bg-neutral-200 text-neutral-400 border-slate-200 border-2 border-b-4 cursor-not-allowed rounded-xl font-bold";
        case "sidebar":
          return "bg-white dark:bg-gray-800 border-slate-300 dark:border-gray-600 border-2 border-b-4 active:border-b-2 active:translate-y-1 hover:bg-slate-50 dark:hover:bg-gray-700 hover:-translate-y-0.5 hover:shadow-[0_6px_0_#cbd5e1] dark:hover:shadow-[0_6px_0_#4b5563] text-slate-500 dark:text-gray-300 rounded-xl font-bold shadow-[0_4px_0_#cbd5e1] dark:shadow-[0_4px_0_#4b5563]";
        case "sidebarOutline":
          return "bg-white dark:bg-gray-800 border-slate-300 dark:border-blue-600 border-2 border-b-4 active:border-b-2 active:translate-y-1 hover:bg-slate-50 dark:hover:bg-gray-700 hover:-translate-y-0.5 hover:shadow-[0_6px_0_#cbd5e1] dark:hover:shadow-[0_6px_0_#2563eb] text-blue-500 dark:text-blue-400 rounded-xl font-bold shadow-[0_4px_0_#cbd5e1] dark:shadow-[0_4px_0_#2563eb]";
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
        {!loading && leftIcon && <span className="mr-2 flex items-center">{leftIcon}</span>}
        <span className={cn("flex items-center", loading ? "opacity-80" : "")}>{children}</span>
        {!loading && rightIcon && <span className="ml-2 flex items-center">{rightIcon}</span>}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
