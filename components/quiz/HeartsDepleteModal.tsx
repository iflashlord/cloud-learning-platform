"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, ShoppingCart, X, Gem } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface HeartsDepleteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HeartsDepleteModal = ({ isOpen, onClose }: HeartsDepleteModalProps) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  const handleGoToShop = () => {
    onClose();
    router.push("/shop");
  };

  const handleBuyHearts = () => {
    onClose();
    router.push("/shop#hearts");
  };

  const handleCloseLesson = () => {
    onClose();
    router.push("/learn");
  };

  if (!isClient) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <div className="relative">
              <Heart className="h-24 w-24 text-red-500 fill-current" />
              <div className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                0
              </div>
            </div>
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            Out of Hearts!
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            You've run out of hearts! Choose how you'd like to continue your learning journey.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-3 w-full">
            <Button 
              variant="primary" 
              className="w-full flex items-center gap-2" 
              size="lg" 
              onClick={handleBuyHearts}
            >
              <Gem className="w-5 h-5" />
              Buy Hearts (5 Gems)
            </Button>
            <Button
              variant="outline" 
              className="w-full flex items-center gap-2" 
              size="lg" 
              onClick={handleGoToShop}
            >
              <ShoppingCart className="w-5 h-5" />
              Go to Shop
            </Button>
            <Button
              variant="ghost" 
              className="w-full flex items-center gap-2" 
              size="lg" 
              onClick={handleCloseLesson}
            >
              <X className="w-5 h-5" />
              Close Lesson
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};