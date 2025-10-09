import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/lib/design-system"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  // Legacy support for existing app variants
  legacyVariant?: "locked" | "sidebar" | "sidebarOutline"
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
    children,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading

    const getLegacyVariantClasses = () => {
      switch (legacyVariant) {
        case "locked":
          return "bg-neutral-200 text-neutral-400 border-slate-200 border-2 border-b-4 cursor-not-allowed";
        case "sidebar":
          return "bg-white border-slate-300 border-2 border-b-4 active:border-b-2 hover:bg-slate-50 text-slate-500";
        case "sidebarOutline":
          return "bg-white border-slate-300 border-2 border-b-4 active:border-b-2 hover:bg-slate-50 text-blue-500";
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
              ? cn("inline-flex items-center justify-center font-semibold text-sm rounded-lg transition-colors duration-200 h-11 px-4", getLegacyVariantClasses())
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
            ? cn("inline-flex items-center justify-center font-semibold text-sm rounded-lg transition-colors duration-200 h-11 px-4", getLegacyVariantClasses())
            : buttonVariants({ variant, size, fullWidth: false, loading }),
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
