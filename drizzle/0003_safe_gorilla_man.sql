ALTER TYPE "type" ADD VALUE 'VIDEO';--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "video_src" text;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "theme_config" jsonb;