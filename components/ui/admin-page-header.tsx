"use client";

import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/ui/search-bar";
import { FilterBar } from "@/components/ui/filter-bar";
import Link from "next/link";
import { LucideIcon, Plus } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface AdminPageHeaderProps {
  title: string;
  description: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filterOptions?: FilterOption[];
  activeFilter?: string;
  onFilterChange?: (value: string) => void;
  addNewHref?: string;
  addNewLabel?: string;
  addNewIcon?: LucideIcon;
  showAddButton?: boolean;
}

export function AdminPageHeader({
  title,
  description,
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search...",
  filterOptions = [],
  activeFilter = "all",
  onFilterChange = () => {},
  addNewHref,
  addNewLabel = "Add New",
  addNewIcon: Icon = Plus,
  showAddButton = true,
}: AdminPageHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
        {showAddButton && addNewHref && (
          <Link href={addNewHref}>
            <Button variant="primary" className="whitespace-nowrap">
              <Icon className="w-4 h-4 mr-2" />
              {addNewLabel}
            </Button>
          </Link>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          placeholder={searchPlaceholder}
          className="w-full lg:w-80"
        />
        
        {filterOptions.length > 0 && (
          <FilterBar
            options={filterOptions}
            activeFilter={activeFilter}
            onFilterChange={onFilterChange}
          />
        )}
      </div>
    </div>
  );
}