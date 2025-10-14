"use client";

import { Clapperboard, Smartphone } from "lucide-react";
import { challenges } from "@/db/schema";

interface VideoChallengeProps {
  challenge: typeof challenges.$inferSelect;
}

export const VideoChallenge = ({ challenge }: VideoChallengeProps) => {
  if (!challenge?.videoSrc) return null;

  return (
    <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
      <p className="text-sm text-purple-700 font-medium mb-2 flex items-center gap-2">
        <Clapperboard className="w-4 h-4" />
        <span>Watch the video before answering</span>
      </p>
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-purple-100 dark:border-purple-700/30 shadow-sm">
        <video
          controls
          className="w-full max-w-md mx-auto rounded-lg shadow-sm"
          style={{ maxHeight: '300px' }}
          preload="metadata"
        >
          <source src={challenge.videoSrc} type="video/mp4" />
          <source src={challenge.videoSrc} type="video/webm" />
          <source src={challenge.videoSrc} type="video/ogg" />
          Your browser does not support the video element.
        </video>
        <p className="text-xs text-neutral-500 mt-2 text-center flex items-center justify-center gap-1">
          <Smartphone className="w-3 h-3" />
          <span>You can pause and rewatch the video as needed</span>
        </p>
      </div>
    </div>
  );
};