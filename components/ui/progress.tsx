"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { progressVariants } from "@/lib/design-system"
import { useThemeClasses } from "@/lib/theme-utils"

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  indicatorClassName?: string
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, indicatorClassName, value, size, variant, ...props }, ref) => {
  const themeClasses = useThemeClasses()
  
  const getIndicatorColor = () => {
    switch (variant) {
      case 'success':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'info':
        return 'bg-blue-500'
      default:
        return themeClasses.primaryButton.split(' ').find(c => c.startsWith('bg-')) || 'bg-blue-500'
    }
  }

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(progressVariants({ size, variant }), className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all duration-500 ease-out rounded-full",
          getIndicatorColor(),
          indicatorClassName
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
