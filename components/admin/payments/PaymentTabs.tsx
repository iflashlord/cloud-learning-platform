/**
 * Payment Tabs Component
 * 
 * Tab navigation for switching between payments, subscriptions, and analytics
 */

"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Users, 
  TrendingUp 
} from "lucide-react";

type TabType = "payments" | "subscriptions" | "analytics";

interface PaymentTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const PaymentTabs: React.FC<PaymentTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    {
      id: "payments" as const,
      label: "Payments",
      icon: CreditCard,
    },
    {
      id: "subscriptions" as const,
      label: "Subscriptions",
      icon: Users,
    },
    {
      id: "analytics" as const,
      label: "Analytics",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="flex gap-2 mb-4">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        
        return (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "primary" : "secondary"}
            size="sm"
            onClick={() => onTabChange(tab.id)}
          >
            <IconComponent className="w-4 h-4 mr-2" />
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
};