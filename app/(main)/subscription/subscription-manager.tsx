"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import {
  Crown,
  Calendar,
  CreditCard,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
  Star,
  Shield,
  Zap,
  Heart,
  Target,
  Award,
  Sparkles,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { createStripeUrl } from "@/actions/user-subscription"
import { cn } from "@/lib/utils"
import { BRAND_CONFIG } from "@/lib/config"
import Link from "next/link"

interface SubscriptionManagerProps {
  userProgress: {
    hearts: number
    points: number
    userName: string
    userImageSrc: string
  }
  subscription: {
    id: string
    stripeCustomerId?: string
    stripeSubscriptionId?: string
    stripePriceId?: string
    stripeCurrentPeriodEnd?: Date
    isActive: boolean
  } | null
  isPro: boolean
}

export const SubscriptionManager = ({
  userProgress,
  subscription,
  isPro,
}: SubscriptionManagerProps) => {
  const [pending, startTransition] = useTransition()

  const onManageSubscription = () => {
    startTransition(() => {
      createStripeUrl()
        .then((response) => {
          if (response.data) {
            window.location.href = response.data
          }
        })
        .catch(() =>
          toast.error(
            "Failed to open subscription management. Please try again."
          )
        )
    })
  }

  const onUpgradeNow = () => {
    startTransition(() => {
      createStripeUrl()
        .then((response) => {
          if (response.data) {
            window.location.href = response.data
          }
        })
        .catch(() =>
          toast.error("Failed to start upgrade process. Please try again.")
        )
    })
  }

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Unknown"
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const proFeatures = [
    {
      icon: <Heart className='w-5 h-5' />,
      title: "Unlimited Hearts",
      description: "Never lose progress due to mistakes",
    },
    {
      icon: <Zap className='w-5 h-5' />,
      title: "Ad-Free Experience",
      description: "Focus on learning without interruptions",
    },
    {
      icon: <Award className='w-5 h-5' />,
      title: "Exclusive Pro Content",
      description: "Access advanced courses and materials",
    },
    {
      icon: <Shield className='w-5 h-5' />,
      title: "Priority Support",
      description: "Get help faster with dedicated support",
    },
    {
      icon: <Target className='w-5 h-5' />,
      title: "Advanced Analytics",
      description: "Track progress with detailed insights",
    },
    {
      icon: <Sparkles className='w-5 h-5' />,
      title: "Pro-Only Features",
      description: "Access to beta features and tools",
    },
  ]

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='text-center space-y-4'>
        <div className='flex items-center justify-center gap-3 mb-4'>
          <div className='w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center'>
            <Crown className='w-6 h-6 text-white' />
          </div>
          <div>
            <h1 className='text-3xl sm:text-4xl font-bold text-left'>
              Subscription Management
            </h1>
          </div>
        </div>
        <p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
          Manage your {BRAND_CONFIG.PLATFORM_NAME} Pro subscription, billing
          settings, and explore premium features designed to enhance your
          learning experience.
        </p>
      </div>

      {isPro ? (
        // Pro User Section
        <div className='space-y-6'>
          {/* Current Subscription Status */}
          <Card className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800'>
            <CardHeader>
              <CardTitle className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center'>
                  <CheckCircle className='w-5 h-5 text-white' />
                </div>
                <div>
                  <div className='flex items-center gap-2'>
                    <span>Pro Membership Active</span>
                    <Badge variant='success' className='font-bold'>
                      ACTIVE
                    </Badge>
                  </div>
                  <p className='text-sm text-muted-foreground font-normal'>
                    You&apos;re enjoying all Pro benefits
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='flex items-center gap-3 p-4 bg-white/60 dark:bg-black/20 rounded-lg'>
                  <Calendar className='w-5 h-5 text-blue-500' />
                  <div>
                    <div className='font-medium text-sm'>Next Billing</div>
                    <div className='text-xs text-muted-foreground'>
                      {formatDate(subscription?.stripeCurrentPeriodEnd)}
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-3 p-4 bg-white/60 dark:bg-black/20 rounded-lg'>
                  <CreditCard className='w-5 h-5 text-purple-500' />
                  <div>
                    <div className='font-medium text-sm'>Plan</div>
                    <div className='text-xs text-muted-foreground'>
                      Pro Monthly ($9.99)
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-3 p-4 bg-white/60 dark:bg-black/20 rounded-lg'>
                  <Star className='w-5 h-5 text-yellow-500' />
                  <div>
                    <div className='font-medium text-sm'>Status</div>
                    <div className='text-xs text-green-600 dark:text-green-400 font-medium'>
                      All Features Unlocked
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-6 flex flex-col sm:flex-row gap-4'>
                <Button
                  onClick={onManageSubscription}
                  disabled={pending}
                  className='flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium'
                >
                  {pending ? (
                    <div className='flex items-center gap-2'>
                      <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    <div className='flex items-center gap-2'>
                      <Settings className='w-4 h-4' />
                      <span>Manage Subscription</span>
                      <ExternalLink className='w-4 h-4' />
                    </div>
                  )}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant='outline'
                      className='border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20'
                    >
                      <XCircle className='w-4 h-4 mr-2' />
                      Cancel Subscription
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className='flex items-center gap-2'>
                        <AlertTriangle className='w-5 h-5 text-red-500' />
                        Cancel Pro Subscription?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        You&apos;ll lose access to Pro features when your
                        current billing period ends on{" "}
                        {formatDate(subscription?.stripeCurrentPeriodEnd)}. Your
                        learning progress will remain saved.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep Pro</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={onManageSubscription}
                        className='bg-red-500 hover:bg-red-600'
                      >
                        Continue to Cancel
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>

          {/* Pro Features Reminder */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Crown className='w-5 h-5 text-yellow-500' />
                Your Pro Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {proFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className='flex items-start gap-3 p-3 bg-muted/30 rounded-lg'
                  >
                    <div className='w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white'>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className='font-medium text-sm'>{feature.title}</h4>
                      <p className='text-xs text-muted-foreground'>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        // Free User Section
        <div className='space-y-6'>
          {/* Current Status */}
          <Card className='bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800'>
            <CardHeader>
              <CardTitle className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center'>
                  <Star className='w-5 h-5 text-white' />
                </div>
                <div>
                  <div className='flex items-center gap-2'>
                    <span>Free Account</span>
                    <Badge variant='info' className='font-bold'>
                      FREE
                    </Badge>
                  </div>
                  <p className='text-sm text-muted-foreground font-normal'>
                    Upgrade to unlock unlimited features
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-center py-6'>
                <div className='max-w-md mx-auto space-y-4'>
                  <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                    Ready to unlock your potential?
                  </div>
                  <p className='text-muted-foreground'>
                    Join thousands of learners who&apos;ve accelerated their
                    progress with Pro.
                  </p>
                  <Button
                    onClick={onUpgradeNow}
                    disabled={pending}
                    size='lg'
                    className='bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-8'
                  >
                    {pending ? (
                      <div className='flex items-center gap-2'>
                        <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                        <span>Loading...</span>
                      </div>
                    ) : (
                      <div className='flex items-center gap-2'>
                        <Crown className='w-5 h-5' />
                        <span>Upgrade to Pro</span>
                        <ArrowRight className='w-4 h-4' />
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What You'll Get */}
          <Card>
            <CardHeader>
              <CardTitle className='text-center'>
                What You&apos;ll Get with Pro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {proFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className='flex items-start gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800/50'
                  >
                    <div className='w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white'>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className='font-medium text-sm'>{feature.title}</h4>
                      <p className='text-xs text-muted-foreground'>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className='bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-300 dark:border-yellow-700/50'>
            <CardContent className='p-8 text-center'>
              <div className='space-y-6'>
                <div>
                  <div className='text-4xl font-bold text-yellow-600 dark:text-yellow-400'>
                    $9.99
                  </div>
                  <div className='text-muted-foreground'>per month</div>
                  <div className='text-sm text-green-600 dark:text-green-400 font-medium mt-2'>
                    7-day free trial • Cancel anytime
                  </div>
                </div>

                <Button
                  onClick={onUpgradeNow}
                  disabled={pending}
                  size='lg'
                  className='w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold text-lg h-12'
                >
                  {pending ? (
                    <div className='flex items-center gap-2'>
                      <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className='flex items-center gap-2'>
                      <Crown className='w-5 h-5' />
                      <span>Start Free Trial</span>
                    </div>
                  )}
                </Button>

                <p className='text-xs text-muted-foreground'>
                  Secure payment powered by Stripe •{" "}
                  {BRAND_CONFIG.PLATFORM_NAME} Pro
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Enhanced Help & Support Section */}
      <div className='space-y-6'>
        {/* Quick Stats for Pro Users */}
        {isPro && (
          <Card className='bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800'>
            <CardContent className='p-6'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                <Star className='w-5 h-5 text-yellow-500' />
                Your Pro Journey
              </h3>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <div className='text-center p-3 bg-white/60 dark:bg-black/20 rounded-lg'>
                  <div className='text-2xl font-bold text-green-600 dark:text-green-400'>
                    ∞
                  </div>
                  <div className='text-xs text-muted-foreground'>
                    Hearts Used
                  </div>
                </div>
                <div className='text-center p-3 bg-white/60 dark:bg-black/20 rounded-lg'>
                  <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                    {userProgress.points}
                  </div>
                  <div className='text-xs text-muted-foreground'>XP Earned</div>
                </div>
                <div className='text-center p-3 bg-white/60 dark:bg-black/20 rounded-lg'>
                  <div className='text-2xl font-bold text-purple-600 dark:text-purple-400'>
                    +50%
                  </div>
                  <div className='text-xs text-muted-foreground'>XP Bonus</div>
                </div>
                <div className='text-center p-3 bg-white/60 dark:bg-black/20 rounded-lg'>
                  <div className='text-2xl font-bold text-yellow-600 dark:text-yellow-400'>
                    0
                  </div>
                  <div className='text-xs text-muted-foreground'>Ads Seen</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Help Section */}
        <Card className='border-muted'>
          <CardHeader>
            <CardTitle className='text-center flex items-center justify-center gap-2'>
              <MessageSquare className='w-5 h-5 text-blue-500' />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='text-center space-y-6'>
              <p className='text-muted-foreground'>
                Have questions about your subscription, billing, or need
                technical support?
              </p>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800'>
                  <MessageSquare className='w-8 h-8 text-blue-500 mx-auto mb-3' />
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    Email Support
                  </h4>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
                    Get personalized help via email
                  </p>
                  <Button size='sm' asChild>
                    <Link href='mailto:support@behrouz.nl'>
                      <Mail className='w-4 h-4 mr-1' />
                      Contact
                    </Link>
                  </Button>
                </div>

                <div className='p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800'>
                  <HelpCircle className='w-8 h-8 text-green-500 mx-auto mb-3' />
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    Help Center
                  </h4>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
                    Browse our comprehensive FAQ
                  </p>
                  <Button size='sm' variant='outline' asChild>
                    <Link href='/help'>Browse Help</Link>
                  </Button>
                </div>

                <div className='p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800'>
                  <Crown className='w-8 h-8 text-purple-500 mx-auto mb-3' />
                  <h4 className='font-medium text-gray-900 dark:text-white mb-2'>
                    Subscription FAQ
                  </h4>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
                    Specific billing & Pro questions
                  </p>
                  <Button size='sm' variant='outline' asChild>
                    <Link href='/help/subscription-faq'>View FAQ</Link>
                  </Button>
                </div>
              </div>

              {isPro && (
                <div className='bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800'>
                  <div className='flex items-center justify-center gap-2 text-yellow-700 dark:text-yellow-300 mb-2'>
                    <Crown className='w-5 h-5' />
                    <span className='font-medium'>Pro Priority Support</span>
                  </div>
                  <p className='text-sm text-yellow-600 dark:text-yellow-400'>
                    As a Pro member, you get priority support with faster
                    response times (within 4 hours)
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
