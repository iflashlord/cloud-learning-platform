"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export const SearchInput = ({ 
  value, 
  onChange, 
  placeholder = "Search courses by name, description, or technology...",
  className 
}: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onChange('');
    }
  };

  const clearSearch = () => {
    onChange('');
  };

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full pl-14 pr-12 py-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground bg-background"
        aria-label="Search courses"
        autoComplete="off"
      />
      {value && (
        <button
          onClick={clearSearch}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};