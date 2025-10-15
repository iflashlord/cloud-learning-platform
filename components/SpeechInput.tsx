"use client";

import { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, RotateCcw, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { cn } from '@/lib/utils';

interface SpeechInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export const SpeechInput = ({
  value,
  onChange,
  disabled = false,
  placeholder = "Type your answer or use speech recognition...",
  className
}: SpeechInputProps) => {
  const [inputMode, setInputMode] = useState<'text' | 'speech'>('text');
  
  const {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    error,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition({
    continuous: false,
    interimResults: true,
    lang: 'en-US',
    onResult: (finalTranscript) => {
      // Append the new transcript to existing value
      const newValue = value + (value ? ' ' : '') + finalTranscript.trim();
      onChange(newValue);
    },
    onError: (errorMessage) => {
      console.error('Speech recognition error:', errorMessage);
    },
    onEnd: () => {
      // Auto-switch back to text mode when speech ends
      setInputMode('text');
    }
  });

  // Update input value when transcript changes
  useEffect(() => {
    if (transcript) {
      const newValue = value + (value ? ' ' : '') + transcript.trim();
      onChange(newValue);
      resetTranscript();
    }
  }, [transcript, value, onChange, resetTranscript]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    // Allow natural Enter key behavior for textarea
    if (e.key === 'Enter' && !e.shiftKey) {
      // Just allow normal line break behavior
    }
  };

  const handleSpeechToggle = () => {
    if (isListening) {
      stopListening();
      setInputMode('text');
    } else {
      setInputMode('speech');
      startListening();
    }
  };

  const handleClearInput = () => {
    onChange('');
    resetTranscript();
    if (isListening) {
      stopListening();
    }
    setInputMode('text');
  };

  const displayValue = inputMode === 'speech' && interimTranscript 
    ? value + (value ? ' ' : '') + interimTranscript 
    : value;

  return (
    <div className={cn("space-y-3", className)}>
      {/* Input Field */}
      <div className="relative">
        <textarea
          value={displayValue}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className={cn(
            "w-full p-4 pr-32 border-2 rounded-lg resize-none min-h-[60px] transition-all focus:outline-none",
            isListening 
              ? "border-red-400 bg-red-50 focus:border-red-500" 
              : "border-gray-200 bg-white focus:border-blue-500",
            interimTranscript && "italic text-gray-600",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          placeholder={isListening ? "Listening... Speak now!" : placeholder}
          disabled={disabled || isListening}
          rows={2}
        />
        
        {/* Speech Controls */}
        <div className="absolute right-2 top-2 flex items-center space-x-1">
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClearInput}
              disabled={disabled}
              className="h-8 w-8 p-0 hover:bg-gray-100"
              title="Clear input"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
          
          {isSupported && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleSpeechToggle}
              disabled={disabled}
              className={cn(
                "h-8 w-8 p-0 transition-colors",
                isListening 
                  ? "bg-red-100 hover:bg-red-200 text-red-600" 
                  : "hover:bg-blue-100 text-blue-600"
              )}
              title={isListening ? "Stop listening" : "Start speech recognition"}
            >
              {isListening ? (
                <MicOff className="h-4 w-4 animate-pulse" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Status Indicators */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          {isListening && (
            <div className="flex items-center space-x-2 text-red-600">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Listening...</span>
            </div>
          )}
          
          {error && (
            <div className="text-red-600 flex items-center space-x-1">
              <AlertTriangle className="h-4 w-4" />
              <span>Speech error: {error}</span>
            </div>
          )}

          {!isSupported && (
            <div className="text-amber-600 flex items-center space-x-1">
              <Info className="h-4 w-4" />
              <span>Speech recognition not supported in this browser</span>
            </div>
          )}
        </div>


      </div>

      {/* Instructions */}
      {isSupported && !disabled && (
        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded border">
          <div className="flex items-center space-x-1 mb-1">
            <Volume2 className="h-3 w-3" />
            <span className="font-medium">Speech Input Tips:</span>
          </div>
          <ul className="list-disc list-inside space-y-0.5 ml-4">
            <li>Click the <Mic className="inline h-3 w-3 mx-1" /> button to start speech recognition</li>
            <li>Speak clearly and pause between sentences</li>
            <li>You can edit the text after speech recognition completes</li>
            <li>Use the clear button <RotateCcw className="inline h-3 w-3 mx-1" /> to reset if needed</li>
          </ul>
        </div>
      )}
    </div>
  );
};
