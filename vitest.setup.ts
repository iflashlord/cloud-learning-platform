import "@testing-library/jest-dom/vitest";

import React from "react";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ComponentProps<"img">) => {
    return React.createElement("img", props);
  },
}));

vi.mock("next/link", () => ({
  __esModule: true,
  default: (props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => {
    const { href, children, ...rest } = props;
    return React.createElement("a", { href, ...rest }, children);
  },
}));

vi.mock("@/db/drizzle", () => ({
  __esModule: true,
  default: {
    query: {},
  },
}));
