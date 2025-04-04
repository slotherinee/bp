import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  telegram_id: integer('telegram_id').unique().notNull(),
  username: text('name').notNull(),
  is_telegram_bot: integer('is_telegram_bot', { mode: 'boolean' }).notNull(),
  is_premiumuser: integer('is_premiumuser', { mode: 'boolean' }).notNull(),
  language_code: text('language_code').notNull(),
  created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: text().default(sql`(CURRENT_TIMESTAMP)`).$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
