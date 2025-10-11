import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    href: string;
    variant?: "primary" | "secondary" | "outline";
  };
  children?: ReactNode;
  className?: string;
}

export const AdminPageHeader = ({
  title,
  description,
  action,
  children,
  className
}: AdminPageHeaderProps) => {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", className)}>
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h1>
        {description && (
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {description}
          </p>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        {children}
        {action && (
          <Button asChild variant={action.variant || "primary"}>
            <a href={action.href}>
              {action.label}
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};