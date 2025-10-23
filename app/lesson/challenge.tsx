import { challengeOptions, challenges } from "@/db/schema";
import { Challenge as ChallengeComponent } from "@/components/challenge";

type Props = {
  options: typeof challengeOptions.$inferSelect[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
  type: typeof challenges.$inferSelect["type"];
  challenge: typeof challenges.$inferSelect;
  onTextSubmit?: (text: string) => void;
  onTextChange?: (text: string) => void;
  showCorrectAnswer?: boolean;
  lessonContext: {
    lessonTitle: string
    unitTitle?: string | null
    courseTitle?: string | null
    percentage: number
    totalChallenges: number
  };
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
  onTextChange,
  showCorrectAnswer,
  lessonContext,
}: Props) => {
  return (
    <ChallengeComponent
      options={options}
      onSelect={onSelect}
      status={status}
      selectedOption={selectedOption}
      disabled={disabled}
      type={type}
      challenge={challenge}
      onTextSubmit={onTextSubmit}
      onTextChange={onTextChange}
      showCorrectAnswer={showCorrectAnswer}
      lessonContext={lessonContext}
    />
  );
};
