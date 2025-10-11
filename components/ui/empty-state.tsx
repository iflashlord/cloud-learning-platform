import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center",
  {
    variants: {
      variant: {
        default: "py-12 px-4",
        minimal: "py-8 px-4",
        full: "min-h-[400px] px-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface EmptyStateProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "outline";
  };
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ 
    className, 
    variant, 
    icon, 
    title, 
    description, 
    action,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(emptyStateVariants({ variant }), className)}
        {...props}
      >
        {icon && (
          <div className="mb-4 p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600">
            {icon}
          </div>
        )}
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h3>
        
        {description && (
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6 leading-relaxed">
            {description}
          </p>
        )}
        
        {action && (
          <Button
            variant={action.variant || "primary"}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
      </div>
    );
  }
);
EmptyState.displayName = "EmptyState";

export { EmptyState, emptyStateVariants };