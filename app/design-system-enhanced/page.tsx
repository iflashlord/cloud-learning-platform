'use client';

import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  ThemeSwitcher,
  Alert,
  AlertTitle,
  AlertDescription,
  Progress,
} from '@design-system/primitives';

// Import our enhanced design system components
import {
  ColorPalette,
  TypographyShowcase,
  SpacingDemo,
  AnimationDemo,
  ComponentShowcase,
  DesignTokenTable,
  InteractiveDemo,
} from '../../design-system/components/documentation';

import {
  BRAND_COLORS,
  AWS_SERVICE_COLORS,
  STATUS_COLORS,
  NEUTRAL_COLORS,
  GAMIFICATION_COLORS,
} from '../../design-system/foundations/colors';

import {
  TYPOGRAPHY_VARIANTS,
  FONT_WEIGHTS,
} from '../../design-system/foundations/typography';

import {
  SPACING_SCALE,
  BORDER_RADIUS,
  SHADOWS,
} from '../../design-system/foundations/spacing';

import {
  ANIMATIONS,
  DURATIONS,
  EASINGS,
} from '../../design-system/foundations/motion';

import { 
  CheckCircle, 
  XCircle, 
  Star, 
  Trophy, 
  Settings,
  User,
  Book,
  Palette,
  Type,
  Layout,
  Zap,
  Grid,
  MousePointer,
  Briefcase,
  Lightbulb,
  Rocket,
  Compass,
  Sparkles
} from 'lucide-react';

