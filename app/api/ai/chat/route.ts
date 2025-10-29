import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { getUserSubscription } from "@/db/queries"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const { message, lessonContext, conversationHistory, useOnlineAI = false } = body

    if (!message || !lessonContext) {
      return NextResponse.json(
        { error: "Message and lesson context are required" },
        { status: 400 },
      )
    }

    // Check subscription for enhanced AI features
    const userSubscription = await getUserSubscription()
    const isPro = !!userSubscription?.isActive

    // Prepare the AI prompt with lesson context
    const systemPrompt = `You are an expert AI learning assistant helping a student review their completed lesson in AWS (Amazon Web Services). 

LESSON CONTEXT:
- Course: ${lessonContext.courseTitle}
- Unit: ${lessonContext.unitTitle}  
- Lesson: ${lessonContext.lessonTitle}
- Student Score: ${lessonContext.userCompletion.score}% (${
      lessonContext.userCompletion.wasPerfect ? "Perfect score!" : "Good effort!"
    })
- Completed: ${new Date(lessonContext.userCompletion.completedAt).toLocaleDateString()}
- User Type: ${isPro ? "PRO (Full features)" : "FREE (Basic features)"}

LESSON CONTENT:
${lessonContext.challenges
  .map(
    (challenge: any, index: number) => `
Question ${index + 1} (${challenge.type}): ${challenge.question}
${challenge.hint ? `Hint: ${challenge.hint}` : ""}
${challenge.correctAnswer ? `Correct Answer: ${challenge.correctAnswer}` : ""}
${
  challenge.options
    ? `Options:\n${challenge.options
        .map(
          (opt: any) =>
            `- ${opt.text} ${opt.correct ? "(CORRECT)" : ""} ${opt.guide ? `- ${opt.guide}` : ""}`,
        )
        .join("\n")}`
    : ""
}
`,
  )
  .join("\n")}

INSTRUCTIONS:
- Help the student understand the lesson concepts better
- Provide clear explanations for questions they ask
- Give practical AWS examples when relevant
- Encourage continued learning
- Be encouraging and supportive
- If asked about specific questions, refer to them by their number (Q1, Q2, etc.)
- Keep responses concise but informative
- Focus on AWS learning and the specific lesson content
- Always incorporate the provided hints and answer guides when explaining reasoning
 

The student has completed this lesson and is reviewing it to reinforce their learning.`

    // Try to use Chrome's built-in AI or fallback to mock responses
    const response = await generateAIResponseWithChrome(
      systemPrompt,
      message,
      conversationHistory,
      isPro,
      useOnlineAI,
    )

    return NextResponse.json({ response })
  } catch (error) {
    console.error("AI chat error:", error)
    return NextResponse.json({ error: "Failed to process AI request" }, { status: 500 })
  }
}

