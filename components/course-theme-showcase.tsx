'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Cpu, 
  Database, 
  Shield, 
  Globe, 
  Cloud, 
  Zap,
  Monitor,
  Settings,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

interface CourseTheme {
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

const courseThemes: CourseTheme[] = [
  {
    id: 'compute',
    name: 'Compute Services',
    category: 'Core Services',
    icon: Cpu,
    colors: {
      primary: 'orange-500',
      secondary: 'red-500',
      accent: 'orange-100',
      background: 'from-orange-50 to-red-50'
    },
    services: ['EC2', 'Lambda', 'ECS', 'Fargate', 'Batch'],
    description: 'Learn about AWS compute services including virtual servers, serverless computing, and containerization.'
  },
  {
    id: 'storage',
    name: 'Storage & Database',
    category: 'Data Services',
    icon: Database,
    colors: {
      primary: 'blue-500',
      secondary: 'indigo-500',
      accent: 'blue-100',
      background: 'from-blue-50 to-indigo-50'
    },
    services: ['S3', 'RDS', 'DynamoDB', 'EBS', 'EFS'],
    description: 'Master AWS storage solutions and database services for scalable data management.'
  },
  {
    id: 'security',
    name: 'Security & Identity',
    category: 'Security',
    icon: Shield,
    colors: {
      primary: 'purple-500',
      secondary: 'pink-500',
      accent: 'purple-100',
      background: 'from-purple-50 to-pink-50'
    },
    services: ['IAM', 'KMS', 'Cognito', 'WAF', 'GuardDuty'],
    description: 'Understand AWS security services and best practices for protecting your cloud infrastructure.'
  },
  {
    id: 'networking',
    name: 'Networking & CDN',
    category: 'Infrastructure',
    icon: Globe,
    colors: {
      primary: 'teal-500',
      secondary: 'cyan-500',
      accent: 'teal-100',
      background: 'from-teal-50 to-cyan-50'
    },
    services: ['VPC', 'CloudFront', 'Route 53', 'API Gateway', 'Direct Connect'],
    description: 'Build robust network architectures and content delivery solutions on AWS.'
  },
  {
    id: 'management',
    name: 'Management & Monitoring',
    category: 'Operations',
    icon: Monitor,
    colors: {
      primary: 'emerald-500',
      secondary: 'green-500',
      accent: 'emerald-100',
      background: 'from-emerald-50 to-green-50'
    },
    services: ['CloudWatch', 'CloudTrail', 'Config', 'Systems Manager', 'CloudFormation'],
    description: 'Monitor, manage, and automate your AWS infrastructure effectively.'
  },
  {
    id: 'aiml',
    name: 'AI & Machine Learning',
    category: 'Advanced Services',
    icon: Zap,
    colors: {
      primary: 'violet-500',
      secondary: 'purple-500',
      accent: 'violet-100',
      background: 'from-violet-50 to-purple-50'
    },
    services: ['SageMaker', 'Rekognition', 'Comprehend', 'Polly', 'Lex'],
    description: 'Explore AI and ML services to build intelligent applications on AWS.'
  }
];

export const CourseThemeShowcase: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<CourseTheme>(courseThemes[0]);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-4 flex items-center justify-center gap-3">
          <Monitor className="w-8 h-8 text-pink-600 dark:text-pink-400" />
          <span>Course Themes</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          AWS service-specific themes with optimized colors and components for different learning paths.
        </p>
      </div>

      {/* Theme Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {courseThemes.map((theme) => {
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
              onClick={() => setSelectedTheme(theme)}
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

      {/* Selected Theme Demo */}
      <Card className={`p-8 bg-gradient-to-br ${selectedTheme.colors.background} dark:from-gray-800 dark:to-gray-700 border-2 border-${selectedTheme.colors.primary} dark:border-${selectedTheme.colors.primary}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Theme Information */}
          <div>
            <div className="flex items-center mb-6">
              <div className={`w-16 h-16 bg-${selectedTheme.colors.primary} rounded-2xl flex items-center justify-center mr-6`}>
                <selectedTheme.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className={`text-3xl font-black text-${selectedTheme.colors.primary.replace('500', '900')} dark:text-${selectedTheme.colors.primary.replace('500', '200')} mb-2`}>
                  {selectedTheme.name}
                </h2>
                <p className={`text-lg text-${selectedTheme.colors.primary.replace('500', '700')} dark:text-${selectedTheme.colors.primary.replace('500', '300')}`}>
                  {selectedTheme.category}
                </p>
              </div>
            </div>
            
            <p className={`text-${selectedTheme.colors.primary.replace('500', '800')} dark:text-${selectedTheme.colors.primary.replace('500', '200')} mb-6 leading-relaxed`}>
              {selectedTheme.description}
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                courseTheme={selectedTheme.id as any}
                className="w-full"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                START {selectedTheme.name.toUpperCase()}
              </Button>
              
              <Button 
                courseTheme={selectedTheme.id as any}
                variant="outline"
                className="w-full"
              >
                PREVIEW LESSONS
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  courseTheme={selectedTheme.id as any}
                  size="sm"
                  loading={true}
                >
                  Loading State
                </Button>
                <Button 
                  courseTheme={selectedTheme.id as any}
                  size="sm"
                  disabled={true}
                >
                  Disabled State
                </Button>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div>
            <h3 className={`text-xl font-bold text-${selectedTheme.colors.primary.replace('500', '900')} mb-6`}>
              Covered Services
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {selectedTheme.services.map((service, index) => (
                <div 
                  key={service}
                  className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/40"
                >
                  <div className="flex items-center">
                    <div className={`
                      w-10 h-10 bg-${selectedTheme.colors.accent} rounded-lg flex items-center justify-center mr-3
                    `}>
                      <CheckCircle className={`w-5 h-5 text-${selectedTheme.colors.primary}`} />
                    </div>
                    <div>
                      <h4 className={`font-bold text-${selectedTheme.colors.primary.replace('500', '900')}`}>
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
                <span className={`text-sm font-semibold text-${selectedTheme.colors.primary.replace('500', '800')} dark:text-${selectedTheme.colors.primary.replace('500', '200')}`}>
                  Course Progress
                </span>
                <span className={`text-sm font-bold text-${selectedTheme.colors.primary} dark:text-${selectedTheme.colors.primary.replace('500', '300')}`}>
                  73%
                </span>
              </div>
              <div className="w-full bg-white/80 dark:bg-gray-700/80 rounded-full h-3 overflow-hidden">
                <div 
                  className={`bg-gradient-to-r from-${selectedTheme.colors.primary} to-${selectedTheme.colors.secondary} h-3 rounded-full transition-all duration-500`}
                  style={{ width: '73%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CourseThemeShowcase;
