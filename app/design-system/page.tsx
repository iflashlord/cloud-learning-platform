import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CourseThemeShowcase from '@/components/course-theme-showcase';
import { DarkModeToggle } from '@/components/dark-mode-toggle';
import { 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  Star, 
  Trophy, 
  Heart,
  Settings,
  User,
  Book,
  Target,
  Zap,
  Shield,
  Globe,
  Database,
  Cloud,
  Cpu,
  Lock,
  Monitor,
  Smartphone,
  Wifi,
  Palette,
  Layers,
  Type,
  Gamepad2
} from 'lucide-react';

const DesignSystemPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <DarkModeToggle />
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black text-gray-900 dark:text-gray-100 mb-6 flex items-center justify-center gap-4">
            <Palette className="w-12 h-12 text-purple-500 dark:text-purple-400" />
            <span>Design System</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Complete UI component library featuring Duolingo-inspired design patterns,
            AWS course-specific themes, and comprehensive interactive examples.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <a href="#buttons" className="scroll-smooth">
            <Button variant="outline" className="hover:bg-blue-50 dark:hover:bg-blue-900/30 dark:border-gray-600 dark:text-gray-200">
              <Target className="w-4 h-4 mr-2" />
              Buttons
            </Button>
          </a>
          <a href="#cards" className="scroll-smooth">
            <Button variant="outline" className="hover:bg-purple-50 dark:hover:bg-purple-900/30 dark:border-gray-600 dark:text-gray-200">
              <Star className="w-4 h-4 mr-2" />
              Cards
            </Button>
          </a>
          <a href="#badges" className="scroll-smooth">
            <Button variant="outline" className="hover:bg-green-50 dark:hover:bg-green-900/30 dark:border-gray-600 dark:text-gray-200">
              <Badge className="w-4 h-4 mr-2" />
              Badges
            </Button>
          </a>
          <a href="#colors" className="scroll-smooth">
            <Button variant="outline" className="hover:bg-orange-50 dark:hover:bg-orange-900/30 dark:border-gray-600 dark:text-gray-200">
              <Zap className="w-4 h-4 mr-2" />
              Colors
            </Button>
          </a>
          <a href="#themes" className="scroll-smooth">
            <Button variant="outline" className="hover:bg-pink-50 dark:hover:bg-pink-900/30 dark:border-gray-600 dark:text-gray-200">
              <Trophy className="w-4 h-4 mr-2" />
              Themes
            </Button>
          </a>
        </div>

        {/* Buttons Section */}
        <section id="buttons" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Target className="w-8 h-8 text-blue-600" />
              <span>Buttons</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Duolingo-inspired button components with semantic variants and interactive states.
            </p>
          </div>

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
            <Card className="p-8 bg-white/70 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Secondary Actions</h3>
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

            {/* Button Sizes */}
            <Card className="p-8 bg-white/70 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Button Sizes</h3>
              <div className="space-y-4">
                <Button size="sm" className="w-full">Small Button</Button>
                <Button className="w-full">Default Button</Button>
                <Button size="lg" className="w-full">Large Button</Button>
              </div>
            </Card>

            {/* Interactive States */}
            <Card className="p-8 bg-white/70 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Interactive States</h3>
              <div className="space-y-4">
                <Button className="w-full hover:scale-105 transition-transform">
                  Hover Effect
                </Button>
                <Button disabled className="w-full">
                  Disabled State
                </Button>
                <Button className="w-full animate-pulse">
                  Loading State
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Cards Section */}
        <section id="cards" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-4 flex items-center justify-center gap-3">
              <Layers className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              <span>Cards</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Flexible card components for organizing content and creating engaging layouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Basic Card</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                A simple card with gradient background and standard padding.
              </p>
              <Button variant="outline" className="w-full">Action</Button>
            </Card>

            <Card className="p-6 bg-white dark:bg-gray-800 shadow-xl border-2 border-purple-200 dark:border-purple-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 dark:bg-purple-600 rounded-full flex items-center justify-center mr-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Featured Card</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Special highlight</p>
                </div>
              </div>
              <Button className="w-full">Get Started</Button>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700">
              <div className="text-center">
                <Trophy className="w-16 h-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-800 mb-2">Achievement Card</h3>
                <p className="text-green-600 mb-4">Progress tracking component</p>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100">Completed</Badge>
              </div>
            </Card>
          </div>
        </section>

        {/* Badges Section */}
        <section id="badges" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-4 flex items-center justify-center gap-3">
              <Star className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              <span>Badges</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Status indicators and labels with semantic meaning and proper contrast.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Default Badges */}
            <Card className="p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Core Variants</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="error">Error</Badge>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="info">Info</Badge>
                </div>
              </div>
            </Card>

            {/* Course Theme Badges */}
            <Card className="p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Course Themes</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant="compute">Compute</Badge>
                  <Badge variant="storage">Storage</Badge>
                  <Badge variant="security">Security</Badge>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant="networking">Networking</Badge>
                  <Badge variant="management">Management</Badge>
                  <Badge variant="aiml">AI/ML</Badge>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Typography Section */}
        <section id="typography" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-4 flex items-center justify-center gap-3">
              <Type className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              <span>Typography</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Consistent typography scale following design system principles.
            </p>
          </div>

          <Card className="p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl font-black text-gray-900 dark:text-gray-100 mb-2">Heading 1</h1>
                <code className="text-sm text-gray-500 dark:text-gray-400">text-5xl font-black</code>
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">Heading 2</h2>
                <code className="text-sm text-gray-500 dark:text-gray-400">text-4xl font-bold</code>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">Heading 3</h3>
                <code className="text-sm text-gray-500 dark:text-gray-400">text-2xl font-semibold</code>
              </div>
              <div>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">Large paragraph text for important descriptions.</p>
                <code className="text-sm text-gray-500 dark:text-gray-400">text-lg text-gray-600</code>
              </div>
              <div>
                <p className="text-base text-gray-600 dark:text-gray-400 mb-2">Regular paragraph text for standard content.</p>
                <code className="text-sm text-gray-500 dark:text-gray-400">text-base text-gray-600</code>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Small text for captions and secondary information.</p>
                <code className="text-sm text-gray-500 dark:text-gray-400">text-sm text-gray-500</code>
              </div>
            </div>
          </Card>
        </section>

        {/* Colors Section */}
        <section id="colors" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-4 flex items-center justify-center gap-3">
              <Palette className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              <span>Color Palette</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Semantic color system with consistent usage across components and WCAG AA compliant contrast ratios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Primary Colors */}
            <Card className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Primary</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg mr-3"></div>
                  <div>
                    <p className="text-sm font-medium">Blue 500</p>
                    <p className="text-xs text-gray-500">#3b82f6</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg mr-3"></div>
                  <div>
                    <p className="text-sm font-medium">Blue 600</p>
                    <p className="text-xs text-gray-500">#2563eb</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Success Colors */}
            <Card className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Success</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-lg mr-3 ring-1 ring-gray-200 dark:ring-gray-600"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Green 500</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">#22c55e</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg mr-3 ring-1 ring-gray-200 dark:ring-gray-600"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Emerald 500</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">#10b981</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Warning Colors */}
            <Card className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Warning</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg mr-3 ring-1 ring-gray-200 dark:ring-gray-600"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Yellow 500</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">#eab308</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg mr-3 ring-1 ring-gray-200 dark:ring-gray-600"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Orange 500</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">#f97316</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Error Colors */}
            <Card className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">Error</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-500 rounded-lg mr-3"></div>
                  <div>
                    <p className="text-sm font-medium">Red 500</p>
                    <p className="text-xs text-gray-500">#ef4444</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-pink-500 rounded-lg mr-3"></div>
                  <div>
                    <p className="text-sm font-medium">Pink 500</p>
                    <p className="text-xs text-gray-500">#ec4899</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Course Themes Section */}
        <section id="themes" className="mb-20">
          <CourseThemeShowcase />
        </section>

        {/* Interactive Examples */}
        <section id="examples" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-4 flex items-center justify-center gap-3">
              <Gamepad2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span>Interactive Examples</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Real-world usage examples showing how components work together in learning contexts.
            </p>
          </div>

          {/* Lesson Question Example */}
          <Card className="p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm mb-8 border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Lesson Question Interface</h3>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <Cloud className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-blue-900 dark:text-blue-100">AWS Fundamentals</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Question 3 of 10</p>
                </div>
              </div>
              
              <p className="text-lg text-gray-800 mb-6">
                Which AWS service provides scalable compute capacity in the cloud?
              </p>

              <div className="space-y-3 mb-6">
                <Button variant="outline" className="w-full justify-start text-left p-4 h-auto">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm flex items-center justify-center mr-3">A</span>
                  Amazon S3
                </Button>
                <Button variant="outline" className="w-full justify-start text-left p-4 h-auto bg-green-50 border-green-300">
                  <span className="w-6 h-6 rounded-full bg-green-500 text-white text-sm flex items-center justify-center mr-3">B</span>
                  Amazon EC2
                </Button>
                <Button variant="outline" className="w-full justify-start text-left p-4 h-auto">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm flex items-center justify-center mr-3">C</span>
                  Amazon RDS
                </Button>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Skip
                </Button>
                <Button variant="success" className="flex-1">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Check Answer
                </Button>
              </div>
            </div>
          </Card>

          {/* Progress Tracking Example */}
          <Card className="p-8 bg-white/90 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Progress Tracking</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">Lessons Completed</h4>
                <p className="text-3xl font-black text-green-500 mb-2">24</p>
                <Badge className="bg-green-100 text-green-800">+3 This Week</Badge>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">Current Streak</h4>
                <p className="text-3xl font-black text-blue-500 mb-2">7</p>
                <Badge className="bg-blue-100 text-blue-800">Days</Badge>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">Hearts Remaining</h4>
                <p className="text-3xl font-black text-orange-500 mb-2">3</p>
                <Badge className="bg-orange-100 text-orange-800">Lives</Badge>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default DesignSystemPage;
