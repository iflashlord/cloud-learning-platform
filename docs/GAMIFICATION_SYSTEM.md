# 🎮 Duolingo-Style Gamification System

A comprehensive gamification system similar to Duolingo with Hearts, XP, Gems, Streaks, Quests, Achievements, Leaderboards, and Shop functionality.

## 🌟 Features Overview

### Core Systems

1. **Hearts System** 💖
   - Lives that are consumed when making mistakes
   - Automatically refill over time (1 heart per hour)
   - Can be purchased with Gems or XP
   - Pro users have unlimited hearts

2. **XP (Experience Points) System** ⚡
   - Earned by completing lessons, challenges, and quests
   - Used for progression tracking and leaderboards
   - Pro users earn 50% more XP
   - Streak bonuses apply (up to 70% bonus for 7+ day streaks)

3. **Gems System** 💎
   - Premium currency for purchasing power-ups and items
   - Earned through lesson completion, achievements, and daily bonuses
   - Used to buy hearts, streak freezes, and cosmetic items
   - Pro users get daily gem bonuses

4. **Streak System** 🔥
   - Daily lesson completion tracking
   - Provides XP and gem bonuses
   - Streak freezes available for purchase
   - Achievement unlocks for milestone streaks

5. **Quest System** 🎯
   - Daily and weekly challenges
   - Various types: lesson completion, XP earning, perfect lessons, etc.
   - Rewarding with XP, gems, and sometimes hearts
   - Auto-generated daily with variety

6. **Achievement System** 🏆
   - Unlockable badges for various accomplishments
   - Categories: Learning, Social, Streak, Mastery, Collection
   - Secret achievements for special discoveries
   - Rewards provide XP and gems

7. **Leaderboards** 👑
   - Global, course-specific, weekly, and monthly rankings
   - Podium display for top 3 users
   - User position tracking even outside top 10
   - Weekly rewards for top performers

8. **Shop System** 🛒
   - Purchase power-ups and items with gems or XP
   - Heart refills, streak freezes, XP boosts
   - Gem packs for XP conversion
   - Limited-time offers and popular item highlights

## 📊 Database Schema

### Enhanced User Progress

```sql
user_progress:
- hearts: integer (default: 5)
- points: integer (XP for progression)
- gems: integer (premium currency)
- streak: integer (daily lesson streak)
- lastActiveDate: timestamp
- heartsRefillAt: timestamp
- totalXpEarned: integer (lifetime XP)
- lessonsCompleted: integer
- perfectLessons: integer
```

### New Tables

- `leaderboards` - Ranking data for different time periods
- `dailyQuests` - Daily and weekly challenges
- `userQuestProgress` - User progress on quests
- `achievements` - Available achievement definitions
- `userAchievements` - User unlocked achievements
- `shopItems` - Available shop items
- `userPurchases` - User purchase history
- `xpTransactions` - XP earning/spending log
- `gemTransactions` - Gem earning/spending log

## 🎮 Gamification Constants

```typescript
export const GAMIFICATION = {
  // Hearts System
  MAX_HEARTS: 5,
  HEART_REFILL_INTERVAL_HOURS: 1,
  HEARTS_REFILL_COST_GEMS: 5,
  HEARTS_REFILL_COST_XP: 10,
  
  // XP System
  XP_PER_LESSON: 10,
  XP_PER_LESSON_PRO: 15,
  XP_PER_PRACTICE: 5,
  XP_PERFECT_LESSON_BONUS: 5,
  XP_STREAK_BONUS: 5,
  
  // Gems System
  GEMS_STARTING_AMOUNT: 50,
  GEMS_PER_LESSON_FIRST_TIME: 2,
  GEMS_PER_PERFECT_LESSON: 3,
  GEMS_PER_STREAK_DAY: 1,
  GEMS_FROM_AD_WATCH: 5,
  GEMS_PRO_DAILY_BONUS: 10,
  
  // Shop Items
  DOUBLE_XP_COST_GEMS: 20,
  STREAK_FREEZE_COST_GEMS: 15,
}
```

## 🚀 Implementation Guide

### 1. Database Migration

First, update your database schema:

```bash
# Generate migration for the new gamification tables
npx drizzle-kit generate:pg

# Apply the migration
npx drizzle-kit push:pg
```

### 2. Seed Initial Data

Run the seeding script to populate achievements, shop items, and daily quests:

```typescript
import { seedGamificationData } from '@/scripts/seed-gamification'

// Seed all gamification data
await seedGamificationData()
```

### 3. Update Lesson Completion Logic

Replace simple XP awards with comprehensive gamification processing:

```typescript
import { processLessonCompletion } from '@/actions/gamification'

// In your challenge completion handler
const rewards = await processLessonCompletion(
  lessonId, 
  wasFirstAttempt, 
  wasPerfect
)

// rewards contains: { xp, gems, newStreak, achievements }
```

### 4. Add Currency Displays to UI

