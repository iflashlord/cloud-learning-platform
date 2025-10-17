"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Volume2,
  VolumeX,
  Volume1,
  Headphones,
  Play,
  Pause,
  RotateCcw,
  Settings,
} from "lucide-react"
import { useAudioSettings } from "@/contexts/AudioSettingsContext"
import { DEFAULT_AUDIO_SETTINGS } from "@/lib/types/audio-settings"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface AudioSettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AudioSettingsModal({ open, onOpenChange }: AudioSettingsModalProps) {
  const { settings, updateSettings, loading } = useAudioSettings()
  const [localSettings, setLocalSettings] = useState(settings)
  const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Update local settings when modal opens with fresh data
  React.useEffect(() => {
    if (open) {
      setLocalSettings(settings)
    }
  }, [open, settings])

  const handleSave = async () => {
    try {
      await updateSettings(localSettings)
      toast.success("Audio settings saved successfully!")
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to save settings:", error)
      toast.error("Failed to save audio settings")
    }
  }

  const handleReset = () => {
    setLocalSettings({
      ...localSettings,
      ...DEFAULT_AUDIO_SETTINGS,
    })
    toast.success("Audio settings reset to defaults")
  }

  const handleCancel = () => {
    setLocalSettings(settings) // Revert to saved settings
    onOpenChange(false)
  }

  const playPreviewSound = async () => {
    if (!localSettings.audioEnabled) {
      toast.info("Audio is currently disabled")
      return
    }

    try {
      // Stop current preview if playing
      if (previewAudio) {
        previewAudio.pause()
        previewAudio.currentTime = 0
      }

      // Create new audio instance for sound effects preview
      const audio = new Audio("/correct.wav")
      const masterVolume = localSettings.masterVolume / 100
      const effectsVolume = localSettings.soundEffectsVolume / 100
      audio.volume = masterVolume * effectsVolume

      setPreviewAudio(audio)
      setIsPlaying(true)

      audio.addEventListener("ended", () => {
        setIsPlaying(false)
      })

      audio.addEventListener("error", () => {
        toast.error("Failed to play preview audio")
        setIsPlaying(false)
      })

      await audio.play()
    } catch (error) {
      console.error("Error playing preview:", error)
      toast.error("Failed to play preview audio")
      setIsPlaying(false)
    }
  }

  const stopPreviewSound = () => {
    if (previewAudio) {
      previewAudio.pause()
      previewAudio.currentTime = 0
      setIsPlaying(false)
    }
  }

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (previewAudio) {
        previewAudio.pause()
        previewAudio.currentTime = 0
      }
    }
  }, [previewAudio])

  const getVolumeIcon = (volume: number, enabled: boolean) => {
    if (!enabled || volume === 0) return VolumeX
    if (volume < 50) return Volume1
    return Volume2
  }

  const formatVolumeLabel = (volume: number) => `${volume}%`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Settings className='w-5 h-5' />
            Audio Settings
          </DialogTitle>
          <DialogDescription>
            Configure your audio preferences for lessons, sound effects, and media playback.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Master Audio Control */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg flex items-center gap-2'>
                <Volume2 className='w-5 h-5' />
                Master Audio Control
              </CardTitle>
              <CardDescription>
                Main audio settings that affect all sounds in the application.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='audio-enabled' className='text-sm font-medium'>
                  Enable Audio
                </Label>
                <Switch
                  id='audio-enabled'
                  checked={localSettings.audioEnabled}
                  onCheckedChange={(checked: boolean) =>
                    setLocalSettings((prev) => ({ ...prev, audioEnabled: checked }))
                  }
                />
              </div>

              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <Label className='text-sm font-medium'>Master Volume</Label>
                  <span className='text-sm text-muted-foreground'>
                    {formatVolumeLabel(localSettings.masterVolume)}
                  </span>
                </div>
                <div className='flex items-center space-x-3'>
                  {React.createElement(
                    getVolumeIcon(localSettings.masterVolume, localSettings.audioEnabled),
                    {
                      className: cn(
                        "w-4 h-4",
                        !localSettings.audioEnabled && "text-muted-foreground",
                      ),
                    },
                  )}
                  <Slider
                    value={[localSettings.masterVolume]}
                    onValueChange={(value: number[]) =>
                      setLocalSettings((prev) => ({ ...prev, masterVolume: value[0] }))
                    }
                    max={100}
                    step={5}
                    className='flex-1'
                    disabled={!localSettings.audioEnabled}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sound Effects */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg flex items-center gap-2'>
                <Volume2 className='w-5 h-5 text-green-600' />
                Sound Effects
              </CardTitle>
              <CardDescription>
                Volume for correct/incorrect answer sounds and UI feedback.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <Label className='text-sm font-medium'>Sound Effects Volume</Label>
                  <span className='text-sm text-muted-foreground'>
                    {formatVolumeLabel(localSettings.soundEffectsVolume)}
                  </span>
                </div>
                <div className='flex items-center space-x-3'>
                  {React.createElement(
                    getVolumeIcon(localSettings.soundEffectsVolume, localSettings.audioEnabled),
                    {
                      className: cn(
                        "w-4 h-4 text-green-600",
                        !localSettings.audioEnabled && "text-muted-foreground",
                      ),
                    },
                  )}
                  <Slider
                    value={[localSettings.soundEffectsVolume]}
                    onValueChange={(value: number[]) =>
                      setLocalSettings((prev) => ({ ...prev, soundEffectsVolume: value[0] }))
                    }
                    max={100}
                    step={5}
                    className='flex-1'
                    disabled={!localSettings.audioEnabled}
                  />
                </div>
              </div>

              {/* Preview Button */}
              <div className='flex items-center justify-between pt-2'>
                <span className='text-sm text-muted-foreground'>Test sound effects volume</span>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={isPlaying ? stopPreviewSound : playPreviewSound}
                  disabled={!localSettings.audioEnabled || loading}
                >
                  {isPlaying ? (
                    <>
                      <Pause className='w-4 h-4 mr-2' />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play className='w-4 h-4 mr-2' />
                      Preview
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lesson Audio */}
          <Card>
            <CardHeader>
              <CardTitle className='text-lg flex items-center gap-2'>
                <Headphones className='w-5 h-5 text-blue-600' />
                Lesson Audio & Video
              </CardTitle>
              <CardDescription>
                Volume and playback settings for lesson content and questions.
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <Label className='text-sm font-medium'>Lessons Audio Volume</Label>
                  <span className='text-sm text-muted-foreground'>
                    {formatVolumeLabel(localSettings.lessonsAudioVolume)}
                  </span>
                </div>
                <div className='flex items-center space-x-3'>
                  {React.createElement(
                    getVolumeIcon(localSettings.lessonsAudioVolume, localSettings.audioEnabled),
                    {
                      className: cn(
                        "w-4 h-4 text-blue-600",
                        !localSettings.audioEnabled && "text-muted-foreground",
                      ),
                    },
                  )}
                  <Slider
                    value={[localSettings.lessonsAudioVolume]}
                    onValueChange={(value: number[]) =>
                      setLocalSettings((prev) => ({ ...prev, lessonsAudioVolume: value[0] }))
                    }
                    max={100}
                    step={5}
                    className='flex-1'
                    disabled={!localSettings.audioEnabled}
                  />
                </div>
              </div>

              {/* Auto-play Settings */}
              <div className='space-y-3 pt-2 border-t'>
                <div className='flex items-center justify-between'>
                  <div>
                    <Label htmlFor='auto-play-audio' className='text-sm font-medium'>
                      Auto-play Audio Questions
                    </Label>
                    <p className='text-xs text-muted-foreground'>
                      Automatically play audio when listening questions appear
                    </p>
                  </div>
                  <Switch
                    id='auto-play-audio'
                    checked={localSettings.autoPlayAudio}
                    onCheckedChange={(checked: boolean) =>
                      setLocalSettings((prev) => ({ ...prev, autoPlayAudio: checked }))
                    }
                    disabled={!localSettings.audioEnabled}
                  />
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <Label htmlFor='auto-play-video' className='text-sm font-medium'>
                      Auto-play Video Content
                    </Label>
                    <p className='text-xs text-muted-foreground'>
                      Automatically play video content when questions appear
                    </p>
                  </div>
                  <Switch
                    id='auto-play-video'
                    checked={localSettings.autoPlayVideo}
                    onCheckedChange={(checked: boolean) =>
                      setLocalSettings((prev) => ({ ...prev, autoPlayVideo: checked }))
                    }
                    disabled={!localSettings.audioEnabled}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className='flex items-center justify-between pt-4'>
            <Button variant='outline' onClick={handleReset} className='flex items-center gap-2'>
              <RotateCcw className='w-4 h-4' />
              Reset to Defaults
            </Button>

            <div className='flex gap-2'>
              <Button variant='outline' onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
