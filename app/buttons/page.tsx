import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { CheckCircle, XCircle, ArrowRight, Star, Trophy, Heart, Palette } from "lucide-react";

const ButtonsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
      <DarkModeToggle />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-800 dark:text-gray-100 mb-4 flex items-center justify-center gap-3">
            <Palette className="w-8 h-8 text-purple-500" />
            <span>Duolingo-Style Button System</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive collection of playful, engaging buttons inspired by Duolingo&apos;s design language. 
            Perfect for learning platforms and interactive applications.
          </p>
        </div>

        {/* Primary Actions Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <span className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3 text-green-600 dark:text-green-400 font-black">1</span>
            Primary Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Main Action</h3>
              <Button variant="primary" className="w-full">
                CHECK ANSWER
              </Button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Secondary Action</h3>
              <Button variant="secondary" className="w-full">
                SKIP LESSON
              </Button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">With Icon</h3>
              <Button variant="primary" className="w-full" rightIcon={<ArrowRight className="w-5 h-5" />}>
                CONTINUE
              </Button>
            </div>
          </div>
        </section>

        {/* Status Actions Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-blue-600 font-black">2</span>
            Status & Feedback Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-green-700 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Correct
              </h3>
              <Button variant="success" className="w-full">
                NEXT LESSON
              </Button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-red-700 mb-4 flex items-center">
                <XCircle className="w-5 h-5 mr-2" />
                Incorrect
              </h3>
              <Button variant="danger" className="w-full">
                TRY AGAIN
              </Button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-orange-700 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Warning
              </h3>
              <Button variant="warning" className="w-full">
                REVIEW
              </Button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-blue-700 mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Info
              </h3>
              <Button variant="info" className="w-full">
                LEARN MORE
              </Button>
            </div>
          </div>
        </section>

        {/* Outline Variants Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 text-purple-600 font-black">3</span>
            Outline Variants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Primary Outline</h3>
              <Button variant="outline" className="w-full">
                PRACTICE
              </Button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Secondary Outline</h3>
              <Button variant="outline" className="w-full">
                SETTINGS
              </Button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Danger Outline</h3>
              <Button variant="danger" className="w-full">
                DELETE
              </Button>
            </div>
          </div>
        </section>

        {/* Special Variants Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <span className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3 text-yellow-600 font-black">4</span>
            Special Variants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-orange-700 mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Super
              </h3>
              <Button variant="primary" className="w-full">
                UPGRADE
              </Button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-orange-700 mb-4">Super Outline</h3>
              <Button variant="outline" className="w-full">
                PREMIUM
              </Button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Ghost</h3>
              <Button variant="ghost" className="w-full">
                CANCEL
              </Button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Link</h3>
              <Button variant="link" className="w-full">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Button States Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
            <span className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mr-3 text-indigo-600 dark:text-indigo-400 font-black">5</span>
            Button States & Course Themes - Updated!
          </h2>
          {/* Improvement Showcase */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 mb-8 border-2 border-green-200 dark:border-green-700">
            <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">🎉 Recent Improvements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-green-800 dark:text-green-400 mb-1">No More Blinking</h4>
                <p className="text-sm text-green-700 dark:text-green-500">Smooth loading animation</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-1">Icon Alignment</h4>
                <p className="text-sm text-blue-700 dark:text-blue-500">Perfect text alignment</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-purple-800 dark:text-purple-400 mb-1">Better Padding</h4>
                <p className="text-sm text-purple-700 dark:text-purple-500">Proper text spacing</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-orange-800 dark:text-orange-400 mb-1">Dark Mode</h4>
                <p className="text-sm text-orange-700 dark:text-orange-500">Toggle in top-right!</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Loading States - No Blinking!</h3>
              <div className="space-y-3">
                <Button variant="primary" loading={true} className="w-full">
                  Processing
                </Button>
                <Button variant="success" loading={true} className="w-full">
                  Submitting
                </Button>
                <Button variant="info" loading={true} className="w-full">
                  Loading
                </Button>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Disabled States</h3>
              <div className="space-y-3">
                <Button variant="primary" disabled={true} className="w-full">
                  Not Available
                </Button>
                <Button variant="success" disabled={true} className="w-full">
                  Completed
                </Button>
                <Button variant="outline" disabled={true} className="w-full">
                  Locked
                </Button>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Size Variants - Better Padding</h3>
              <div className="space-y-3">
                <Button variant="primary" size="sm" className="w-full">
                  Small Button
                </Button>
                <Button variant="primary" size="md" className="w-full">
                  Medium Button
                </Button>
                <Button variant="primary" size="lg" className="w-full">
                  Large Button
                </Button>
              </div>
            </div>
          </div>
          
          {/* Course Theme Buttons */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">AWS Course Themes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-orange-700">Compute Services</h4>
                <Button courseTheme="compute" className="w-full">
                  EC2 & Lambda
                </Button>
                <Button courseTheme="compute" loading={true} size="sm" className="w-full">
                  Loading
                </Button>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-blue-700">Storage & Database</h4>
                <Button courseTheme="storage" className="w-full">
                  S3 & RDS
                </Button>
                <Button courseTheme="storage" disabled={true} size="sm" className="w-full">
                  Disabled
                </Button>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-purple-700">Security & Identity</h4>
                <Button courseTheme="security" className="w-full">
                  IAM & KMS
                </Button>
                <Button courseTheme="security" loading={true} size="sm" className="w-full">
                  Loading
                </Button>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-teal-700">Networking</h4>
                <Button courseTheme="networking" className="w-full">
                  VPC & CDN
                </Button>
                <Button courseTheme="networking" disabled={true} size="sm" className="w-full">
                  Disabled
                </Button>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-emerald-700">Management</h4>
                <Button courseTheme="management" className="w-full">
                  CloudWatch
                </Button>
                <Button courseTheme="management" loading={true} size="sm" className="w-full">
                  Loading
                </Button>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-violet-700">AI & ML</h4>
                <Button courseTheme="aiml" className="w-full">
                  SageMaker
                </Button>
                <Button courseTheme="aiml" disabled={true} size="sm" className="w-full">
                  Disabled
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <span className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3 text-pink-600 font-black">6</span>
            Interactive Demo - Lesson Footer Simulation
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Initial State</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ready to check your answer?</span>
                  <Button variant="primary">CHECK</Button>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="font-semibold text-green-700 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Correct Answer
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-semibold">Nicely done!</span>
                  <Button variant="success">NEXT</Button>
                </div>
              </div>

              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                <h3 className="font-semibold text-red-700 mb-4 flex items-center">
                  <XCircle className="w-5 h-5 mr-2" />
                  Incorrect Answer
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-red-600 font-semibold">Try again.</span>
                  <Button variant="danger">RETRY</Button>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                <h3 className="font-semibold text-blue-700 mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Lesson Completed
                </h3>
                <div className="flex justify-between items-center">
                  <Button variant="secondary">Practice again</Button>
                  <Button variant="info">CONTINUE</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Button Sizes Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3 text-indigo-600 font-black">6</span>
            Button Sizes
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-end gap-4">
              <div className="text-center">
                <Button variant="primary" size="xs">XS</Button>
                <p className="text-xs text-gray-500 mt-2">Extra Small</p>
              </div>
              <div className="text-center">
                <Button variant="primary" size="sm">SM</Button>
                <p className="text-xs text-gray-500 mt-2">Small</p>
              </div>
              <div className="text-center">
                <Button variant="primary" size="md">MEDIUM</Button>
                <p className="text-xs text-gray-500 mt-2">Medium (Default)</p>
              </div>
              <div className="text-center">
                <Button variant="primary" size="lg">LARGE</Button>
                <p className="text-xs text-gray-500 mt-2">Large</p>
              </div>
              <div className="text-center">
                <Button variant="primary" size="xl">EXTRA LARGE</Button>
                <p className="text-xs text-gray-500 mt-2">Extra Large</p>
              </div>
            </div>
          </div>
        </section>

        {/* Loading States */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <span className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3 text-teal-600 font-black">7</span>
            Loading & Disabled States
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Loading State</h3>
              <Button variant="primary" loading className="w-full">
                Processing
              </Button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Disabled State</h3>
              <Button variant="primary" disabled className="w-full">
                SUBMIT
              </Button>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-4">Normal State</h3>
              <Button variant="primary" className="w-full">
                READY
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ButtonsPage;
