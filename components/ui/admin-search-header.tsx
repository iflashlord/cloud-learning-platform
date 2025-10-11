import { ReactNode } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AdminSearchHeaderProps {
  title: string;
  description?: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  action?: {
    label: string;
    href: string;
    variant?: "primary" | "secondary" | "outline";
  };
  children?: ReactNode;
  className?: string;
}

export const AdminSearchHeader = ({
  title,
  description,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  action,
  children,
  className
}: AdminSearchHeaderProps) => {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-foreground">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground mt-1">
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
      
      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground/60 w-4 h-4" />
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  );
};