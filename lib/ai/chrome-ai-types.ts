export type ChromeSummarizerAvailability =
  | string
  | {
      available?: string
      status?: string
    }

export type ChromeSummarizerCreateOptions = {
  sharedContext?: string
  type?: string
  format?: string
  length?: string
}

export type ChromeSummarizerInput = string | { text: string }

export type ChromeSummarizerOptions = {
  context?: string
}

export interface ChromeSummarizerInstance {
  summarize(input: ChromeSummarizerInput, options?: ChromeSummarizerOptions): Promise<any>
}

export interface ChromeSummarizerNamespace {
  create(options?: ChromeSummarizerCreateOptions): Promise<ChromeSummarizerInstance>
  availability?(): Promise<ChromeSummarizerAvailability>
  capabilities?(): Promise<ChromeSummarizerAvailability>
}

export interface ChromeAssistantSession {
  prompt(message: string): Promise<string>
  promptStreaming?(message: string): AsyncIterable<string>
}

export interface ChromeAssistantNamespace {
  create(options?: { systemPrompt?: string; temperature?: number; topK?: number }): Promise<
    ChromeAssistantSession
  >
}

export interface ChromeAI {
  assistant?: ChromeAssistantNamespace
  summarizer?: ChromeSummarizerNamespace
  languageModel?: unknown
}
