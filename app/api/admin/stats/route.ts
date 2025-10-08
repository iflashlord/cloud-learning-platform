import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import db from "@/db/drizzle";
import { 
  userProgress, 
  userSubscription, 
  challengeProgress, 
  challenges,
  lessons,
  units,
  courses
} from "@/db/schema";
import { sql, count, eq, and, gte } from "drizzle-orm";

export const GET = async () => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // Get total users count (Active Users)
    const totalUsersResult = await db
      .select({ count: count() })
      .from(userProgress);
    
    const totalUsers = totalUsersResult[0]?.count || 0;

    // Get active users (users who have completed at least one challenge in the last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Note: Since we don't have timestamps on challengeProgress, we'll use total users as active users
    // In a real app, you'd want to add createdAt/updatedAt timestamps to track activity
    const activeUsers = totalUsers;

    // Get completion rate (percentage of users who have completed at least one lesson)
    const totalChallengesResult = await db
      .select({ count: count() })
      .from(challenges);
    
    const totalChallenges = totalChallengesResult[0]?.count || 0;

    const completedChallengesResult = await db
      .select({ count: count() })
      .from(challengeProgress)
      .where(eq(challengeProgress.completed, true));
    
    const completedChallenges = completedChallengesResult[0]?.count || 0;

    // Calculate overall completion rate
    const completionRate = totalChallenges > 0 
      ? Math.round((completedChallenges / totalChallenges) * 100) 
      : 0;

    // Get active subscriptions count
    const currentDate = new Date();
    const activeSubscriptionsResult = await db
      .select({ count: count() })
      .from(userSubscription)
      .where(gte(userSubscription.stripeCurrentPeriodEnd, currentDate));
    
    const activeSubscriptions = activeSubscriptionsResult[0]?.count || 0;

    // Calculate monthly revenue (assuming $9.99 per subscription)
    // In a real app, you'd store actual price information
    const subscriptionPrice = 9.99;
    const monthlyRevenue = activeSubscriptions * subscriptionPrice;

    // Get user engagement metrics for additional insights
    const usersWithProgressResult = await db
      .select({ 
        userId: userProgress.userId,
        points: userProgress.points,
        hearts: userProgress.hearts
      })
      .from(userProgress);

    const totalPoints = usersWithProgressResult.reduce((sum, user) => sum + (user.points || 0), 0);
    const averagePoints = totalUsers > 0 ? Math.round(totalPoints / totalUsers) : 0;

    // Calculate user retention (users who have more than 0 points)
    const engagedUsers = usersWithProgressResult.filter(user => (user.points || 0) > 0).length;
    const userRetentionRate = totalUsers > 0 ? Math.round((engagedUsers / totalUsers) * 100) : 0;

    const stats = {
      activeUsers,
      totalUsers,
      completionRate,
      activeSubscriptions,
      monthlyRevenue: Math.round(monthlyRevenue * 100) / 100, // Round to 2 decimal places
      averagePoints,
      userRetentionRate,
      engagedUsers,
      totalChallenges,
      completedChallenges
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("[ADMIN_STATS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};