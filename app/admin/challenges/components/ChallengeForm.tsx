"use client";

import { ChallengeForm as ChallengeFormComponent } from "@/components/forms";

type Lesson = {
  id: number;
  title: string;
  unit: {
    id: number;
    title: string;
    course: {
      id: number;
      title: string;
    };
  };
};

type ChallengeOption = {
  id?: number;
  text: string;
  correct: boolean;
  imageSrc?: string;
  audioSrc?: string;
  guide?: string;
  order?: number;
  value?: string;
};

type ChallengeData = {
  question: string;
  type: "SELECT" | "ASSIST" | "TRUE_FALSE" | "DRAG_DROP" | "TEXT_INPUT" | "IMAGE_SELECT" | "LISTENING" | "SPEECH_INPUT" | "VIDEO";
  lessonId: number;
  order: number;
  hint?: string;
  audioSrc?: string;
  imageSrc?: string;
  videoSrc?: string;
  correctAnswer?: string;
  challengeOptions: ChallengeOption[];
};

interface ChallengeFormProps {
  challengeId?: number;
  initialData?: ChallengeData;
  hideOptions?: boolean;
  preselectedLessonId?: number;
}

export const ChallengeForm = (props: ChallengeFormProps) => {
  return <ChallengeFormComponent {...props} />;
};