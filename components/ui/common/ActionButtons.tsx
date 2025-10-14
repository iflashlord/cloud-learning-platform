/**
 * Action Buttons Component
 * 
 * Reusable component for common action button patterns
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export interface Action {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "success" | "error" | "danger" | "warning" | "info" | "ghost" | "outline" | "subtle" | "elevation" | "sidebar" | "sidebarOutline" | "link" | "compute" | "storage" | "security" | "networking" | "management" | "aiml";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "icon";
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

interface ActionButtonsProps {
  actions: Action[];
  orientation?: "horizontal" | "vertical";
  alignment?: "left" | "center" | "right" | "between" | "around";
  className?: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  actions,
  orientation = "horizontal",
  alignment = "right",
  className,
}) => {
  const containerClasses = cn(
    "flex gap-3",
    orientation === "vertical" && "flex-col",
    orientation === "horizontal" && {
      "justify-start": alignment === "left",
      "justify-center": alignment === "center", 
      "justify-end": alignment === "right",
      "justify-between": alignment === "between",
      "justify-around": alignment === "around",
    },
    className
  );

  return (
    <div className={containerClasses}>
      {actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant || "primary"}
          size={action.size || "md"}
          onClick={action.onClick}
          disabled={action.disabled || action.loading}
          className={cn(
            "flex items-center gap-2",
            orientation === "vertical" && "w-full justify-center"
          )}
        >
          {action.loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            action.icon
          )}
          {action.label}
        </Button>
      ))}
    </div>
  );
};