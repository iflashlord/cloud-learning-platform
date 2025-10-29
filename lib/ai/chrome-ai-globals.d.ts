import type { ChromeAI, ChromeSummarizerNamespace } from "./chrome-ai-types"

declare global {
  interface Navigator {
    ai?: ChromeAI
  }

  interface Window {
    ai?: ChromeAI
    Summarizer?: ChromeSummarizerNamespace
  }

  interface GlobalThis {
    Summarizer?: ChromeSummarizerNamespace
  }
}

export {}
