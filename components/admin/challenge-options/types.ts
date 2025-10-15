/**
 * Challenge Options Types
 * 
 * Type definitions and utility functions for challenge options management.
 * Provides interfaces for challenge options, filters, and pagination utilities.
 */

export interface ChallengeOption {
  id: number;
  text: string;
  correct: boolean;
  imageSrc?: string;
  audioSrc?: string;
  guide?: string;
  challengeId: number;
  challenge: {
    id: number;
    question: string;
    lesson?: {
      id: number;
      title: string;
      unit?: {
        id: number;
        title: string;
        course?: {
          id: number;
          title: string;
        };
      };
    };
  };
}

export interface ChallengeOptionFilters {
  search: string;
  type: ChallengeOptionFilterType;
}

export type ChallengeOptionFilterType = 'all' | 'correct' | 'incorrect';

export interface ChallengeOptionStats {
  total: number;
  correct: number;
  incorrect: number;
}

export interface FilterOption {
  value: ChallengeOptionFilterType;
  label: string;
  count: number;
}

/**
 * Filter challenge options based on search term and type
 */
export const filterChallengeOptions = (
  options: ChallengeOption[],
  filters: ChallengeOptionFilters
): ChallengeOption[] => {
  return options.filter(option => {
    const matchesSearch = 
      option.text.toLowerCase().includes(filters.search.toLowerCase()) ||
      option.challenge.question.toLowerCase().includes(filters.search.toLowerCase()) ||
      option.challenge.lesson?.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
      option.challenge.lesson?.unit?.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
      option.challenge.lesson?.unit?.course?.title?.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesType = 
      filters.type === 'all' || 
      (filters.type === 'correct' && option.correct) || 
      (filters.type === 'incorrect' && !option.correct);
    
    return matchesSearch && matchesType;
  });
};

/**
 * Get statistics about challenge options
 */
export const getChallengeOptionStats = (options: ChallengeOption[]): ChallengeOptionStats => {
  return {
    total: options.length,
    correct: options.filter(o => o.correct).length,
    incorrect: options.filter(o => !o.correct).length,
  };
};

/**
 * Generate filter options with counts
 */
export const getFilterOptions = (options: ChallengeOption[]): FilterOption[] => {
  const stats = getChallengeOptionStats(options);
  
  return [
    { value: 'all', label: 'All Options', count: stats.total },
    { value: 'correct', label: 'Correct', count: stats.correct },
    { value: 'incorrect', label: 'Incorrect', count: stats.incorrect },
  ];
};

/**
 * Paginate challenge options
 */
export const paginateChallengeOptions = (
  options: ChallengeOption[],
  page: number,
  itemsPerPage: number
) => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(options.length / itemsPerPage);
  
  return {
    items: options.slice(startIndex, endIndex),
    totalPages,
    currentPage: page,
    totalItems: options.length,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};