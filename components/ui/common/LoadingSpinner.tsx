/**
 * Loading Spinner Component
 * 
 * Reusable loading indicator with various sizes and styles
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2, RefreshCw } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "default" | "dots" | "pulse" | "refresh";
  className?: string;
  label?: string;
  centered?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  variant = "default",
  className,
  label,
  centered = false,
}) => {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4", 
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const textSizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base", 
    lg: "text-lg",
    xl: "text-xl",
  };

  const containerClasses = cn(
    "flex items-center gap-2",
    centered && "justify-center min-h-[100px]",
    className
  );

  const renderSpinner = () => {
    switch (variant) {
      case "dots":
        return (
          <div className={cn("flex gap-1", sizeClasses[size])}>
            <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1 h-1 bg-current rounded-full animate-bounce" />
          </div>
        );
        
      case "pulse":
        return (
          <div className={cn("bg-current rounded-full animate-pulse", sizeClasses[size])} />
        );
        
      case "refresh":
        return (
          <RefreshCw className={cn("animate-spin text-blue-600", sizeClasses[size])} />
        );
        
      default:
        return (
          <Loader2 className={cn("animate-spin text-blue-600", sizeClasses[size])} />
        );
    }
  };

  return (
    <div className={containerClasses}>
      {renderSpinner()}
      {label && (
        <span className={cn("text-gray-600 dark:text-gray-400", textSizeClasses[size])}>
          {label}
        </span>
      )}
    </div>
  );
};

// Full page loading overlay
interface LoadingOverlayProps {
  loading: boolean;
  label?: string;
  variant?: "default" | "dots" | "pulse" | "refresh";
  backdrop?: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  loading,
  label = "Loading...",
  variant = "default", 
  backdrop = true,
}) => {
  if (!loading) return null;

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center",
      backdrop && "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
    )}>
      <div className="text-center">
        <LoadingSpinner 
          size="lg" 
          variant={variant}
          label={label}
          centered
        />
      </div>
    </div>
  );
};

// Inline loading state for content areas
interface LoadingStateProps {
  loading: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "default" | "dots" | "pulse" | "refresh";
  label?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  loading,
  children,
  fallback,
  size = "md",
  variant = "default",
  label = "Loading...",
}) => {
  if (loading) {
    return (
      fallback || (
        <LoadingSpinner
          size={size}
          variant={variant}
          label={label}
          centered
        />
      )
    );
  }

  return <>{children}</>;
};