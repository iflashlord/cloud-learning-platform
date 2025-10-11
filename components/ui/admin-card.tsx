import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AdminCardProps {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  badge?: {
    text: string;
    variant?: "default" | "primary" | "success" | "error" | "warning" | "info";
  };
  actions?: {
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "outline" | "ghost" | "success" | "error" | "danger" | "warning";
  }[];
  children?: ReactNode;
  className?: string;
}

export const AdminCard = ({
  title,
  description,
  image,
  imageAlt,
  badge,
  actions,
  children,
  className
}: AdminCardProps) => {
  return (
    <Card className={cn("overflow-hidden hover:shadow-md transition-shadow", className)}>
      {image && (
        <div className="aspect-video relative bg-gray-100 dark:bg-gray-700">
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1 truncate">
              {title}
            </h3>
            {badge && (
              <Badge 
                variant={badge.variant || "default"} 
                className="mb-2"
              >
                {badge.text}
              </Badge>
            )}
            {description && (
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                {description}
              </p>
            )}
          </div>
        </div>
        
        {children}
        
        {actions && actions.length > 0 && (
          <div className="flex gap-2 mt-4">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant || "primary"}
                size="sm"
                asChild={!!action.href}
                onClick={action.onClick}
              >
                {action.href ? (
                  <a href={action.href}>{action.label}</a>
                ) : (
                  action.label
                )}
              </Button>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};