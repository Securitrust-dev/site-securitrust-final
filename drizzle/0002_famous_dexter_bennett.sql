ALTER TABLE `articles` ADD `slug` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `articles_slug_unique` ON `articles` (`slug`);