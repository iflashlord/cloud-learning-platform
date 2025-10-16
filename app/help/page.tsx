import { HelpCircle, Crown, BookOpen, Shield, Settings, Mail, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/config";

const HelpPage = () => {
  const popularArticles = [
    {
      title: "How to upgrade to Pro subscription",
      href: "/help/subscription-faq",
      icon: Crown,
      description: "Learn about Pro benefits and how to upgrade your account"
    },
    {
      title: "Understanding Hearts & XP System",
      href: "/help/hearts-system",
      icon: Shield,
      description: "How hearts work and how to earn XP points"
    },
    {
      title: "Getting started with your first lesson",
      href: "/help/first-lesson",
      icon: BookOpen,
      description: "Step-by-step guide to taking your first AWS lesson"
    },
    {
      title: "Managing your account settings",
      href: "/help/account-settings",
      icon: Settings,
      description: "How to update your profile and preferences"
    }
  ];

  const helpCategories = [
    {
      title: "Subscription & Billing",
      description: "Questions about Pro membership, billing, and payments",
      icon: Crown,
      href: "/help/subscription-faq",
      articles: 8
    },
    {
      title: "Learning Features",
      description: "Hearts, XP, courses, and progress tracking",
      icon: Shield,
      href: "/help/hearts-system",
      articles: 6
    },
    {
      title: "Getting Started",
      description: "New user guides and account setup",
      icon: BookOpen,
      href: "/help/getting-started",
      articles: 5
    },
    {
      title: "Account & Settings",
      description: "Profile management and account settings",
      icon: Settings,
      href: "/help/account-settings",
      articles: 7
    },
    {
      title: "Technical Support",
      description: "Troubleshooting and technical issues",
      icon: HelpCircle,
      href: "/help/technical-issues",
      articles: 4
    },
    {
      title: "Contact & Support",
      description: "Get in touch with our support team",
      icon: Mail,
      href: "/help/contact-support",
      articles: 3
    }
  ];

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <HelpCircle className="w-12 h-12 text-blue-500" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            How can we help you?
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Find answers to common questions or get in touch with our support team
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search help articles..."
            className="pl-12 h-12 text-lg"
          />
          <Button className="absolute right-2 top-2 h-8">
            Search
          </Button>
        </div>
      </div>

      {/* Popular Articles */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Popular Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {popularArticles.map((article) => {
            const Icon = article.icon;
            return (
              <Link key={article.href} href={article.href}>
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {article.description}
                        </p>
                        <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                          <span>Read more</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Help Categories */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.href} href={category.href}>
                <Card className="hover:shadow-lg transition-all duration-200 h-full group">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {category.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-500">
                        {category.articles} articles
                      </span>
                      <ArrowRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Contact CTA */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Still need help?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Our support team is ready to assist you with any questions about {BRAND_CONFIG.PLATFORM_NAME}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="mailto:support@behrouz.nl">
              <Mail className="w-4 h-4 mr-2" />
              Contact Support
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/help/contact-support">
              View Contact Options
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;