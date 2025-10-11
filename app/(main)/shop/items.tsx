"use client";

import { toast } from "sonner";
import Image from "next/image";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { POINTS_TO_REFILL } from "@/constants";
import { refillHearts } from "@/actions/user-progress";
import { createStripeUrl } from "@/actions/user-subscription";
import { Heart, Zap, Crown, Check, Settings, Rocket } from "lucide-react";

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export const Items = ({
  hearts,
  points,
  hasActiveSubscription,
}: Props) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) {
      return;
    }

    startTransition(() => {
      refillHearts()
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onUpgrade = () => {
    startTransition(() => {
      createStripeUrl()
        .then((response) => {
          if (response.data) {
            window.location.href = response.data;
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Heart Refill Item */}
      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border-2 border-red-200 p-6 transition-all duration-200 hover:shadow-lg hover:border-red-300">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <Image 
              src="/heart.svg"
              alt="Heart"
              height={32}
              width={32}
              className="filter brightness-0 invert"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Refill Hearts
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Restore your hearts to continue learning without interruption. Get back in the game!
            </p>
            <div className="flex items-center gap-2">
              <div className="bg-red-200 px-3 py-1 rounded-full text-sm font-medium text-red-800 flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-700" fill="currentColor" />
                <span>{hearts === 5 ? "Hearts Full" : `${hearts}/5 Hearts`}</span>
              </div>
              {hearts < 5 && (
                <div className="bg-blue-200 px-3 py-1 rounded-full text-sm font-medium text-blue-800 flex items-center gap-1">
                  <Zap className="w-4 h-4 text-blue-700" />
                  <span>Cost: {POINTS_TO_REFILL} XP</span>
                </div>
              )}
            </div>
          </div>
          <Button
            onClick={onRefillHearts}
            disabled={
              pending
              || hearts === 5 
              || points < POINTS_TO_REFILL
            }
            className={`px-6 py-3 font-bold text-lg ${
              hearts === 5 
                ? "bg-gray-400 text-gray-600 cursor-not-allowed" 
                : points < POINTS_TO_REFILL
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl"
            } transition-all duration-200`}
          >
            {hearts === 5 ? (
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-gray-200" fill="currentColor" />
                <span>Hearts Full</span>
              </div>
            ) : points < POINTS_TO_REFILL ? (
              "Not enough XP"
            ) : (
              <div className="flex items-center gap-2">
                <Image
                  src="/points.svg"
                  alt="Points"
                  height={20}
                  width={20}
                />
                <span>{POINTS_TO_REFILL} XP</span>
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* Pro Membership Item */}
      <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 rounded-xl border-2 border-yellow-300 p-6 transition-all duration-200 hover:shadow-xl hover:border-yellow-400 relative overflow-hidden">
        <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
          {hasActiveSubscription ? "Active" : "Popular"}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <Image
              src="/unlimited.svg"
              alt="Unlimited"
              height={32}
              width={32}
              className="filter brightness-0 invert"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              Pro Membership
              <Crown className="w-5 h-5 text-yellow-500" />
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Unlock unlimited hearts, remove ads, and get access to exclusive pro features and content.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Unlimited Hearts</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Ad-free Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Exclusive Pro Content</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Priority Support</span>
              </div>
            </div>
          </div>
          <Button
            onClick={onUpgrade}
            disabled={pending}
            className={`px-6 py-3 font-bold text-lg ${
              hasActiveSubscription
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
            } shadow-lg hover:shadow-xl transition-all duration-200`}
          >
            {hasActiveSubscription ? (
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                <span>Manage</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                <span>Upgrade</span>
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* Coming Soon Items */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200 p-6 opacity-75">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
            <Rocket className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">More Items Coming Soon!</h3>
          <p className="text-sm text-gray-600">
            We&apos;re working on exciting new power-ups, themes, and learning boosters. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
};
