ALTER TYPE "quest_type" ADD VALUE 'complete_monthly_lessons';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "monthly_quests" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" "quest_type" NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"target_value" integer NOT NULL,
	"xp_reward" integer DEFAULT 0 NOT NULL,
	"gems_reward" integer DEFAULT 0 NOT NULL,
	"hearts_reward" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"month" text NOT NULL,
	"year" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_monthly_quest_progress" (
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
DO $$ BEGIN
 ALTER TABLE "user_monthly_quest_progress" ADD CONSTRAINT "user_monthly_quest_progress_quest_id_monthly_quests_id_fk" FOREIGN KEY ("quest_id") REFERENCES "public"."monthly_quests"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
