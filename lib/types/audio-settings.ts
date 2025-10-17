export interface AudioSettings {
  id?: number
  userId: string
  audioEnabled: boolean
  masterVolume: number // 0-100
  soundEffectsVolume: number // 0-100
  lessonsAudioVolume: number // 0-100
  autoPlayAudio: boolean
  autoPlayVideo: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface AudioSettingsUpdate {
  audioEnabled?: boolean
  masterVolume?: number
  soundEffectsVolume?: number
  lessonsAudioVolume?: number
  autoPlayAudio?: boolean
  autoPlayVideo?: boolean
}

export const DEFAULT_AUDIO_SETTINGS: Omit<
  AudioSettings,
  "id" | "userId" | "createdAt" | "updatedAt"
> = {
  audioEnabled: true,
  masterVolume: 75,
  soundEffectsVolume: 75,
  lessonsAudioVolume: 75,
  autoPlayAudio: true,
  autoPlayVideo: false,
}

export interface AudioContextType {
  settings: AudioSettings
  updateSettings: (updates: AudioSettingsUpdate) => Promise<void>
  loading: boolean
  error: string | null
}
