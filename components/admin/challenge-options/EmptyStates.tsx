/**
 * Empty States Components
 * 
 * Collection of empty state components for different scenarios:
 * - Loading state
 * - No challenge options yet
 * - No results found after filtering
 * - Error state
 */

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  CheckCircle2, 
  Search, 
  AlertTriangle, 
  Loader2,
  Plus
} from 'lucide-react';

/**
 * Loading state component
 */
export const LoadingChallengeOptions: React.FC = () => (
  <div className="p-6">
    <div className="text-center py-8">
      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
      <p className="text-gray-600">Loading challenge options...</p>
    </div>
  </div>
);

/**
 * Empty state when no challenge options exist yet
 */
export const EmptyChallengeOptions: React.FC = () => (
  <Card className="p-8 text-center">
    <div className="text-gray-500">
      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-medium mb-2">No answer options yet</h3>
      <p className="mb-4 text-gray-600">
        Create answer options for your quiz questions to help students learn effectively.
      </p>
      <Link href="/admin/challenge-options/new">
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Challenge Option
        </Button>
      </Link>
    </div>
  </Card>
);

/**
 * No results found after filtering/searching
 */
export const NoResultsFound: React.FC<{ onReset?: () => void }> = ({ onReset }) => (
  <Card className="p-8 text-center">
    <div className="text-gray-500">
      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <Search className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-medium mb-2">No options found</h3>
      <p className="mb-4 text-gray-600">
        Try adjusting your search or filter to find what you&apos;re looking for.
      </p>
      {onReset && (
        <Button variant="outline" onClick={onReset}>
          Clear filters
        </Button>
      )}
    </div>
  </Card>
);

/**
 * Error state component
 */
interface ErrorStateChallengeOptionsProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorStateChallengeOptions: React.FC<ErrorStateChallengeOptionsProps> = ({
  error,
  onRetry,
}) => (
  <Card className="p-8 text-center">
    <div className="text-red-600">
      <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-medium mb-2">Failed to load challenge options</h3>
      <p className="mb-4 text-gray-600">{error}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  </Card>
);