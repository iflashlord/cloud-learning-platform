import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-solid border-current border-r-transparent",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-6 w-6", 
        lg: "h-8 w-8",
        xl: "h-12 w-12",
      },
      variant: {
        default: "text-[hsl(var(--ds-info-500))] dark:text-[hsl(var(--ds-info-100))]",
        secondary: "text-[hsl(var(--ds-neutral-500))] dark:text-[hsl(var(--ds-neutral-300))]",
        success: "text-[hsl(var(--ds-success-500))] dark:text-[hsl(var(--ds-success-100))]",
        error: "text-[hsl(var(--ds-error-500))] dark:text-[hsl(var(--ds-error-100))]",
        warning: "text-[hsl(var(--ds-warning-600))] dark:text-[hsl(var(--ds-warning-100))]",
        info: "text-[hsl(var(--ds-info-500))] dark:text-[hsl(var(--ds-info-100))]",
        muted: "text-[hsl(var(--ds-neutral-400))] dark:text-[hsl(var(--ds-neutral-500))]",
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
)

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

function Spinner({ className, size, variant, ...props }: SpinnerProps) {
  return (
    <div
      className={cn(spinnerVariants({ size, variant }), className)}
      {...props}
    />
  )
}

export { Spinner, spinnerVariants }
