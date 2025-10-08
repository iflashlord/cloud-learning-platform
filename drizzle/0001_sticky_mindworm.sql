ALTER TYPE "type" ADD VALUE 'TRUE_FALSE';--> statement-breakpoint
ALTER TYPE "type" ADD VALUE 'DRAG_DROP';--> statement-breakpoint
ALTER TYPE "type" ADD VALUE 'TEXT_INPUT';--> statement-breakpoint
ALTER TYPE "type" ADD VALUE 'IMAGE_SELECT';--> statement-breakpoint
ALTER TYPE "type" ADD VALUE 'LISTENING';--> statement-breakpoint
ALTER TABLE "challenge_options" ADD COLUMN "order" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "challenge_options" ADD COLUMN "value" text;--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "audio_src" text;--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "image_src" text;--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "correct_answer" text;