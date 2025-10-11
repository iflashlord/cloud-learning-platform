"use client";

import { useMemo } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Search,
  Brain,
  Target,
  Handshake,
  Pencil,
  Puzzle,
  Wrench,
  Scale,
  Binary,
  ShieldCheck,
  GripVertical,
  ListChecks,
  ArrowUpDown,
  Keyboard,
  PenLine,
  Type,
  ImageIcon,
  Eye,
  Palette,
  Headphones,
  Ear,
  Music,
  Mic,
  AudioLines,
  Clapperboard,
  Popcorn,
  Film,
  Bot,
} from "lucide-react";

interface CharacterProps {
  questionType: "SELECT" | "ASSIST" | "TRUE_FALSE" | "DRAG_DROP" | "TEXT_INPUT" | "IMAGE_SELECT" | "LISTENING" | "SPEECH_INPUT" | "VIDEO";
  challengeId?: number;
  state?: "default" | "correct" | "wrong";
  className?: string;
}

type CharacterType = CharacterProps["questionType"];

type CharacterVariant = {
  Icon: LucideIcon;
  name: string;
  expression: string;
};

type CharacterWithTone = CharacterVariant & {
  tone: "neutral" | "success" | "error";
};

const CHARACTER_VARIANTS: Record<CharacterType, CharacterVariant[]> = {
  SELECT: [
    { Icon: Search, name: "Detective", expression: "Investigating options" },
    { Icon: Brain, name: "Strategist", expression: "Analyzing choices" },
    { Icon: Target, name: "Sharpshooter", expression: "Aiming for the right answer" },
  ],
  ASSIST: [
    { Icon: Handshake, name: "Helper", expression: "Ready to assist" },
    { Icon: Pencil, name: "Scribe", expression: "Filling in the blanks" },
    { Icon: Puzzle, name: "Solver", expression: "Piecing everything together" },
    { Icon: Wrench, name: "Fixer", expression: "Adjusting every detail" },
  ],
  TRUE_FALSE: [
    { Icon: Scale, name: "Judge", expression: "Weighing the truth" },
    { Icon: Binary, name: "Analyst", expression: "Checking every fact" },
    { Icon: ShieldCheck, name: "Guardian", expression: "Protecting accuracy" },
  ],
  DRAG_DROP: [
    { Icon: GripVertical, name: "Organizer", expression: "Sorting everything out" },
    { Icon: ListChecks, name: "Planner", expression: "Keeping things in order" },
    { Icon: ArrowUpDown, name: "Navigator", expression: "Arranging the sequence" },
  ],
  TEXT_INPUT: [
    { Icon: Keyboard, name: "Typist", expression: "Ready to write" },
    { Icon: PenLine, name: "Author", expression: "Crafting the perfect response" },
    { Icon: Type, name: "Editor", expression: "Fine-tuning every word" },
  ],
  IMAGE_SELECT: [
    { Icon: ImageIcon, name: "Curator", expression: "Selecting the best image" },
    { Icon: Eye, name: "Observer", expression: "Noticing every detail" },
    { Icon: Palette, name: "Artist", expression: "Appreciating the visuals" },
  ],
  LISTENING: [
    { Icon: Headphones, name: "Musician", expression: "Hearing every note" },
    { Icon: Ear, name: "Listener", expression: "All ears" },
    { Icon: Music, name: "Composer", expression: "Catching the rhythm" },
  ],
  SPEECH_INPUT: [
    { Icon: Mic, name: "Speaker", expression: "Ready to talk" },
    { Icon: AudioLines, name: "Announcer", expression: "Sharing the message" },
    { Icon: Headphones, name: "Coach", expression: "Tuning your delivery" },
  ],
  VIDEO: [
    { Icon: Clapperboard, name: "Director", expression: "Capturing the scene" },
    { Icon: Popcorn, name: "Viewer", expression: "Enjoying the show" },
    { Icon: Film, name: "Producer", expression: "Cueing the action" },
  ],
};

const DEFAULT_VARIANT: CharacterVariant = {
  Icon: Bot,
  name: "Guide Bot",
  expression: "Processing...",
};

const getCharacterOptions = (type: CharacterType): CharacterVariant[] => {
  return CHARACTER_VARIANTS[type] ?? [DEFAULT_VARIANT];
};

