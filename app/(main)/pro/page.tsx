import { redirect } from "next/navigation";
import { 
  Check, 
  Crown, 
  Zap, 
  Shield, 
  Infinity, 
  BookOpen, 
  Users, 
  Trophy,
  Star,
  Clock
} from "lucide-react";

const ProPage = async () => {
  // TODO: Add checkSubscription when implemented
  const isPro = false; // await checkSubscription();

  if (isPro) {
    redirect("/learn");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Crown className="w-12 h-12 text-yellow-500 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">
            Upgrade to <span className="text-orange-500">Pro</span>
          </h1>
        </div>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Unlock unlimited learning potential with advanced features, exclusive content, and priority support.
        </p>
        
        {/* Pricing Card */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white max-w-md mx-auto mb-12">
          <div className="flex items-center justify-center mb-4">
            <Star className="w-8 h-8 mr-2" />
            <span className="text-2xl font-bold">Pro Membership</span>
          </div>
          <div className="text-4xl font-bold mb-2">$9.99</div>
          <div className="text-orange-100 mb-6">per month</div>
          <button className="w-full bg-white text-orange-600 py-3 px-6 rounded-lg font-bold text-lg hover:bg-orange-50 transition-colors">
            Start Free Trial
          </button>
          <p className="text-sm text-orange-100 mt-3">7-day free trial • Cancel anytime</p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Infinity className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Unlimited Hearts</h3>
          <p className="text-gray-600">Never run out of hearts. Learn without interruptions and practice as much as you want.</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Premium Content</h3>
          <p className="text-gray-600">Access exclusive lessons, advanced topics, and real-world projects not available in free plan.</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Progress Insights</h3>
          <p className="text-gray-600">Detailed analytics, learning streaks, and personalized recommendations to optimize your learning.</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
            <Trophy className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Achievement Badges</h3>
          <p className="text-gray-600">Earn special badges, certificates, and showcase your achievements to employers.</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Priority Support</h3>
          <p className="text-gray-600">Get faster response times and dedicated support from our learning experts.</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100">
          <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Offline Learning</h3>
          <p className="text-gray-600">Download lessons and practice offline. Perfect for learning on the go without internet.</p>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-xl shadow-sm border-2 border-gray-100 overflow-hidden mb-12">
        <div className="bg-gray-50 px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-900">Feature Comparison</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { feature: "Basic Courses", free: true, pro: true },
            { feature: "Hearts System", free: "5 hearts", pro: "Unlimited" },
            { feature: "Progress Tracking", free: "Basic", pro: "Advanced Analytics" },
            { feature: "Premium Courses", free: false, pro: true },
            { feature: "Offline Access", free: false, pro: true },
            { feature: "Achievement Badges", free: "Basic", pro: "Premium + Certificates" },
            { feature: "Priority Support", free: false, pro: true },
            { feature: "Learning Streaks", free: "Basic", pro: "Enhanced + Rewards" },
          ].map((item, index) => (
            <div key={index} className="px-6 py-4 flex items-center justify-between">
              <span className="font-medium text-gray-900">{item.feature}</span>
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Free</div>
                  <div className="flex items-center justify-center">
                    {typeof item.free === "boolean" ? (
                      item.free ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <span className="text-gray-300">—</span>
                      )
                    ) : (
                      <span className="text-sm text-gray-600">{item.free}</span>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-orange-500 mb-1 font-medium">Pro</div>
                  <div className="flex items-center justify-center">
                    {typeof item.pro === "boolean" ? (
                      item.pro ? (
                        <Check className="w-5 h-5 text-orange-500" />
                      ) : (
                        <span className="text-gray-300">—</span>
                      )
                    ) : (
                      <span className="text-sm text-orange-600 font-medium">{item.pro}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">What Our Pro Users Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah Johnson",
              role: "AWS Solutions Architect",
              content: "The premium content helped me pass my AWS certification exam. The unlimited practice was a game-changer!",
              avatar: "👩‍💻"
            },
            {
              name: "Mike Chen",
              role: "DevOps Engineer",
              content: "Offline learning is perfect for my commute. I've completed 3 courses during my daily train rides.",
              avatar: "👨‍💻"
            },
            {
              name: "Emily Davis",
              role: "Full Stack Developer",
              content: "The progress insights helped me identify my weak areas and focus my learning effectively.",
              avatar: "👩‍🔬"
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-100">
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-gray-700 italic">&ldquo;{testimonial.content}&rdquo;</p>
              <div className="flex items-center mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Accelerate Your Learning?</h2>
        <p className="text-xl text-orange-100 mb-6">Join thousands of professionals who have advanced their careers with Pro.</p>
        <button className="bg-white text-orange-600 py-4 px-8 rounded-xl font-bold text-lg hover:bg-orange-50 transition-colors mr-4">
          Start 7-Day Free Trial
        </button>
        <button className="border-2 border-white text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-white hover:text-orange-600 transition-colors">
          View All Plans
        </button>
        <p className="text-sm text-orange-100 mt-4">No credit card required • Cancel anytime</p>
      </div>
    </div>
  );
};

export default ProPage;