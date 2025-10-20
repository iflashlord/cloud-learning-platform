"use client"

import React, { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check if user has a preference stored
    const stored = localStorage.getItem("darkMode")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const shouldUseDark = stored === "true" || (!stored && prefersDark)
    setIsDark(shouldUseDark)

    if (shouldUseDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)

    if (newDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("darkMode", "true")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("darkMode", "false")
    }
  }

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={toggleDarkMode}
      className='rounded-full w-9 h-9 p-0'
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className='w-4 h-4' /> : <Moon className='w-4 h-4' />}
    </Button>
  )
}
