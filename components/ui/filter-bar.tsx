"use client";

import { Button } from "@/components/ui/button";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterBarProps {
  options: FilterOption[];
  activeFilter: string;
  onFilterChange: (value: string) => void;
  className?: string;
}

export function FilterBar({ 
  options, 
  activeFilter, 
  onFilterChange,
  className = ""
}: FilterBarProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((option) => (
        <Button
          key={option.value}
          variant={activeFilter === option.value ? "primary" : "ghost"}
          size="sm"
          onClick={() => onFilterChange(option.value)}
          className={`${
            activeFilter === option.value 
              ? "bg-sky-500 text-white hover:bg-sky-600" 
              : "border border-gray-200 hover:bg-gray-50"
          }`}
        >
          {option.label}
          {option.count !== undefined && (
            <span className={`ml-2 px-1.5 py-0.5 text-xs rounded-full ${
              activeFilter === option.value 
                ? "bg-sky-600 text-white" 
                : "bg-gray-200 text-gray-600"
            }`}>
              {option.count}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
}