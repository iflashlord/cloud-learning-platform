'use client';

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const tooltipVariants = cva(
  "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-green-600 text-white dark:bg-green-700",
        error: "bg-red-600 text-white dark:bg-red-700",
        warning: "bg-yellow-600 text-white dark:bg-yellow-700",
        info: "bg-blue-600 text-white dark:bg-blue-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TooltipContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltipVariants> {
  asChild?: boolean
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        ref={ref}
        className={cn(tooltipVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
TooltipContent.displayName = "TooltipContent"

// Simple tooltip implementation without Radix UI
interface SimpleTooltipProps {
  children: React.ReactNode
  content: string | React.ReactNode
  variant?: VariantProps<typeof tooltipVariants>['variant']
  side?: 'top' | 'right' | 'bottom' | 'left'
  className?: string
}

export function SimpleTooltip({ 
  children, 
  content, 
  variant = 'default', 
  side = 'top',
  className 
}: SimpleTooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div
          className={cn(
            tooltipVariants({ variant }),
            "absolute z-50 whitespace-nowrap",
            {
              'bottom-full left-1/2 transform -translate-x-1/2 mb-2': side === 'top',
              'top-full left-1/2 transform -translate-x-1/2 mt-2': side === 'bottom',
              'right-full top-1/2 transform -translate-y-1/2 mr-2': side === 'left',
              'left-full top-1/2 transform -translate-y-1/2 ml-2': side === 'right',
            },
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}

export { TooltipContent, tooltipVariants }