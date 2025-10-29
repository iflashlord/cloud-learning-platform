"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Send,
  MessageSquare,
  Bot,
  User,
  X,
  Loader2,
  Sparkles,
  Crown,
  Zap,
  Wifi,
  WifiOff,
  Settings,
} from "lucide-react"

interface AIChatProps {
  lessonData: any
  completionData: any
  onClose?: () => void
  isPro?: boolean
  isFullWidth?: boolean
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export const AIChat = ({
  lessonData,
  completionData,
  onClose,
  isPro = false,
  isFullWidth = false,
}: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chromeAISupported, setChromeAISupported] = useState(false)
  const [useOnlineAI, setUseOnlineAI] = useState(false) // For Pro users to choose between Gemini Nano (offline) and Gemini Flash (online)
  const [isExpanded, setIsExpanded] = useState(!isFullWidth) // Auto-expand for full width
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if Chrome AI is available
    const checkChromeAI = async () => {
      try {
        if (typeof window !== "undefined" && "ai" in window && window.ai?.assistant) {
          setChromeAISupported(true)
        }
      } catch (error) {
        console.log("Chrome AI not available:", error)
      }
    }

    checkChromeAI()

    // Add welcome message when component mounts
    const welcomeMessage: Message = {
      id: "welcome",
      role: "assistant",
      content: isPro
        ? `Hi! I'm your AI learning assistant. I can help you understand the content from "${lessonData.title}" better. As a PRO user, you get detailed explanations, real-world examples, and advanced study strategies. Feel free to ask me any questions about the lesson concepts, challenge explanations, or related topics!`
        : `Hi! I'm your AI learning assistant. I can help you with basic questions about "${lessonData.title}". For detailed explanations, real-world examples, and advanced features, consider upgrading to PRO! What would you like to know?`,
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }, [lessonData.title, isPro])

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      let responseText = ""

      // Try Chrome AI first if available and user is PRO
      if (chromeAISupported && isPro && typeof window !== "undefined" && window.ai) {
        try {
          const systemPrompt = `You are an expert AI learning assistant helping a student review their completed AWS lesson: "${
            lessonData.title
          }". 

The student scored ${completionData.score}% and ${
            completionData.wasPerfect ? "achieved a perfect score!" : "did well!"
          } 

Help them understand AWS concepts better with detailed explanations, real-world examples, and practical guidance. Focus on AWS services, architecture patterns, and best practices.

Keep responses concise but comprehensive, encouraging continued learning.`

          const assistant = window.ai?.assistant
          if (!assistant) {
            throw new Error("Chrome AI assistant is unavailable in this session.")
          }

          const session = await assistant.create({
            systemPrompt,
            temperature: 0.7,
            topK: 40,
          })

          responseText = await session.prompt(input.trim())
        } catch (chromeError) {
          console.log("Chrome AI failed, falling back to API:", chromeError)
          throw new Error("Chrome AI unavailable")
        }
      } else {
        // Fallback to API
        const lessonContext = {
          lessonId: lessonData.id,
          lessonTitle: lessonData.title,
          unitTitle: lessonData.unit.title,
          courseTitle: lessonData.unit.course.title,
          challenges: lessonData.challenges.map((challenge: any) => ({
            id: challenge.id,
            question: challenge.question,
            type: challenge.type,
            hint: challenge.hint,
            correctAnswer: challenge.correctAnswer,
            options: challenge.challengeOptions?.map((opt: any) => ({
              text: opt.text,
              correct: opt.correct,
              guide: opt.guide,
            })),
          })),
          userCompletion: {
            score: completionData.score,
            wasPerfect: completionData.wasPerfect,
            completedAt: completionData.completedAt,
          },
        }

        const response = await fetch("/api/ai/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: input.trim(),
            lessonContext,
            conversationHistory: messages.map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            useOnlineAI, // Pass the online/offline preference
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to get AI response")
        }

        const data = await response.json()
        responseText = data.response
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: isPro
          ? "I'm sorry, I'm having trouble responding right now. Please try again in a moment."
          : "I'm having trouble right now. As a free user, you have limited AI access. Consider upgrading to PRO for enhanced AI assistance!",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const suggestedQuestions = isPro
    ? [
        "Can you explain the key concepts from this lesson in detail?",
        "What are some real-world examples of this AWS service?",
        "How can I implement this in a production environment?",
        "What are the best practices for this AWS concept?",
        "How does this integrate with other AWS services?",
      ]
    : [
        "Can you explain this concept briefly?",
        "Why is this answer correct?",
        "What should I study next?",
        "How can I remember this better?",
        "What are the basics of this AWS service?",
      ]

  const aiProvider = useOnlineAI
    ? "Gemini Flash (Online)"
    : chromeAISupported
    ? "Gemini Nano (Offline)"
    : "Basic AI"

  return (
    <Card className={`p-4 ${isFullWidth ? "w-full" : "flex flex-col h-[600px]"}`}>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='flex items-center gap-2 text-lg'>
          <Bot className='h-5 w-5 text-blue-600' />
          AI Learning Assistant
          {isPro && (
            <Badge
              variant='warning'
              className='bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700'
            >
              <Crown className='h-3 w-3 mr-1' />
              PRO
            </Badge>
          )}
        </CardTitle>
        <div className='flex items-center gap-2'>
          {/* AI Provider Toggle for Pro Users */}
          {isPro && chromeAISupported && (
            <Button
              variant='ghost'
              size='sm'
              onClick={() => setUseOnlineAI(!useOnlineAI)}
              className='h-8 w-8 p-0'
              title={useOnlineAI ? "Switch to Offline AI" : "Switch to Online AI"}
            >
              {useOnlineAI ? <Wifi className='h-4 w-4' /> : <WifiOff className='h-4 w-4' />}
            </Button>
          )}
          {/* Close button only for sidebar mode */}
          {onClose && (
            <Button variant='ghost' size='sm' onClick={onClose} className='h-8 w-8 p-0'>
              <X className='h-4 w-4' />
            </Button>
          )}
        </div>
      </CardHeader>

      {/* AI Provider Information */}
      <div className='px-6 pb-2'>
        <div className='p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs'>
          {!isPro ? (
            <div className='flex items-start gap-2'>
              <WifiOff className='h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0' />
              <div>
                <p className='font-medium text-gray-700 dark:text-gray-300'>
                  Free: Gemini Nano (Offline AI)
                </p>
                <p className='text-gray-600 dark:text-gray-400'>
                  Basic assistance using your browser&apos;s built-in AI. Works without internet
                  connection.
                </p>
              </div>
            </div>
          ) : (
            <div className='flex items-start gap-2'>
              <Crown className='h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0' />
              <div>
                <p className='font-medium text-gray-700 dark:text-gray-300'>
                  PRO: Currently using {aiProvider}
                </p>
                <div className='text-gray-600 dark:text-gray-400 space-y-1'>
                  <p>• Gemini Flash (Online): Advanced responses, latest knowledge</p>
                  <p>• Gemini Nano (Offline): Fast, private, works without internet</p>
                  {chromeAISupported && (
                    <p className='text-blue-600 dark:text-blue-400'>
                      Click the wifi icon to switch between modes
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <CardContent className={`flex-1 flex flex-col space-y-4 ${isFullWidth ? "" : "p-4"}`}>
        {/* Messages */}
        <div
          ref={scrollAreaRef}
          className={`pr-4 overflow-y-auto ${isFullWidth ? "h-96" : "flex-1"}`}
        >
          <div className='space-y-4'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-2 max-w-[80%] ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === "user"
                        ? "bg-blue-600"
                        : isPro
                        ? "bg-gradient-to-br from-green-600 to-green-700"
                        : "bg-gray-600"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className='h-4 w-4 text-white' />
                    ) : (
                      <Bot className='h-4 w-4 text-white' />
                    )}
                  </div>
                  <div
                    className={`rounded-lg px-3 py-2 ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    <p className='text-sm whitespace-pre-wrap'>{message.content}</p>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className='flex gap-3 justify-start'>
                <div className='flex gap-2'>
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isPro ? "bg-gradient-to-br from-green-600 to-green-700" : "bg-gray-600"
                    }`}
                  >
                    <Bot className='h-4 w-4 text-white' />
                  </div>
                  <div className='bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2'>
                    <div className='flex items-center gap-2'>
                      <Loader2 className='h-4 w-4 animate-spin' />
                      <span className='text-sm text-gray-600 dark:text-gray-400'>
                        {useOnlineAI ? "Processing online..." : "Thinking..."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Suggested Questions (show when no messages except welcome) */}
        {messages.length <= 1 && (
          <div className='space-y-2'>
            <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300'>
              {isPro ? "Try asking:" : "Basic questions:"}
            </h4>
            <div
              className={`grid gap-2 ${isFullWidth ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"}`}
            >
              {suggestedQuestions.slice(0, isFullWidth ? 6 : 3).map((question, index) => (
                <Button
                  key={index}
                  variant='ghost'
                  size='sm'
                  className='h-auto p-2 text-left justify-start text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                  onClick={() => setInput(question)}
                >
                  <Sparkles className='h-3 w-3 mr-2 flex-shrink-0' />
                  <span className='truncate'>{question}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* PRO upgrade prompt for free users */}
        {!isPro && messages.length > 2 && (
          <div className='p-3 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg'>
            <div className='flex items-center gap-2 text-yellow-800 text-sm'>
              <Crown className='h-4 w-4' />
              <span className='font-medium'>Upgrade to PRO</span>
            </div>
            <p className='text-xs text-yellow-700 mt-1'>
              Get Gemini Flash online AI, detailed explanations, and unlimited questions!
            </p>
          </div>
        )}

        {/* Input */}
        <div className='flex gap-2'>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isPro ? "Ask me anything about this lesson..." : "Ask a basic question..."}
            disabled={isLoading}
            className='flex-1'
          />
          <Button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            size='sm'
            className='px-3'
          >
            {isLoading ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <Send className='h-4 w-4' />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
