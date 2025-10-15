/**
 * Challenge options administration - Comprehensive challenge options management
 * 
 * This module provides a complete challenge options management system including:
 * - Type definitions for challenge options and related data
 * - API functions for CRUD operations
 * - React hook for state management
 * - Reusable components for display and interaction
 * - Empty states and error handling
 * - Pagination and filtering utilities
 * 
 * @example
 * ```tsx
 * import { ChallengeOptionsManager } from '@/components/admin/challenge-options';
 * 
 * // Use the complete manager component
 * <ChallengeOptionsManager />
 * 
 * // Or use individual components
 * import { useChallengeOptions, ChallengeOptionCard } from '@/components/admin/challenge-options';
 * ```
 */

// Main component export
export { ChallengeOptionsManager } from './ChallengeOptionsManager';

// Type exports
export type {
  ChallengeOption,
  ChallengeOptionFilters,
  ChallengeOptionStats,
  FilterOption,
  ChallengeOptionFilterType
} from './types';

// Utility functions
export {
  filterChallengeOptions,
  getChallengeOptionStats,
  getFilterOptions,
  paginateChallengeOptions
} from './types';

// API functions
export {
  fetchChallengeOptions,
  createChallengeOption,
  updateChallengeOption,
  deleteChallengeOption,
  fetchChallengeOptionById
} from './api';

// React hook
export { useChallengeOptions } from './useChallengeOptions';

// Components
export { ChallengeOptionCard } from './ChallengeOptionCard';
export { ChallengeOptionsList } from './ChallengeOptionsList';

// Empty states
export {
  EmptyChallengeOptions,
  NoResultsFound,
  LoadingChallengeOptions,
  ErrorStateChallengeOptions
} from './EmptyStates';

/**
 * Challenge options management configuration
 */
export const CHALLENGE_OPTIONS_CONFIG = {
  // Default pagination
  defaultItemsPerPage: 10,
  
  // Available filter types
  filterTypes: ['all', 'correct', 'incorrect'] as const,
  
  // Status variants
  statusVariants: {
    correct: {
      icon: 'CheckCircle2',
      color: 'green',
      label: 'Correct'
    },
    incorrect: {
      icon: 'XCircle', 
      color: 'red',
      label: 'Incorrect'
    }
  },
  
  // Media types
  mediaTypes: {
    image: {
      icon: 'ImageIcon',
      label: 'Has image'
    },
    audio: {
      icon: 'Volume2',
      label: 'Has audio'
    }
  }
} as const;