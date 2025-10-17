import {
  BookOpen,
  User,
  Target,
  Play,
  Award,
  CheckCircle,
  ArrowRight,
  Star,
  Heart,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BRAND_CONFIG } from "@/lib/config"

const GettingStartedPage = () => {
  const steps = [
    {
      number: 1,
      title: "Create Your Account",
      description: "Sign up with your email and create your learner profile",
      icon: User,
      completed: true,
      actions: [
        {
          label: "Manage Your Profile",
          href: "/learn",
        },
      ],
    },
    {
      number: 2,
      title: "Choose Your Learning Path",
      description: "Select AWS courses that match your goals and skill level",
      icon: Target,
      actions: [
        { label: "Browse Courses", href: "/courses" },
        { label: "Start Learning", href: "/learn" },
      ],
    },
    {
      number: 3,
      title: "Take Your First Lesson",
      description: "Start with beginner-friendly content and learn the basics",
      icon: Play,
      actions: [
        { label: "Start Learning", href: "/learn" },
        { label: "Understanding Hearts", href: "/help/hearts-system" },
      ],
    },
    {
      number: 4,
      title: "Track Your Progress",
      description: "Monitor your XP, hearts, and learning achievements",
      icon: Award,
      actions: [
        { label: "View Progress", href: "/learn" },
        { label: "Understanding XP & Hearts", href: "/help/hearts-system" },
      ],
    },
  ]

  const quickTips = [
    {
      title: "Start with Fundamentals",
      description: "Begin with AWS basics before moving to advanced topics",
      icon: BookOpen,
      tip: "The AWS Foundations course is perfect for beginners",
    },
    {
      title: "Learn Consistently",
      description: "Spend 15-30 minutes daily for better retention",
      icon: Target,
      tip: "Set daily learning goals and stick to them",
    },
    {
      title: "Practice Actively",
      description: "Engage with interactive exercises and quizzes",
      icon: Play,
      tip: "Don&apos;t just read - practice what you learn",
    },
    {
      title: "Track Everything",
      description: "Monitor your progress and celebrate achievements",
      icon: Star,
      tip: "Check your progress page regularly for motivation",
    },
  ]

  const gameElements = [
    {
      element: "Hearts",
      description: "Your learning lives - be careful with wrong answers!",
      icon: Heart,
      details: [
        "Start with 5 hearts each day",
        "Lose 1 heart per wrong answer",
        "Hearts refill automatically every hour",
        "Pro users get unlimited hearts",
      ],
    },
    {
      element: "XP Points",
      description: "Experience points earned through learning activities",
      icon: Zap,
      details: [
        "Earn 10 XP per completed challenge",
        "Use XP to purchase heart refills",
        "Pro users get 50% bonus XP",
        "Track total XP on your progress page",
      ],
    },
    {
      element: "Achievements",
      description: "Unlock badges and rewards as you progress",
      icon: Award,
      details: [
        "Complete lessons to unlock achievements",
        "Earn special badges for milestones",
        "Show off your progress to others",
        "Achievements save permanently",
      ],
    },
  ]

  return (
    <div className='p-8'>
      {/* Header */}
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-4'>
          <BookOpen className='w-8 h-8 text-blue-500' />
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Getting Started with {BRAND_CONFIG.PLATFORM_NAME}
          </h1>
        </div>
        <p className='text-lg text-gray-600 dark:text-gray-400'>
          Your complete guide to beginning your AWS learning journey
        </p>
      </div>

      {/* Welcome Message */}
      <Card className='mb-8 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800'>
        <CardContent className='p-8 text-center'>
          <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4'>
            <Star className='w-8 h-8 text-white' />
          </div>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
            Welcome to {BRAND_CONFIG.PLATFORM_NAME}!
          </h2>
          <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            You&apos;re about to start an exciting journey learning Amazon Web Services (AWS). Our
            platform makes cloud learning interactive, engaging, and fun through gamified lessons.
          </p>
        </CardContent>
      </Card>

      {/* Getting Started Steps */}
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>Quick Start Guide</h2>
        <div className='space-y-6'>
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card
                key={index}
                className={step.completed ? "border-green-200 dark:border-green-800" : ""}
              >
                <CardContent className='p-6'>
                  <div className='flex items-start gap-4'>
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.completed
                          ? "bg-green-100 dark:bg-green-900/20"
                          : "bg-blue-100 dark:bg-blue-900/20"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle className='w-6 h-6 text-green-600 dark:text-green-400' />
                      ) : (
                        <span className='text-blue-600 dark:text-blue-400 font-bold'>
                          {step.number}
                        </span>
                      )}
                    </div>
                    <div className='flex-1'>
                      <div className='flex items-center gap-3 mb-2'>
                        <Icon className='w-5 h-5 text-blue-500' />
                        <h3 className='font-semibold text-lg text-gray-900 dark:text-white'>
                          {step.title}
                        </h3>
                        {step.completed && (
                          <Badge className='bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'>
                            Complete
                          </Badge>
                        )}
                      </div>
                      <p className='text-gray-600 dark:text-gray-400 mb-4'>{step.description}</p>
                      <div className='flex flex-wrap gap-2'>
                        {step.actions.map((action, actionIndex) => (
                          <Button key={actionIndex} variant='outline' size='sm' asChild>
                            <Link href={action.href}>
                              {action.label}
                              <ArrowRight className='w-4 h-4 ml-1' />
                            </Link>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Understanding Game Elements */}
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
          Understanding Game Elements
        </h2>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {gameElements.map((element, index) => {
            const Icon = element.icon
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className='flex items-center gap-3'>
                    <div className='w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center'>
                      <Icon className='w-5 h-5 text-white' />
                    </div>
                    <span>{element.element}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-gray-600 dark:text-gray-400 mb-4'>{element.description}</p>
                  <div className='space-y-2'>
                    {element.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className='flex items-start gap-2 text-sm'>
                        <CheckCircle className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                        <span className='text-gray-600 dark:text-gray-400'>{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Quick Tips */}
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
          Learning Tips for Success
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {quickTips.map((tip, index) => {
            const Icon = tip.icon
            return (
              <Card key={index}>
                <CardContent className='p-6'>
                  <div className='flex items-start gap-4'>
                    <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0'>
                      <Icon className='w-5 h-5 text-white' />
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                        {tip.title}
                      </h3>
                      <p className='text-gray-600 dark:text-gray-400 mb-3'>{tip.description}</p>
                      <div className='bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg'>
                        <div className='text-sm font-medium text-blue-800 dark:text-blue-300'>
                          💡 Pro Tip: {tip.tip}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Next Steps */}
      <Card className='bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800'>
        <CardContent className='p-8 text-center'>
          <CheckCircle className='w-16 h-16 text-green-500 mx-auto mb-4' />
          <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
            Ready to Start Learning?
          </h3>
          <p className='text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto'>
            Now that you understand the basics, it&apos;s time to dive into your first AWS lesson.
            Choose a course that matches your experience level and goals.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button size='lg' asChild>
              <Link href='/courses'>
                <BookOpen className='w-5 h-5 mr-2' />
                Browse Courses
              </Link>
            </Button>
            <Button variant='outline' size='lg' asChild>
              <Link href='/learn'>Start Learning Now</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default GettingStartedPage
