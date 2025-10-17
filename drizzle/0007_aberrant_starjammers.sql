DO $$ BEGIN
 CREATE TYPE "public"."chest_type" AS ENUM('BRONZE', 'SILVER', 'GOLD', 'SPECIAL');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chest_progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"chest_id" integer NOT NULL,
	"opened" boolean DEFAULT false NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chests" (
	"id" serial PRIMARY KEY NOT NULL,
	"unit_id" integer NOT NULL,
	"type" "chest_type" NOT NULL,
	"position" integer NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"xp_reward" integer DEFAULT 50 NOT NULL,
	"hearts_reward" integer DEFAULT 0,
	"has_challenge" boolean DEFAULT false NOT NULL,
	"image_src" text,
	"unlocked_at" integer
);
--> statement-breakpoint
ALTER TABLE "challenges" ALTER COLUMN "lesson_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "chest_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chest_progress" ADD CONSTRAINT "chest_progress_chest_id_chests_id_fk" FOREIGN KEY ("chest_id") REFERENCES "public"."chests"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "chests" ADD CONSTRAINT "chests_unit_id_units_id_fk" FOREIGN KEY ("unit_id") REFERENCES "public"."units"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "challenges" ADD CONSTRAINT "challenges_chest_id_chests_id_fk" FOREIGN KEY ("chest_id") REFERENCES "public"."chests"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
