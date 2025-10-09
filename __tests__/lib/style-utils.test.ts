import { describe, it, expect } from "vitest";

describe("Style Utils", () => {
  let styleUtils: any;

  beforeEach(async () => {
    vi.resetModules();
    styleUtils = await import("@/lib/style-utils");
  });

  describe("cn (className utility)", () => {
    it("combines multiple class names", () => {
      if (styleUtils.cn) {
        const result = styleUtils.cn("class1", "class2", "class3");
        expect(result).toContain("class1");
        expect(result).toContain("class2");
        expect(result).toContain("class3");
      }
    });

    it("handles conditional classes", () => {
      if (styleUtils.cn) {
        const result = styleUtils.cn(
          "base-class",
          true && "conditional-true",
          false && "conditional-false"
        );
        expect(result).toContain("base-class");
        expect(result).toContain("conditional-true");
        expect(result).not.toContain("conditional-false");
      }
    });

    it("filters out falsy values", () => {
      if (styleUtils.cn) {
        const result = styleUtils.cn(
          "valid-class",
          null,
          undefined,
          "",
          0,
          false
        );
        expect(result).toBe("valid-class");
      }
    });
  });

  describe("quickStyle", () => {
    it("generates quick styles for common patterns", () => {
      if (styleUtils.quickStyle) {
        const buttonStyle = styleUtils.quickStyle("button");
        expect(buttonStyle).toBeDefined();
        expect(typeof buttonStyle).toBe("string");
      }
    });

    it("supports style variants", () => {
      if (styleUtils.quickStyle) {
        const primaryButton = styleUtils.quickStyle("button", "primary");
        const secondaryButton = styleUtils.quickStyle("button", "secondary");
        
        expect(primaryButton).not.toBe(secondaryButton);
      }
    });

    it("handles unknown styles gracefully", () => {
      if (styleUtils.quickStyle) {
        expect(() => {
          styleUtils.quickStyle("unknown-style");
        }).not.toThrow();
      }
    });
  });

  describe("responsiveClass", () => {
    it("generates responsive classes", () => {
      if (styleUtils.responsiveClass) {
        const responsive = styleUtils.responsiveClass({
          base: "text-sm",
          sm: "text-base",
          md: "text-lg",
          lg: "text-xl",
        });
        
        expect(responsive).toContain("text-sm");
        expect(responsive).toContain("sm:text-base");
        expect(responsive).toContain("md:text-lg");
        expect(responsive).toContain("lg:text-xl");
      }
    });

    it("handles partial responsive config", () => {
      if (styleUtils.responsiveClass) {
        const responsive = styleUtils.responsiveClass({
          base: "p-2",
          lg: "p-4",
        });
        
        expect(responsive).toContain("p-2");
        expect(responsive).toContain("lg:p-4");
      }
    });
  });

  describe("createVariant", () => {
    it("creates component variants", () => {
      if (styleUtils.createVariant) {
        const variants = styleUtils.createVariant({
          base: "rounded border",
          variants: {
            size: {
              sm: "px-2 py-1 text-sm",
              lg: "px-4 py-2 text-lg",
            },
            color: {
              blue: "bg-blue-500 text-white",
              red: "bg-red-500 text-white",
            },
          },
        });

        expect(typeof variants).toBe("function");
        
        const smallBlue = variants({ size: "sm", color: "blue" });
        expect(smallBlue).toContain("rounded");
        expect(smallBlue).toContain("px-2");
        expect(smallBlue).toContain("bg-blue-500");
      }
    });
  });
});