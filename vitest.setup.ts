import "@testing-library/jest-dom/vitest";

import React from "react";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
    fill: _fill,
    priority: _priority,
    ...rest
  }: Partial<React.ComponentProps<"img">> & {
    src?: string
    alt?: string
    fill?: boolean
    priority?: boolean
  }) => {
    return React.createElement("img", { src, alt, width, height, ...rest });
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

const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  prefetch: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
};

const mockRedirect = vi.fn();

vi.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: () => mockRouter,
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  redirect: mockRedirect,
}));

beforeEach(() => {
  Object.values(mockRouter).forEach((fn) => fn.mockReset());
  mockRedirect.mockReset();
});

// expose mocks for tests needing direct access
(globalThis as any).__mockRouter = mockRouter;
(globalThis as any).__mockRedirect = mockRedirect;
