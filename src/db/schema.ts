import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const waitlistSignups = sqliteTable('waitlist_signups', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  name: text('name'),
  createdAt: text('created_at').notNull(),
});

export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name'),
  email: text('email').notNull(),
  subject: text('subject'),
  comment: text('comment').notNull(),
  createdAt: text('created_at').notNull(),
});