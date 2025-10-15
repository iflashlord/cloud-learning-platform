"use client";

import Image from "next/image";
import { useCallback } from "react";
import { useAudio, useKey } from "react-use";

import { cn } from "@/lib/utils";
import { challenges } from "@/db/schema";

type Props = {
  id: number;
  imageSrc: string | null;
  audioSrc: string | null;
  text: string;
  shortcut: string;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
  status?: "correct" | "wrong" | "none",
  type: typeof challenges.$inferSelect["type"];
};

export const ChallengeCard = ({
  id,
  imageSrc,
  audioSrc,
  text,
  shortcut,
  selected,
  onClick,
  status,
  disabled,
  type,
}: Props) => {
  const [audio, _, controls] = useAudio({ src: audioSrc || "" });

  const handleClick = useCallback(() => {
    if (disabled) return;

    controls.play();
    onClick();
  }, [disabled, onClick, controls]);

  useKey(shortcut, handleClick, {}, [handleClick]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2 transition-colors",
        selected && "border-sky-300 bg-sky-100 hover:bg-sky-100 dark:border-sky-600 dark:bg-sky-900/20",
        selected && status === "correct" 
          && "border-green-300 bg-green-100 hover:bg-green-100 dark:border-green-600 dark:bg-green-900/20",
        selected && status === "wrong" 
          && "border-rose-300 bg-rose-100 hover:bg-rose-100 dark:border-rose-600 dark:bg-rose-900/20",
        disabled && "pointer-events-none opacity-50 hover:bg-white dark:hover:bg-gray-800",
        type === "ASSIST" && "lg:p-3 w-full",
        "dark:border-gray-600 dark:hover:bg-gray-700/50"
      )}
    >
      {audio}
      {imageSrc && (
        <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full">
          <Image src={imageSrc} fill alt={text} className="object-cover rounded-lg" />
        </div>
      )}
      <div className={cn(
        "flex items-center justify-between",
        type === "ASSIST" && "flex-row-reverse",
      )}>
        {type === "ASSIST" && <div />}
        <p className={cn(
          "text-muted-foreground text-sm lg:text-base font-medium"
        )}>
          {text}
        </p>
        <div className={cn(
          "lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] border-2 flex items-center justify-center rounded-lg text-muted-foreground lg:text-[15px] text-xs font-semibold transition-colors",
          selected && "border-sky-300 text-sky-500 dark:border-sky-600 dark:text-sky-400",
          selected && status === "correct" 
            && "border-green-500 text-green-500 dark:border-green-400 dark:text-green-400",
          selected && status === "wrong" 
            && "border-rose-500 text-rose-500 dark:border-rose-400 dark:text-rose-400",
        )}>
          {shortcut}
        </div>
      </div>
    </div>
  );
};