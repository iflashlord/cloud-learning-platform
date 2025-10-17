"use client"

import { cn } from "@/lib/utils"
import { Volume2, Headphones } from "lucide-react"
import { ChallengeCard } from "./ChallengeCard"
import { challengeOptions, challenges } from "@/db/schema"
import {
  useLessonsAudioVolume,
  useAutoPlaySettings,
  useAudioEnabled,
} from "@/contexts/AudioSettingsContext"
import { useEffect, useRef } from "react"

interface ListeningChallengeProps {
  challenge: typeof challenges.$inferSelect
  options: (typeof challengeOptions.$inferSelect)[]
  selectedOption?: number
  onSelect: (id: number) => void
  status: "correct" | "wrong" | "none"
  disabled?: boolean
}

export const ListeningChallenge = ({
  challenge,
  options,
  selectedOption,
  onSelect,
  status,
  disabled,
}: ListeningChallengeProps) => {
  const audioEnabled = useAudioEnabled()
  const lessonsAudioVolume = useLessonsAudioVolume()
  const { autoPlayAudio } = useAutoPlaySettings()
  const audioRef = useRef<HTMLAudioElement>(null)

  // Set volume and autoplay when component mounts or settings change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audioEnabled ? lessonsAudioVolume : 0
      audioRef.current.muted = !audioEnabled

      // Auto-play if enabled and audio is available
      if (autoPlayAudio && audioEnabled && challenge?.audioSrc) {
        audioRef.current.play().catch(console.error)
      }
    }
  }, [audioEnabled, lessonsAudioVolume, autoPlayAudio, challenge?.audioSrc])
  return (
    <div className='space-y-4'>
      {challenge?.audioSrc && (
        <div className='mt-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200'>
          <p className='text-sm text-indigo-700 font-medium mb-2 flex items-center gap-2'>
            <Headphones className='w-4 h-4' />
            <span>Listen carefully before selecting your answer</span>
          </p>
          <div className='bg-white dark:bg-gray-800 p-3 rounded-lg border border-indigo-100 dark:border-indigo-700/30 shadow-sm'>
            <audio
              ref={audioRef}
              controls
              className='w-full'
              style={{ height: "40px" }}
              preload='metadata'
              muted={!audioEnabled}
            >
              <source src={challenge.audioSrc} type='audio/mpeg' />
              <source src={challenge.audioSrc} type='audio/wav' />
              <source src={challenge.audioSrc} type='audio/ogg' />
              Your browser does not support the audio element.
            </audio>
            <p className='text-xs text-neutral-500 mt-2 text-center flex items-center justify-center gap-1'>
              <Volume2 className='w-3 h-3' />
              <span>You can replay the audio as needed</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
