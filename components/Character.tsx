"use client";

import { useMemo } from 'react';

interface CharacterProps {
  questionType: "SELECT" | "ASSIST" | "TRUE_FALSE" | "DRAG_DROP" | "TEXT_INPUT" | "IMAGE_SELECT" | "LISTENING" | "SPEECH_INPUT" | "VIDEO";
  challengeId?: number;
  state?: "default" | "correct" | "wrong";
  className?: string;
}

export const Character = ({ questionType, challengeId = 0, state = "default", className = "" }: CharacterProps) => {
  // Character variations for each question type
  const getCharacterOptions = (type: string) => {
    switch (type) {
      case "SELECT":
        return [
          { emoji: "🤔", name: "Thinker", expression: "pondering the options" },
          { emoji: "🧠", name: "Brain", expression: "analyzing choices" },
          { emoji: "🎯", name: "Archer", expression: "aiming for the right answer" },
          { emoji: "🔍", name: "Detective", expression: "investigating options" },
        ];
      case "ASSIST":
        return [
          { emoji: "🤝", name: "Helper", expression: "ready to assist" },
          { emoji: "✏️", name: "Writer", expression: "filling in the blanks" },
          { emoji: "🧩", name: "Puzzler", expression: "completing the puzzle" },
          { emoji: "🔧", name: "Fixer", expression: "putting pieces together" },
        ];
      case "TRUE_FALSE":
        return [
          { emoji: "⚖️", name: "Judge", expression: "weighing the truth" },
          { emoji: "🕵️", name: "Investigator", expression: "fact-checking" },
          { emoji: "🎭", name: "Actor", expression: "true or false drama" },
          { emoji: "🧐", name: "Scholar", expression: "examining facts" },
        ];
      case "DRAG_DROP":
        return [
          { emoji: "🔄", name: "Organizer", expression: "sorting things out" },
          { emoji: "📦", name: "Mover", expression: "arranging items" },
          { emoji: "🧭", name: "Navigator", expression: "finding the right order" },
          { emoji: "🎪", name: "Juggler", expression: "keeping things in sequence" },
        ];
      case "TEXT_INPUT":
        return [
          { emoji: "✍️", name: "Scribe", expression: "ready to write" },
          { emoji: "📝", name: "Note-taker", expression: "capturing thoughts" },
          { emoji: "🖋️", name: "Author", expression: "crafting words" },
          { emoji: "📚", name: "Scholar", expression: "sharing knowledge" },
        ];
      case "IMAGE_SELECT":
        return [
          { emoji: "🎨", name: "Artist", expression: "appreciating visuals" },
          { emoji: "📸", name: "Photographer", expression: "focusing on details" },
          { emoji: "👁️", name: "Observer", expression: "seeing clearly" },
          { emoji: "🖼️", name: "Curator", expression: "selecting the perfect image" },
        ];
      case "LISTENING":
        return [
          { emoji: "🎵", name: "Musician", expression: "tuned in" },
          { emoji: "👂", name: "Listener", expression: "all ears" },
          { emoji: "🎧", name: "Audiophile", expression: "hearing every detail" },
          { emoji: "🎼", name: "Composer", expression: "catching the rhythm" },
        ];
      case "SPEECH_INPUT":
        return [
          { emoji: "🎤", name: "Speaker", expression: "ready to talk" },
          { emoji: "🗣️", name: "Announcer", expression: "speaking up" },
          { emoji: "📢", name: "Broadcaster", expression: "sharing voice" },
          { emoji: "🎙️", name: "Host", expression: "on the mic" },
        ];
      case "VIDEO":
        return [
          { emoji: "🎬", name: "Director", expression: "watching the scene" },
          { emoji: "📹", name: "Cameraman", expression: "capturing the moment" },
          { emoji: "🎭", name: "Actor", expression: "in the spotlight" },
          { emoji: "🍿", name: "Viewer", expression: "enjoying the show" },
        ];
      default:
        return [
          { emoji: "🤖", name: "Bot", expression: "processing..." },
        ];
    }
  };

  // Consistently select a character based on challengeId (stable across renders)
  const selectedCharacter = useMemo(() => {
    const options = getCharacterOptions(questionType);
    // Use challengeId as seed for consistent character selection
    const seededIndex = challengeId % options.length;
    return options[seededIndex];
  }, [questionType, challengeId]);

  // Get emotional state variations
  const getCharacterWithState = (character: any, currentState: string) => {
    switch (currentState) {
      case "correct":
        return {
          ...character,
          emoji: character.emoji === "🤔" ? "😊" : 
                 character.emoji === "🧠" ? "🤗" :
                 character.emoji === "🎯" ? "🎉" :
                 character.emoji === "🔍" ? "😄" :
                 character.emoji === "🤝" ? "🥳" :
                 character.emoji === "✏️" ? "😊" :
                 character.emoji === "🧩" ? "🎊" :
                 character.emoji === "🔧" ? "✨" :
                 character.emoji === "⚖️" ? "😌" :
                 character.emoji === "🕵️" ? "🕵️‍♂️" :
                 character.emoji === "🎭" ? "😊" :
                 character.emoji === "🧐" ? "🤓" :
                 character.emoji === "🔄" ? "🎉" :
                 character.emoji === "📦" ? "📮" :
                 character.emoji === "🧭" ? "🗺️" :
                 character.emoji === "🎪" ? "🎊" :
                 "😊", // default happy
          expression: "Great job! That's correct!"
        };
      case "wrong":
        return {
          ...character,
          emoji: character.emoji === "🤔" ? "😔" :
                 character.emoji === "🧠" ? "🤯" :
                 character.emoji === "🎯" ? "😅" :
                 character.emoji === "🔍" ? "😰" :
                 character.emoji === "🤝" ? "😕" :
                 character.emoji === "✏️" ? "😓" :
                 character.emoji === "🧩" ? "🤷" :
                 character.emoji === "🔧" ? "😞" :
                 character.emoji === "⚖️" ? "😬" :
                 character.emoji === "🕵️" ? "🤨" :
                 character.emoji === "🎭" ? "😢" :
                 character.emoji === "🧐" ? "😟" :
                 character.emoji === "🔄" ? "😵‍💫" :
                 character.emoji === "📦" ? "📭" :
                 character.emoji === "🧭" ? "🗾" :
                 character.emoji === "🎪" ? "😔" :
                 "😔", // default sad
          expression: "Oops! Try again, you can do it!"
        };
      default:
        return character;
    }
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

  return (
    <div className={`flex flex-col items-center space-y-3 ${className}`}>
      {/* Character Avatar */}
      <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${getTypeColor(questionType)} flex items-center justify-center shadow-lg transform transition-all duration-300 ${state === "correct" ? "scale-110" : state === "wrong" ? "scale-95" : "hover:scale-105"}`}>
        <div className={`text-3xl transition-all duration-300 ${state === "correct" ? "animate-bounce" : state === "wrong" ? "animate-pulse" : ""}`}>
          {currentCharacter.emoji}
        </div>
        
        {/* Floating type indicator */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
          <div className="w-3 h-3 bg-gradient-to-br bg-current rounded-full opacity-80"></div>
        </div>
      </div>

      {/* Character Info */}
      <div className="text-center">
        <p className="font-semibold text-gray-800 text-sm">{currentCharacter.name}</p>
        <p className={`text-xs italic max-w-32 leading-tight transition-colors duration-300 ${state === "correct" ? "text-green-600" : state === "wrong" ? "text-red-600" : "text-gray-600"}`}>
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