import { Button } from "@/components/ui/button";
import { Heart, Github, Twitter, Mail } from "lucide-react";
import { BRAND_CONFIG } from "@/lib/config";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {BRAND_CONFIG.PLATFORM_NAME.charAt(0)}
                </span>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {BRAND_CONFIG.PLATFORM_NAME}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              {BRAND_CONFIG.PLATFORM_DESCRIPTION} - Empowering learners worldwide with 
              interactive, engaging, and effective educational experiences.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Learning Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Learning
            </h3>
            <div className="flex flex-col space-y-3">
              <Button variant="ghost" size="sm" asChild className="p-0 h-auto font-normal text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white justify-start">
                <Link href="/courses">Courses</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="p-0 h-auto font-normal text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white justify-start">
                <Link href="/leaderboard">Leaderboard</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="p-0 h-auto font-normal text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white justify-start">
                <Link href="/quests">Quests</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="p-0 h-auto font-normal text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white justify-start">
                <Link href="/shop">Shop</Link>
              </Button>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Platform
            </h3>
            <div className="flex flex-col space-y-3">
              <Button variant="ghost" size="sm" asChild className="p-0 h-auto font-normal text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white justify-start">
                <Link href="/pro">Pro Membership</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="p-0 h-auto font-normal text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white justify-start">
                <Link href="/subscription">Subscription</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="p-0 h-auto font-normal text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white justify-start">
                <Link href="/help/getting-started">Getting Started</Link>
              </Button>
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <div className="flex flex-col space-y-3">
              <Button variant="ghost" size="sm" asChild className="p-0 h-auto font-normal text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white justify-start">
                <Link href="/help">Help Center</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="p-0 h-auto font-normal text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white justify-start">
                <Link href="/help/contact-support">Contact Support</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="p-0 h-auto font-normal text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white justify-start">
                <Link href="/help/subscription-faq">FAQ</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="p-0 h-auto font-normal text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white justify-start">
                <Link href="/help/hearts-system">Hearts System</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2025 {BRAND_CONFIG.COMPANY_NAME}. All rights reserved.
            </p>
            <div className="flex items-center space-x-1 mt-4 md:mt-0">
              <span className="text-gray-600 dark:text-gray-400 text-sm">Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-gray-600 dark:text-gray-400 text-sm">for learners everywhere</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
