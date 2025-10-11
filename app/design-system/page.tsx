'use client';

import React, { useState } from 'react';
import { 
  Palette, 
  Type, 
  Layout, 
  Zap, 
  Grid, 
  MousePointer, 
  Briefcase, 
  Compass,
  Star,
  Trophy,
  Monitor,
  XCircle,
  Info,
  Globe,
  AlertTriangle
} from 'lucide-react';

const DesignSystemPage = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Compass },
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'spacing', label: 'Spacing', icon: Layout },
    { id: 'motion', label: 'Motion', icon: Zap },
    { id: 'components', label: 'Components', icon: Grid },
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
      
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Design System
            </h1>
            <div className="flex items-center space-x-6">
              {navigationItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-12">
        {/* Overview Section */}
        <section id="overview" className="mb-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Design System
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A comprehensive design system for the AWS Learning Platform with interactive components, 
              semantic tokens, and comprehensive documentation for consistent user experiences.
            </p>
          </div>
        </section>

        {/* Colors Section */}
        <section id="colors" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">Color System</h2>
          
          {/* Brand Colors */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Brand Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="w-full h-16 bg-blue-600 rounded-lg mb-3"></div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Primary Blue</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">#2563eb</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="w-full h-16 bg-green-600 rounded-lg mb-3"></div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Success Green</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">#16a34a</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="w-full h-16 bg-red-600 rounded-lg mb-3"></div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Error Red</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">#dc2626</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="w-full h-16 bg-yellow-500 rounded-lg mb-3"></div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Warning Yellow</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">#eab308</p>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section id="typography" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">Typography</h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Heading 1</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">text-4xl font-bold</p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Heading 2</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">text-3xl font-bold</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Heading 3</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">text-2xl font-bold</p>
              </div>
              <div>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">Body Large - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">text-lg</p>
              </div>
              <div>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-2">Body Regular - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">text-base</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Body Small - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">text-sm</p>
              </div>
            </div>
          </div>
        </section>

        {/* Components Section */}
        <section id="components" className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8">Components</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Buttons */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Buttons</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Primary Button
                </button>
                <button className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                  Secondary Button
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                  Outline Button
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Cards</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Card Title</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This is a sample card component with some content to demonstrate the layout.
                </p>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Badges</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md dark:bg-blue-900 dark:text-blue-300">
                  Default
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-md dark:bg-green-900 dark:text-green-300">
                  Success
                </span>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded-md dark:bg-red-900 dark:text-red-300">
                  Error
                </span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-md dark:bg-yellow-900 dark:text-yellow-300">
                  Warning
                </span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default DesignSystemPage;