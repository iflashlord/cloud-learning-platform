import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      reporter: ["text", "lcov"],
      include: [
        "components/enhanced-learn-header.tsx",
        "components/lesson/**/*.{ts,tsx}",
        "components/admin/users/useUserManagement.tsx",
        "app/(main)/quests/page.tsx",
      ],
      exclude: [
        "**/*.d.ts",
        "**/__tests__/**",
        "app/(marketing)/**/page.tsx", // server components indirectly covered
      ],
    },
    exclude: [
      "node_modules",
      ".next",
      "dist",
    ],
  },
  esbuild: {
    jsx: "automatic",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "@design-system": path.resolve(__dirname, "design-system"),
    },
  },
});
