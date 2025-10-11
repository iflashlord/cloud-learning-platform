import { cva, type VariantProps } from "class-variance-authority";

export const cardVariants = cva(
  [
    "rounded-2xl border border-[hsl(var(--ds-neutral-200))] bg-[hsl(var(--ds-neutral-0))]",
    "dark:border-[hsl(var(--ds-neutral-700))] dark:bg-[hsl(var(--ds-neutral-800))]",
    "transition-all duration-200 ease-out shadow-[0_16px_32px_rgba(15,23,42,0.05)] dark:shadow-[0_12px_24px_rgba(15,23,42,0.45)]",
  ],
  {
    variants: {
      variant: {
        default: "hover:-translate-y-0.5 hover:shadow-[0_22px_40px_rgba(15,23,42,0.10)] dark:hover:shadow-[0_18px_36px_rgba(15,23,42,0.55)]",
        elevated: "shadow-[0_22px_45px_rgba(15,23,42,0.18)] dark:shadow-[0_26px_56px_rgba(15,23,42,0.65)] hover:-translate-y-1",
        outline: "shadow-none border-2 border-[hsl(var(--ds-neutral-300))] dark:border-[hsl(var(--ds-neutral-600))]",
        ghost: "bg-transparent border-transparent shadow-none dark:bg-transparent",
        tinted: "bg-[hsl(var(--ds-neutral-50))] dark:bg-[hsl(var(--ds-neutral-900))]",
      },
      padding: {
        none: "p-0",
        xs: "p-[var(--ds-space-xs)]",
        sm: "p-[var(--ds-space-sm)]",
        md: "p-[var(--ds-space-md)]",
        lg: "p-[var(--ds-space-lg)]",
        xl: "p-[var(--ds-space-xl)]",
      },
      interactive: {
        true: "cursor-pointer hover:-translate-y-1 hover:shadow-[0_26px_48px_rgba(15,23,42,0.2)] active:translate-y-0",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      interactive: false,
    },
  }
);

export type CardVariantProps = VariantProps<typeof cardVariants>;
