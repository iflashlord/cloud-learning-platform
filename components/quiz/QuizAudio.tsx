"use client"

import { useAudioEnabled, useSoundEffectsVolume } from "@/contexts/AudioSettingsContext"
import { useEffect, useRef, useCallback } from "react"

export const useQuizAudio = () => {
  const audioEnabled = useAudioEnabled()
  const soundEffectsVolume = useSoundEffectsVolume()

  const correctAudioRef = useRef<HTMLAudioElement | null>(null)
  const incorrectAudioRef = useRef<HTMLAudioElement | null>(null)
  const finishAudioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio elements
  useEffect(() => {
    correctAudioRef.current = new Audio("/correct.wav")
    incorrectAudioRef.current = new Audio("/incorrect.wav")
    finishAudioRef.current = new Audio("/finish.mp3")

    // Cleanup on unmount
    return () => {
      if (correctAudioRef.current) {
        correctAudioRef.current.pause()
        correctAudioRef.current.currentTime = 0
      }
      if (incorrectAudioRef.current) {
        incorrectAudioRef.current.pause()
        incorrectAudioRef.current.currentTime = 0
      }
      if (finishAudioRef.current) {
        finishAudioRef.current.pause()
        finishAudioRef.current.currentTime = 0
      }
    }
  }, [])

  // Update audio settings when they change
  useEffect(() => {
    ;[correctAudioRef.current, incorrectAudioRef.current, finishAudioRef.current].forEach(
      (audio) => {
        if (audio) {
          audio.volume = audioEnabled ? soundEffectsVolume : 0
          audio.muted = !audioEnabled
        }
      },
    )
  }, [audioEnabled, soundEffectsVolume])

  const playCorrect = useCallback(() => {
    if (audioEnabled && correctAudioRef.current) {
      correctAudioRef.current.currentTime = 0
      correctAudioRef.current.play().catch(console.error)
    }
  }, [audioEnabled])

  const playIncorrect = useCallback(() => {
    if (audioEnabled && incorrectAudioRef.current) {
      incorrectAudioRef.current.currentTime = 0
      incorrectAudioRef.current.play().catch(console.error)
    }
  }, [audioEnabled])

  const playFinish = useCallback(() => {
    if (audioEnabled && finishAudioRef.current) {
      finishAudioRef.current.currentTime = 0
      finishAudioRef.current.play().catch(console.error)
    }
  }, [audioEnabled])

  return {
    // For backward compatibility, return null for the audio elements as they're not React elements
    correctAudio: null,
    incorrectAudio: null,
    finishAudio: null,
    playCorrect,
    playIncorrect,
    playFinish,
    audioEnabled,
    soundEffectsVolume,
  }
}
