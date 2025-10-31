import { ChallengeType } from "@/components/quiz/types";

type ChallengeTypeMeta = {
  label: string;
  badgeClass: string;
};

const CHALLENGE_TYPE_META: Record<ChallengeType, ChallengeTypeMeta> = {
  SELECT: {
    label: "Multiple Choice",
    badgeClass: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200",
  },
  ASSIST: {
    label: "Fill in the Blank",
    badgeClass: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200",
  },
  TRUE_FALSE: {
    label: "True or False",
    badgeClass: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200",
  },
  DRAG_DROP: {
    label: "Drag & Drop",
    badgeClass: "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200",
  },
  TEXT_INPUT: {
    label: "Text Input",
    badgeClass: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200",
  },
  IMAGE_SELECT: {
    label: "Image Select",
    badgeClass: "bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-200",
  },
  LISTENING: {
    label: "Listening",
    badgeClass: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200",
  },
  SPEECH_INPUT: {
    label: "Speech Input",
    badgeClass: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200",
  },
  VIDEO: {
    label: "Video",
    badgeClass: "bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-200",
  },
};

export const getChallengeTypeLabel = (type: string) => {
  const normalizedType = type as ChallengeType;
  return CHALLENGE_TYPE_META[normalizedType]?.label ?? "Unknown Type";
};

export const getChallengeTypeBadgeClass = (type: string) => {
  const normalizedType = type as ChallengeType;
  return CHALLENGE_TYPE_META[normalizedType]?.badgeClass ?? "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200";
};
