/**
 * Payment Filters Component
 * 
 * Search and filter controls for payment and subscription data
 */

"use client";

import * as React from "react";
import { SearchBar } from "@/components/ui/search-bar";

interface PaymentFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  activeTab: "payments" | "subscriptions" | "analytics";
}

export const PaymentFilters: React.FC<PaymentFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  activeTab,
}) => {
  const getStatusOptions = () => {
    if (activeTab === "payments") {
      return [
        { value: "all", label: "All Status" },
        { value: "completed", label: "Completed" },
        { value: "pending", label: "Pending" },
        { value: "failed", label: "Failed" },
        { value: "refunded", label: "Refunded" },
      ];
    } else {
      return [
        { value: "all", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "canceled", label: "Canceled" },
        { value: "expired", label: "Expired" },
        { value: "trial", label: "Trial" },
      ];
    }
  };

  const getSearchPlaceholder = () => {
    return activeTab === "payments" 
      ? "Search payments..." 
      : "Search subscriptions...";
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
      <div className="flex gap-2">
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          {getStatusOptions().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        placeholder={getSearchPlaceholder()}
        className="w-full md:w-80"
      />
    </div>
  );
};