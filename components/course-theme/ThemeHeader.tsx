import React from 'react';
import { Monitor } from 'lucide-react';
import { ThemeHeaderProps } from './types';

export const ThemeHeader: React.FC<ThemeHeaderProps> = ({ 
  title = 'Course Themes',
  subtitle = 'AWS service-specific themes with optimized colors and components for different learning paths.'
}) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-4 flex items-center justify-center gap-3">
        <Monitor className="w-8 h-8 text-pink-600 dark:text-pink-400" />
        <span>{title}</span>
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};