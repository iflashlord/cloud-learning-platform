"use client"

import { useUser } from "@clerk/nextjs"
import { useIsAdmin } from "@/hooks/useIsAdmin"
import { useState, useEffect } from "react"

export const DebugAuthStates = () => {
  const { user, isSignedIn, isLoaded } = useUser()
  const { isLoggedIn } = useIsAdmin()
  const [renderCount, setRenderCount] = useState(0)
  const [timestamp, setTimestamp] = useState("")

  useEffect(() => {
    setRenderCount((prev) => prev + 1)
    setTimestamp(new Date().toLocaleTimeString())
  }, [isLoaded, isSignedIn, user?.id])

  if (process.env.NODE_ENV !== "development") return null

  return (
    <div className='fixed top-20 left-4 bg-black text-white p-2 text-xs rounded z-50 opacity-90 max-w-xs'>
      <div className='font-bold text-yellow-400'>🔍 Auth Debug</div>
      <div>Clerk Loaded: {isLoaded ? "✅" : "⏳"}</div>
      <div>Signed In: {isSignedIn ? "✅" : "❌"}</div>
      <div>User ID: {user?.id?.slice(0, 8) || "None"}...</div>
      <div>Admin Hook: {isLoggedIn ? "✅" : "❌"}</div>
      <div>Renders: {renderCount}</div>
      <div>Time: {timestamp}</div>
    </div>
  )
}
