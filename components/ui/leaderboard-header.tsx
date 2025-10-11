import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const leaderboardHeaderVariants = cva(
  "text-center mb-8",
  {
    variants: {
      variant: {
        default: "",
        featured: "relative",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface LeaderboardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof leaderboardHeaderVariants> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  stats?: Array<{
    label: string;
    color: "green" | "blue" | "purple" | "orange";
    animated?: boolean;
  }>;
}

const LeaderboardHeader = React.forwardRef<HTMLDivElement, LeaderboardHeaderProps>(
  ({ 
    className, 
    variant, 
    title, 
    description, 
    icon,
    stats,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(leaderboardHeaderVariants({ variant }), className)}
        {...props}
      >
        {/* Icon Section */}
        {icon && (
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 dark:from-yellow-500 dark:via-orange-600 dark:to-red-600 rounded-full flex items-center justify-center shadow-xl">
              {icon}
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 dark:bg-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-sm">🏆</span>
            </div>
          </div>
        )}
        
        {/* Title */}
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent mb-4">
          {title}
        </h1>
        
        {/* Description */}
        {description && (
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
        
        {/* Stats */}
        {stats && (
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-600 dark:text-gray-400">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  {
                    "bg-green-500 dark:bg-green-400": stat.color === "green",
                    "bg-blue-500 dark:bg-blue-400": stat.color === "blue", 
                    "bg-purple-500 dark:bg-purple-400": stat.color === "purple",
                    "bg-orange-500 dark:bg-orange-400": stat.color === "orange",
                  },
                  stat.animated && "animate-pulse"
                )} />
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);
LeaderboardHeader.displayName = "LeaderboardHeader";

export { LeaderboardHeader, leaderboardHeaderVariants };