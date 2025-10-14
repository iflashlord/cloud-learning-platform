'use client';

import { Menu, X } from "lucide-react";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { cn } from "@/lib/utils";

interface SidebarToggleProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const SidebarToggle = ({ isCollapsed, onToggle }: SidebarToggleProps) => {
  return (
    <EnhancedButton
      variant="ghost"
      size="sm"
      className={cn(
        "absolute -right-3 top-6 w-6 h-6 rounded-full shadow-md bg-background border border-border/50",
        "z-10" // Relative z-index within grid context
      )}
      onClick={onToggle}
    >
      {isCollapsed ? (
        <Menu className="h-3 w-3" />
      ) : (
        <X className="h-3 w-3" />
      )}
    </EnhancedButton>
  );
};