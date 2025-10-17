import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import db from "@/db/drizzle"
import { userSettings } from "@/db/schema"
import { eq } from "drizzle-orm"
import { DEFAULT_AUDIO_SETTINGS } from "@/lib/types/audio-settings"

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const settings = await db.query.userSettings.findFirst({
      where: eq(userSettings.userId, userId),
    })

    if (!settings) {
      return NextResponse.json({ error: "Settings not found" }, { status: 404 })
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error("Error fetching audio settings:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    // Validate the input
    const audioSettings = {
      audioEnabled: body.audioEnabled ?? DEFAULT_AUDIO_SETTINGS.audioEnabled,
      masterVolume: Math.max(
        0,
        Math.min(100, body.masterVolume ?? DEFAULT_AUDIO_SETTINGS.masterVolume),
      ),
      soundEffectsVolume: Math.max(
        0,
        Math.min(100, body.soundEffectsVolume ?? DEFAULT_AUDIO_SETTINGS.soundEffectsVolume),
      ),
      lessonsAudioVolume: Math.max(
        0,
        Math.min(100, body.lessonsAudioVolume ?? DEFAULT_AUDIO_SETTINGS.lessonsAudioVolume),
      ),
      autoPlayAudio: body.autoPlayAudio ?? DEFAULT_AUDIO_SETTINGS.autoPlayAudio,
      autoPlayVideo: body.autoPlayVideo ?? DEFAULT_AUDIO_SETTINGS.autoPlayVideo,
    }

    const [newSettings] = await db
      .insert(userSettings)
      .values({
        userId,
        ...audioSettings,
      })
      .returning()

    return NextResponse.json(newSettings, { status: 201 })
  } catch (error) {
    console.error("Error creating audio settings:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    // Build the update object with validation
    const updates: any = {}

    if (typeof body.audioEnabled === "boolean") {
      updates.audioEnabled = body.audioEnabled
    }

    if (typeof body.masterVolume === "number") {
      updates.masterVolume = Math.max(0, Math.min(100, body.masterVolume))
    }

    if (typeof body.soundEffectsVolume === "number") {
      updates.soundEffectsVolume = Math.max(0, Math.min(100, body.soundEffectsVolume))
    }

    if (typeof body.lessonsAudioVolume === "number") {
      updates.lessonsAudioVolume = Math.max(0, Math.min(100, body.lessonsAudioVolume))
    }

    if (typeof body.autoPlayAudio === "boolean") {
      updates.autoPlayAudio = body.autoPlayAudio
    }

    if (typeof body.autoPlayVideo === "boolean") {
      updates.autoPlayVideo = body.autoPlayVideo
    }

    // Add updated timestamp
    updates.updatedAt = new Date()

    const [updatedSettings] = await db
      .update(userSettings)
      .set(updates)
      .where(eq(userSettings.userId, userId))
      .returning()

    if (!updatedSettings) {
      return NextResponse.json({ error: "Settings not found" }, { status: 404 })
    }

    return NextResponse.json(updatedSettings)
  } catch (error) {
    console.error("Error updating audio settings:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
