"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { COLOR_THEME, COURSE_THEMES } from "@/lib/config";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ThemeConfig {
  themeName: string;
  colors: {
    primary: Record<string, string>;
    success: Record<string, string>;
    error: Record<string, string>;
    info: Record<string, string>;
    neutral: Record<string, string>;
  };
}

interface CourseThemeConfigProps {
  courseId: number;
  initialThemeConfig?: ThemeConfig;
  onSave?: (themeConfig: ThemeConfig) => void;
}

export const CourseThemeConfig = ({ courseId, initialThemeConfig, onSave }: CourseThemeConfigProps) => {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(
    initialThemeConfig || {
      themeName: 'default',
      colors: {
        primary: { ...COLOR_THEME.primary },
        success: { ...COLOR_THEME.success },
        error: { ...COLOR_THEME.error },
        info: { ...COLOR_THEME.info },
        neutral: { ...COLOR_THEME.neutral },
      }
    }
  );

  const [isLoading, setIsLoading] = useState(false);

  const presetThemes = [
    { key: 'default', name: 'Default (Orange)', color: '#f97316' },
    { key: 'cloud', name: 'Cloud (Orange)', color: '#f97316' },
    { key: 'architecture', name: 'Architecture (Blue)', color: '#3b82f6' },
    { key: 'development', name: 'Development (Green)', color: '#22c55e' },
    { key: 'devops', name: 'DevOps (Purple)', color: '#8b5cf6' },
    { key: 'custom', name: 'Custom Colors', color: null }
  ];

  const colorShades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

  const handlePresetThemeChange = (presetKey: string) => {
    if (presetKey === 'custom') {
      setThemeConfig({
        ...themeConfig,
        themeName: 'custom'
      });
      return;
    }

    const presetTheme = COURSE_THEMES[presetKey as keyof typeof COURSE_THEMES];
    if (presetTheme) {
      setThemeConfig({
        themeName: presetKey,
        colors: {
          primary: { ...presetTheme.colors.primary },
          success: { ...presetTheme.colors.success },
          error: { ...presetTheme.colors.error },
          info: { ...presetTheme.colors.info },
          neutral: { ...presetTheme.colors.neutral },
        }
      });
    }
  };

  const handleColorChange = (colorType: keyof ThemeConfig['colors'], shade: string, value: string) => {
    setThemeConfig({
      ...themeConfig,
      colors: {
        ...themeConfig.colors,
        [colorType]: {
          ...themeConfig.colors[colorType],
          [shade]: value
        }
      }
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/courses/${courseId}/theme`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(themeConfig),
      });

      if (!response.ok) {
        throw new Error('Failed to save theme configuration');
      }

      toast.success('Theme configuration saved successfully!');
      onSave?.(themeConfig);
    } catch (error) {
      console.error('Error saving theme config:', error);
      toast.error('Failed to save theme configuration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🎨 Course Theme Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Preset Theme Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Theme Preset</label>
          <select 
            value={themeConfig.themeName} 
            onChange={(e: ChangeEvent<HTMLSelectElement>) => handlePresetThemeChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {presetThemes.map((theme) => (
              <option key={theme.key} value={theme.key}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>

        {/* Theme Preview */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Theme Preview</label>
          <div className="grid grid-cols-5 gap-2">
            {(['primary', 'success', 'error', 'info', 'neutral'] as const).map((colorType) => (
              <div key={colorType} className="text-center">
                <div 
                  className="w-full h-12 rounded border mb-1"
                  style={{ backgroundColor: themeConfig.colors[colorType]['500'] }}
                />
                <span className="text-xs capitalize">{colorType}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Color Configuration */}
        {themeConfig.themeName === 'custom' && (
          <div className="space-y-4">
            <label className="text-sm font-medium">Custom Colors</label>
            {(['primary', 'success', 'error', 'info', 'neutral'] as const).map((colorType) => (
              <Card key={colorType} className="p-4">
                <h4 className="font-medium capitalize mb-3">{colorType} Colors</h4>
                <div className="grid grid-cols-5 gap-2">
                  {colorShades.map((shade) => (
                    <div key={shade} className="space-y-1">
                      <label className="text-xs">{shade}</label>
                      <div className="flex items-center gap-1">
                        <input
                          type="color"
                          value={themeConfig.colors[colorType][shade]}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleColorChange(colorType, shade, e.target.value)}
                          className="w-8 h-8 p-0 border rounded"
                        />
                        <input
                          type="text"
                          value={themeConfig.colors[colorType][shade]}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => handleColorChange(colorType, shade, e.target.value)}
                          className="flex-1 text-xs p-1 border rounded"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Main Color Customization for Presets */}
        {themeConfig.themeName !== 'custom' && (
          <div className="space-y-3">
            <label className="text-sm font-medium">Primary Color Override</label>
            <p className="text-xs text-gray-500">
              Customize the main brand color while keeping the preset theme structure
            </p>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={themeConfig.colors.primary['500']}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  // Update all primary shades based on the main color
                  // This is a simplified version - you could implement proper color generation
                  handleColorChange('primary', '500', e.target.value);
                }}
                className="w-12 h-10 p-0 border rounded"
              />
              <input
                type="text"
                value={themeConfig.colors.primary['500']}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleColorChange('primary', '500', e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="#f97316"
              />
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Theme Configuration'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};