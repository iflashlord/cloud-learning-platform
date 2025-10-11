"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { statusStyles } from "@/lib/style-utils";

type ActiveFilter = {
  id: string;
  label: string;
  value: string;
  onRemove: () => void;
};

type Props = {
  filters: ActiveFilter[];
  className?: string;
};

export const ActiveFilters = ({ filters, className }: Props) => {
  if (filters.length === 0) return null;

  return (
    <div className={cn("flex items-center gap-2 pt-2 border-t border-border", className)}>
      <span className="text-sm text-muted-foreground font-medium">Active filters:</span>
      <div className="flex flex-wrap gap-1">
        {filters.map((filter) => (
          <span 
            key={filter.id}
            className={cn(
              "inline-flex items-center gap-1 px-2 py-1 text-xs rounded-lg",
              statusStyles.info.bg,
              statusStyles.info.text
            )}
          >
            {filter.label}: {filter.value}
            <button 
              onClick={filter.onRemove}
              className="hover:opacity-80 transition-opacity"
              aria-label={`Remove ${filter.label} filter`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};