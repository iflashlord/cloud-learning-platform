/**
 * 🧭 Enhanced Sidebar Component - Modularized
 * 
 * This component has been refactored from a 311-line monolithic component
 * into focused, reusable modules:
 * 
 * - SidebarLogo: Logo and platform branding
 * - SidebarNavigation: Navigation items with active state
 * - SidebarItemComponent: Individual navigation item with badges
 * - SidebarProUpgrade: Premium upgrade card
 * - SidebarBottomSection: Settings and theme switcher
 * - SidebarUserProfile: User authentication display
 * - SidebarToggle: Collapse/expand functionality
 * 
 * All components maintain the same design language with:
 * - Perfect contrast in light/dark modes
 * - Smooth animations and interactions
 * - Mobile-first responsive design
 * - Accessibility features
 * - Theme-aware styling
 */

"use client";

import { ModularSidebar } from '@/components/sidebar/ModularSidebar';

export const EnhancedSidebar = ({ className }: { className?: string }) => {
  return <ModularSidebar className={className} />;
};

export default EnhancedSidebar;