export const Character = ({ questionType, challengeId = 0, state = "default", className = "" }: CharacterProps) => {
  // Consistently select a character based on challengeId (stable across renders)
  const selectedCharacter = useMemo<CharacterVariant>(() => {
    const options = getCharacterOptions(questionType);
    if (options.length === 0) {
      return DEFAULT_VARIANT;
    }
    const seededIndex = Math.abs(challengeId) % options.length;
    return options[seededIndex] ?? DEFAULT_VARIANT;
  }, [questionType, challengeId]);

  // Get emotional state variations
  const getCharacterWithState = (
    character: CharacterVariant,
    currentState: CharacterProps["state"],
  ): CharacterWithTone => {
    if (currentState === "correct") {
      return {
        ...character,
        expression: "Great job! That's correct!",
        tone: "success",
      };
    }

    if (currentState === "wrong") {
      return {
        ...character,
        expression: "Oops! Try again, you can do it!",
        tone: "error",
      };
    }

    return {
      ...character,
      tone: "neutral",
    };
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "SELECT": return "from-blue-400 to-blue-600";
      case "ASSIST": return "from-green-400 to-green-600";
      case "TRUE_FALSE": return "from-purple-400 to-purple-600";
      case "DRAG_DROP": return "from-orange-400 to-orange-600";
      case "TEXT_INPUT": return "from-yellow-400 to-yellow-600";
      case "IMAGE_SELECT": return "from-pink-400 to-pink-600";
      case "LISTENING": return "from-indigo-400 to-indigo-600";
      case "SPEECH_INPUT": return "from-red-400 to-red-600";
      case "VIDEO": return "from-violet-400 to-violet-600";
      default: return "from-gray-400 to-gray-600";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "SELECT": return "Multiple Choice";
      case "ASSIST": return "Fill in the Blank";
      case "TRUE_FALSE": return "True or False";
      case "DRAG_DROP": return "Drag & Drop";
      case "TEXT_INPUT": return "Text Input";
      case "IMAGE_SELECT": return "Image Selection";
      case "LISTENING": return "Audio Question";
      case "SPEECH_INPUT": return "Voice Input";
      case "VIDEO": return "Video Question";
      default: return "Question";
    }
  };

  const currentCharacter = getCharacterWithState(selectedCharacter, state);

  const iconToneClass =
    currentCharacter.tone === "success"
      ? "text-white drop-shadow-lg"
      : currentCharacter.tone === "error"
      ? "text-white opacity-90"
      : "text-white";

  const expressionColorClass =
    currentCharacter.tone === "success"
      ? "text-green-600"
      : currentCharacter.tone === "error"
      ? "text-red-600"
      : "text-gray-600";

  return (
    <div className={`flex flex-col items-center space-y-3 ${className}`}>
      {/* Character Avatar */}
      <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${getTypeColor(questionType)} flex items-center justify-center shadow-lg transform transition-all duration-300 ${state === "correct" ? "scale-110" : state === "wrong" ? "scale-95" : "hover:scale-105"}`}>
        <div className={`transition-all duration-300 ${state === "correct" ? "animate-bounce" : state === "wrong" ? "animate-pulse" : ""}`}>
          <currentCharacter.Icon className={`w-10 h-10 ${iconToneClass}`} />
        </div>
        
        {/* Floating type indicator */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
          <div className="w-3 h-3 bg-gradient-to-br bg-current rounded-full opacity-80"></div>
        </div>
      </div>

      {/* Character Info */}
      <div className="text-center">
        <p className="font-semibold text-gray-800 text-sm">{currentCharacter.name}</p>
        <p className={`text-xs italic max-w-32 leading-tight transition-colors duration-300 ${expressionColorClass}`}>
          {currentCharacter.expression}
        </p>
        
        {/* Question Type Badge */}
        <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getTypeColor(questionType)}`}>
          {getTypeLabel(questionType)}
        </div>
      </div>

      {/* Animated Elements */}
      <div className="flex space-x-1">
        <div className="w-1 h-1 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse delay-75"></div>
        <div className="w-1 h-1 bg-gray-300 rounded-full animate-pulse delay-150"></div>
      </div>
    </div>
  );
};
