import {
  Loader,
  Zap,
  Trophy,
  Star,
  Sparkles,
  Target,
  ArrowRight,
  PlayCircle,
  Users,
  BookOpen,
} from "lucide-react"
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { BRAND_CONFIG } from "@/lib/config"
import Link from "next/link"

export default function Home() {
  return (
    <div className='w-full'>
      {/* Hero Section */}
      <section className='relative overflow-hidden'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32'>
            <main className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
              <div className='text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center'>
                {/* Left side - Content */}
                <div className='lg:col-span-1'>
                  <div className='flex items-center justify-center lg:justify-start mb-6'>
                    <Badge variant='info' className='px-4 py-2 text-sm font-medium'>
                      <Sparkles className='w-4 h-4 mr-2' />
                      Interactive Learning Platform
                    </Badge>
                  </div>

                  <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl'>
                    <span className='block'>Learn, Practice,</span>
                    <span className='block bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent'>
                      Master Skills
                    </span>
                  </h1>

                  <p className='mt-6 text-lg text-gray-600 dark:text-gray-300 sm:text-xl max-w-3xl'>
                    Transform your learning journey with interactive lessons, gamified challenges,
                    and personalized progress tracking. Build expertise through hands-on practice
                    and engaging content.
                  </p>

                  {/* CTA Buttons */}
                  <div className='mt-8 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start'>
                    <ClerkLoading>
                      <div className='flex items-center justify-center py-3'>
                        <Loader className='h-6 w-6 text-muted-foreground animate-spin' />
                        <span className='ml-2 text-muted-foreground'>Loading...</span>
                      </div>
                    </ClerkLoading>
                    <ClerkLoaded>
                      <SignedOut>
                        <SignUpButton mode='modal'>
                          <Button
                            size='lg'
                            variant='success'
                            className='w-full sm:w-auto px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200'
                          >
                            <PlayCircle className='w-5 h-5 mr-2' />
                            Start Learning Free
                          </Button>
                        </SignUpButton>
                        <SignInButton mode='modal'>
                          <Button
                            size='lg'
                            variant='success'
                            className='w-full sm:w-auto px-8 py-4 text-lg font-semibold border-2  transition-all duration-200'
                          >
                            Sign In
                          </Button>
                        </SignInButton>
                      </SignedOut>
                      <SignedIn>
                        <Link href='/learn'>
                          <Button
                            size='lg'
                            variant='success'
                            className='w-full sm:w-auto px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200'
                          >
                            <ArrowRight className='w-5 h-5 mr-2' />
                            Continue Learning
                          </Button>
                        </Link>
                      </SignedIn>
                    </ClerkLoaded>
                  </div>

                  {/* Social Proof */}
                  <div className='mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-600 dark:text-gray-400'>
                    <div className='flex items-center gap-2'>
                      <Users className='w-4 h-4' />
                      <span>Many learners</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Star className='w-4 h-4 text-yellow-500' />
                      <span>4.8/5 rating</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <BookOpen className='w-4 h-4' />
                      <span>So many lessons</span>
                    </div>
                  </div>
                </div>

                {/* Right side - Visual */}
                <div className='mt-12 lg:mt-0 lg:col-span-1'>
                  <div className='relative mx-auto w-full max-w-lg'>
                    {/* Floating Cards */}
                    <div className='relative'>
                      {/* Main Hero Card */}
                      <Card className='relative z-10 bg-gradient-to-br from-primary/10 to-orange-500/10 border-2 border-primary/20 shadow-2xl'>
                        <CardContent className='p-8'>
                          <div className='text-center'>
                            <div className='w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-orange-500 rounded-2xl flex items-center justify-center shadow-lg'>
                              <Zap className='w-10 h-10 text-white' />
                            </div>
                            <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-2'>
                              Interactive Learning
                            </h3>
                            <p className='text-gray-600 dark:text-gray-400'>
                              Hands-on lessons with real-time feedback and progress tracking
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Floating Achievement Card */}
                      <Card className='absolute -top-4 -right-4 w-32 z-20 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 shadow-lg transform rotate-12 hover:rotate-6 transition-transform duration-300'>
                        <CardContent className='p-4 text-center'>
                          <Trophy className='w-8 h-8 text-yellow-600 mx-auto mb-2' />
                          <p className='text-xs font-semibold text-yellow-800 dark:text-yellow-200'>
                            Achievement Unlocked!
                          </p>
                        </CardContent>
                      </Card>

                      {/* Floating Progress Card */}
                      <Card className='absolute -bottom-4 -left-4 w-36 z-20 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 shadow-lg transform -rotate-6 hover:-rotate-3 transition-transform duration-300'>
                        <CardContent className='p-4'>
                          <div className='flex items-center gap-2 mb-2'>
                            <Target className='w-5 h-5 text-green-600' />
                            <span className='text-xs font-semibold text-green-800 dark:text-green-200'>
                              Progress
                            </span>
                          </div>
                          <div className='w-full bg-green-200 dark:bg-green-800 rounded-full h-2'>
                            <div
                              className='bg-green-600 h-2 rounded-full'
                              style={{ width: "75%" }}
                            ></div>
                          </div>
                          <p className='text-xs text-green-700 dark:text-green-300 mt-1'>
                            75% Complete
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl'>
              Why Choose {BRAND_CONFIG.PLATFORM_NAME}?
            </h2>
            <p className='mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
              Experience a new way of learning with our innovative platform designed for modern
              learners
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Feature 1 */}
            <Card className='text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
              <CardContent className='p-8'>
                <div className='w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg'>
                  <Zap className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
                  Interactive Learning
                </h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  Engage with hands-on exercises, real-time feedback, and interactive content that
                  adapts to your learning style.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className='text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
              <CardContent className='p-8'>
                <div className='w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg'>
                  <Trophy className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
                  Gamified Progress
                </h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  Earn points, unlock achievements, and track your progress through engaging
                  challenges and milestones.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className='text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1'>
              <CardContent className='p-8'>
                <div className='w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg'>
                  <Target className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-4'>
                  Personalized Path
                </h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  Follow a customized learning journey tailored to your goals, skill level, and
                  preferred learning pace.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
