"use client";

import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FilterOption = {
  id: string;
  name: string;
};

type Props = {
  filters: FilterOption[];
  selectedFilter: string;
  onFilterChange: (filterId: string) => void;
  label?: string;
  className?: string;
};

export const FilterSelector = ({
  filters,
  selectedFilter,
  onFilterChange,
  label = "Level",
  className
}: Props) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="w-4 h-4" />
        <span>{label}:</span>
      </div>
      {filters.map((filter) => {
        const isSelected = selectedFilter === filter.id;
        
        return (
          <Button
            key={filter.id}
            variant={isSelected ? "secondary" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter.id)}
            className={cn(
              "transition-all duration-200",
              isSelected && "shadow-sm"
            )}
          >
            {filter.name}
          </Button>
        );
      })}
    </div>
  );
};