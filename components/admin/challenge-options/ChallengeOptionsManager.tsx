/**
 * Challenge Options Manager Component
 * 
 * Main orchestrator component that brings together all challenge options
 * management functionality including search, filtering, pagination, and CRUD operations.
 * This component replaces the original 223-line monolithic page.
 */

"use client";

import React from 'react';
import { AdminPageHeader } from '@/components/ui/admin-page-header';
import { Plus } from 'lucide-react';
import { useChallengeOptions } from './useChallengeOptions';
import { ChallengeOptionsList } from './ChallengeOptionsList';
import { 
  LoadingChallengeOptions, 
  EmptyChallengeOptions, 
  ErrorStateChallengeOptions 
} from './EmptyStates';

export const ChallengeOptionsManager: React.FC = () => {
  const {
    // Data
    challengeOptions,
    paginatedOptions,
    
    // State
    loading,
    error,
    
    // Filters
    filters,
    setSearch,
    setFilterType,
    
    // Pagination
    currentPage,
    totalPages,
    itemsPerPage,
    setCurrentPage,
    
    // Actions
    refetch,
    handleDelete,
    
    // Computed values
    filterOptions,
    isEmpty,
    hasResults,
  } = useChallengeOptions();

  // Reset filters handler
  const handleResetFilters = () => {
    setSearch('');
    setFilterType('all');
  };

  // Loading state
  if (loading) {
    return <LoadingChallengeOptions />;
  }

  // Error state
  if (error) {
    return (
      <div className="p-6">
        <ErrorStateChallengeOptions error={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page header with search and filters */}
      <AdminPageHeader
        title="Challenge Options"
        description="Manage answer options for challenges"
        searchTerm={filters.search}
        onSearchChange={setSearch}
        searchPlaceholder="Search options or questions..."
        filterOptions={filterOptions}
        activeFilter={filters.type}
        onFilterChange={(value) => setFilterType(value as any)}
        addNewHref="/admin/challenge-options/new"
        addNewLabel="Add Option"
        addNewIcon={Plus}
      />

      {/* Main content */}
      {isEmpty ? (
        <EmptyChallengeOptions />
      ) : (
        <ChallengeOptionsList
          options={paginatedOptions}
          totalPages={totalPages}
          currentPage={currentPage}
          totalItems={challengeOptions.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onDelete={handleDelete}
          hasResults={hasResults}
          onResetFilters={handleResetFilters}
        />
      )}
    </div>
  );
};