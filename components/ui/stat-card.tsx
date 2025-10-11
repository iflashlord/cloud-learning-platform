import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Card } from "./card";

const statCardVariants = cva(
  "flex items-center justify-between p-6 transition-all duration-200 hover:shadow-md",
  {
    variants: {
      variant: {
        default: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
        primary: "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700",
        success: "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700",
        warning: "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-700",
        danger: "bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-700",
        info: "bg-gradient-to-r from-sky-50 to-cyan-50 dark:from-sky-900/20 dark:to-cyan-900/20 border border-sky-200 dark:border-sky-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  icon?: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    positive?: boolean;
  };
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, variant, icon, title, value, subtitle, trend, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(statCardVariants({ variant }), className)}
        {...props}
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {icon && (
              <div className={cn(
                "flex items-center justify-center rounded-lg p-2",
                {
                  "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400": variant === "primary",
                  "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400": variant === "success", 
                  "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400": variant === "warning",
                  "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400": variant === "danger",
                  "bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400": variant === "info",
                  "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400": variant === "default",
                }
              )}>
                {icon}
              </div>
            )}
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </h3>
          </div>
          
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {value}
            </span>
            {trend && (
              <span className={cn(
                "text-sm font-medium",
                trend.positive 
                  ? "text-green-600 dark:text-green-400" 
                  : "text-red-600 dark:text-red-400"
              )}>
                {trend.value}
              </span>
            )}
          </div>
          
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      </Card>
    );
  }
);
StatCard.displayName = "StatCard";

export { StatCard, statCardVariants };