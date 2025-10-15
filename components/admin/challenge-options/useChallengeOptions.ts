/**
 * Challenge Options Hook
 * 
 * Custom React hook for managing challenge options state, filtering, and pagination.
 * Provides a comprehensive interface for challenge options management.
 */

"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  ChallengeOption, 
  ChallengeOptionFilters, 
  ChallengeOptionFilterType,
  filterChallengeOptions,
  getFilterOptions,
  paginateChallengeOptions 
} from './types';
import { fetchChallengeOptions, deleteChallengeOption } from './api';

interface UseChallengeOptionsReturn {
  // Data
  challengeOptions: ChallengeOption[];
  filteredOptions: ChallengeOption[];
  paginatedOptions: ChallengeOption[];
  
  // State
  loading: boolean;
  error: string | null;
  
  // Filters
  filters: ChallengeOptionFilters;
  setFilters: (filters: ChallengeOptionFilters) => void;
  setSearch: (search: string) => void;
  setFilterType: (type: ChallengeOptionFilterType) => void;
  
  // Pagination
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (count: number) => void;
  
  // Actions
  refetch: () => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
  
  // Computed values
  filterOptions: ReturnType<typeof getFilterOptions>;
  isEmpty: boolean;
  hasResults: boolean;
}

export const useChallengeOptions = (initialItemsPerPage = 10): UseChallengeOptionsReturn => {
  // Core state
  const [challengeOptions, setChallengeOptions] = useState<ChallengeOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter state
  const [filters, setFilters] = useState<ChallengeOptionFilters>({
    search: '',
    type: 'all',
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  
  // Fetch challenge options
  const fetchOptions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchChallengeOptions();
      setChallengeOptions(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load challenge options';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Initial fetch
  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);
  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.search, filters.type]);
  
  // Computed values
  const filteredOptions = useMemo(() => {
    return filterChallengeOptions(challengeOptions, filters);
  }, [challengeOptions, filters]);
  
  const paginationResult = useMemo(() => {
    return paginateChallengeOptions(filteredOptions, currentPage, itemsPerPage);
  }, [filteredOptions, currentPage, itemsPerPage]);
  
  const filterOptions = useMemo(() => {
    return getFilterOptions(challengeOptions);
  }, [challengeOptions]);
  
  // Filter setters
  const setSearch = useCallback((search: string) => {
    setFilters(prev => ({ ...prev, search }));
  }, []);
  
  const setFilterType = useCallback((type: ChallengeOptionFilterType) => {
    setFilters(prev => ({ ...prev, type }));
  }, []);
  
  // Delete handler
  const handleDelete = useCallback(async (id: number) => {
    try {
      setError(null);
      await deleteChallengeOption(id);
      setChallengeOptions(prev => prev.filter(option => option.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete challenge option';
      setError(message);
      throw err; // Re-throw for component-level error handling
    }
  }, []);
  
  return {
    // Data
    challengeOptions,
    filteredOptions,
    paginatedOptions: paginationResult.items,
    
    // State
    loading,
    error,
    
    // Filters
    filters,
    setFilters,
    setSearch,
    setFilterType,
    
    // Pagination
    currentPage,
    totalPages: paginationResult.totalPages,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    
    // Actions
    refetch: fetchOptions,
    handleDelete,
    
    // Computed values
    filterOptions,
    isEmpty: challengeOptions.length === 0,
    hasResults: filteredOptions.length > 0,
  };
};