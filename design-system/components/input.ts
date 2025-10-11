import { cva, type VariantProps } from "class-variance-authority";

export const inputVariants = cva(
  [
    "w-full rounded-2xl border border-[hsl(var(--ds-neutral-300))]",
    "bg-[hsl(var(--ds-neutral-0))] text-[hsl(var(--ds-neutral-800))]",
    "placeholder:text-[hsl(var(--ds-neutral-500))]",
    "px-[var(--ds-space-md)] py-[calc(var(--ds-space-sm)*1.2)] text-[length:var(--ds-text-sm)]",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ds-info-500))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--ds-neutral-0))]",
    "disabled:bg-[hsl(var(--ds-neutral-100))] disabled:cursor-not-allowed disabled:opacity-70",
    "dark:bg-[hsl(var(--ds-neutral-900))] dark:text-[hsl(var(--ds-neutral-0))]",
    "dark:border-[hsl(var(--ds-neutral-700))] dark:placeholder:text-[hsl(var(--ds-neutral-400))]",
    "dark:focus-visible:ring-offset-[hsl(var(--ds-neutral-900))]",
    "dark:disabled:bg-[hsl(var(--ds-neutral-800))]",
  ],
  {
    variants: {
      variant: {
        default: "",
        error: "border-[hsl(var(--ds-error-500))] focus-visible:ring-[hsl(var(--ds-error-500))]",
        success: "border-[hsl(var(--ds-success-500))] focus-visible:ring-[hsl(var(--ds-success-500))]",
        info: "border-[hsl(var(--ds-info-500))] focus-visible:ring-[hsl(var(--ds-info-500))]",
      },
      size: {
        sm: "h-10 text-[length:var(--ds-text-xs)] px-[var(--ds-space-sm)]",
        md: "h-11 text-[length:var(--ds-text-sm)] px-[var(--ds-space-md)]",
        lg: "h-12 text-[length:var(--ds-text-base)] px-[var(--ds-space-lg)]",
      },
      state: {
        default: "",
        disabled: "opacity-70 cursor-not-allowed bg-[hsl(var(--ds-neutral-100))] dark:bg-[hsl(var(--ds-neutral-800))]",
        readOnly: "bg-transparent border-dashed text-[hsl(var(--ds-neutral-600))] dark:text-[hsl(var(--ds-neutral-300))]",
      },
    },
    compoundVariants: [
      {
        state: "disabled",
        variant: "error",
        className: "border-[hsl(var(--ds-neutral-300))] focus-visible:ring-0",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      state: "default",
    },
  }
);

export type InputVariantProps = VariantProps<typeof inputVariants>;
