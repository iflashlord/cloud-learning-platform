import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { QuestCategoryFilterProps } from './types';

export const QuestCategoryFilter: React.FC<QuestCategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "primary" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={cn(
              "text-xs font-medium transition-colors",
              selectedCategory === category 
                ? "bg-blue-500 text-white hover:bg-blue-600" 
                : "hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-950"
            )}
          >
            {category === "all" ? "All Quests" : category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );
};