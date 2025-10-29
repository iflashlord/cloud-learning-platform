export type AiEngine = "assistant" | "prompt"

export interface ConversationEntry {
  id: string
  prompt: string
  answer: string
  origin: string
  originLabel: string
  engine: AiEngine
  createdAt: string
}

export interface ExternalPromptRequest {
  id: string
  label: string
  prompt: string
  preferredEngine?: AiEngine
}

export interface PromptExecutionRequest {
  prompt: string
  label: string
  origin: string
  preferredEngine?: AiEngine
  trackActionId?: string | null
  requestId?: string
  isExternal?: boolean
  onComplete?: (entry: ConversationEntry) => void
}

export type SavedConversationEntry = ConversationEntry & { savedAt?: string }

export interface PromptStats {
  maxTokens?: number
  tokensUsed?: number
  tokensLeft?: number
}
