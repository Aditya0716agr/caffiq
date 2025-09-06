CREATE TABLE `comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`subject` text,
	`comment` text NOT NULL,
	`created_at` text NOT NULL
);
