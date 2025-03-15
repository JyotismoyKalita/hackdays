import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

export const UserTable = pgTable('user', {
    id: text('id').primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
});
