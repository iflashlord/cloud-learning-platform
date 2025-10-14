import React, { useState } from 'react';
import { ThemeShowcaseProps } from './types';
import { courseThemes } from './data';
import { ThemeHeader } from './ThemeHeader';
import { ThemeSelector } from './ThemeSelector';
import { ThemePreview } from './ThemePreview';

export const CourseThemeShowcase: React.FC<ThemeShowcaseProps> = ({ className }) => {
  const [selectedTheme, setSelectedTheme] = useState(courseThemes[0]);

  return (
    <div className={`max-w-6xl mx-auto ${className || ''}`}>
      <ThemeHeader />
      <ThemeSelector 
        themes={courseThemes}
        selectedTheme={selectedTheme}
        onThemeSelect={setSelectedTheme}
      />
      <ThemePreview theme={selectedTheme} />
    </div>
  );
};