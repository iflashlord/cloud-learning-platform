import React from 'react';

export interface CourseTheme {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<any>;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  services: string[];
  description: string;
}

export interface ThemeShowcaseProps {
  className?: string;
}

export interface ThemeSelectorProps {
  themes: CourseTheme[];
  selectedTheme: CourseTheme;
  onThemeSelect: (theme: CourseTheme) => void;
}

export interface ThemePreviewProps {
  theme: CourseTheme;
}

export interface ThemeServicesGridProps {
  theme: CourseTheme;
}

export interface ThemeHeaderProps {
  title?: string;
  subtitle?: string;
}