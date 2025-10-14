'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { cn } from "@/lib/utils";
import { SidebarItem } from "./types";

interface SidebarItemComponentProps {
  item: SidebarItem;
  isCollapsed?: boolean;
}

export const SidebarItemComponent = ({ item, isCollapsed = false }: SidebarItemComponentProps) => {
  const pathname = usePathname();
  const active = pathname === item.href;

  return (
    <EnhancedButton
      legacyVariant={active ? "sidebarOutline" : "sidebar"}
      className={cn(
        "h-[52px] w-full group relative",
        "transition-all duration-200 ease-out",
        isCollapsed ? "justify-center px-2" : "justify-start",
        item.disabled && "opacity-50 cursor-not-allowed"
      )}
      asChild
      disabled={item.disabled}
      title={isCollapsed ? item.label : undefined}
    >
      <Link href={item.disabled ? "#" : item.href}>
        <item.icon className={cn(
          "h-6 w-6 transition-colors duration-200 flex-shrink-0",
          isCollapsed ? "mr-0" : "mr-4",
          active 
            ? "text-primary dark:text-primary-foreground" 
            : "text-muted-foreground group-hover:text-foreground"
        )} />
        {!isCollapsed && (
          <span className={cn(
            "font-semibold transition-colors duration-200 truncate",
            active 
              ? "text-primary dark:text-primary-foreground" 
              : "text-muted-foreground group-hover:text-foreground"
          )}>
            {item.label}
          </span>
        )}
        {item.badge && !isCollapsed && (
          <span className={cn(
            "absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5",
            "bg-red-500 text-white text-xs font-bold rounded-full",
            "flex items-center justify-center",
            "animate-pulse"
          )}>
            {item.badge}
          </span>
        )}
        {item.badge && isCollapsed && (
          <span className={cn(
            "absolute -top-1 -right-1 w-3 h-3",
            "bg-red-500 rounded-full",
            "animate-pulse"
          )} />
        )}
      </Link>
    </EnhancedButton>
  );
};