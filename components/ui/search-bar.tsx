"use client";

import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Search...",
  className = ""
}: SearchBarProps) {
  const handleClear = () => {
    onSearchChange("");
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-input bg-background text-foreground placeholder:text-muted-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>
    </div>
  );
}