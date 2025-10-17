DO $$ BEGIN
 CREATE TYPE "public"."achievement_type" AS ENUM('learning', 'social', 'streak', 'mastery', 'collection');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "achievements" ALTER COLUMN "category" SET DATA TYPE achievement_type;