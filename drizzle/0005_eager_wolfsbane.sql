DO $$ BEGIN
 CREATE TYPE "public"."achievement_category" AS ENUM('learning', 'social', 'streak', 'mastery', 'collection');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."leaderboard_type" AS ENUM('global', 'course', 'weekly', 'monthly');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."quest_type" AS ENUM('complete_lessons', 'earn_xp', 'perfect_lesson', 'streak', 'practice_old', 'no_hearts_lost', 'speed_lesson');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."shop_item_type" AS ENUM('hearts_refill', 'streak_freeze', 'double_xp', 'gem_pack', 'cosmetic');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "achievements" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"category" "achievement_category" NOT NULL,
	"icon_src" text,
	"badge_color" text DEFAULT 'blue',
	"xp_reward" integer DEFAULT 0 NOT NULL,
	"gems_reward" integer DEFAULT 0 NOT NULL,
	"is_secret" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "achievements_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "daily_quests" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "quest_type" NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"target_value" integer NOT NULL,
	"xp_reward" integer DEFAULT 0 NOT NULL,
	"gems_reward" integer DEFAULT 0 NOT NULL,
	"hearts_reward" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gem_transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"amount" integer NOT NULL,
	"source" text NOT NULL,
	"source_id" text,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "leaderboards" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"course_id" integer,
	"type" "leaderboard_type" NOT NULL,
	"xp" integer DEFAULT 0 NOT NULL,
	"rank" integer DEFAULT 0 NOT NULL,
	"period" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shop_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"type" "shop_item_type" NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"icon_src" text,
	"gem_cost" integer DEFAULT 0 NOT NULL,
	"xp_cost" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_limited" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "shop_items_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_achievements" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"achievement_id" integer NOT NULL,
	"unlocked_at" timestamp DEFAULT now() NOT NULL,
	"progress" integer DEFAULT 100 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_purchases" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"shop_item_id" integer NOT NULL,
	"gem_cost" integer DEFAULT 0 NOT NULL,
	"xp_cost" integer DEFAULT 0 NOT NULL,
	"purchased_at" timestamp DEFAULT now() NOT NULL,
	"used_at" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	"expires_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_quest_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"quest_id" integer NOT NULL,
	"current_value" integer DEFAULT 0 NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"completed_at" timestamp,
	"reward_claimed" boolean DEFAULT false NOT NULL,
	"claimed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"audio_enabled" boolean DEFAULT true NOT NULL,
	"master_volume" integer DEFAULT 75 NOT NULL,
	"sound_effects_volume" integer DEFAULT 75 NOT NULL,
	"lessons_audio_volume" integer DEFAULT 75 NOT NULL,
	"auto_play_audio" boolean DEFAULT true NOT NULL,
	"auto_play_video" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_settings_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "xp_transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"amount" integer NOT NULL,
	"source" text NOT NULL,
	"source_id" text,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_progress" ADD COLUMN "gems" integer DEFAULT 50 NOT NULL;--> statement-breakpoint
ALTER TABLE "user_progress" ADD COLUMN "streak" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user_progress" ADD COLUMN "last_active_date" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "user_progress" ADD COLUMN "hearts_refill_at" timestamp;--> statement-breakpoint
ALTER TABLE "user_progress" ADD COLUMN "total_xp_earned" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user_progress" ADD COLUMN "lessons_completed" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "user_progress" ADD COLUMN "perfect_lessons" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "leaderboards" ADD CONSTRAINT "leaderboards_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_achievement_id_achievements_id_fk" FOREIGN KEY ("achievement_id") REFERENCES "public"."achievements"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_purchases" ADD CONSTRAINT "user_purchases_shop_item_id_shop_items_id_fk" FOREIGN KEY ("shop_item_id") REFERENCES "public"."shop_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_quest_progress" ADD CONSTRAINT "user_quest_progress_quest_id_daily_quests_id_fk" FOREIGN KEY ("quest_id") REFERENCES "public"."daily_quests"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
