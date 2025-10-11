import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { inputVariants } from "@/lib/design-system"

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, state, type, disabled, ...props }, ref) => {
    const derivedState = disabled ? "disabled" : state;
    return (
      <input
        type={type}
        disabled={disabled}
        data-state={derivedState}
        className={cn(inputVariants({ variant, size, state: derivedState }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
