import { Loader, Lightbulb } from "lucide-react"
import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { CONFIG } from "@/lib/config"
import Link from "next/link"

export default function Home() {
  return (
    <div className='max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2'>
      <div className='relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0 flex items-center justify-center'>
        <Lightbulb className='w-full h-full text-orange-600 max-w-[200px] max-h-[200px] lg:max-w-[350px] lg:max-h-[350px]' />
      </div>
      <div className='flex flex-col items-center gap-y-8'>
        <h1 className='text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center dark:text-white'>
          Master Technology Skills with {CONFIG.PLATFORM_NAME}&apos;s
          interactive, gamified learning.
        </h1>
        <div className='flex flex-col items-center gap-y-3 max-w-[330px] w-full'>
          <ClerkLoading>
            <Loader className='h-5 w-5 text-muted-foreground animate-spin' />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton mode='modal'>
                <Button size='lg' variant='secondary' className='w-full'>
                  Get Started
                </Button>
              </SignUpButton>
              <SignInButton mode='modal'>
                <Button size='lg' variant='outline' className='w-full'>
                  I already have an account
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href='/learn'>
                <Button size='lg' variant='secondary' className='w-full'>
                  Continue Learning
                </Button>
              </Link>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  )
}
