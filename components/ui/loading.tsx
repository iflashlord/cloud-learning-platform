import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

const loadingVariants = cva(
  "flex items-center justify-center",
  {
    variants: {
      variant: {
        page: "min-h-[400px] w-full",
        inline: "h-full w-full",
        overlay: "fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50",
      },
      size: {
        sm: "h-32",
        md: "h-48", 
        lg: "h-64",
        xl: "h-96",
      }
    },
    defaultVariants: {
      variant: "page",
      size: "md",
    },
  }
);

export interface LoadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  text?: string;
  spinnerVariant?: "default" | "secondary" | "success" | "error" | "warning" | "info" | "muted";
  spinnerSize?: "sm" | "md" | "lg" | "xl";
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ 
    className, 
    variant, 
    size, 
    text = "Loading...", 
    spinnerVariant = "default",
    spinnerSize = "md",
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(loadingVariants({ variant, size }), className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-4">
          <Spinner variant={spinnerVariant} size={spinnerSize} />
          {text && (
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {text}
            </p>
          )}
        </div>
      </div>
    );
  }
);
Loading.displayName = "Loading";

// Pre-built loading states
export const PageLoading = ({ text = "Loading page..." }: { text?: string }) => (
  <Loading variant="page" text={text} />
);

export const InlineLoading = ({ text = "Loading..." }: { text?: string }) => (
  <Loading variant="inline" size="sm" spinnerSize="sm" text={text} />
);

export const OverlayLoading = ({ text = "Please wait..." }: { text?: string }) => (
  <Loading variant="overlay" text={text} />
);

export { Loading, loadingVariants };