import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pageHeaderVariants = cva(
  "flex flex-col gap-2",
  {
    variants: {
      variant: {
        default: "",
        centered: "text-center items-center",
        gradient: "bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 p-6 rounded-lg",
      },
      size: {
        sm: "gap-1",
        md: "gap-2", 
        lg: "gap-4",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface PageHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageHeaderVariants> {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  actions?: React.ReactNode;
}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ 
    className, 
    variant, 
    size, 
    title, 
    description, 
    badge, 
    actions,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(pageHeaderVariants({ variant, size }), className)}
        {...props}
      >
        <div className={cn(
          "flex items-start justify-between gap-4",
          variant === "centered" && "flex-col items-center text-center"
        )}>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h1 className={cn(
                "font-bold text-foreground tracking-tight",
                {
                  "text-xl": size === "sm",
                  "text-2xl md:text-3xl": size === "md",
                  "text-3xl md:text-4xl": size === "lg",
                }
              )}>
                {title}
              </h1>
              {badge}
            </div>
            
            {description && (
              <p className={cn(
                "text-muted-foreground max-w-3xl",
                {
                  "text-sm": size === "sm",
                  "text-base": size === "md",
                  "text-lg": size === "lg",
                },
                variant === "centered" && "mx-auto"
              )}>
                {description}
              </p>
            )}
          </div>
          
          {actions && !variant?.includes("centered") && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
        
        {actions && variant === "centered" && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {actions}
          </div>
        )}
      </div>
    );
  }
);
PageHeader.displayName = "PageHeader";

export { PageHeader, pageHeaderVariants };