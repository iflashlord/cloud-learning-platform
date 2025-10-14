'use client';

import { SidebarItemComponent } from "./SidebarItem";
import { SidebarItem } from "./types";

interface SidebarNavigationProps {
  items: SidebarItem[];
  isCollapsed?: boolean;
}

export const SidebarNavigation = ({ items, isCollapsed = false }: SidebarNavigationProps) => {
  return (
    <div className="flex flex-col gap-y-2 flex-1 px-2">
      {items.map((item) => (
        <SidebarItemComponent
          key={item.href}
          item={item}
          isCollapsed={isCollapsed}
        />
      ))}
    </div>
  );
};