import {
  Crown,
  CreditCard,
  Shield,
  Clock,
  RefreshCw,
  HelpCircle,
  CheckCircle,
  XCircle,
  Mail,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BRAND_CONFIG } from "@/lib/config"

const SubscriptionFAQPage = () => {
  const faqs = [
    {
      question: "What is included in the Pro subscription?",
      answer:
        "Pro subscription includes unlimited hearts, ad-free experience, exclusive pro content, priority support, advanced analytics, and access to beta features. You'll also get 50% bonus XP on all activities.",
      icon: Crown,
    },
    {
      question: "How much does Pro cost?",
      answer:
        "Pro subscription costs $9.99 per month. We offer a 7-day free trial for new subscribers, and you can cancel anytime.",
      icon: CreditCard,
    },
    {
      question: "What happens if I cancel my subscription?",
      answer:
        "If you cancel, you'll continue to have Pro access until the end of your current billing period. After that, you'll return to the free plan but keep all your learning progress.",
      icon: XCircle,
    },
    {
      question: "Can I get a refund?",
      answer:
        "Yes, we offer refunds within 30 days of purchase. Contact our support team at support@behrouz.nl to request a refund.",
      icon: RefreshCw,
    },
    {
      question: "How do unlimited hearts work?",
      answer:
        "With Pro, you never lose hearts when you make mistakes. This means you can learn at your own pace without worrying about running out of lives.",
      icon: Shield,
    },
    {
      question: "When will I be charged?",
      answer:
        "You'll be charged at the end of your free trial period, then monthly on the same date. You'll receive email reminders before each billing cycle.",
      icon: Clock,
    },
    {
      question: "Can I change my payment method?",
      answer:
        "Yes, you can update your payment method anytime in your subscription settings. Go to your subscription management page and click 'Manage Subscription'.",
      icon: CreditCard,
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Absolutely. We use Stripe for payment processing, which meets the highest security standards. We never store your credit card information on our servers.",
      icon: Shield,
    },
    {
      question: "Can I pause my subscription?",
      answer:
        "Currently, we don't offer subscription pausing. However, you can cancel and resubscribe anytime without losing your progress.",
      icon: RefreshCw,
    },
    {
      question: "Do you offer student discounts?",
      answer:
        "We're working on student pricing options. For now, contact support@behrouz.nl with your student ID for potential discounts.",
      icon: HelpCircle,
    },
  ]

  const proFeatures = [
    {
      feature: "Unlimited Hearts",
      included: true,
      description: "Never lose progress due to mistakes",
    },
    {
      feature: "Ad-Free Experience",
      included: true,
      description: "Focus on learning without interruptions",
    },
    {
      feature: "50% Bonus XP",
      included: true,
      description: "Earn XP faster on all activities",
    },
    {
      feature: "Exclusive Content",
      included: true,
      description: "Access to Pro-only courses and materials",
    },
    {
      feature: "Priority Support",
      included: true,
      description: "Faster response from our support team",
    },
    {
      feature: "Advanced Analytics",
      included: true,
      description: "Detailed progress tracking and insights",
    },
    {
      feature: "Beta Features",
      included: true,
      description: "Early access to new features",
    },
    {
      feature: "Download for Offline",
      included: false,
      description: "Coming soon",
    },
  ]

  return (
    <div className='p-8'>
      {/* Header */}
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-4'>
          <Crown className='w-8 h-8 text-yellow-500' />
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Subscription FAQ
          </h1>
        </div>
        <p className='text-lg text-gray-600 dark:text-gray-400'>
          Everything you need to know about {BRAND_CONFIG.PLATFORM_NAME} Pro
          subscription
        </p>
      </div>

      {/* Quick Stats */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        <Card>
          <CardContent className='p-6 text-center'>
            <div className='text-3xl font-bold text-green-600 dark:text-green-400 mb-2'>
              7 Days
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              Free Trial Period
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6 text-center'>
            <div className='text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2'>
              $9.99
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              Per Month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='p-6 text-center'>
            <div className='text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2'>
              ∞
            </div>
            <div className='text-sm text-gray-600 dark:text-gray-400'>
              Unlimited Hearts
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pro Features Comparison */}
      <Card className='mb-8'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <CheckCircle className='w-5 h-5 text-green-500' />
            Pro Features Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {proFeatures.map((item, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'
              >
                <div className='flex items-center gap-3'>
                  {item.included ? (
                    <CheckCircle className='w-5 h-5 text-green-500' />
                  ) : (
                    <Clock className='w-5 h-5 text-gray-400' />
                  )}
                  <div>
                    <div className='font-medium text-gray-900 dark:text-white'>
                      {item.feature}
                    </div>
                    <div className='text-sm text-gray-600 dark:text-gray-400'>
                      {item.description}
                    </div>
                  </div>
                </div>
                {item.included ? (
                  <Badge className='bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'>
                    Included
                  </Badge>
                ) : (
                  <Badge variant='neutral'>Coming Soon</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
          Frequently Asked Questions
        </h2>
        <div className='space-y-4'>
          {faqs.map((faq, index) => {
            const Icon = faq.icon
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className='flex items-start gap-3 text-lg'>
                    <div className='w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1'>
                      <Icon className='w-4 h-4 text-blue-600 dark:text-blue-400' />
                    </div>
                    <span>{faq.question}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-gray-600 dark:text-gray-400 ml-11'>
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Contact Support */}
      <Card className='bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800'>
        <CardContent className='p-8 text-center'>
          <Mail className='w-12 h-12 text-blue-500 mx-auto mb-4' />
          <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
            Still have questions?
          </h3>
          <p className='text-gray-600 dark:text-gray-400 mb-6'>
            Our support team is here to help with any subscription or billing
            questions.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button asChild>
              <Link href='mailto:support@behrouz.nl'>
                <Mail className='w-4 h-4 mr-2' />
                Contact Support
              </Link>
            </Button>
            <Button variant='outline' asChild>
              <Link href='/subscription'>Manage Subscription</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SubscriptionFAQPage
