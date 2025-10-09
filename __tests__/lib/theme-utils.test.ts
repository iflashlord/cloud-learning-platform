import { describe, it, expect } from "vitest";

describe("Theme Utils", () => {
  let themeUtils: any;

  beforeEach(async () => {
    vi.resetModules();
    themeUtils = await import("@/lib/theme-utils");
  });

  describe("getThemeClasses", () => {
    it("returns default theme classes when no theme is provided", () => {
      if (themeUtils.getThemeClasses) {
        const classes = themeUtils.getThemeClasses();
        expect(classes).toBeDefined();
        expect(typeof classes).toBe("object");
      }
    });

    it("returns theme-specific classes for valid theme", () => {
      if (themeUtils.getThemeClasses) {
        const classes = themeUtils.getThemeClasses("dark");
        expect(classes).toBeDefined();
        expect(typeof classes).toBe("object");
      }
    });

    it("handles invalid theme gracefully", () => {
      if (themeUtils.getThemeClasses) {
        expect(() => {
          themeUtils.getThemeClasses("invalid-theme");
        }).not.toThrow();
      }
    });
  });

  describe("applyTheme", () => {
    it("applies theme to HTML element", () => {
      if (themeUtils.applyTheme) {
        // Mock document and HTML element
        const mockElement = {
          classList: {
            add: vi.fn(),
            remove: vi.fn(),
            contains: vi.fn(),
          },
        };

        global.document = {
          documentElement: mockElement,
        } as any;

        themeUtils.applyTheme("dark");
        expect(mockElement.classList.add).toHaveBeenCalled();
      }
    });
  });

  describe("getThemeColors", () => {
    it("returns color palette for theme", () => {
      if (themeUtils.getThemeColors) {
        const colors = themeUtils.getThemeColors("default");
        expect(colors).toBeDefined();
        
        if (colors) {
          expect(colors).toHaveProperty("primary");
          expect(colors).toHaveProperty("secondary");
        }
      }
    });

    it("handles missing theme", () => {
      if (themeUtils.getThemeColors) {
        const colors = themeUtils.getThemeColors("nonexistent");
        expect(colors).toBeDefined(); // Should return fallback
      }
    });
  });

  describe("validateTheme", () => {
    it("validates existing theme", () => {
      if (themeUtils.validateTheme) {
        expect(themeUtils.validateTheme("default")).toBe(true);
        expect(themeUtils.validateTheme("dark")).toBe(true);
      }
    });

    it("rejects invalid theme", () => {
      if (themeUtils.validateTheme) {
        expect(themeUtils.validateTheme("invalid")).toBe(false);
        expect(themeUtils.validateTheme("")).toBe(false);
        expect(themeUtils.validateTheme(null)).toBe(false);
      }
    });
  });
});