import { Mail, Clock, MessageSquare, Shield, Crown, Zap } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BRAND_CONFIG } from "@/lib/config"

const ContactSupportPage = () => {
  const supportOptions = [
    {
      title: "Email Support",
      description: "Send us an email and we'll get back to you within 24 hours",
      icon: Mail,
      action: "Send Email",
      href: "mailto:support@behrouz.nl",
      responseTime: "Within 24 hours",
      availability: "24/7",
    },
    {
      title: "Priority Support (Pro)",
      description:
        "Pro subscribers get faster response times and priority handling",
      icon: Crown,
      action: "Email Pro Support",
      href: "mailto:support@behrouz.nl?subject=Pro%20Support%20Request",
      responseTime: "Within 4 hours",
      availability: "Pro Only",
      isPro: true,
    },
  ]

  const commonIssues = [
    {
      issue: "Subscription & Billing",
      description: "Questions about Pro membership, payments, or cancellation",
      quickActions: [
        { label: "View Subscription FAQ", href: "/help/subscription-faq" },
        { label: "Manage Subscription", href: "/subscription" },
      ],
    },
    {
      issue: "Account Issues",
      description: "Login problems, password reset, or account settings",
      quickActions: [
        { label: "Reset Password", href: "/reset-password" },
        { label: "Account Settings", href: "/help/account-settings" },
      ],
    },
    {
      issue: "Learning Features",
      description: "Questions about hearts, XP, courses, or progress tracking",
      quickActions: [
        { label: "Hearts System Guide", href: "/help/hearts-system" },
        { label: "XP Points Guide", href: "/help/xp-points" },
      ],
    },
    {
      issue: "Technical Problems",
      description: "App crashes, loading issues, or browser compatibility",
      quickActions: [
        { label: "Technical Issues Guide", href: "/help/technical-issues" },
        { label: "Browser Support", href: "/help/browser-support" },
      ],
    },
  ]

  return (
    <div className='p-8'>
      {/* Header */}
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-4'>
          <Mail className='w-8 h-8 text-blue-500' />
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Contact Support
          </h1>
        </div>
        <p className='text-lg text-gray-600 dark:text-gray-400'>
          Get help from our support team or find answers to common questions
        </p>
      </div>

      {/* Support Options */}
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
          How would you like to get help?
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {supportOptions.map((option, index) => {
            const Icon = option.icon
            return (
              <Card
                key={index}
                className={
                  option.isPro
                    ? "border-yellow-200 dark:border-yellow-800 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
                    : ""
                }
              >
                <CardHeader>
                  <CardTitle className='flex items-center gap-3'>
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        option.isPro
                          ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                          : "bg-gradient-to-br from-blue-500 to-cyan-500"
                      }`}
                    >
                      <Icon className='w-5 h-5 text-white' />
                    </div>
                    <div>
                      <div className='flex items-center gap-2'>
                        <span>{option.title}</span>
                        {option.isPro && (
                          <Badge className='bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'>
                            PRO
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-gray-600 dark:text-gray-400 mb-4'>
                    {option.description}
                  </p>

                  <div className='space-y-3 mb-6'>
                    <div className='flex items-center gap-2 text-sm'>
                      <Clock className='w-4 h-4 text-gray-500' />
                      <span className='text-gray-600 dark:text-gray-400'>
                        Response time: <strong>{option.responseTime}</strong>
                      </span>
                    </div>
                    <div className='flex items-center gap-2 text-sm'>
                      <MessageSquare className='w-4 h-4 text-gray-500' />
                      <span className='text-gray-600 dark:text-gray-400'>
                        Available: <strong>{option.availability}</strong>
                      </span>
                    </div>
                  </div>

                  <Button
                    asChild
                    className={
                      option.isPro
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                        : ""
                    }
                  >
                    <Link href={option.href}>
                      <Icon className='w-4 h-4 mr-2' />
                      {option.action}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Common Issues */}
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
          Find Quick Solutions
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {commonIssues.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className='text-lg'>{item.issue}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-gray-600 dark:text-gray-400 mb-4'>
                  {item.description}
                </p>
                <div className='space-y-2'>
                  {item.quickActions.map((action, actionIndex) => (
                    <Link key={actionIndex} href={action.href}>
                      <Button
                        variant='outline'
                        size='sm'
                        className='w-full justify-start'
                      >
                        <Zap className='w-4 h-4 mr-2' />
                        {action.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <Card className='bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800'>
        <CardContent className='p-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
            <div>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
                Direct Contact Information
              </h3>
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Mail className='w-5 h-5 text-blue-500' />
                  <div>
                    <div className='font-medium text-gray-900 dark:text-white'>
                      Email Support
                    </div>
                    <Link
                      href='mailto:support@behrouz.nl'
                      className='text-blue-600 dark:text-blue-400 hover:underline'
                    >
                      support@behrouz.nl
                    </Link>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <Clock className='w-5 h-5 text-blue-500' />
                  <div>
                    <div className='font-medium text-gray-900 dark:text-white'>
                      Response Times
                    </div>
                    <div className='text-sm text-gray-600 dark:text-gray-400'>
                      Free users: 24 hours • Pro users: 4 hours
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <Shield className='w-5 h-5 text-blue-500' />
                  <div>
                    <div className='font-medium text-gray-900 dark:text-white'>
                      Security & Privacy
                    </div>
                    <div className='text-sm text-gray-600 dark:text-gray-400'>
                      All communications are secure and confidential
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='text-center'>
              <div className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                When contacting support, please include:
              </div>
              <div className='space-y-2 text-sm text-gray-600 dark:text-gray-400'>
                <div>• Your account email address</div>
                <div>• Detailed description of the issue</div>
                <div>• Steps you&apos;ve already tried</div>
                <div>• Screenshots if applicable</div>
                <div>• Browser/device information</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <div className='mt-8 text-center'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
          Before contacting support, try these resources:
        </h3>
        <div className='flex flex-wrap justify-center gap-4'>
          <Button variant='outline' asChild>
            <Link href='/help'>Browse Help Center</Link>
          </Button>
          <Button variant='outline' asChild>
            <Link href='/help/subscription-faq'>Subscription FAQ</Link>
          </Button>
          <Button variant='outline' asChild>
            <Link href='/help/technical-issues'>Technical Issues</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ContactSupportPage
