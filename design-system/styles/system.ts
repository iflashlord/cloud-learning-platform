export const createComponentStyles = {
  getStatusColor: (status: "success" | "error" | "warning" | "info" | "neutral") => {
    const colorMap: Record<typeof status, string> = {
      success:
        "text-[hsl(var(--ds-success-700))] bg-[hsl(var(--ds-success-50))] border-[hsl(var(--ds-success-200))] dark:text-[hsl(var(--ds-success-50))] dark:bg-[hsl(var(--ds-success-600))] dark:border-[hsl(var(--ds-success-500))]",
      error:
        "text-[hsl(var(--ds-error-700))] bg-[hsl(var(--ds-error-50))] border-[hsl(var(--ds-error-200))] dark:text-[hsl(var(--ds-error-50))] dark:bg-[hsl(var(--ds-error-600))] dark:border-[hsl(var(--ds-error-500))]",
      warning:
        "text-[hsl(var(--ds-warning-700))] bg-[hsl(var(--ds-warning-50))] border-[hsl(var(--ds-warning-200))] dark:text-[hsl(var(--ds-warning-50))] dark:bg-[hsl(var(--ds-warning-600))] dark:border-[hsl(var(--ds-warning-500))]",
      info:
        "text-[hsl(var(--ds-info-700))] bg-[hsl(var(--ds-info-50))] border-[hsl(var(--ds-info-200))] dark:text-[hsl(var(--ds-info-50))] dark:bg-[hsl(var(--ds-info-600))] dark:border-[hsl(var(--ds-info-500))]",
      neutral:
        "text-[hsl(var(--ds-neutral-700))] bg-[hsl(var(--ds-neutral-100))] border-[hsl(var(--ds-neutral-200))] dark:text-[hsl(var(--ds-neutral-0))] dark:bg-[hsl(var(--ds-neutral-800))] dark:border-[hsl(var(--ds-neutral-700))]",
    };
    return colorMap[status];
  },

  getInteractiveStyles: (enabled = true) => {
    if (!enabled) return "opacity-50 cursor-not-allowed";
    return "cursor-pointer transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0";
  },

  getShadowLevel: (level: 0 | 1 | 2 | 3 | 4) => {
    const shadows = ["shadow-none", "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl"];
    return shadows[level];
  },

  getFocusStyles: (color: "blue" | "green" | "red" | "yellow" = "blue") => {
    const colorToken = {
      blue: "var(--ds-info-500)",
      green: "var(--ds-success-500)",
      red: "var(--ds-error-500)",
      yellow: "var(--ds-warning-500)",
    }[color];
    return `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[hsl(${colorToken})]`;
  },
};

export const THEME_STYLES = {
  container: {
    page: "min-h-screen bg-[hsl(var(--ds-neutral-50))] dark:bg-[hsl(var(--ds-neutral-900))]",
    content:
      "mx-auto max-w-7xl px-[var(--ds-space-lg)] sm:px-[var(--ds-space-xl)] lg:px-[var(--ds-space-2xl)]",
    section: "py-[var(--ds-space-xl)] lg:py-[var(--ds-space-2xl)]",
  },
  text: {
    heading: {
      h1: "text-[length:var(--ds-text-3xl)] lg:text-[length:var(--ds-text-4xl)] font-extrabold text-[hsl(var(--ds-neutral-900))] dark:text-[hsl(var(--ds-neutral-0))] tracking-tight",
      h2: "text-[length:var(--ds-text-2xl)] lg:text-[length:var(--ds-text-3xl)] font-bold text-[hsl(var(--ds-neutral-900))] dark:text-[hsl(var(--ds-neutral-0))] tracking-tight",
      h3: "text-[length:var(--ds-text-xl)] lg:text-[length:var(--ds-text-2xl)] font-semibold text-[hsl(var(--ds-neutral-900))] dark:text-[hsl(var(--ds-neutral-50))]",
      h4: "text-[length:var(--ds-text-lg)] lg:text-[length:var(--ds-text-xl)] font-semibold text-[hsl(var(--ds-neutral-900))] dark:text-[hsl(var(--ds-neutral-100))]",
    },
    body: {
      large: "text-[length:var(--ds-text-lg)] text-[hsl(var(--ds-neutral-700))] dark:text-[hsl(var(--ds-neutral-300))] leading-relaxed",
      base: "text-[length:var(--ds-text-base)] text-[hsl(var(--ds-neutral-700))] dark:text-[hsl(var(--ds-neutral-300))] leading-normal",
      small: "text-[length:var(--ds-text-sm)] text-[hsl(var(--ds-neutral-600))] dark:text-[hsl(var(--ds-neutral-400))] leading-normal",
      xs: "text-[length:var(--ds-text-xs)] text-[hsl(var(--ds-neutral-500))] dark:text-[hsl(var(--ds-neutral-500))] leading-normal",
    },
    emphasis: {
      strong: "font-semibold text-[hsl(var(--ds-neutral-900))] dark:text-[hsl(var(--ds-neutral-50))]",
      muted: "text-[hsl(var(--ds-neutral-500))] dark:text-[hsl(var(--ds-neutral-500))]",
      accent: "text-[hsl(var(--ds-info-600))] dark:text-[hsl(var(--ds-info-400))] font-medium",
    },
  },
  layout: {
    stack: "flex flex-col gap-[var(--ds-space-lg)]",
    stackLg: "flex flex-col gap-[var(--ds-space-xl)]",
    stackXl: "flex flex-col gap-[var(--ds-space-2xl)]",
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--ds-space-xl)]",
    flexRow: "flex items-center gap-[var(--ds-space-md)]",
    flexCol: "flex flex-col gap-[var(--ds-space-md)]",
    flexBetween: "flex items-center justify-between",
    flexCenter: "flex items-center justify-center",
  },
};
