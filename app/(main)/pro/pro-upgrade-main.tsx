"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import {
  Crown,
  Star,
  Check,
  Zap,
  Heart,
  Shield,
  Rocket,
  Settings,
  Infinity,
  TrendingUp,
  Target,
  Award,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { createStripeUrl } from "@/actions/user-subscription"
import { cn } from "@/lib/utils"
import { statusStyles } from "@/lib/style-utils"
import { BRAND_CONFIG } from "@/lib/config"

interface ProUpgradeMainProps {
  userProgress: {
    hearts: number
    points: number
    userName: string
    userImageSrc: string
  }
  isProActive: boolean
}

export const ProUpgradeMain = ({ userProgress, isProActive }: ProUpgradeMainProps) => {
  const [pending, startTransition] = useTransition()

  const onUpgrade = () => {
    startTransition(() => {
      createStripeUrl()
        .then((response) => {
          if (response.data) {
            window.location.href = response.data
          }
        })
        .catch(() => toast.error("Something went wrong. Please try again."))
    })
  }

  const proFeatures = [
    {
      icon: <Heart className='w-5 h-5' />,
      title: "Unlimited Hearts",
      description: "Never lose progress due to mistakes. Practice as much as you want!",
      benefit: "No more waiting or XP spending",
    },
    {
      icon: <Zap className='w-5 h-5' />,
      title: "Ad-Free Experience",
      description: "Focus on learning without interruptions from advertisements.",
      benefit: "Distraction-free learning",
    },
    {
      icon: <Award className='w-5 h-5' />,
      title: "Exclusive Pro Content",
      description: "Access advanced courses, expert tips, and premium learning materials.",
      benefit: "Accelerated learning path",
    },
    {
      icon: <Shield className='w-5 h-5' />,
      title: "Priority Support",
      description: "Get help faster with dedicated support for Pro members.",
      benefit: "24/7 premium assistance",
    },
    {
      icon: <Target className='w-5 h-5' />,
      title: "Advanced Analytics",
      description: "Track detailed progress with comprehensive learning insights.",
      benefit: "Data-driven improvement",
    },
    {
      icon: <Sparkles className='w-5 h-5' />,
      title: "Pro-Only Features",
      description: "Access to beta features and advanced learning tools first.",
      benefit: "Cutting-edge functionality",
    },
  ]

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div className='text-center space-y-4 mb-8'>
        <div className='flex items-center justify-center gap-3 mb-4'>
          <Crown className='w-8 h-8 text-yellow-500' />
          <h1 className='text-3xl sm:text-4xl font-bold'>
            Upgrade to{" "}
            <span className='bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent'>
              Pro
            </span>
          </h1>
          <Badge variant='warning' className='font-bold text-xs'>
            LIMITED TIME
          </Badge>
        </div>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
          Unlock unlimited learning potential with advanced features, exclusive content, and
          priority support.
        </p>
      </div>

      {/* User Stats Overview */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <StatCard
          variant='danger'
          icon={<Heart className='w-6 h-6' />}
          title='Current Hearts'
          value={userProgress.hearts.toString()}
          subtitle={`${userProgress.hearts}/5 remaining`}
        />
        <StatCard
          variant='info'
          icon={<Zap className='w-6 h-6' />}
          title='XP Points'
          value={userProgress.points.toString()}
          subtitle='Earned through lessons'
        />
        <StatCard
          variant='warning'
          icon={<TrendingUp className='w-6 h-6' />}
          title='Account Status'
          value='FREE'
          subtitle='Limited features'
        />
      </div>

      {/* Main Upgrade Card */}
      <Card className='relative overflow-hidden bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-900/20 dark:via-amber-900/20 dark:to-orange-900/20 border-2 border-yellow-300 dark:border-yellow-700/50 shadow-xl'>
        <div className='absolute top-4 right-4'>
          <Badge variant='warning' className='font-bold text-xs'>
            MOST POPULAR
          </Badge>
        </div>

        <CardContent className='p-8'>
          <div className='text-center mb-8'>
            <div className='w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
              <Infinity className='w-10 h-10 text-white' />
            </div>
            <h2 className='text-3xl font-bold mb-2 flex items-center justify-center gap-2'>
              <Crown className='w-6 h-6 text-yellow-500' />
              Pro Membership
            </h2>
            <p className='text-muted-foreground mb-6 max-w-md mx-auto'>
              Transform your learning experience with unlimited access and premium features.
            </p>

            {/* Pricing */}
            <div className='bg-white/80 dark:bg-black/20 rounded-xl p-6 mb-6 border border-yellow-200 dark:border-yellow-700/50'>
              <div className='flex items-center justify-center gap-4 mb-4'>
                <div className='text-center'>
                  <div className='text-4xl font-bold text-foreground'>$9.99</div>
                  <div className='text-sm text-muted-foreground'>per month</div>
                </div>
                <div className='text-muted-foreground'>•</div>
                <div className='text-center'>
                  <div className='text-lg font-semibold text-green-600 dark:text-green-400'>
                    7-day
                  </div>
                  <div className='text-sm text-muted-foreground'>free trial</div>
                </div>
              </div>

              <Button
                onClick={onUpgrade}
                disabled={pending}
                size='lg'
                className='w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 h-12'
              >
                {pending ? (
                  <div className='flex items-center gap-2'>
                    <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <div className='flex items-center gap-2'>
                    <Rocket className='w-5 h-5' />
                    <span>Start Free Trial</span>
                  </div>
                )}
              </Button>
              <p className='text-xs text-muted-foreground mt-3 text-center'>
                Cancel anytime • No commitment • Instant activation
              </p>
            </div>
          </div>

          {/* Feature Comparison */}
          <div className='space-y-4'>
            <h3 className='text-xl font-semibold text-center mb-6'>What You&apos;ll Get</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {proFeatures.map((feature, index) => (
                <div
                  key={index}
                  className='flex gap-3 p-4 bg-white/60 dark:bg-black/20 rounded-lg border border-yellow-100 dark:border-yellow-800/30 hover:bg-white/80 dark:hover:bg-black/30 transition-colors'
                >
                  <div className='w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white'>
                    {feature.icon}
                  </div>
                  <div className='flex-1'>
                    <h4 className='font-semibold text-sm mb-1'>{feature.title}</h4>
                    <p className='text-xs text-muted-foreground mb-2'>{feature.description}</p>
                    <div className='flex items-center gap-1'>
                      <Check className='w-3 h-3 text-green-500' />
                      <span className='text-xs font-medium text-green-600 dark:text-green-400'>
                        {feature.benefit}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card>
        <CardContent className='p-6'>
          <h3 className='text-xl font-semibold text-center mb-6'>Free vs Pro Comparison</h3>
          <div className='space-y-4'>
            <div className='grid grid-cols-3 gap-4 font-semibold text-sm border-b pb-3'>
              <div>Feature</div>
              <div className='text-center'>Free Account</div>
              <div className='text-center'>Pro Membership</div>
            </div>

            {[
              { feature: "Hearts per day", free: "5 hearts", pro: "Unlimited" },
              { feature: "Advertisements", free: "Yes", pro: "Ad-free" },
              { feature: "Basic courses", free: "✓", pro: "✓" },
              { feature: "Premium content", free: "✗", pro: "✓" },
              { feature: "Advanced analytics", free: "✗", pro: "✓" },
              { feature: "Priority support", free: "✗", pro: "✓" },
              { feature: "Beta features", free: "✗", pro: "✓" },
            ].map((item, index) => (
              <div
                key={index}
                className='grid grid-cols-3 gap-4 py-3 border-b border-border/50 last:border-b-0 text-sm'
              >
                <div className='font-medium'>{item.feature}</div>
                <div className='text-center text-muted-foreground'>{item.free}</div>
                <div className='text-center font-semibold text-yellow-600 dark:text-yellow-400'>
                  {item.pro}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Testimonials / Social Proof */}
      <Card className='bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800'>
        <CardContent className='p-6 text-center'>
          <Star className='w-8 h-8 text-yellow-500 mx-auto mb-4' />
          <h3 className='text-xl font-semibold mb-4'>Join thousands of successful learners</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-sm'>
            <div>
              <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>10,000+</div>
              <div className='text-muted-foreground'>Active Pro members</div>
            </div>
            <div>
              <div className='text-2xl font-bold text-green-600 dark:text-green-400'>95%</div>
              <div className='text-muted-foreground'>Completion rate increase</div>
            </div>
            <div>
              <div className='text-2xl font-bold text-purple-600 dark:text-purple-400'>4.9★</div>
              <div className='text-muted-foreground'>Average rating</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardContent className='p-6'>
          <h3 className='text-xl font-semibold text-center mb-6'>Frequently Asked Questions</h3>
          <div className='space-y-4 text-sm'>
            <div>
              <h4 className='font-semibold mb-2'>How does the free trial work?</h4>
              <p className='text-muted-foreground'>
                Start with a 7-day free trial with full Pro access. Cancel anytime before the trial
                ends to avoid charges.
              </p>
            </div>
            <div>
              <h4 className='font-semibold mb-2'>Can I cancel my subscription?</h4>
              <p className='text-muted-foreground'>
                Yes! You can cancel anytime from your account settings. You&apos;ll keep Pro benefits
                until your current billing period ends.
              </p>
            </div>
            <div>
              <h4 className='font-semibold mb-2'>What happens to my progress if I cancel?</h4>
              <p className='text-muted-foreground'>
                Your learning progress is always saved. You&apos;ll simply return to the free plan with
                its limitations.
              </p>
            </div>
            <div>
              <h4 className='font-semibold mb-2'>Is there a student discount?</h4>
              <p className='text-muted-foreground'>
                We offer special pricing for students and educational institutions. Contact our
                support team for details.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final CTA */}
      <div className='text-center space-y-4'>
        <h3 className='text-2xl font-bold'>Ready to accelerate your learning?</h3>
        <p className='text-muted-foreground'>
          Join thousands of learners who&apos;ve transformed their education with Pro.
        </p>
        <Button
          onClick={onUpgrade}
          disabled={pending}
          size='lg'
          className='bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300'
        >
          {pending ? (
            <div className='flex items-center gap-2'>
              <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
              <span>Processing...</span>
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <Crown className='w-5 h-5' />
              <span>Start Your Pro Journey</span>
            </div>
          )}
        </Button>
        <p className='text-xs text-muted-foreground'>
          Secure payment powered by Stripe • {BRAND_CONFIG.PLATFORM_NAME} Pro
        </p>
      </div>
    </div>
  )
}
