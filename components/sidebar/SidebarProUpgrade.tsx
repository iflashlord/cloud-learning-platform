'use client';

import Link from "next/link";
import { Infinity } from "lucide-react";
import { EnhancedCard } from "@/components/ui/enhanced-card";

interface SidebarProUpgradeProps {
  isCollapsed?: boolean;
}

export const SidebarProUpgrade = ({ isCollapsed = false }: SidebarProUpgradeProps) => {
  return (
    <EnhancedCard 
      variant="interactive"
      padding="sm"
      className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200/50 dark:border-amber-800/50"
    >
      <Link href="/shop" className="block">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
            <Infinity className="w-4 h-4 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                Upgrade to Pro
              </div>
              <div className="text-xs text-amber-600 dark:text-amber-400">
                Unlock all features
              </div>
            </div>
          )}
        </div>
      </Link>
    </EnhancedCard>
  );
};