/**
 * Payment Header Component
 * 
 * Header section with title and action buttons for payment management
 */

"use client";

import * as React from "react";
import { ActionButtons } from "@/components/ui/common";
import { Download, RefreshCw } from "lucide-react";

interface PaymentHeaderProps {
  activeTab: "payments" | "subscriptions" | "analytics";
  onRefresh: () => void;
  onExportData: (type: 'payments' | 'subscriptions') => void;
}

export const PaymentHeader: React.FC<PaymentHeaderProps> = ({
  activeTab,
  onRefresh,
  onExportData,
}) => {
  const actions = [
    {
      label: "Export Data",
      onClick: () => onExportData(activeTab === "subscriptions" ? "subscriptions" : "payments"),
      variant: "secondary" as const,
      icon: <Download className="w-4 h-4" />,
    },
    {
      label: "Refresh",
      onClick: onRefresh,
      variant: "primary" as const,
      icon: <RefreshCw className="w-4 h-4" />,
    },
  ];

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Payment Management
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Monitor payments, subscriptions, and revenue
        </p>
      </div>
      
      <ActionButtons 
        actions={actions}
        alignment="right"
      />
    </div>
  );
};