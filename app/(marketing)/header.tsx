import { Loader, Sparkles, Menu, GraduationCap } from "lucide-react"
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/ui/theme-switcher"
import { BRAND_CONFIG } from "@/lib/config"
import Link from "next/link"

export const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center gap-x-3'>
            <div className='w-10 h-10 bg-gradient-to-br from-primary to-orange-500 rounded-xl flex items-center justify-center shadow-lg'>
              <GraduationCap className='h-6 w-6 text-white' />
            </div>
            <h1 className='text-xl font-bold bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent'>
              {BRAND_CONFIG.PLATFORM_NAME}
            </h1>
          </div>

          {/* Navigation */}
          <div className='hidden md:flex items-center space-x-8'>
            <Button
              variant='ghost'
              size='sm'
              asChild
              className='text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
            >
              <Link href='/pro'>Pricing</Link>
            </Button>
            <Button
              variant='ghost'
              size='sm'
              asChild
              className='text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
            >
              <Link href='/help'>Help</Link>
            </Button>
            <Button
              variant='ghost'
              size='sm'
              asChild
              className='text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
            >
              <Link href='/help/contact-support'>Contact</Link>
            </Button>
          </div>

          {/* Auth Section */}
          <div className='flex items-center space-x-4'>
            <ThemeSwitcher variant='compact' size='sm' />
            <ClerkLoading>
              <Loader className='h-5 w-5 text-muted-foreground animate-spin' />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8",
                    },
                  }}
                />
              </SignedIn>
              <SignedOut>
                <SignInButton mode='modal'>
                  <Button variant='ghost' size='sm'>
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
            </ClerkLoaded>

            {/* Mobile Menu Button */}
            <Button variant='ghost' size='sm' className='md:hidden'>
              <Menu className='h-5 w-5' />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
