import { 
  CheckSquare, 
  MousePointer, 
  FileQuestion, 
  ArrowUpDown, 
  Type, 
  ImageIcon, 
  Volume2, 
  Mic 
} from "lucide-react";
import { QuestionType } from "./types";

export const getQuestionTypeIcon = (type: QuestionType) => {
  switch (type) {
    case "SELECT":
      return <CheckSquare className="w-4 h-4" />;
    case "ASSIST":
      return <MousePointer className="w-4 h-4" />;
    case "TRUE_FALSE":
      return <FileQuestion className="w-4 h-4" />;
    case "DRAG_DROP":
      return <ArrowUpDown className="w-4 h-4" />;
    case "TEXT_INPUT":
      return <Type className="w-4 h-4" />;
    case "IMAGE_SELECT":
      return <ImageIcon className="w-4 h-4" />;
    case "LISTENING":
      return <Volume2 className="w-4 h-4" />;
    case "SPEECH_INPUT":
      return <Mic className="w-4 h-4" />;
    default:
      return <FileQuestion className="w-4 h-4" />;
  }
};

export const getQuestionTypeColor = (type: QuestionType) => {
  switch (type) {
    case "SELECT":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200";
    case "ASSIST":
      return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200";
    case "TRUE_FALSE":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200";
    case "DRAG_DROP":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200";
    case "TEXT_INPUT":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200";
    case "IMAGE_SELECT":
      return "bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-200";
    case "LISTENING":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200";
    case "SPEECH_INPUT":
      return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200";
  }
};

export const getQuestionTypeLabel = (type: QuestionType) => {
  switch (type) {
    case "SELECT":
      return "Multiple Choice";
    case "ASSIST":
      return "Assisted Selection";
    case "TRUE_FALSE":
      return "True or False";
    case "DRAG_DROP":
      return "Drag and Drop";
    case "TEXT_INPUT":
      return "Text Input";
    case "IMAGE_SELECT":
      return "Image Selection";
    case "LISTENING":
      return "Listening";
    case "SPEECH_INPUT":
      return "Speech Input";
    default:
      return "Question";
  }
};