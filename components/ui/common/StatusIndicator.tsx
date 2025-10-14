/**
 * Status Indicator Component
 * 
 * Reusable component for displaying status badges/indicators
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, AlertCircle, Clock, Info } from "lucide-react";

type StatusType = "success" | "error" | "warning" | "info" | "pending" | "neutral";

interface StatusIndicatorProps {
  status: StatusType;
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "badge" | "dot" | "icon";
  className?: string;
}

const statusConfig = {
  success: {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200",
    dot: "bg-green-500",
    icon: CheckCircle,
  },
  error: {
    bg: "bg-red-100",
    text: "text-red-800", 
    border: "border-red-200",
    dot: "bg-red-500",
    icon: XCircle,
  },
  warning: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    border: "border-yellow-200", 
    dot: "bg-yellow-500",
    icon: AlertCircle,
  },
  info: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-200",
    dot: "bg-blue-500", 
    icon: Info,
  },
  pending: {
    bg: "bg-gray-100",
    text: "text-gray-800",
    border: "border-gray-200",
    dot: "bg-gray-500",
    icon: Clock,
  },
  neutral: {
    bg: "bg-gray-100", 
    text: "text-gray-800",
    border: "border-gray-200",
    dot: "bg-gray-500",
    icon: Info,
  },
};

const sizeConfig = {
  sm: {
    badge: "px-2 py-1 text-xs",
    dot: "w-2 h-2",
    icon: "w-3 h-3",
  },
  md: {
    badge: "px-2.5 py-1.5 text-sm",
    dot: "w-3 h-3", 
    icon: "w-4 h-4",
  },
  lg: {
    badge: "px-3 py-2 text-base",
    dot: "w-4 h-4",
    icon: "w-5 h-5",
  },
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  label,
  size = "md",
  variant = "badge",
  className,
}) => {
  const config = statusConfig[status];
  const sizes = sizeConfig[size];
  const Icon = config.icon;

  if (variant === "dot") {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <div 
          className={cn(
            "rounded-full",
            config.dot,
            sizes.dot
          )}
        />
        <span className={cn("font-medium", config.text)}>
          {label}
        </span>
      </div>
    );
  }

  if (variant === "icon") {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <Icon 
          className={cn(
            sizes.icon,
            config.text
          )}
        />
        <span className={cn("font-medium", config.text)}>
          {label}
        </span>
      </div>
    );
  }

  // Default badge variant
  return (
    <span 
      className={cn(
        "inline-flex items-center rounded-full font-medium border",
        config.bg,
        config.text,
        config.border,
        sizes.badge,
        className
      )}
    >
      {label}
    </span>
  );
};