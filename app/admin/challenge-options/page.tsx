/**
 * Admin Challenge Options Page
 * 
 * This page has been fully modularized and now uses the ChallengeOptionsManager
 * component which provides comprehensive challenge options management functionality.
 * 
 * The original 223-line monolithic page has been broken down into focused,
 * reusable components:
 * - ChallengeOptionsManager: Main orchestrator component
 * - useChallengeOptions: Custom hook for state management
 * - ChallengeOptionCard: Individual option display
 * - ChallengeOptionsList: List with pagination
 * - EmptyStates: Loading, empty, and error states
 * - API functions: CRUD operations
 */

import { ChallengeOptionsManager } from "@/components/admin/challenge-options";

const AdminChallengeOptionsPage = () => {
  return <ChallengeOptionsManager />;
};

export default AdminChallengeOptionsPage;
