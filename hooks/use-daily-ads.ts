"use client";

import { useState, useEffect } from 'react';

const DAILY_ADS_KEY = 'daily_ads_watched';
const LAST_RESET_KEY = 'daily_ads_last_reset';

export interface DailyAdsData {
  adsWatched: number;
  maxAds: number;
  canWatch: boolean;
}

export const useDailyAds = (maxDailyAds: number = 5): DailyAdsData & {
  watchAd: () => void;
  addPoints: (points: number) => void;
} => {
  const [adsWatched, setAdsWatched] = useState(0);

  // Check if we need to reset daily count
  const checkAndResetDaily = () => {
    const today = new Date().toDateString();
    const lastReset = localStorage.getItem(LAST_RESET_KEY);
    
    if (lastReset !== today) {
      // Reset the count for new day
      localStorage.setItem(DAILY_ADS_KEY, '0');
      localStorage.setItem(LAST_RESET_KEY, today);
      setAdsWatched(0);
    } else {
      // Load existing count for today
      const stored = localStorage.getItem(DAILY_ADS_KEY);
      const count = stored ? parseInt(stored, 10) : 0;
      setAdsWatched(count);
    }
  };

  useEffect(() => {
    checkAndResetDaily();
  }, []);

  const watchAd = () => {
    if (adsWatched >= maxDailyAds) {
      return; // Already at limit
    }
    
    const newCount = adsWatched + 1;
    setAdsWatched(newCount);
    localStorage.setItem(DAILY_ADS_KEY, newCount.toString());
  };

  const addPoints = (points: number) => {
    // This would integrate with your existing points system
    // For now, we'll just show a success message
    console.log(`Added ${points} points from ad reward`);
  };

  return {
    adsWatched,
    maxAds: maxDailyAds,
    canWatch: adsWatched < maxDailyAds,
    watchAd,
    addPoints,
  };
};