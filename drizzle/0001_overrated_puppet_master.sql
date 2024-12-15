ALTER TABLE "collection_links" RENAME TO "collection_bookmarks";--> statement-breakpoint
ALTER TABLE "links" RENAME TO "bookmarks";--> statement-breakpoint
ALTER TABLE "global_links" RENAME TO "global_bookmarks";--> statement-breakpoint
ALTER TABLE "link_tags" RENAME TO "bookmark_tags";--> statement-breakpoint
ALTER TABLE "collection_bookmarks" RENAME COLUMN "link_id" TO "bookmark_id";--> statement-breakpoint
ALTER TABLE "bookmarks" RENAME COLUMN "global_link_id" TO "global_bookmark_id";--> statement-breakpoint
ALTER TABLE "bookmark_tags" RENAME COLUMN "link_id" TO "bookmark_id";--> statement-breakpoint
ALTER TABLE "global_bookmarks" DROP CONSTRAINT "global_links_url_unique";--> statement-breakpoint
ALTER TABLE "collection_bookmarks" DROP CONSTRAINT "collection_links_collection_id_collections_id_fk";
--> statement-breakpoint
ALTER TABLE "collection_bookmarks" DROP CONSTRAINT "collection_links_link_id_links_id_fk";
--> statement-breakpoint
ALTER TABLE "global_bookmarks" DROP CONSTRAINT "global_links_domain_id_domains_id_fk";
--> statement-breakpoint
ALTER TABLE "bookmarks" DROP CONSTRAINT "links_global_link_id_global_links_id_fk";
--> statement-breakpoint
ALTER TABLE "bookmarks" DROP CONSTRAINT "links_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "bookmark_tags" DROP CONSTRAINT "link_tags_link_id_links_id_fk";
--> statement-breakpoint
ALTER TABLE "bookmark_tags" DROP CONSTRAINT "link_tags_tag_id_tags_id_fk";
--> statement-breakpoint
ALTER TABLE "bookmarks" ADD COLUMN "tags" text[];--> statement-breakpoint
ALTER TABLE "bookmarks" ADD COLUMN "type" varchar(20) DEFAULT 'link' NOT NULL;--> statement-breakpoint
ALTER TABLE "bookmarks" ADD COLUMN "highlights" text[];--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collection_bookmarks" ADD CONSTRAINT "collection_bookmarks_collection_id_collections_id_fk" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collection_bookmarks" ADD CONSTRAINT "collection_bookmarks_bookmark_id_bookmarks_id_fk" FOREIGN KEY ("bookmark_id") REFERENCES "public"."bookmarks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "global_bookmarks" ADD CONSTRAINT "global_bookmarks_domain_id_domains_id_fk" FOREIGN KEY ("domain_id") REFERENCES "public"."domains"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_global_bookmark_id_global_bookmarks_id_fk" FOREIGN KEY ("global_bookmark_id") REFERENCES "public"."global_bookmarks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookmark_tags" ADD CONSTRAINT "bookmark_tags_bookmark_id_bookmarks_id_fk" FOREIGN KEY ("bookmark_id") REFERENCES "public"."bookmarks"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookmark_tags" ADD CONSTRAINT "bookmark_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "collection_bookmarks" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "global_bookmarks" DROP COLUMN IF EXISTS "multilingual";--> statement-breakpoint
ALTER TABLE "global_bookmarks" ADD CONSTRAINT "global_bookmarks_url_unique" UNIQUE("url");