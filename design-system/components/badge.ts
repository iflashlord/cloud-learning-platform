import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-full border font-semibold tracking-wide capitalize",
    "transition-colors duration-200",
    "px-3 py-1.5 text-xs min-w-[60px] whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-900 border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-500",
        neutral: "bg-[hsl(var(--ds-neutral-100))] text-[hsl(var(--ds-neutral-800))] border-[hsl(var(--ds-neutral-200))] dark:bg-[hsl(var(--ds-neutral-800))] dark:text-[hsl(var(--ds-neutral-0))] dark:border-[hsl(var(--ds-neutral-700))]",
        success: "bg-green-50 text-green-800 border-green-200 dark:bg-green-600 dark:text-white dark:border-green-500",
        error: "bg-red-50 text-red-800 border-red-200 dark:bg-red-600 dark:text-white dark:border-red-500",
        warning: "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-600 dark:text-white dark:border-amber-500",
        info: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-600 dark:text-white dark:border-blue-500",
        primary: "bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-600 dark:text-white dark:border-indigo-500",
        compute: "bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-600 dark:text-white dark:border-orange-500",
        storage: "bg-sky-50 text-sky-800 border-sky-200 dark:bg-sky-600 dark:text-white dark:border-sky-500",
        security: "bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-600 dark:text-white dark:border-purple-500",
        networking: "bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-600 dark:text-white dark:border-teal-500",
        management: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-600 dark:text-white dark:border-emerald-500",
        aiml: "bg-violet-50 text-violet-800 border-violet-200 dark:bg-violet-600 dark:text-white dark:border-violet-500",
      },
      size: {
        xs: "px-2 py-1 text-[length:var(--ds-text-xs)] min-w-[48px]",
        sm: "px-2.5 py-1 text-xs min-w-[56px]",
        md: "px-3 py-1.5 text-xs min-w-[60px]",
        lg: "px-4 py-2 text-sm min-w-[80px]",
      },
      emphasis: {
        solid: "",
        soft: "bg-transparent border-transparent",
        outline: "bg-transparent",
      },
    },
    compoundVariants: [
      {
        emphasis: "soft",
        variant: "success",
        className: "bg-[hsl(var(--ds-success-50))] text-[hsl(var(--ds-success-700))] border-[hsl(var(--ds-success-100))] dark:bg-[hsl(var(--ds-success-600))] dark:border-[hsl(var(--ds-success-500))] dark:text-white",
      },
      {
        emphasis: "soft",
        variant: "error",
        className: "bg-[hsl(var(--ds-error-50))] text-[hsl(var(--ds-error-700))] border-[hsl(var(--ds-error-100))] dark:bg-[hsl(var(--ds-error-600))] dark:border-[hsl(var(--ds-error-500))] dark:text-white",
      },
      {
        emphasis: "soft",
        variant: "warning",
        className: "bg-[hsl(var(--ds-warning-50))] text-[hsl(var(--ds-warning-700))] border-[hsl(var(--ds-warning-100))] dark:bg-[hsl(var(--ds-warning-600))] dark:border-[hsl(var(--ds-warning-500))] dark:text-white",
      },
      {
        emphasis: "soft",
        variant: "info",
        className: "bg-[hsl(var(--ds-info-50))] text-[hsl(var(--ds-info-700))] border-[hsl(var(--ds-info-100))] dark:bg-[hsl(var(--ds-info-600))] dark:border-[hsl(var(--ds-info-500))] dark:text-white",
      },
      {
        emphasis: "outline",
        className: "bg-transparent border-current text-current",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      emphasis: "solid",
    },
  }
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
