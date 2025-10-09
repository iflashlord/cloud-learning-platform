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
    children,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Handle legacy variants for backward compatibility
    const getLegacyVariantClasses = () => {
      switch (legacyVariant) {
        case "locked":
          return "bg-neutral-200 text-neutral-600 border-neutral-300 border-2 border-b-4 hover:bg-neutral-200 cursor-not-allowed"
        case "sidebar":
          return "bg-transparent text-neutral-600 border-2 border-transparent hover:bg-neutral-100 transition-none justify-start"
        case "sidebarOutline":
          return "bg-blue-100 text-blue-600 border-blue-300 border-2 hover:bg-blue-200 transition-none justify-start"
        default:
          return ""
      }
    }
    
    const isDisabled = disabled || loading
    
    // When asChild is true, we can't add extra elements (icons, loading spinner)
    // because Slot expects exactly one child element
    if (asChild) {
      return (
        <Comp
          className={cn(
            legacyVariant 
              ? cn("inline-flex items-center justify-center font-semibold text-sm rounded-lg transition-colors duration-200 h-11 px-4", getLegacyVariantClasses())
              : buttonVariants({ variant, size, fullWidth: false, loading: false }),
            className
          )}
          ref={ref}
          disabled={isDisabled}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
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
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
