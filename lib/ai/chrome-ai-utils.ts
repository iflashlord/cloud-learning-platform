export const resolveNavigatorAi = () => {
  if (typeof window === "undefined") return null
  return (window.navigator as any)?.ai ?? null
}

export const resolveAssistantApi = () => {
  const navigatorAi = resolveNavigatorAi()
  const globalScope = typeof window !== "undefined" ? (window as any) : {}
  return globalScope.ai?.assistant || navigatorAi?.assistant || null
}

export const resolveSummarizerApi = () => {
  const navigatorAi = resolveNavigatorAi()
  const globalScope = typeof window !== "undefined" ? (window as any) : {}
  return globalScope.Summarizer || navigatorAi?.summarizer || null
}

export const resolveLanguageModelApi = () => {
  const navigatorAi = resolveNavigatorAi()
  const globalScope = typeof window !== "undefined" ? (window as any) : {}
  return (
    navigatorAi?.languageModel ||
    globalScope.ai?.languageModel ||
    globalScope.LanguageModel ||
    null
  )
}
