import { InfinityIcon, X, Heart } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { useExitModal } from "@/store/use-exit-modal";

type Props = {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
};

export const Header = ({
  hearts,
  percentage,
  hasActiveSubscription,
}: Props) => {
  const { open } = useExitModal();

  return (
    <header className="py-4 px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
      <X
        onClick={open}
        className="text-slate-500 dark:text-slate-400 hover:opacity-75 transition cursor-pointer"
      />
      <Progress value={percentage} />
      <div className="text-rose-500 flex items-center font-bold">
        <Heart className="h-7 w-7 mr-2 fill-current" />
        {hasActiveSubscription
          ? <InfinityIcon className="h-6 w-6 stroke-[3] shrink-0" />
          : hearts
        }
      </div>
    </header>
  );
};
