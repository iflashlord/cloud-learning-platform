export interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  disabled?: boolean;
}

export interface SidebarProps {
  className?: string;
  items?: SidebarItem[];
  isCollapsed?: boolean;
  showProUpgrade?: boolean;
  showThemeSwitcher?: boolean;
  showSettings?: boolean;
}