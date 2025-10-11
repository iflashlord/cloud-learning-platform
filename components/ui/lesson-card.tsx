import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Card } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { Edit, Play, Lock, CheckCircle } from 'lucide-react';

// LessonCard Variants
const lessonCardVariants = cva(
  "p-4 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-gray-50 dark:bg-gray-800 border",
        completed: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700",
        current: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700",
        locked: "bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-700 opacity-60"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface LessonCardProps extends VariantProps<typeof lessonCardVariants> {
  lesson: {
    id: string;
    title: string;
    order: number;
    challenges?: { length: number } | any[];
  };
  status?: 'locked' | 'current' | 'completed' | 'available';
  onEdit?: () => void;
  onPlay?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const LessonCard = React.forwardRef<HTMLDivElement, LessonCardProps>(
  ({ lesson, status = 'available', onEdit, onPlay, className, children, ...props }, ref) => {
    const getVariant = () => {
      switch (status) {
        case 'completed':
          return 'completed';
        case 'current':
          return 'current';
        case 'locked':
          return 'locked';
        default:
          return 'default';
      }
    };

    const getStatusBadge = () => {
      switch (status) {
        case 'completed':
          return <Badge variant="success">Completed</Badge>;
        case 'current':
          return <Badge variant="info">Current</Badge>;
        case 'locked':
          return <Badge variant="default">Locked</Badge>;
        default:
          return <Badge variant="primary">Lesson {lesson.order}</Badge>;
      }
    };

    const getStatusIcon = () => {
      switch (status) {
        case 'completed':
          return <CheckCircle className="w-4 h-4 text-green-600" />;
        case 'locked':
          return <Lock className="w-4 h-4 text-gray-500" />;
        default:
          return <Play className="w-4 h-4 text-blue-600" />;
      }
    };

    const challengeCount = Array.isArray(lesson.challenges) 
      ? lesson.challenges.length 
      : lesson.challenges?.length || 0;

    return (
      <div ref={ref} className={cn(lessonCardVariants({ variant: getVariant() }), "rounded-lg border", className)} {...props}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              {getStatusBadge()}
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
              {lesson.title}
            </h4>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({challengeCount} questions)
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {onEdit && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onEdit}
                disabled={status === 'locked'}
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            )}
            {onPlay && status !== 'locked' && (
              <Button 
                variant="primary" 
                size="sm" 
                onClick={onPlay}
              >
                <Play className="w-4 h-4 mr-1" />
                Play
              </Button>
            )}
          </div>
        </div>
        
        {children && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            {children}
          </div>
        )}
      </div>
    );
  }
);

LessonCard.displayName = "LessonCard";