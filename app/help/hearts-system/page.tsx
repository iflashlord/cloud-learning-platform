import { Heart, Shield, Crown, Clock, Zap, Star, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/config";

const HeartsSystemPage = () => {
  const heartFacts = [
    {
      title: "Starting Hearts",
      value: "5",
      description: "Every user starts with 5 hearts",
      icon: Heart
    },
    {
      title: "Heart Loss",
      value: "1",
      description: "Lose 1 heart per incorrect answer",
      icon: AlertTriangle
    },
    {
      title: "Refill Time",
      value: "1 hour",
      description: "Hearts refill automatically every hour",
      icon: Clock
    },
    {
      title: "Pro Hearts",
      value: "∞",
      description: "Pro users never lose hearts",
      icon: Crown
    }
  ];

  const heartsComparison = [
    {
      feature: "Hearts per mistake",
      free: "Lose 1 heart",
      pro: "No hearts lost",
      proIcon: true
    },
    {
      feature: "Daily heart limit",
      free: "5 hearts max",
      pro: "Unlimited hearts",
      proIcon: true
    },
    {
      feature: "Heart refill time",
      free: "1 hour per heart",
      pro: "Not needed",
      proIcon: true
    },
    {
      feature: "Purchase hearts",
      free: "Yes (with XP)",
      pro: "Not needed",
      proIcon: true
    },
    {
      feature: "Learning interruption",
      free: "When hearts depleted",
      pro: "Never interrupted",
      proIcon: true
    }
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-8 h-8 text-red-500 fill-current" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Hearts & Lives System
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Understanding how hearts work in {BRAND_CONFIG.PLATFORM_NAME} and how they affect your learning
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {heartFacts.map((fact, index) => {
          const Icon = fact.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
                  {fact.value}
                </div>
                <div className="font-medium text-gray-900 dark:text-white text-sm mb-2">
                  {fact.title}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {fact.description}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* How Hearts Work */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            How Hearts Work
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                For Free Users
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Heart className="w-5 h-5 text-red-500 fill-current mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Start with 5 hearts</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Every new day begins with full hearts
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Lose hearts on mistakes</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Each wrong answer costs 1 heart
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Hearts refill over time</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      1 heart refills every hour automatically
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Zap className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Purchase with XP</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Spend 10 XP to refill all hearts instantly
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                For Pro Users
                <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">
                  PRO
                </Badge>
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800/50">
                  <Crown className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Unlimited hearts</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Never lose hearts on wrong answers
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800/50">
                  <Shield className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Uninterrupted learning</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Focus on learning without heart management
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800/50">
                  <Star className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Learn at your pace</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Practice as much as you want, anytime
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800/50">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">No heart purchases needed</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Save your XP for other rewards
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Free vs Pro Hearts Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Feature
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Free Plan
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-900 dark:text-white">
                    Pro Plan
                  </th>
                </tr>
              </thead>
              <tbody>
                {heartsComparison.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 text-center text-gray-600 dark:text-gray-400">
                      {row.free}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {row.proIcon && <Crown className="w-4 h-4 text-yellow-500" />}
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          {row.pro}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Tips for Free Users */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-500" />
            Tips for Managing Hearts (Free Users)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">Smart Learning Strategies</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Take your time with each question
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Review lesson materials before starting
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Use hints when available
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Practice easier levels first
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">Heart Conservation</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  Wait for automatic refills
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                  Earn XP to buy heart refills
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  Complete daily quests for rewards
                </li>
                <li className="flex items-start gap-2">
                  <Crown className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  Consider upgrading to Pro
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade CTA */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-300 dark:border-yellow-700/50">
        <CardContent className="p-8 text-center">
          <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Ready for Unlimited Hearts?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Upgrade to Pro and never worry about hearts again. Focus entirely on learning without interruptions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
              <Link href="/subscription">
                <Crown className="w-5 h-5 mr-2" />
                Upgrade to Pro
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/help/subscription-faq">
                Learn More About Pro
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeartsSystemPage;