/**
 * Challenge Options API
 * 
 * API functions for CRUD operations on challenge options.
 * Handles data fetching, creation, updating, and deletion.
 */

import { ChallengeOption } from './types';

/**
 * Fetch all challenge options
 */
export const fetchChallengeOptions = async (): Promise<ChallengeOption[]> => {
  try {
    const response = await fetch('/api/challengeOptions');
    if (!response.ok) {
      throw new Error(`Failed to fetch challenge options: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching challenge options:', error);
    throw error;
  }
};

/**
 * Fetch a single challenge option by ID
 */
export const fetchChallengeOptionById = async (id: number): Promise<ChallengeOption> => {
  try {
    const response = await fetch(`/api/challengeOptions/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch challenge option: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching challenge option:', error);
    throw error;
  }
};

/**
 * Create a new challenge option
 */
export const createChallengeOption = async (
  data: Omit<ChallengeOption, 'id' | 'challenge'>
): Promise<ChallengeOption> => {
  try {
    const response = await fetch('/api/challengeOptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create challenge option: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating challenge option:', error);
    throw error;
  }
};

/**
 * Update an existing challenge option
 */
export const updateChallengeOption = async (
  id: number,
  data: Partial<Omit<ChallengeOption, 'id' | 'challenge'>>
): Promise<ChallengeOption> => {
  try {
    const response = await fetch(`/api/challengeOptions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update challenge option: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating challenge option:', error);
    throw error;
  }
};

/**
 * Delete a challenge option
 */
export const deleteChallengeOption = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`/api/challengeOptions/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete challenge option: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting challenge option:', error);
    throw error;
  }
};