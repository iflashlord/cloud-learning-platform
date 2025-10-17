"use client"

import React, { createContext, useContext, useEffect, useState, useCallback } from "react"
import { useUser } from "@clerk/nextjs"
import {
  AudioSettings,
  AudioSettingsUpdate,
  AudioContextType,
  DEFAULT_AUDIO_SETTINGS,
} from "@/lib/types/audio-settings"

const AudioSettingsContext = createContext<AudioContextType | undefined>(undefined)

export function AudioSettingsProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser()
  const [settings, setSettings] = useState<AudioSettings>({
    ...DEFAULT_AUDIO_SETTINGS,
    userId: user?.id || "",
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadSettings = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/settings/audio")

      if (response.ok) {
        const data = await response.json()
        setSettings({
          ...DEFAULT_AUDIO_SETTINGS,
          ...data,
          userId: user?.id || "",
        })
      } else if (response.status === 404) {
        // No settings found, create default settings
        const createResponse = await fetch("/api/settings/audio", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(DEFAULT_AUDIO_SETTINGS),
        })

        if (createResponse.ok) {
          const newData = await createResponse.json()
          setSettings({
            ...DEFAULT_AUDIO_SETTINGS,
            ...newData,
            userId: user?.id || "",
          })
        } else {
          throw new Error("Failed to create default settings")
        }
      } else {
        throw new Error(`Failed to load settings: ${response.statusText}`)
      }
    } catch (err) {
      console.error("Error loading audio settings:", err)
      setError(err instanceof Error ? err.message : "Failed to load settings")
      // Fallback to default settings
      setSettings({
        ...DEFAULT_AUDIO_SETTINGS,
        userId: user?.id || "",
      })
    } finally {
      setLoading(false)
    }
  }, [user?.id])

  // Load settings when user is available
  useEffect(() => {
    if (isLoaded && user) {
      loadSettings()
    } else if (isLoaded && !user) {
      // For non-authenticated users, use default settings
      setSettings({
        ...DEFAULT_AUDIO_SETTINGS,
        userId: "",
      })
      setLoading(false)
    }
  }, [isLoaded, user, loadSettings])

  const updateSettings = async (updates: AudioSettingsUpdate) => {
    if (!user) return

    try {
      setError(null)

      const response = await fetch("/api/settings/audio", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      })

      if (response.ok) {
        const updatedData = await response.json()
        setSettings((prevSettings) => ({
          ...prevSettings,
          ...updatedData,
        }))
      } else {
        throw new Error(`Failed to update settings: ${response.statusText}`)
      }
    } catch (err) {
      console.error("Error updating audio settings:", err)
      setError(err instanceof Error ? err.message : "Failed to update settings")
      throw err
    }
  }

  const value: AudioContextType = {
    settings,
    updateSettings,
    loading,
    error,
  }

  return <AudioSettingsContext.Provider value={value}>{children}</AudioSettingsContext.Provider>
}

export function useAudioSettings(): AudioContextType {
  const context = useContext(AudioSettingsContext)
  if (context === undefined) {
    throw new Error("useAudioSettings must be used within an AudioSettingsProvider")
  }
  return context
}

// Helper hooks for specific settings
export function useAudioEnabled() {
  const { settings } = useAudioSettings()
  return settings.audioEnabled
}

export function useMasterVolume() {
  const { settings } = useAudioSettings()
  return settings.masterVolume / 100 // Return as 0-1 for HTML5 audio
}

export function useSoundEffectsVolume() {
  const { settings } = useAudioSettings()
  return (settings.soundEffectsVolume / 100) * (settings.masterVolume / 100)
}

export function useLessonsAudioVolume() {
  const { settings } = useAudioSettings()
  return (settings.lessonsAudioVolume / 100) * (settings.masterVolume / 100)
}

export function useAutoPlaySettings() {
  const { settings } = useAudioSettings()
  return {
    autoPlayAudio: settings.autoPlayAudio,
    autoPlayVideo: settings.autoPlayVideo,
  }
}
