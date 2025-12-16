DROP INDEX "articles_slug_unique";--> statement-breakpoint
ALTER TABLE `articles` ALTER COLUMN "image" TO "image" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `articles_slug_unique` ON `articles` (`slug`);--> statement-breakpoint
ALTER TABLE `articles` ALTER COLUMN "published" TO "published" integer DEFAULT false;--> statement-breakpoint
ALTER TABLE `articles` ALTER COLUMN "published" TO "published" integer;