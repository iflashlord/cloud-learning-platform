"use client";

import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchInput } from "@/components/ui/search-input";
import { CategorySelector } from "@/components/ui/category-selector";
import { FilterSelector } from "@/components/ui/filter-selector";
import { ViewModeToggle } from "@/components/ui/view-mode-toggle";
import { ActiveFilters } from "@/components/ui/active-filters";
import { LucideIcon } from "lucide-react";

type Category = {
  id: string;
  name: string;
  icon: LucideIcon;
};

type FilterOption = {
  id: string;
  name: string;
};

type Props = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  categories: Category[];
  filters: FilterOption[];
  className?: string;
};

export const CourseFilters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedFilter,
  onFilterChange,
  viewMode,
  onViewModeChange,
  categories,
  filters,
  className
}: Props) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeFilters = [
    ...(searchQuery ? [{ 
      id: "search", 
      label: "Search", 
      value: `"${searchQuery}"`, 
      onRemove: () => onSearchChange("") 
    }] : []),
    ...(selectedCategory !== "all" ? [{ 
      id: "category", 
      label: "Category", 
      value: categories.find(c => c.id === selectedCategory)?.name || selectedCategory, 
      onRemove: () => onCategoryChange("all") 
    }] : []),
    ...(selectedFilter !== "all" ? [{ 
      id: "level", 
      label: "Level", 
      value: filters.find(f => f.id === selectedFilter)?.name || selectedFilter, 
      onRemove: () => onFilterChange("all") 
    }] : [])
  ];

  return (
    <div className={cn("bg-card rounded-xl border shadow-sm overflow-hidden", className)}>
      {/* Search Bar */}
      <div className="p-6 border-b border-border">
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>

      {/* Filters Section */}
      <div className="p-6">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center justify-between w-full p-3 border border-border rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            aria-expanded={filtersOpen}
            aria-controls="filters-content"
          >
            <span className="flex items-center gap-2 font-medium text-foreground">
              <Filter className="w-4 h-4" />
              Filters & View
            </span>
            <ChevronDown className={cn("w-4 h-4 transition-transform text-muted-foreground", filtersOpen && "rotate-180")} />
          </button>
        </div>

        {/* Filters Content */}
        <div 
          id="filters-content"
          className={cn(
            "space-y-4",
            !filtersOpen && "hidden lg:block"
          )}
        >
          {/* Category Filters */}
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />

          {/* Level Filter & View Mode */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <FilterSelector
              filters={filters}
              selectedFilter={selectedFilter}
              onFilterChange={onFilterChange}
            />
            
            <ViewModeToggle
              viewMode={viewMode}
              onViewModeChange={onViewModeChange}
            />
          </div>

          {/* Active Filters Summary */}
          <ActiveFilters filters={activeFilters} />
        </div>
      </div>
    </div>
  );
};