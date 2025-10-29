"use client"

import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>
  }
}

type GoogleAdProps = {
  className?: string
  /**
   * Google ad slot id. Falls back to NEXT_PUBLIC_GOOGLE_ADS_SLOT when omitted.
   */
  slot?: string
  /**
   * Optional inline styles. Defaults to a block display suitable for responsive ads.
   */
  style?: CSSProperties
  /**
   * Custom ad format. Defaults to "auto".
   */
  format?: string
  /**
   * When provided, forwarded to data-ad-layout attribute.
   */
  layout?: string
}

const AD_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID ?? ""
const DEFAULT_SLOT = process.env.NEXT_PUBLIC_GOOGLE_ADS_SLOT ?? ""
const IS_DEV = process.env.NODE_ENV !== "production"

/**
 * Renders a Google AdSense unit and triggers the adsbygoogle queue once mounted.
 */
export const GoogleAd = ({
  className,
  slot = DEFAULT_SLOT,
  style,
  format = "auto",
  layout,
}: GoogleAdProps) => {
  const adRef = useRef<HTMLModElement | null>(null)
  const hasRequestedAd = useRef(false)

  useEffect(() => {
    if (!AD_CLIENT_ID || !slot) {
      console.warn("[GoogleAd] Missing client id or ad slot. Ad will not render.")
      return
    }

    const adElement = adRef.current
    if (!adElement) return

    // Prevent pushing multiple times to the same container
    if (hasRequestedAd.current || adElement.getAttribute("data-ad-status") === "done") {
      return
    }

    try {
      adElement.innerHTML = "" // Ensure empty container before requesting an ad
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      hasRequestedAd.current = true
    } catch (error) {
      console.error("[GoogleAd] Failed to load ad:", error)
    }
  }, [slot])

  if (!AD_CLIENT_ID || !slot) {
    return null
  }

  return (
    <ins
      ref={(node) => {
        adRef.current = node
        if (node) {
          // Reset request flag if Google clears the slot on re-render.
          if (node.getAttribute("data-ad-status") !== "done") {
            hasRequestedAd.current = false
          }
        }
      }}
      className={cn("adsbygoogle block w-full", className)}
      style={style ?? { display: "block" }}
      data-ad-client={AD_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={layout ? undefined : "true"}
      data-ad-layout={layout}
      data-adtest={IS_DEV ? "on" : undefined}
    />
  )
}
