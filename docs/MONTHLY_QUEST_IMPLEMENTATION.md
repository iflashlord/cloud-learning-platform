# Monthly Quest System Implementation

This document describes the monthly quest system that has been implemented in the AWS Learning Platform.

## Overview

The monthly quest system allows users to set and track monthly goals, specifically completing 15 lessons or practice lessons within a calendar month.

## Features

1. **Monthly Quest Creation**: Automatically creates a monthly quest for the current month when users access the quest page
2. **Progress Tracking**: Tracks lesson completions (both new lessons and practice) toward the monthly goal
3. **Rewards**: Users receive 500 XP and 50 gems upon completing the monthly quest
4. **Admin Testing**: Admin users can simulate quest completion for testing purposes

## Database Schema

### New Tables Added

- `monthly_quests`: Stores monthly quest definitions
- `user_monthly_quest_progress`: Tracks individual user progress on monthly quests

### Schema Details

```sql
CREATE TABLE monthly_quests (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL, -- 'complete_monthly_lessons'
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  target_value INTEGER NOT NULL, -- 15 for monthly lessons
  xp_reward INTEGER DEFAULT 0,
  gems_reward INTEGER DEFAULT 0,
  hearts_reward INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  month TEXT NOT NULL, -- Format: "2024-10"
  year INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_monthly_quest_progress (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  quest_id INTEGER REFERENCES monthly_quests(id) ON DELETE CASCADE,
  current_value INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP,
  reward_claimed BOOLEAN DEFAULT false,
  claimed_at TIMESTAMP
);
```

## How It Works

1. **Quest Creation**: When a user visits the quests page, the system automatically creates a monthly quest if one doesn't exist for the current month.

2. **Progress Tracking**: Every time a user completes a lesson or practice lesson, the system increments their monthly quest progress by 1.

3. **Completion**: When a user reaches 15 lesson completions, the quest is marked as complete and rewards are automatically granted.

## User Interface

The monthly quest is displayed on the main quests page (`/quests`) as a prominent card showing:

- Quest title (e.g., "October Learning Champion")
- Progress (e.g., "5 / 15 lessons completed")
- Time remaining in the month
- Reward information (500 XP, 50 gems)
- Completion status

## Admin Testing

Admin users can test the monthly quest system using the "Test Monthly Quest" button in the admin dashboard, which:

1. Ensures a monthly quest exists for the current month
2. Immediately completes the quest for the current user
3. Awards the completion rewards

## API Endpoints

### Get Monthly Quest Status

```
GET /api/monthly-quest
```

Returns the current month's quest and user progress.

### Test Quest Completion (Admin)

```
PUT /api/monthly-quest/test
```

Simulates quest completion for testing purposes.

### Add Single Lesson Progress

```
POST /api/monthly-quest/test
```

Adds 1 lesson completion to the monthly quest progress.

## Integration Points

The monthly quest system integrates with:

1. **Lesson Completion**: `actions/gamification.ts` - `processLessonCompletion()`
2. **Practice Lessons**: `actions/challenge-progress.ts` - `upsertChallengeProgress()`
3. **Quest UI**: `components/quests/MonthlyQuestContainer.tsx`
4. **Admin Panel**: `components/admin/dashboard/QuickActions.tsx`

## Technical Implementation

### Key Functions

1. **createMonthlyQuest()**: Creates a new monthly quest for the current month
2. **updateMonthlyQuestProgress()**: Updates user progress on monthly quests
3. **getMonthlyQuestProgress()**: Retrieves current user's monthly quest progress
4. **adminFakeCompleteMonthlyQuest()**: Admin function to simulate quest completion

### Progress Tracking

Progress is tracked in two places:

- `processLessonCompletion()`: When a user completes a full lesson for the first time
- `upsertChallengeProgress()`: When a user practices already completed lessons

Both actions increment the monthly quest progress by 1.

## Testing

To test the monthly quest system:

1. **View Quest Page**: Navigate to `/quests` to see the monthly quest card
2. **Complete Lessons**: Complete lessons or practice sessions to see progress update
3. **Admin Testing**: Use the admin dashboard button to simulate completion
4. **API Testing**: Use the API endpoints to test programmatically

## Future Enhancements

Possible future enhancements include:

- Different monthly quest types (earn XP, maintain streak, etc.)
- Seasonal or special event quests
- Progressive rewards (partial rewards at milestones)
- Quest categories and difficulties
- Social features (shared monthly challenges)
