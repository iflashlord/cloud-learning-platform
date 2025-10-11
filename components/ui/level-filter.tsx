"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Filter = {
  id: string;
  name: string;
};

type Props = {
  filters: Filter[];
  selectedFilter: string;
  onFilterChange: (filterId: string) => void;
  label?: string;
  className?: string;
};

export const LevelFilter = ({
  filters,
  selectedFilter,
  onFilterChange,
  label = "Difficulty Level",
  className
}: Props) => {
  return (
    <div className={className}>
      <label htmlFor="level-filter" className="block text-sm font-medium text-foreground mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          id="level-filter"
          value={selectedFilter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="appearance-none bg-background border-2 border-border rounded-xl px-4 py-3 pr-10 focus:ring-2 focus:ring-primary focus:border-primary font-medium min-w-[160px] text-foreground"
          aria-label="Filter by difficulty level"
        >
          {filters.map((filter) => (
            <option key={filter.id} value={filter.id}>
              {filter.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
};