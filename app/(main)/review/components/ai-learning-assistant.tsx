"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Sparkles,
  Crown,
  Zap,
  WifiOff,
  Lightbulb,
  BookOpen,
  Target,
  HelpCircle,
  Loader2,
  AlertCircle,
} from "lucide-react"

interface AILearningAssistantProps {
  lessonData: any
  completionData: any
  isPro?: boolean
  isFullWidth?: boolean
}

export const AILearningAssistant = ({
  lessonData,
  completionData,
  isPro = false,
  isFullWidth = false,
}: AILearningAssistantProps) => {
  const [chromeAISupported, setChromeAISupported] = useState(false)
  const [aiCapabilities, setAiCapabilities] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [result, setResult] = useState<string>("")
  const [customPrompt, setCustomPrompt] = useState("")
  const [aiSession, setAiSession] = useState<any>(null)

  useEffect(() => {
    checkChromeAI()
    return () => {
      // Clean up AI session on unmount
      if (aiSession) {
        aiSession.destroy?.()
      }
    }
  }, [aiSession])

  const checkChromeAI = async () => {
    try {
      if (typeof window !== "undefined" && "ai" in window && (window as any).ai?.assistant) {
        setChromeAISupported(true)
        setAiCapabilities({ available: "readily" })
      }
    } catch (error) {
      console.log("Chrome AI not available:", error)
      setChromeAISupported(false)
    }
  }

  const initializeAI = async () => {
    if (!(window as any).ai?.assistant) return null

    try {
      const systemPrompt = `You are an expert AI tutor helping students review and understand lesson content. 
      
Lesson: "${lessonData.title}"
Course: ${lessonData.unit.course.title}
Unit: ${lessonData.unit.title}
Student Score: ${completionData.score}%

Available challenges and content:
${lessonData.challenges
  .map(
    (c: any, i: number) => `
${i + 1}. ${c.question}
   Type: ${c.type}
   ${c.challengeOptions ? `Options: ${c.challengeOptions.map((o: any) => o.text).join(", ")}` : ""}
   ${c.correctAnswer ? `Answer: ${c.correctAnswer}` : ""}
   ${c.hint ? `Hint: ${c.hint}` : ""}
   ${c.explanation ? `Explanation: ${c.explanation}` : ""}
`,
  )
  .join("")}

Provide concise, helpful, and educational responses. Focus on helping the student understand concepts better.`

      const session = await (window as any).ai.assistant.create({
        systemPrompt,
        temperature: 0.7,
        topK: 8,
      })

      setAiSession(session)
      return session
    } catch (error) {
      console.error("Failed to initialize AI:", error)
      return null
    }
  }

  const handleAIAction = async (action: string, prompt?: string) => {
    setIsLoading(true)
    setSelectedAction(action)
    setResult("")

    try {
      let session = aiSession
      if (!session) {
        session = await initializeAI()
        if (!session) {
          setResult("Failed to initialize AI assistant. Please try again.")
          setIsLoading(false)
          return
        }
      }

      let aiPrompt = ""

      switch (action) {
        case "explain":
          aiPrompt =
            "Explain the key concepts from this lesson in simple terms. What are the main learning objectives?"
          break
        case "examples":
          aiPrompt =
            "Provide real-world examples that demonstrate the concepts taught in this lesson."
          break
        case "tips":
          aiPrompt =
            "Give me study tips and strategies to better remember and apply what I learned in this lesson."
          break
        case "mistakes":
          aiPrompt =
            "What are common mistakes students make with these concepts? How can I avoid them?"
          break
        case "quiz":
          aiPrompt = "Create 3 quick practice questions to test my understanding of this lesson."
          break
        case "custom":
          aiPrompt = prompt || customPrompt
          break
        default:
          aiPrompt = "Help me understand this lesson better."
      }

      const response = await session.prompt(aiPrompt)
      setResult(response)
    } catch (error) {
      console.error("AI request failed:", error)
      setResult("Sorry, I couldn't process your request. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const aiActions = [
    {
      id: "explain",
      title: "Explain Concepts",
      description: "Get clear explanations of key concepts",
      icon: Lightbulb,
      color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
    },
    {
      id: "examples",
      title: "Real Examples",
      description: "See practical applications",
      icon: Target,
      color: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
    },
    {
      id: "tips",
      title: "Study Tips",
      description: "Get personalized study strategies",
      icon: BookOpen,
      color: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
    },
    {
      id: "mistakes",
      title: "Avoid Mistakes",
      description: "Learn common pitfalls",
      icon: AlertCircle,
      color: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
    },
    {
      id: "quiz",
      title: "Quick Quiz",
      description: "Test your understanding",
      icon: HelpCircle,
      color: "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100",
    },
  ]

  if (!chromeAISupported) {
    return (
      <Card className={isFullWidth ? "w-full" : ""}>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Bot className='h-5 w-5' />
            AI Learning Assistant
            <Badge variant='neutral' className='text-xs'>
              Chrome AI Required
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-center py-8'>
            <WifiOff className='h-12 w-12 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100 mb-2'>
              Chrome AI Not Available
            </h3>
            <p className='text-gray-600 dark:text-gray-400 mb-4'>
              This feature requires Chrome&apos;s Built-in AI APIs. Please use Chrome Canary with AI
              features enabled.
            </p>
            <Button variant='outline' asChild>
              <a
                href='https://developer.chrome.com/docs/ai/built-in-apis'
                target='_blank'
                rel='noopener noreferrer'
              >
                Learn More
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={isFullWidth ? "w-full" : ""}>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Bot className='h-5 w-5' />
          AI Learning Assistant
          <div className='flex items-center gap-2'>
            <Badge className='bg-green-100 text-green-800 border-green-300'>
              <WifiOff className='h-3 w-3 mr-1' />
              Chrome AI (Offline)
            </Badge>
            {isPro && (
              <Badge className='bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0'>
                <Crown className='h-3 w-3 mr-1' />
                PRO
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {/* AI Capabilities Info */}
          {aiCapabilities && (
            <div className='text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg'>
              <div className='flex items-center gap-2 mb-1'>
                <Zap className='h-4 w-4' />
                Chrome AI Status:{" "}
                <span className='capitalize font-medium'>{aiCapabilities.available}</span>
              </div>
              {aiCapabilities.available === "after-download" && (
                <p className='text-xs mt-1'>
                  AI model will download in the background when first used.
                </p>
              )}
            </div>
          )}

          {/* Quick AI Actions */}
          <div>
            <h3 className='text-sm font-medium text-gray-900 dark:text-gray-100 mb-3'>
              Quick AI Assistance
            </h3>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-3'>
              {aiActions.map((action) => {
                const Icon = action.icon
                return (
                  <Button
                    key={action.id}
                    variant='outline'
                    onClick={() => handleAIAction(action.id)}
                    disabled={isLoading}
                    className={`h-auto p-3 flex flex-col items-center gap-2 text-center ${action.color}`}
                  >
                    <Icon className='h-5 w-5' />
                    <div>
                      <div className='font-medium text-xs'>{action.title}</div>
                      <div className='text-xs opacity-75'>{action.description}</div>
                    </div>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Custom Question */}
          <div>
            <h3 className='text-sm font-medium text-gray-900 dark:text-gray-100 mb-3'>
              Ask a Custom Question
            </h3>
            <div className='space-y-3'>
              <textarea
                placeholder='Ask me anything about this lesson...'
                value={customPrompt}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setCustomPrompt(e.target.value)
                }
                rows={3}
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100'
              />
              <Button
                onClick={() => handleAIAction("custom")}
                disabled={isLoading || !customPrompt.trim()}
                className='w-full'
              >
                {isLoading && selectedAction === "custom" ? (
                  <>
                    <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                    Thinking...
                  </>
                ) : (
                  <>
                    <Sparkles className='h-4 w-4 mr-2' />
                    Ask AI
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* AI Response */}
          {(isLoading || result) && (
            <div>
              <h3 className='text-sm font-medium text-gray-900 dark:text-gray-100 mb-3'>
                AI Response
              </h3>
              <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-4 min-h-[100px]'>
                {isLoading ? (
                  <div className='flex items-center justify-center py-8'>
                    <Loader2 className='h-6 w-6 animate-spin text-blue-600' />
                    <span className='ml-2 text-gray-600 dark:text-gray-400'>AI is thinking...</span>
                  </div>
                ) : (
                  <div className='prose prose-sm max-w-none dark:prose-invert'>
                    <div className='whitespace-pre-wrap text-gray-900 dark:text-gray-100'>
                      {result}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Pro Features Info */}
          {!isPro && (
            <div className='bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4'>
              <div className='flex items-center gap-2 mb-2'>
                <Crown className='h-5 w-5 text-yellow-600' />
                <span className='font-medium text-yellow-800 dark:text-yellow-200'>
                  Upgrade to PRO
                </span>
              </div>
              <p className='text-sm text-yellow-700 dark:text-yellow-300 mb-3'>
                Get unlimited AI assistance, detailed explanations, and advanced study tools.
              </p>
              <Button
                size='sm'
                className='bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white border-0'
              >
                Upgrade Now
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
