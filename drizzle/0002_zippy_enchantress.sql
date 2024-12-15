ALTER TABLE "bookmarks" RENAME COLUMN "custom_title" TO "title";--> statement-breakpoint
ALTER TABLE "bookmarks" RENAME COLUMN "custom_description" TO "description";--> statement-breakpoint
ALTER TABLE "collections" ADD COLUMN "is_enabled" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "user_stash" ADD COLUMN "is_enabled" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "bookmarks" ADD COLUMN "cover_image" text;--> statement-breakpoint
ALTER TABLE "bookmarks" ADD COLUMN "is_enabled" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "domains" ADD COLUMN "is_enabled" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "global_bookmarks" ADD COLUMN "is_enabled" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "tags" ADD COLUMN "is_enabled" boolean DEFAULT true NOT NULL;