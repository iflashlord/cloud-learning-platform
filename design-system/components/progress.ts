import { cva, type VariantProps } from "class-variance-authority";

export const progressVariants = cva(
  [
    "w-full overflow-hidden rounded-full",
    "bg-[hsl(var(--ds-neutral-200))] dark:bg-[hsl(var(--ds-neutral-700))]",
    "transition-all duration-300 ease-out",
  ],
  {
    variants: {
      size: {
        xs: "h-1.5",
        sm: "h-2",
        md: "h-3",
        lg: "h-4",
      },
      variant: {
        default: "[&>*]:bg-[linear-gradient(135deg,hsl(var(--ds-info-500)),hsl(var(--ds-success-600)))]",
        success: "[&>*]:bg-[linear-gradient(135deg,hsl(var(--ds-success-500)),hsl(var(--ds-success-700)))]",
        error: "[&>*]:bg-[linear-gradient(135deg,hsl(var(--ds-error-500)),hsl(var(--ds-error-700)))]",
        warning: "[&>*]:bg-[linear-gradient(135deg,hsl(var(--ds-warning-500)),hsl(var(--ds-warning-600)))]",
        info: "[&>*]:bg-[linear-gradient(135deg,hsl(var(--ds-info-500)),hsl(var(--ds-info-700)))]",
        neutral: "[&>*]:bg-[linear-gradient(135deg,hsl(var(--ds-neutral-400)),hsl(var(--ds-neutral-600)))]",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      radius: "full",
    },
  }
);

export type ProgressVariantProps = VariantProps<typeof progressVariants>;
