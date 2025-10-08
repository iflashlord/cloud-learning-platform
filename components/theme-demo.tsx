"use client";

import { useTheme } from "@/lib/theme";
import { useThemeClasses } from "@/lib/theme-utils";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ThemeDemo = () => {
  const { currentTheme, setThemeByName } = useTheme();
  const themeClasses = useThemeClasses();

  const themes = [
    { key: "default", name: "Default (Orange)", color: "🧡" },
    { key: "cloud", name: "Cloud (Orange)", color: "🧡" },
    { key: "architecture", name: "Architecture (Blue)", color: "🔵" },
    { key: "development", name: "Development (Green)", color: "🟢" },
    { key: "devops", name: "DevOps (Purple)", color: "🟣" }
  ] as const;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className={cn("text-3xl font-bold mb-2", themeClasses.primaryText)}>
          🎨 Dynamic Theme System
        </h1>
        <p className="text-gray-600 mb-4">
          Current Theme: <strong className={themeClasses.primaryText}>{currentTheme.name}</strong>
        </p>
        
        {/* Theme Switcher */}
        <div className="flex flex-wrap gap-2 mb-6">
          {themes.map((theme) => (
            <Button
              key={theme.key}
              variant={currentTheme.name === theme.name.split(" ")[0] ? "primary" : "ghost"}
              onClick={() => setThemeByName(theme.key)}
              className="text-sm"
            >
              {theme.color} {theme.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Theme Preview */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Primary Colors */}
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold mb-4">Primary Theme Colors</h3>
          <div className="space-y-3">
            <Button className={themeClasses.primaryButton}>
              Primary Button
            </Button>
            <div className={cn("p-3 rounded border", themeClasses.primaryBg)}>
              <span className={themeClasses.primaryText}>Primary Background & Text</span>
            </div>
            <div className={cn("p-3 rounded border-2", themeClasses.primaryBorder)}>
              Primary Border
            </div>
          </div>
        </div>

        {/* Status Colors */}
        <div className="p-6 border rounded-lg bg-white shadow-sm">
          <h3 className="font-semibold mb-4">Status Colors</h3>
          <div className="space-y-3">
            <Button className={themeClasses.successButton}>
              Success Button
            </Button>
            <Button className={themeClasses.errorButton}>
              Error Button
            </Button>
            <Button className={themeClasses.infoButton}>
              Info Button
            </Button>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className={cn("p-2 rounded text-center", themeClasses.successBg, themeClasses.successText)}>
                Success
              </div>
              <div className={cn("p-2 rounded text-center", themeClasses.errorBg, themeClasses.errorText)}>
                Error
              </div>
              <div className={cn("p-2 rounded text-center", themeClasses.infoBg, themeClasses.infoText)}>
                Info
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="p-6 mt-6 border rounded-lg bg-white shadow-sm">
        <h3 className="font-semibold mb-3">How to Use</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>Automatic:</strong> Theme changes automatically based on your active course</p>
          <p><strong>Manual:</strong> Use the buttons above to preview different course themes</p>
          <p><strong>Development:</strong> Import <code className="bg-gray-100 px-1 rounded">useThemeClasses</code> in your components</p>
        </div>
      </div>
    </div>
  );
};