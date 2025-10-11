"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { progressVariants } from "@/lib/design-system"

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  indicatorClassName?: string
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, indicatorClassName, value = 0, size, variant, radius, ...props }, ref) => {
  const resolvedRadius = radius ?? "full";
  const indicatorRadius =
    resolvedRadius === "none" ? "" : resolvedRadius === "sm" ? "rounded" : "rounded-full";

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(progressVariants({ size, variant, radius: resolvedRadius }), className)}
      data-variant={variant}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all duration-500 ease-out",
          indicatorRadius,
          indicatorClassName
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
