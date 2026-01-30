CREATE TYPE "public"."post_type" AS ENUM('feature', 'bug');--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "type" "post_type" DEFAULT 'feature' NOT NULL;