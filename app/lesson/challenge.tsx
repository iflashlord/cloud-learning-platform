import { cn } from "@/lib/utils";
import { challengeOptions, challenges } from "@/db/schema";
import { useState, useEffect } from "react";
import { Volume2, Play, HelpCircle } from "lucide-react";

import { Card } from "./card";
import { SpeechInput } from "@/components/SpeechInput";
import { Character } from "@/components/Character";

type Props = {
  options: typeof challengeOptions.$inferSelect[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
  type: typeof challenges.$inferSelect["type"];
  challenge?: typeof challenges.$inferSelect;
  onTextSubmit?: (text: string) => void;
};

export const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
  challenge,
  onTextSubmit,
}: Props) => {
  const [showHint, setShowHint] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [draggedItems, setDraggedItems] = useState<typeof options>([]);

  // Clear text input when status resets to "none" (retry)
  useEffect(() => {
    if (status === "none") {
      setTextInput("");
    }
  }, [status]);

  // Initialize drag items for DRAG_DROP when options are available
  useEffect(() => {
    if (type === "DRAG_DROP" && options.length > 0) {
      // Create shuffled array that is guaranteed to be different from correct order
      let shuffled = [...options];
      do {
        shuffled = [...options].sort(() => Math.random() - 0.5);
      } while (shuffled.every((item, index) => item.order === index + 1) && shuffled.length > 1);
      
      setDraggedItems(shuffled);
      // Select first item as placeholder - will be overridden when user checks
      onSelect(shuffled[0]?.id || 1);
    }
  }, [type, options, onSelect]);

  // Handle drag and drop validation - only check when user explicitly submits
  const checkDragDropOrder = () => {
    if (type === "DRAG_DROP" && draggedItems.length > 0) {
      const isCorrect = draggedItems.every((item, index) => item.order === index + 1);
      onSelect(isCorrect ? 999 : 998);
      return isCorrect;
    }
    return false;
  };

  // Initialize selection state for drag and drop - only initially, not on every change
  useEffect(() => {
    if (type === "DRAG_DROP" && draggedItems.length > 0 && !selectedOption) {
      // Set initial selection to indicate user has something to check
      onSelect(998); // Start with incorrect until they get it right
    }
  }, [type, draggedItems.length, selectedOption, onSelect]);

  // Expose drag drop checker function for quiz component
  useEffect(() => {
    if (type === "DRAG_DROP") {
      (window as any).checkCurrentDragOrder = () => {
        const isCorrect = draggedItems.every((item, index) => item.order === index + 1);
        onSelect(isCorrect ? 999 : 998);
        return isCorrect;
      };
    }
    
    // Cleanup function when component unmounts or type changes
    return () => {
      if (type === "DRAG_DROP") {
        delete (window as any).checkCurrentDragOrder;
      }
    };
  }, [draggedItems, type, onSelect]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));
    
    const newItems = [...draggedItems];
    const draggedItem = newItems[dragIndex];
    newItems.splice(dragIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);
    
    setDraggedItems(newItems);
  };

  const handleTextInputSubmit = () => {
    if (onTextSubmit && textInput.trim()) {
      onTextSubmit(textInput.trim());
    }
  };

  // Consistent header for all question types
  const QuestionHeader = ({ children }: { children?: React.ReactNode }) => (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6 shadow-sm">
      <div className="flex items-start space-x-4">
        <Character 
          questionType={type} 
          challengeId={challenge?.id || 0}
          state={status === "correct" ? "correct" : status === "wrong" ? "wrong" : "default"}
        />
        <div className="flex-1">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="flex items-start justify-between">
              <p className="text-gray-800 font-medium leading-relaxed flex-1">
                {challenge?.question}
              </p>
              {challenge?.hint && (
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="ml-3 flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
                  title={showHint ? "Hide hint" : "Show hint"}
                >
                  <HelpCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Hint</span>
                </button>
              )}
            </div>
            {challenge?.hint && showHint && (
              <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200 transition-all duration-300 ease-in-out">
                <p className="text-sm text-yellow-800">
                  💡 <strong>Hint:</strong> {challenge.hint}
                </p>
              </div>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );

  // Render different UI based on challenge type
  switch (type) {
    case "TEXT_INPUT":
      return (
        <div className="space-y-4">
          <QuestionHeader />
          <div className="px-6">
            <SpeechInput
              value={textInput}
              onChange={setTextInput}
              onSubmit={handleTextInputSubmit}
              disabled={disabled}
              placeholder="Type your answer or use speech recognition..."
            />
          </div>
        </div>
      );

    case "SPEECH_INPUT":
      return (
        <div className="space-y-4">
          <QuestionHeader>
            <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-red-700 font-medium">
                🎤 Voice Input Mode - Click the microphone and speak your answer clearly
              </p>
            </div>
          </QuestionHeader>
          <div className="px-6">
            <SpeechInput
              value={textInput}
              onChange={setTextInput}
              onSubmit={handleTextInputSubmit}
              disabled={disabled}
              placeholder="Click the microphone button and speak your answer..."
            />
          </div>
        </div>
      );

    case "VIDEO":
      return (
        <div className="space-y-4">
          <QuestionHeader>
            {challenge?.videoSrc && (
              <div className="mt-3 p-3 bg-violet-50 rounded-lg border border-violet-200">
                <p className="text-sm text-violet-700 font-medium mb-2">
                  🎬 Watch the video carefully before selecting your answer
                </p>
                <div className="bg-white p-3 rounded-lg border border-violet-100 shadow-sm">
                  <video 
                    controls 
                    className="w-full rounded-lg"
                    preload="metadata"
                    style={{ maxHeight: '300px' }}
                  >
                    <source src={challenge.videoSrc} type="video/mp4" />
                    <source src={challenge.videoSrc} type="video/webm" />
                    <source src={challenge.videoSrc} type="video/ogg" />
                    Your browser does not support the video element.
                  </video>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    📱 You can pause and rewatch the video as needed
                  </p>
                </div>
              </div>
            )}
          </QuestionHeader>
          <div className="px-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Select your answer:</p>
            <div className={cn(
              "grid gap-3",
              "grid-cols-1"
            )}>
              {options.map((option, i) => (
                <Card
                  key={option.id}
                  id={option.id}
                  text={option.text}
                  imageSrc={option.imageSrc}
                  shortcut={`${i + 1}`}
                  selected={selectedOption === option.id}
                  onClick={() => onSelect(option.id)}
                  status={status}
                  audioSrc={option.audioSrc}
                  disabled={disabled}
                  type={type}
                />
              ))}
            </div>
          </div>
        </div>
      );

    case "DRAG_DROP":
      return (
        <div className="space-y-4">
          <QuestionHeader>
            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                📋 Arrange items in the correct order. You can drag & drop or use the ↑↓ buttons.
              </p>
            </div>
          </QuestionHeader>
          <div className="px-6">
            <div className="space-y-3">
              {draggedItems.map((item, index) => {
              const isCorrectPosition = item.order === index + 1;
              return (
                <div
                  key={item.id}
                  className="relative group"
                >
                  <div
                    draggable={!disabled}
                    onDragStart={(e) => {
                      handleDragStart(e, index);
                      e.currentTarget.classList.add('opacity-50');
                    }}
                    onDragEnd={(e) => {
                      e.currentTarget.classList.remove('opacity-50');
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.add('border-blue-400', 'bg-blue-50');
                    }}
                    onDragLeave={(e) => {
                      e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50');
                      handleDrop(e, index);
                    }}
                    className={cn(
                      "p-4 border-2 rounded-lg transition-all duration-200",
                      !disabled && "cursor-move hover:border-blue-300 hover:shadow-md hover:scale-[1.02]",
                      disabled && "cursor-not-allowed opacity-60",
                      isCorrectPosition 
                        ? "bg-green-50 border-green-200 shadow-sm" 
                        : "bg-white border-gray-200 shadow-sm"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={cn(
                          "flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-colors",
                          isCorrectPosition
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-800"
                        )}>
                          {index + 1}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-800 font-medium">{item.text}</span>
                          {isCorrectPosition && (
                            <span className="text-xs text-green-600 flex items-center">
                              ✓ Correct position
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {/* Drag handle */}
                        {!disabled && (
                          <div className="text-gray-400 cursor-move">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                            </svg>
                          </div>
                        )}
                        
                        {/* Arrow controls */}
                        {!disabled && (
                          <div className="flex flex-col space-y-1">
                            <button
                              onClick={() => {
                                if (index > 0) {
                                  const newItems = [...draggedItems];
                                  [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
                                  setDraggedItems(newItems);
                                }
                              }}
                              disabled={index === 0}
                              className={cn(
                                "p-1 rounded transition-colors",
                                "text-blue-500 hover:text-blue-700 hover:bg-blue-100",
                                "disabled:text-gray-300 disabled:cursor-not-allowed"
                              )}
                              title="Move up"
                            >
                              ↑
                            </button>
                            <button
                              onClick={() => {
                                if (index < draggedItems.length - 1) {
                                  const newItems = [...draggedItems];
                                  [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
                                  setDraggedItems(newItems);
                                }
                              }}
                              disabled={index === draggedItems.length - 1}
                              className={cn(
                                "p-1 rounded transition-colors",
                                "text-blue-500 hover:text-blue-700 hover:bg-blue-100",
                                "disabled:text-gray-300 disabled:cursor-not-allowed"
                              )}
                              title="Move down"
                            >
                              ↓
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Progress indicator */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                Progress: {draggedItems.filter((item, index) => item.order === index + 1).length} / {draggedItems.length} correct
              </span>
              <div className="flex space-x-1">
                {draggedItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={cn(
                      "w-3 h-3 rounded-full transition-colors",
                      item.order === index + 1 ? "bg-green-400" : "bg-gray-300"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
      );

    case "LISTENING":
      return (
        <div className="space-y-4">
          <QuestionHeader>
            {challenge?.audioSrc && (
              <div className="mt-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                <p className="text-sm text-indigo-700 font-medium mb-2">
                  🎧 Listen carefully before selecting your answer
                </p>
                <div className="bg-white p-3 rounded-lg border border-indigo-100 shadow-sm">
                  <audio 
                    controls 
                    className="w-full"
                    style={{ height: '40px' }}
                    preload="metadata"
                  >
                    <source src={challenge.audioSrc} type="audio/mpeg" />
                    <source src={challenge.audioSrc} type="audio/wav" />
                    <source src={challenge.audioSrc} type="audio/ogg" />
                    Your browser does not support the audio element.
                  </audio>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    🔊 You can replay the audio as needed
                  </p>
                </div>
              </div>
            )}
          </QuestionHeader>
          <div className="px-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Select your answer:</p>
            <div className={cn(
              "grid gap-3",
              "grid-cols-1"
            )}>
              {options.map((option, i) => (
                <Card
                  key={option.id}
                  id={option.id}
                  text={option.text}
                  imageSrc={option.imageSrc}
                  shortcut={`${i + 1}`}
                  selected={selectedOption === option.id}
                  onClick={() => onSelect(option.id)}
                  status={status}
                  audioSrc={option.audioSrc}
                  disabled={disabled}
                  type={type}
                />
              ))}
            </div>
          </div>
        </div>
      );

    case "IMAGE_SELECT":
      return (
        <div className="space-y-4">
          <QuestionHeader />
          <div className="px-6">
            <div className={cn(
              "grid gap-4",
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            )}>
              {options.map((option, i) => (
                <Card
                  key={option.id}
                  id={option.id}
                  text={option.text}
                  imageSrc={option.imageSrc}
                  shortcut={`${i + 1}`}
                  selected={selectedOption === option.id}
                  onClick={() => onSelect(option.id)}
                  status={status}
                  audioSrc={option.audioSrc}
                  disabled={disabled}
                  type={type}
                />
              ))}
            </div>
          </div>
        </div>
      );

    case "TRUE_FALSE":
      return (
        <div className="space-y-4">
          <QuestionHeader />
          <div className="px-6">
            <div className="grid grid-cols-2 gap-4">
              {options.map((option, i) => (
                <Card
                  key={option.id}
                  id={option.id}
                  text={option.text}
                  imageSrc={option.imageSrc}
                  shortcut={i === 0 ? "T" : "F"}
                  selected={selectedOption === option.id}
                  onClick={() => onSelect(option.id)}
                  status={status}
                  audioSrc={option.audioSrc}
                  disabled={disabled}
                  type={type}
                />
              ))}
            </div>
          </div>
        </div>
      );

    default:
      // SELECT and ASSIST types (existing behavior)
      return (
        <div className="space-y-4">
          <QuestionHeader />
          <div className="px-6">
            <div className={cn(
              "grid gap-2",
              type === "ASSIST" && "grid-cols-1",
              type === "SELECT" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
            )}>
              {options.map((option, i) => (
                <Card
                  key={option.id}
                  id={option.id}
                  text={option.text}
                  imageSrc={option.imageSrc}
                  shortcut={`${i + 1}`}
                  selected={selectedOption === option.id}
                  onClick={() => onSelect(option.id)}
                  status={status}
                  audioSrc={option.audioSrc}
                  disabled={disabled}
                  type={type}
                />
              ))}
            </div>
          </div>
        </div>
      );
  }
}
