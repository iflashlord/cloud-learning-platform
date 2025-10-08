ALTER TABLE "courses" ADD COLUMN "category" text DEFAULT 'General' NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "level" text DEFAULT 'Beginner';--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "duration" text;