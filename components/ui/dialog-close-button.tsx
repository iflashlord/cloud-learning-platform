/**
 * Enhanced Dialog Close Button Component
 *
 * A reusable, accessible, and visually appealing close button for dialogs
 * with improved hover states, animations, and keyboard navigation.
 */

"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DialogCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Size variant for the close button
   */
  size?: "sm" | "md" | "lg"

  /**
   * Visual variant for different contexts
   */
  variant?: "default" | "subtle" | "ghost" | "destructive"

  /**
   * Position variant for absolute positioning
   */
  position?: "top-right" | "top-left" | "custom"

  /**
   * Whether to show a tooltip on hover
   */
  showTooltip?: boolean

  /**
   * Custom tooltip text
   */
  tooltipText?: string

  /**
   * Whether to animate on hover/focus
   */
  animated?: boolean

  /**
   * Custom aria-label for accessibility
   */
  ariaLabel?: string
}

const DialogCloseButton = React.forwardRef<HTMLButtonElement, DialogCloseButtonProps>(
  (
    {
      className,
      size = "md",
      variant = "default",
      position = "top-right",
      showTooltip = true,
      tooltipText = "Close dialog",
      animated = true,
      ariaLabel = "Close",
      onClick,
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = React.useState(false)
    const [isPressed, setIsPressed] = React.useState(false)

    // Size variants
    const sizeClasses = {
      sm: "h-6 w-6 p-1",
      md: "h-8 w-8 p-1.5",
      lg: "h-10 w-10 p-2",
    }

    const iconSizes = {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    }

    // Variant styles
    const variantClasses = {
      default: cn(
        "bg-white/10 hover:bg-white/20 focus:bg-white/20",
        "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
        "border border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500",
        "shadow-sm hover:shadow-md",
      ),
      subtle: cn(
        "bg-transparent hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800",
        "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
      ),
      ghost: cn(
        "bg-transparent hover:bg-gray-50 focus:bg-gray-50 dark:hover:bg-gray-900/50 dark:focus:bg-gray-900/50",
        "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300",
        "opacity-70 hover:opacity-100",
      ),
      destructive: cn(
        "bg-red-50 hover:bg-red-100 focus:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30",
        "text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300",
        "border border-red-200 hover:border-red-300 dark:border-red-800 dark:hover:border-red-700",
      ),
    }

    // Position classes - positioned safely within dialog bounds
    const positionClasses = {
      "top-right": "absolute top-4 right-4 z-50",
      "top-left": "absolute top-4 left-4 z-50",
      custom: "",
    }

    const buttonClasses = cn(
      // Base styles
      "inline-flex items-center justify-center",
      "rounded-full transition-all duration-200 ease-out",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",

      // Animation classes
      animated && [
        "transform-gpu",
        isPressed && "scale-95",
        !isPressed && isHovered && "scale-105",
      ],

      // Size classes
      sizeClasses[size],

      // Variant classes
      variantClasses[variant],

      // Position classes
      positionClasses[position],

      className,
    )

    const handleMouseDown = () => setIsPressed(true)
    const handleMouseUp = () => setIsPressed(false)
    const handleMouseLeave = () => {
      setIsHovered(false)
      setIsPressed(false)
    }

    return (
      <div className='relative inline-block w-full'>
        <button
          ref={ref}
          className={buttonClasses}
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          aria-label={ariaLabel}
          title={showTooltip ? tooltipText : undefined}
          {...props}
        >
          <X
            className={cn(
              iconSizes[size],
              "transition-transform duration-200",
              animated && isHovered && "rotate-90",
            )}
          />
          <span className='sr-only'>{ariaLabel} (Press Escape)</span>

          {/* Enhanced tooltip */}
          {showTooltip && isHovered && (
            <div
              className={cn(
                "absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded",
                "shadow-lg pointer-events-none whitespace-nowrap",
                "animate-in fade-in-0 zoom-in-95 duration-200",
                // Position tooltip based on button position
                position === "top-right" && "-bottom-12 right-1",
                position === "top-left" && "-bottom-12 left-1",
                position === "custom" && "-top-12 left-1/2 -translate-x-1/2",
              )}
            >
              <div>{tooltipText}</div>
              <div className='text-xs opacity-75 mt-1'>Press Esc</div>
              <div
                className={cn(
                  "absolute w-2 h-2 bg-gray-900 rotate-45",
                  position === "top-right" && "-top-1 right-2",
                  position === "top-left" && "-top-1 left-2",
                  position === "custom" && "-bottom-1 left-1/2 -translate-x-1/2",
                )}
              />
            </div>
          )}
        </button>
      </div>
    )
  },
)

DialogCloseButton.displayName = "DialogCloseButton"

export { DialogCloseButton }
export type { DialogCloseButtonProps }
