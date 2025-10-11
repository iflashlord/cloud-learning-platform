/**
 * Design System Documentation Components
 * 
 * Interactive components for showcasing and testing the design system
 */
'use client';

import React, { useState } from 'react';
import { 
  BRAND_COLORS, 
  AWS_SERVICE_COLORS, 
  STATUS_COLORS, 
  NEUTRAL_COLORS,
  GAMIFICATION_COLORS,
  colorUtils 
} from '../foundations/colors';
import { 
  TYPOGRAPHY_VARIANTS, 
  FONT_FAMILIES, 
  FONT_WEIGHTS,
  typographyUtils 
} from '../foundations/typography';
import { 
  SPACING_SCALE, 
  SEMANTIC_SPACING, 
  BORDER_RADIUS, 
  SHADOWS,
  spacingUtils 
} from '../foundations/spacing';
import { 
  ANIMATIONS, 
  DURATIONS, 
  EASINGS,
  animationUtils 
} from '../foundations/motion';
import { Copy, Check, Eye, Code, Palette, Type, Layout, Zap } from 'lucide-react';

interface ColorSwatchProps {
  name: string;
  value: string;
  description?: string;
}

export const ColorSwatch: React.FC<ColorSwatchProps> = ({ name, value, description }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative">
      <div 
        className="w-full h-20 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-200 hover:scale-105"
        style={{ backgroundColor: value }}
        onClick={copyToClipboard}
      />
      <div className="mt-2">
        <div className="font-medium text-sm text-gray-900 dark:text-gray-100">{name}</div>
        <div className="font-mono text-xs text-gray-500 dark:text-gray-400">{value}</div>
        {description && (
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{description}</div>
        )}
      </div>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        )}
      </button>
    </div>
  );
};

interface ColorPaletteProps {
  title: string;
  colors: Record<string, any>;
  description?: string;
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({ title, colors, description }) => {
  const renderColorScale = (colorName: string, colorScale: Record<string, string>) => (
    <div key={colorName} className="mb-8">
      <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100 capitalize">{colorName}</h4>
      <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
        {Object.entries(colorScale).map(([shade, value]) => (
          <ColorSwatch 
            key={`${colorName}-${shade}`}
            name={shade}
            value={value}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <Palette className="w-6 h-6 text-blue-600" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>
      </div>
      {description && (
        <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
      )}
      <div className="space-y-6">
        {Object.entries(colors).map(([colorName, colorScale]) => 
          typeof colorScale === 'object' ? 
            renderColorScale(colorName, colorScale) : 
            <ColorSwatch key={colorName} name={colorName} value={colorScale} />
        )}
      </div>
    </div>
  );
};

interface TypographyShowcaseProps {
  variant: any;
  label: string;
  sampleText?: string;
}

export const TypographyShowcase: React.FC<TypographyShowcaseProps> = ({ 
  variant, 
  label, 
  sampleText = "The quick brown fox jumps over the lazy dog" 
}) => {
  const [showCode, setShowCode] = useState(false);

  const styles = {
    fontFamily: variant.fontFamily?.join(', '),
    fontSize: variant.fontSize,
    lineHeight: variant.lineHeight,
    fontWeight: variant.fontWeight,
    letterSpacing: variant.letterSpacing,
    textTransform: variant.textTransform,
  };

  return (
    <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-900 dark:text-gray-100">{label}</h4>
        <button
          onClick={() => setShowCode(!showCode)}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {showCode ? <Eye className="w-4 h-4" /> : <Code className="w-4 h-4" />}
        </button>
      </div>
      
      {showCode ? (
        <pre className="text-sm bg-gray-100 dark:bg-gray-900 p-4 rounded font-mono overflow-x-auto">
          {JSON.stringify(variant, null, 2)}
        </pre>
      ) : (
        <div style={styles} className="text-gray-900 dark:text-gray-100">
          {sampleText}
        </div>
      )}
    </div>
  );
};

interface SpacingDemoProps {
  value: string;
  label: string;
}

export const SpacingDemo: React.FC<SpacingDemoProps> = ({ value, label }) => {
  return (
    <div className="flex items-center gap-4 p-3 border border-gray-200 dark:border-gray-700 rounded">
      <div 
        className="bg-blue-500 rounded"
        style={{ width: value, height: '1rem' }}
      />
      <div className="flex-1">
        <div className="font-medium text-sm text-gray-900 dark:text-gray-100">{label}</div>
        <div className="font-mono text-xs text-gray-500 dark:text-gray-400">{value}</div>
      </div>
    </div>
  );
};

interface AnimationDemoProps {
  animation: any;
  label: string;
}

export const AnimationDemo: React.FC<AnimationDemoProps> = ({ animation, label }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
  };

  return (
    <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-gray-900 dark:text-gray-100">{label}</h4>
        <button
          onClick={triggerAnimation}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Play
        </button>
      </div>
      
      <div className="flex items-center justify-center h-20 bg-gray-50 dark:bg-gray-900 rounded">
        <div 
          className={`w-8 h-8 bg-blue-500 rounded ${isAnimating ? 'animate-pulse' : ''}`}
          style={{
            transition: isAnimating ? `all ${animation.duration} ${animation.easing}` : 'none',
            transform: isAnimating ? (animation.to?.transform || 'scale(1.2)') : 'scale(1)',
            opacity: isAnimating ? (animation.to?.opacity || 1) : 1,
          }}
        />
      </div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <div>Duration: {animation.duration}</div>
        <div>Easing: {animation.easing}</div>
      </div>
    </div>
  );
};

export const ComponentShowcase: React.FC<{ 
  title: string; 
  children: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ title, children, icon }) => {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        {icon}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
};

export const DesignTokenTable: React.FC<{ 
  tokens: Record<string, any>; 
  title: string;
  keyLabel?: string;
  valueLabel?: string;
}> = ({ 
  tokens, 
  title, 
  keyLabel = "Token", 
  valueLabel = "Value" 
}) => {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {Object.entries(tokens).map(([key, value]) => (
          <div key={key} className="px-6 py-3 flex items-center justify-between">
            <div className="font-mono text-sm text-gray-900 dark:text-gray-100">{key}</div>
            <div className="font-mono text-sm text-gray-500 dark:text-gray-400">
              {typeof value === 'object' ? JSON.stringify(value) : value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const InteractiveDemo: React.FC<{
  title: string;
  controls: Record<string, any>;
  render: (props: any) => React.ReactNode;
}> = ({ title, controls, render }) => {
  const [props, setProps] = useState(
    Object.fromEntries(
      Object.entries(controls).map(([key, config]: [string, any]) => [
        key, 
        config.default || (config.options ? config.options[0] : '')
      ])
    )
  );

  const updateProp = (key: string, value: any) => {
    setProps(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      </div>
      
      <div className="p-6">
        <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
          {render(props)}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(controls).map(([key, config]: [string, any]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {config.label || key}
              </label>
              
              {config.type === 'select' ? (
                <select
                  value={props[key]}
                  onChange={(e) => updateProp(key, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  {config.options.map((option: string) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : config.type === 'boolean' ? (
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={props[key]}
                    onChange={(e) => updateProp(key, e.target.checked)}
                    className="mr-2"
                  />
                  {config.label || key}
                </label>
              ) : (
                <input
                  type={config.type || 'text'}
                  value={props[key]}
                  onChange={(e) => updateProp(key, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};