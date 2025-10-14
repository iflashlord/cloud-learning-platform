import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ThemePreviewProps } from './types';
import { ThemeServicesGrid } from './ThemeServicesGrid';

export const ThemePreview: React.FC<ThemePreviewProps> = ({ theme }) => {
  return (
    <Card className={`p-8 bg-gradient-to-br ${theme.colors.background} dark:from-gray-800 dark:to-gray-700 border-2 border-${theme.colors.primary} dark:border-${theme.colors.primary}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Theme Information */}
        <div>
          <div className="flex items-center mb-6">
            <div className={`w-16 h-16 bg-${theme.colors.primary} rounded-2xl flex items-center justify-center mr-6`}>
              <theme.icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className={`text-3xl font-black text-${theme.colors.primary.replace('500', '900')} dark:text-${theme.colors.primary.replace('500', '200')} mb-2`}>
                {theme.name}
              </h2>
              <p className={`text-lg text-${theme.colors.primary.replace('500', '700')} dark:text-${theme.colors.primary.replace('500', '300')}`}>
                {theme.category}
              </p>
            </div>
          </div>
          
          <p className={`text-${theme.colors.primary.replace('500', '800')} dark:text-${theme.colors.primary.replace('500', '200')} mb-6 leading-relaxed`}>
            {theme.description}
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button 
              courseTheme={theme.id as any}
              className="w-full"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              START {theme.name.toUpperCase()}
            </Button>
            
            <Button 
              courseTheme={theme.id as any}
              variant="outline"
              className="w-full"
            >
              PREVIEW LESSONS
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                courseTheme={theme.id as any}
                size="sm"
                loading={true}
              >
                Loading State
              </Button>
              <Button 
                courseTheme={theme.id as any}
                size="sm"
                disabled={true}
              >
                Disabled State
              </Button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <ThemeServicesGrid theme={theme} />
      </div>
    </Card>
  );
};