'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './button';
import { Monitor, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

type Theme = 'system' | 'light' | 'dark';

export interface ThemeSwitcherProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost' | 'compact';
}

export function ThemeSwitcher({ 
  className, 
  size = 'md', 
  variant = 'default' 
}: ThemeSwitcherProps) {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  // Get system theme preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  // Apply theme to document
  const applyTheme = useCallback((selectedTheme: Theme) => {
    const root = document.documentElement;
    
    if (selectedTheme === 'system') {
      const systemTheme = getSystemTheme();
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', selectedTheme === 'dark');
    }
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    setMounted(true);
    
    // Migration: Check for old darkMode storage and convert to new format
    let savedTheme = localStorage.getItem('theme') as Theme;
    if (!savedTheme) {
      const oldDarkMode = localStorage.getItem('darkMode');
      if (oldDarkMode === 'true') {
        savedTheme = 'dark';
      } else if (oldDarkMode === 'false') {
        savedTheme = 'light';
      } else {
        savedTheme = 'system';
      }
      // Save in new format and remove old format
      localStorage.setItem('theme', savedTheme);
      localStorage.removeItem('darkMode');
    }
    
    setTheme(savedTheme);
    applyTheme(savedTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (savedTheme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [applyTheme]);

  // Handle theme change
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const themes: Array<{
    value: Theme;
    icon: React.ReactNode;
    label: string;
    description: string;
  }> = [
    {
      value: 'system',
      icon: <Monitor className="w-4 h-4" />,
      label: 'System',
      description: 'Follow system preference'
    },
    {
      value: 'light',
      icon: <Sun className="w-4 h-4" />,
      label: 'Light',
      description: 'Light theme'
    },
    {
      value: 'dark',
      icon: <Moon className="w-4 h-4" />,
      label: 'Dark',
      description: 'Dark theme'
    }
  ];

  if (variant === 'compact') {
    // Compact single button that cycles through themes
    const currentIndex = themes.findIndex(t => t.value === theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    return (
      <Button
        variant="ghost"
        size={size}
        onClick={() => handleThemeChange(nextTheme.value)}
        className={cn(
          "relative transition-all duration-200 hover:scale-105",
          className
        )}
        title={`Current: ${themes[currentIndex].label}. Click to switch to ${nextTheme.label}`}
      >
        {themes[currentIndex].icon}
        <span className="sr-only">{themes[currentIndex].label} theme</span>
      </Button>
    );
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {themes.map((themeOption) => (
        <Button
          key={themeOption.value}
          variant={theme === themeOption.value ? "primary" : "ghost"}
          size={size}
          onClick={() => handleThemeChange(themeOption.value)}
          className={cn(
            "transition-all duration-200 hover:scale-105",
            theme === themeOption.value && "ring-2 ring-blue-500 ring-offset-2 dark:ring-blue-400"
          )}
          title={themeOption.description}
        >
          {themeOption.icon}
          {variant !== 'ghost' && (
            <span className="ml-2 text-sm font-medium">
              {themeOption.label}
            </span>
          )}
          <span className="sr-only">{themeOption.description}</span>
        </Button>
      ))}
    </div>
  );
}

// Hook for consuming theme state in other components
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Migration: Check for old darkMode storage and convert to new format
    let savedTheme = localStorage.getItem('theme') as Theme;
    if (!savedTheme) {
      const oldDarkMode = localStorage.getItem('darkMode');
      if (oldDarkMode === 'true') {
        savedTheme = 'dark';
      } else if (oldDarkMode === 'false') {
        savedTheme = 'light';
      } else {
        savedTheme = 'system';
      }
      // Save in new format and remove old format
      localStorage.setItem('theme', savedTheme);
      localStorage.removeItem('darkMode');
    }
    
    setTheme(savedTheme);
  }, []);

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    const root = document.documentElement;
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', newTheme === 'dark');
    }
  };

  return {
    theme,
    setTheme: updateTheme,
    mounted,
  };
}
