import React from 'react';
import { CheckCircle } from 'lucide-react';
import { ThemeServicesGridProps } from './types';

export const ThemeServicesGrid: React.FC<ThemeServicesGridProps> = ({ theme }) => {
  return (
    <div>
      <h3 className={`text-xl font-bold text-${theme.colors.primary.replace('500', '900')} mb-6`}>
        Covered Services
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {theme.services.map((service, index) => (
          <div 
            key={service}
            className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/40"
          >
            <div className="flex items-center">
              <div className={`
                w-10 h-10 bg-${theme.colors.accent} rounded-lg flex items-center justify-center mr-3
              `}>
                <CheckCircle className={`w-5 h-5 text-${theme.colors.primary}`} />
              </div>
              <div>
                <h4 className={`font-bold text-${theme.colors.primary.replace('500', '900')}`}>
                  {service}
                </h4>
                <p className="text-xs text-gray-600">Service {index + 1}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Simulation */}
      <div className="mt-6 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg border border-white/40 dark:border-gray-600/40">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-semibold text-${theme.colors.primary.replace('500', '800')} dark:text-${theme.colors.primary.replace('500', '200')}`}>
            Course Progress
          </span>
          <span className={`text-sm font-bold text-${theme.colors.primary} dark:text-${theme.colors.primary.replace('500', '300')}`}>
            73%
          </span>
        </div>
        <div className="w-full bg-white/80 dark:bg-gray-700/80 rounded-full h-3 overflow-hidden">
          <div 
            className={`bg-gradient-to-r from-${theme.colors.primary} to-${theme.colors.secondary} h-3 rounded-full transition-all duration-500`}
            style={{ width: '73%' }}
          />
        </div>
      </div>
    </div>
  );
};