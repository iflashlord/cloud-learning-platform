import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThemeSelectorProps } from './types';

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  themes,
  selectedTheme,
  onThemeSelect
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {themes.map((theme) => {
        const Icon = theme.icon;
        const isSelected = selectedTheme.id === theme.id;
        
        return (
          <Card 
            key={theme.id}
            className={`
              p-6 cursor-pointer transition-all duration-300 hover:scale-105
              ${isSelected 
                ? `bg-gradient-to-br ${theme.colors.background} dark:from-gray-800 dark:to-gray-700 border-2 border-${theme.colors.primary} dark:border-${theme.colors.primary}` 
                : 'bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
              }
            `}
            onClick={() => onThemeSelect(theme)}
          >
            <div className="flex items-center mb-4">
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center mr-4
                ${isSelected ? `bg-${theme.colors.primary}` : 'bg-gray-100 dark:bg-gray-600'}
              `}>
                <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`} />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${isSelected ? `text-${theme.colors.primary.replace('500', '900')} dark:text-${theme.colors.primary.replace('500', '200')}` : 'text-gray-800 dark:text-gray-200'}`}>
                  {theme.name}
                </h3>
                <p className={`text-sm ${isSelected ? `text-${theme.colors.primary.replace('500', '700')} dark:text-${theme.colors.primary.replace('500', '300')}` : 'text-gray-500 dark:text-gray-400'}`}>
                  {theme.category}
                </p>
              </div>
            </div>
            
            <p className={`text-sm mb-4 ${isSelected ? `text-${theme.colors.primary.replace('500', '800')} dark:text-${theme.colors.primary.replace('500', '200')}` : 'text-gray-600 dark:text-gray-400'}`}>
              {theme.description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {theme.services.slice(0, 3).map((service) => (
                <Badge 
                  key={service}
                  variant={isSelected ? theme.id as any : 'default'}
                >
                  {service}
                </Badge>
              ))}
              {theme.services.length > 3 && (
                <Badge variant="default" className="text-xs">
                  +{theme.services.length - 3} more
                </Badge>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};