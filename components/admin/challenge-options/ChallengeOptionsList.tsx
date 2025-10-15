/**
 * Challenge Options List Component
 * 
 * Displays a paginated list of challenge options with filtering capabilities.
 * Handles empty states and integrates with the pagination component.
 */

import React from 'react';
import { Pagination } from '@/components/ui/pagination';
import { ChallengeOptionCard } from './ChallengeOptionCard';
import { NoResultsFound } from './EmptyStates';
import { ChallengeOption } from './types';

interface ChallengeOptionsListProps {
  options: ChallengeOption[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onDelete: (id: number) => void;
  hasResults: boolean;
  onResetFilters?: () => void;
}

export const ChallengeOptionsList: React.FC<ChallengeOptionsListProps> = ({
  options,
  totalPages,
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onDelete,
  hasResults,
  onResetFilters,
}) => {
  // Show no results state if no options match filters
  if (!hasResults) {
    return <NoResultsFound onReset={onResetFilters} />;
  }

  return (
    <div className="space-y-4">
      {/* Challenge options list */}
      <div className="space-y-4">
        {options.map((option) => (
          <ChallengeOptionCard
            key={option.id}
            option={option}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalItems > itemsPerPage && (
        <div className="mt-6 border-t pt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showTotal={true}
            totalItems={totalItems}
          />
        </div>
      )}
    </div>
  );
};