const EnhancedDesignSystemPage = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Compass },
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'spacing', label: 'Spacing', icon: Layout },
    { id: 'motion', label: 'Motion', icon: Zap },
    { id: 'components', label: 'Components', icon: Grid },
    { id: 'interactive', label: 'Interactive', icon: MousePointer },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Theme Switcher */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeSwitcher variant="compact" size="lg" />
      </div>

      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <span className="font-bold text-gray-900 dark:text-gray-100">AWS Design System</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <section id="overview" className="text-center mb-20">
          <div className="mb-12">
            <h1 className="text-6xl font-black text-gray-900 dark:text-gray-100 mb-6 flex items-center justify-center gap-4">
              <Rocket className="w-12 h-12 text-purple-500 dark:text-purple-400" />
              <span>Enhanced Design System</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              A comprehensive, production-ready design system for the AWS Learning Platform featuring 
              semantic color palettes, responsive typography, consistent spacing, fluid animations, 
              and interactive component documentation.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-400">Color Tokens</div>
            </Card>
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
              <div className="text-gray-600 dark:text-gray-400">Typography Scales</div>
            </Card>
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">30+</div>
              <div className="text-gray-600 dark:text-gray-400">Spacing Tokens</div>
            </Card>
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">25+</div>
              <div className="text-gray-600 dark:text-gray-400">Animations</div>
            </Card>
          </div>
        </section>

        {/* Colors Section */}
        <section id="colors">
          <ComponentShowcase 
            title="Color System" 
            icon={<Palette className="w-8 h-8 text-purple-600" />}
          >
            <ColorPalette 
              title="Brand Colors"
              colors={BRAND_COLORS}
              description="Primary brand colors for consistent visual identity across all AWS learning experiences."
            />
            
            <ColorPalette 
              title="AWS Service Colors"
              colors={AWS_SERVICE_COLORS}
              description="Service-specific colors for course theming and visual differentiation."
            />
            
            <ColorPalette 
              title="Status Colors"
              colors={STATUS_COLORS}
              description="Semantic colors for feedback, alerts, and system states."
            />
            
            <ColorPalette 
              title="Neutral Colors"
              colors={{ neutral: NEUTRAL_COLORS }}
              description="Comprehensive grayscale palette for text, backgrounds, and UI elements."
            />

            <ColorPalette 
              title="Gamification Colors"
              colors={GAMIFICATION_COLORS}
              description="Special colors for streaks, achievements, and learning progress."
            />
          </ComponentShowcase>
        </section>

        {/* Typography Section */}
        <section id="typography">
          <ComponentShowcase 
            title="Typography System" 
            icon={<Type className="w-8 h-8 text-blue-600" />}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Object.entries(TYPOGRAPHY_VARIANTS.heading).map(([key, variant]) => (
                <TypographyShowcase
                  key={key}
                  variant={variant}
                  label={`Heading ${key.toUpperCase()}`}
                  sampleText="AWS Cloud Computing Fundamentals"
                />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              {Object.entries(TYPOGRAPHY_VARIANTS.body).map(([key, variant]) => (
                <TypographyShowcase
                  key={key}
                  variant={variant}
                  label={`Body ${key}`}
                  sampleText="Learn cloud computing concepts through interactive lessons and hands-on labs designed to build real-world skills."
                />
              ))}
            </div>

            <DesignTokenTable
              tokens={FONT_WEIGHTS}
              title="Font Weights"
              keyLabel="Weight"
              valueLabel="CSS Value"
            />
          </ComponentShowcase>
        </section>

        {/* Spacing Section */}
        <section id="spacing">
          <ComponentShowcase 
            title="Spacing System" 
            icon={<Layout className="w-8 h-8 text-green-600" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(SPACING_SCALE).slice(0, 12).map(([key, value]) => (
                <SpacingDemo key={key} label={key} value={value} />
              ))}
            </div>

            <DesignTokenTable
              tokens={BORDER_RADIUS}
              title="Border Radius"
              keyLabel="Size"
              valueLabel="CSS Value"
            />

            <DesignTokenTable
              tokens={SHADOWS}
              title="Box Shadows"
              keyLabel="Level"
              valueLabel="CSS Value"
            />
          </ComponentShowcase>
        </section>

        {/* Motion Section */}
        <section id="motion">
          <ComponentShowcase 
            title="Motion System" 
            icon={<Zap className="w-8 h-8 text-orange-600" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(ANIMATIONS.entrance).slice(0, 6).map(([key, animation]) => (
                <AnimationDemo key={key} animation={animation} label={key} />
              ))}
            </div>

            <DesignTokenTable
              tokens={DURATIONS}
              title="Animation Durations"
              keyLabel="Speed"
              valueLabel="Time"
            />

            <DesignTokenTable
              tokens={EASINGS}
              title="Easing Functions"
              keyLabel="Type"
              valueLabel="CSS Value"
            />
          </ComponentShowcase>
        </section>

        {/* Interactive Components Section */}
        <section id="interactive">
          <ComponentShowcase 
            title="Interactive Playground" 
            icon={<MousePointer className="w-8 h-8 text-indigo-600" />}
          >
            <InteractiveDemo
              title="Button Variants"
              controls={{
                variant: {
                  type: 'select',
                  options: ['default', 'primary', 'secondary', 'outline', 'ghost', 'link'],
                  default: 'primary',
                  label: 'Variant'
                },
                size: {
                  type: 'select',
                  options: ['sm', 'md', 'lg', 'xl'],
                  default: 'md',
                  label: 'Size'
                },
                disabled: {
                  type: 'boolean',
                  default: false,
                  label: 'Disabled'
                }
              }}
              render={(props) => (
                <Button 
                  variant={props.variant}
                  size={props.size}
                  disabled={props.disabled}
                  className="w-full max-w-xs"
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Interactive Button
                </Button>
              )}
            />

            <InteractiveDemo
              title="Color Combinations"
              controls={{
                background: {
                  type: 'select',
                  options: ['white', 'gray-50', 'gray-100', 'gray-900', 'blue-50', 'green-50'],
                  default: 'white',
                  label: 'Background'
                },
                textColor: {
                  type: 'select',
                  options: ['gray-900', 'gray-700', 'gray-500', 'blue-600', 'green-600'],
                  default: 'gray-900',
                  label: 'Text Color'
                }
              }}
              render={(props) => (
                <div 
                  className={`p-6 rounded-lg bg-${props.background} text-${props.textColor}`}
                >
                  <h3 className="text-xl font-semibold mb-2">Sample Content</h3>
                  <p>This demonstrates how different color combinations work together in your design system.</p>
                </div>
              )}
            />
          </ComponentShowcase>
        </section>

        {/* UI Components Section */}
        <section id="components">
          <ComponentShowcase 
            title="UI Components" 
            icon={<Grid className="w-8 h-8 text-teal-600" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Primary Buttons */}
              <Card className="p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Primary Actions</h3>
                <div className="space-y-4">
                  <Button className="w-full">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Continue
                  </Button>
                  <Button variant="success" className="w-full">
                    <Trophy className="w-5 h-5 mr-2" />
                    Complete Lesson
                  </Button>
                  <Button variant="danger" className="w-full">
                    <XCircle className="w-5 h-5 mr-2" />
                    Try Again
                  </Button>
                </div>
              </Card>

              {/* Secondary Buttons */}
              <Card className="p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Secondary Actions</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <Settings className="w-5 h-5 mr-2" />
                    Settings
                  </Button>
                  <Button variant="ghost" className="w-full">
                    <User className="w-5 h-5 mr-2" />
                    Profile
                  </Button>
                  <Button variant="link" className="w-full">
                    <Book className="w-5 h-5 mr-2" />
                    Learn More
                  </Button>
                </div>
              </Card>
            </div>

            {/* Status Components */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Status Alerts</h3>
                <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <AlertTitle className="text-green-800 dark:text-green-200">Success</AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-300">
                    Your lesson has been completed successfully!
                  </AlertDescription>
                </Alert>
                
                <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <AlertTitle className="text-red-800 dark:text-red-200">Error</AlertTitle>
                  <AlertDescription className="text-red-700 dark:text-red-300">
                    Something went wrong. Please try again.
                  </AlertDescription>
                </Alert>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Progress & Badges</h3>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Course Progress</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success">AWS Certified</Badge>
                  <Badge variant="info">Cloud Practitioner</Badge>
                  <Badge variant="neutral">Advanced</Badge>
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                    <Star className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                </div>
              </div>
            </div>
          </ComponentShowcase>
        </section>

        {/* Footer */}
        <footer className="mt-20 py-12 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-purple-600" />
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Enhanced Design System v2.0
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Built with comprehensive foundations, interactive documentation, and production-ready components.
            </p>
            <div className="flex justify-center gap-4">
              <Badge variant="neutral">
                <Briefcase className="w-3 h-3 mr-1" />
                Production Ready
              </Badge>
              <Badge variant="neutral">
                <Zap className="w-3 h-3 mr-1" />
                Performance Optimized
              </Badge>
              <Badge variant="neutral">
                <Grid className="w-3 h-3 mr-1" />
                Fully Responsive
              </Badge>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default EnhancedDesignSystemPage;