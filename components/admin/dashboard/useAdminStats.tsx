'use client';

import { useState, useEffect } from "react";
import { Stats } from "./types";

export const useAdminStats = () => {
  const [stats, setStats] = useState<Stats>({
    courses: 0,
    units: 0,
    lessons: 0,
    challenges: 0,
    users: 0,
    activeSubscriptions: 0,
    monthlyRevenue: 0,
    challengeOptions: 0,
    completionRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch data from existing API endpoints and new admin stats endpoint
        const [coursesRes, unitsRes, lessonsRes, challengesRes, challengeOptionsRes, adminStatsRes] = await Promise.all([
          fetch('/api/courses').then(r => r.json()),
          fetch('/api/units').then(r => r.json()),
          fetch('/api/lessons').then(r => r.json()),
          fetch('/api/challenges').then(r => r.json()),
          fetch('/api/challengeOptions').then(r => r.json()),
          fetch('/api/admin/stats').then(r => r.json()),
        ]);

        setStats({
          courses: coursesRes.length || 0,
          units: unitsRes.length || 0,
          lessons: lessonsRes.length || 0,
          challenges: challengesRes.length || 0,
          challengeOptions: challengeOptionsRes.length || 0,
          // Use real data from admin stats API
          users: adminStatsRes.activeUsers || 0,
          completionRate: adminStatsRes.completionRate || 0,
          activeSubscriptions: adminStatsRes.activeSubscriptions || 0,
          monthlyRevenue: adminStatsRes.monthlyRevenue || 0,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        // Fallback to basic content stats if admin stats fail
        const [coursesRes, unitsRes, lessonsRes, challengesRes, challengeOptionsRes] = await Promise.allSettled([
          fetch('/api/courses').then(r => r.json()),
          fetch('/api/units').then(r => r.json()),
          fetch('/api/lessons').then(r => r.json()),
          fetch('/api/challenges').then(r => r.json()),
          fetch('/api/challengeOptions').then(r => r.json()),
        ]);

        setStats({
          courses: coursesRes.status === 'fulfilled' ? coursesRes.value?.length || 0 : 0,
          units: unitsRes.status === 'fulfilled' ? unitsRes.value?.length || 0 : 0,
          lessons: lessonsRes.status === 'fulfilled' ? lessonsRes.value?.length || 0 : 0,
          challenges: challengesRes.status === 'fulfilled' ? challengesRes.value?.length || 0 : 0,
          challengeOptions: challengeOptionsRes.status === 'fulfilled' ? challengeOptionsRes.value?.length || 0 : 0,
          users: 0,
          completionRate: 0,
          activeSubscriptions: 0,
          monthlyRevenue: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return {
    stats,
    loading,
  };
};