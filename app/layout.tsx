import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import Script from "next/script"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/sonner"
import { ExitModal } from "@/components/modals/exit-modal"
import { HeartsModal } from "@/components/modals/hearts-modal"
import { PracticeModal } from "@/components/modals/practice-modal"
import { ThemeProvider } from "@/lib/theme"
import { EnhancedThemeLayoutWrapper } from "@/components/enhanced-theme-layout-wrapper"
import { AudioSettingsProvider } from "@/contexts/AudioSettingsContext"
import { CONFIG } from "@/lib/config"
import { DebugAuthStates } from "@/components/debug-auth-states"
import "./globals.css"

const font = Nunito({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: `${CONFIG.PLATFORM_NAME} - Learn Technology Skills`,
  description: CONFIG.META_DESCRIPTION,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider afterSignOutUrl='/'>
      <html lang='en'>
        <body className={font.className}>
          {process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID && (
            <Script
              id='google-ads-script'
              strategy='afterInteractive'
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
              crossOrigin='anonymous'
            />
          )}
          <ThemeProvider>
            <AudioSettingsProvider>
              <EnhancedThemeLayoutWrapper>
                {/* {process.env.NODE_ENV === 'development' && <DebugAuthStates />} */}
                <Toaster />
                <ExitModal />
                <HeartsModal />
                <PracticeModal />
                {children}
              </EnhancedThemeLayoutWrapper>
            </AudioSettingsProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