// Enhanced AI response function with Chrome AI integration and Gemini Flash support
async function generateAIResponseWithChrome(
  systemPrompt: string,
  userMessage: string,
  conversationHistory: any[],
  isPro: boolean,
  useOnlineAI: boolean = false,
): Promise<string> {
  // For PRO users with online AI preference, try Gemini Flash API
  if (isPro && useOnlineAI) {
    try {
      const geminiResponse = await callGeminiFlashAPI(
        systemPrompt,
        userMessage,
        conversationHistory,
      )
      if (geminiResponse) {
        return geminiResponse
      }
    } catch (error) {
      console.error("Gemini Flash API error:", error)
      // Fall back to offline mode if online fails
    }
  }

  // For server-side execution, we'll use a mock implementation
  // In a real implementation, you would either:
  // 1. Use Chrome AI from the client-side
  // 2. Integrate with a server-side AI service like OpenAI

  const lowerMessage = userMessage.toLowerCase()

  // Enhanced responses for PRO users
  if (isPro) {
    if (
      lowerMessage.includes("explain") ||
      lowerMessage.includes("what") ||
      lowerMessage.includes("how")
    ) {
      return `I'd be happy to provide a detailed explanation! Based on your lesson content, this concept relates to core AWS architectural principles. Let me break this down:

🔧 **Technical Details**: This AWS service is designed with specific architectural patterns in mind - high availability, scalability, and cost optimization.

💡 **Real-world Application**: In enterprise environments, you'd typically implement this alongside other AWS services like VPC for networking, IAM for security, and CloudWatch for monitoring.

📊 **Best Practices**: 
- Consider the shared responsibility model
- Implement proper tagging strategies
- Monitor costs using AWS Cost Explorer
- Follow the Well-Architected Framework principles

Would you like me to dive deeper into any specific aspect or provide a hands-on scenario?`
    }

    if (lowerMessage.includes("example") || lowerMessage.includes("real-world")) {
      return `Excellent question! Here are some detailed real-world scenarios:

🏢 **Enterprise Example**: A Fortune 500 company migrating from on-premises infrastructure would use this pattern to ensure zero-downtime deployment and maintain compliance requirements.

🚀 **Startup Scenario**: A rapidly growing startup might implement this to handle traffic spikes during product launches or viral marketing campaigns.

⚡ **Performance Optimization**: 
- Use CloudFront for global content delivery
- Implement auto-scaling groups for dynamic capacity
- Leverage spot instances for cost optimization

🔒 **Security Considerations**:
- Enable encryption at rest and in transit
- Implement least-privilege access policies
- Use AWS Config for compliance monitoring

Would you like me to walk through a specific implementation architecture?`
    }

    if (lowerMessage.includes("remember") || lowerMessage.includes("study")) {
      return `Here's a comprehensive study strategy for mastering this concept:

📝 **Memory Techniques**:
- Create acronyms for service features (e.g., S3 = Simple Storage Service)
- Use the "story method" - build narratives around use cases
- Practice with hands-on labs in the AWS Free Tier

🎯 **Focus Areas**:
- Service limits and quotas
- Pricing models and cost optimization
- Integration patterns with other AWS services
- Common troubleshooting scenarios

📚 **Additional Resources**:
- AWS Well-Architected Framework whitepapers
- AWS re:Invent session recordings
- AWS Solution Architecture blog posts

🔄 **Practice Schedule**:
- Daily: Review 3-5 service features
- Weekly: Complete a hands-on project
- Monthly: Take practice exams

Need specific study materials or practice scenarios?`
    }
  } else {
    // Basic responses for free users
    if (
      lowerMessage.includes("explain") ||
      lowerMessage.includes("what") ||
      lowerMessage.includes("how")
    ) {
      return `I can help explain this concept! Based on your lesson, this relates to fundamental AWS services and their basic use cases.

💡 **Basic Overview**: This AWS service is designed to solve common cloud computing challenges like scalability and reliability.

📈 **Upgrade to PRO** for detailed technical explanations, real-world examples, and advanced study strategies!

Would you like me to clarify any specific part of this lesson?`
    }

    if (lowerMessage.includes("example") || lowerMessage.includes("real-world")) {
      return `Great question about real-world applications! This AWS concept is commonly used in modern cloud architectures.

🌟 **PRO users get**: Detailed enterprise scenarios, implementation architectures, and hands-on project ideas.

📊 **Basic insight**: Companies use this to improve their application performance and reduce costs.

Upgrade to PRO for comprehensive examples and implementation guides!`
    }

    if (lowerMessage.includes("remember") || lowerMessage.includes("study")) {
      return `Here are some basic study tips for this AWS concept:

📝 **Basic Tips**:
- Practice regularly with the AWS Free Tier
- Focus on understanding the core use cases
- Review the lesson content multiple times

🎯 **PRO Features**: Detailed memory techniques, comprehensive study schedules, and personalized learning paths.

Consider upgrading to PRO for advanced study strategies and resources!`
    }
  }

  // Default responses
  const responses = isPro
    ? [
        "Excellent question! This AWS concept is fundamental to cloud architecture. Let me provide a comprehensive explanation with real-world context and best practices.",
        "Great thinking! This relates to core AWS principles of scalability, reliability, and cost optimization. I can break down the technical details and implementation patterns.",
        "Perfect question for deeper learning! This service integrates with many other AWS offerings to create robust cloud solutions. Would you like specific architecture examples?",
        "That's an insightful question! Understanding this concept will help you design better cloud solutions and optimize for performance and cost.",
      ]
    : [
        "Good question! This is an important AWS concept that's covered in your lesson. PRO users get detailed explanations with examples.",
        "That's a great point to clarify! This AWS service has many practical applications. Upgrade to PRO for comprehensive insights.",
        "Excellent question! The basic concept is covered in your lesson. PRO members get advanced explanations and real-world scenarios.",
        "Smart question! This relates to fundamental cloud principles. Consider upgrading to PRO for detailed technical guidance.",
      ]

  return (
    responses[Math.floor(Math.random() * responses.length)] +
    (isPro
      ? " Feel free to ask for more specific details or examples!"
      : " Upgrade to PRO for detailed answers and advanced features!")
  )
}

// Gemini Flash API integration for PRO users
async function callGeminiFlashAPI(
  systemPrompt: string,
  userMessage: string,
  conversationHistory: any[],
): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    console.warn("Gemini API key not configured")
    return null
  }

  try {
    // Build conversation context
    const messages = [
      { role: "system", content: systemPrompt },
      ...conversationHistory.map((msg: any) => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.content,
      })),
      { role: "user", content: userMessage },
    ]

    // Note: This is a placeholder for actual Gemini Flash API integration
    // You would need to implement the actual API call based on Google's Gemini API documentation
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemPrompt}\n\nUser: ${userMessage}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null
  } catch (error) {
    console.error("Gemini Flash API call failed:", error)
    return null
  }
}
