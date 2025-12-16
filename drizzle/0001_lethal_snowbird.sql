DROP INDEX `articles_slug_unique`;--> statement-breakpoint
ALTER TABLE `articles` ALTER COLUMN "image" TO "image" text;--> statement-breakpoint
ALTER TABLE `articles` ALTER COLUMN "published" TO "published" integer NOT NULL DEFAULT true;--> statement-breakpoint
ALTER TABLE `articles` DROP COLUMN `slug`;