"use client";

import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export const CategorySelector = ({
  categories,
  selectedCategory,
  onCategoryChange,
  className
}: Props) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = selectedCategory === category.id;
        
        return (
          <Button
            key={category.id}
            variant={isSelected ? "primary" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "flex items-center gap-2 transition-all duration-200",
              isSelected && "shadow-md"
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{category.name}</span>
          </Button>
        );
      })}
    </div>
  );
};