Use the currency display components throughout your app:

```tsx
import { CurrencyHeader } from '@/components/gamification'

// In your header/navigation
<CurrencyHeader
  hearts={userProgress.hearts}
  maxHearts={5}
  xp={userProgress.points}
  gems={userProgress.gems}
  streak={userProgress.streak}
  isPro={hasActiveSubscription}
/>
```

### 5. Integrate Quest System

Add quest tracking to user actions:

```typescript
import { updateQuestProgress } from '@/actions/gamification'

// When user completes a lesson
await updateQuestProgress("complete_lessons", 1)
await updateQuestProgress("earn_xp", xpEarned)

// When user completes perfect lesson
if (wasPerfect) {
  await updateQuestProgress("perfect_lesson", 1)
}
```

### 6. Setup Daily Quest Generation

Add a cron job to generate daily quests:

```typescript
// In your cron job or scheduled function
import { generateDailyQuests } from '@/scripts/seed-gamification'

// Run daily at midnight
await generateDailyQuests()
```

## 🎨 UI Components

### Currency Displays

- `CurrencyDisplay` - Generic currency display
- `CurrencyHeader` - Combined header with all currencies
- `HeartsDisplay`, `XPDisplay`, `GemsDisplay`, `StreakDisplay` - Specialized displays

### Quest System

- `QuestCard` - Individual quest display with progress
- `QuestList` - Full quest management interface

### Achievement System

- `AchievementCard` - Individual achievement display
- `AchievementGrid` - Achievement gallery with filtering

### Leaderboard

- `Leaderboard` - Full leaderboard with podium
- `LeaderboardEntry` - Individual leaderboard entry

### Shop System

- `GameShop` - Complete shop interface
- `ShopItemCard` - Individual shop item display

### Dashboard

- `GamificationDashboard` - Comprehensive overview dashboard

## 💡 Best Practices

### Balancing

1. **XP Economy**
   - Base lesson: 10 XP
   - Perfect lesson bonus: +5 XP
   - Practice lesson: 5 XP
   - Pro bonus: +50% XP

2. **Gem Economy**
   - New lesson completion: 2 gems
   - Perfect lesson bonus: +3 gems
   - Daily streak: 1 gem
   - Heart refill cost: 5 gems

3. **Quest Difficulty**
   - Easy quests: 3 lessons, 50 XP earned
   - Medium quests: Perfect lesson, 2 practice sessions
   - Hard quests: No hearts lost, speed challenges

### User Engagement

1. **Daily Motivation**
   - Login streaks with increasing rewards
   - Daily quests with variety
   - Limited-time shop offers

2. **Progress Feedback**
   - Immediate XP/gem notifications
   - Achievement unlock celebrations
   - Level-up animations

3. **Social Competition**
   - Weekly leaderboard resets
   - Course-specific rankings
   - Achievement showcases

## 🔧 Advanced Features

### Seasonal Events

- Special limited-time quests
- Exclusive achievements
- Themed shop items

### Pro Benefits

- Unlimited hearts
- 50% XP bonus
- Daily gem bonuses
- Exclusive shop items
- Priority leaderboard display

### Analytics Tracking

- XP transaction logs
- Gem spending patterns
- Quest completion rates
- Achievement unlock statistics

## 🎯 Integration Points

### Learning Flow

1. **Lesson Start** - Check hearts, apply active boosts
2. **Challenge Complete** - Award base XP, update quest progress
3. **Mistake Made** - Reduce hearts (if not Pro), log for quests
4. **Lesson Complete** - Process full gamification rewards
5. **Daily Check-in** - Update streaks, generate quests

### Shop Integration

1. **Heart Refill** - Instant hearts restore
2. **Streak Freeze** - Streak protection for missed days
3. **XP Boosts** - Temporary multipliers
4. **Gem Packs** - XP to gem conversion

### Social Features

1. **Leaderboard Updates** - Real-time ranking changes
2. **Achievement Sharing** - Social media integration
3. **Friend Challenges** - Competitive quests
4. **Guild Systems** - Team-based leaderboards

## 📱 Mobile Considerations

- Touch-friendly currency displays
- Swipe gestures for quest/achievement browsing
- Haptic feedback for rewards
- Offline quest progress tracking
- Push notifications for streak reminders

## 🔄 Maintenance

### Daily Tasks

- Generate new daily quests
- Reset daily limits (ads, bonuses)
- Update leaderboard rankings
- Process Pro user bonuses

### Weekly Tasks

- Award leaderboard prizes
- Generate weekly challenges
- Archive old quest data
- Update featured shop items

### Monthly Tasks

- Generate achievement statistics
- Review gem economy balance
- Update seasonal content
- Analyze user engagement metrics

This gamification system provides a complete Duolingo-like experience that drives user engagement through multiple psychological motivators: progress (XP), loss aversion (hearts), collection (achievements), competition (leaderboards), and daily habits (streaks and quests).
