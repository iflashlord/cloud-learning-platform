"use client"

import { Crown, CreditCard, BookOpen, Shield, Users, Settings, Mail, FileText } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const helpSections = [
  {
    title: "Getting Started",
    icon: BookOpen,
    links: [{ href: "/help/getting-started", label: "How to Get Started" }],
  },
  {
    title: "Subscription & Billing",
    icon: Crown,
    links: [{ href: "/help/subscription-faq", label: "Subscription FAQ" }],
  },
  {
    title: "Learning Features",
    icon: Shield,
    links: [{ href: "/help/hearts-system", label: "Hearts & Lives System" }],
  },
  {
    title: "Contact & Support",
    icon: Mail,
    links: [{ href: "/help/contact-support", label: "Contact Support" }],
  },
]

export const HelpSidebar = () => {
  const pathname = usePathname()

  return (
    <div className='bg-white dark:bg-gray-900 rounded-lg shadow-sm border p-6'>
      <div className='space-y-6'>
        <div>
          <h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>Help Topics</h2>
        </div>

        {helpSections.map((section) => {
          const Icon = section.icon
          return (
            <div key={section.title}>
              <div className='flex items-center gap-2 mb-3'>
                <Icon className='w-4 h-4 text-blue-500' />
                <h3 className='font-medium text-sm text-gray-900 dark:text-white'>
                  {section.title}
                </h3>
              </div>
              <div className='space-y-1 ml-6'>
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block text-sm py-1 px-2 rounded transition-colors",
                      pathname === link.href
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )
        })}

        {/* Quick Contact */}
        <div className='pt-6 border-t border-gray-200 dark:border-gray-700'>
          <div className='bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg'>
            <h3 className='font-medium text-sm text-blue-900 dark:text-blue-100 mb-2'>
              Need More Help?
            </h3>
            <p className='text-xs text-blue-700 dark:text-blue-300 mb-3'>
              Can&apos;t find what you&apos;re looking for? Our support team is here to help.
            </p>
            <Link
              href='mailto:support@behrouz.nl'
              className='inline-flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200'
            >
              <Mail className='w-3 h-3' />
              support@behrouz.nl
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
