"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = {
  id: string;
  name: string;
  icon: LucideIcon;
};

type Props = {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
};

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  className
}: Props) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-foreground mb-2">
        Course Categories
      </label>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all",
                "border-2 focus:ring-2 focus:ring-primary focus:ring-offset-2",
                isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-md"
                  : "bg-background text-foreground border-border hover:border-muted-foreground hover:bg-muted"
              )}
              aria-pressed={isSelected}
              aria-label={`Filter by ${category.name} category`}
            >
              <Icon className="w-4 h-4" />
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};