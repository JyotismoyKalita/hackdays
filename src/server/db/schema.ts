import {
    boolean,
    date,
    integer,
    pgTable,
    text,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';

export const UserTable = pgTable('user', {
    id: text('id').primaryKey().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
});

export const CompanyTable = pgTable('company', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    userId: text('userId')
        .references(() => UserTable.id)
        .notNull(),
});

export const ItemTable = pgTable('item', {
    id: uuid('id').primaryKey().defaultRandom(),
    model: varchar('model', { length: 255 }).notNull(),
    hasExpiryDate: boolean('hasExpiryDate').notNull(),
    expiryDate: date('expiryDate'),
    quantity: integer('quantity').notNull(),
    companyId: uuid('companyId')
        .references(() => CompanyTable.id)
        .notNull(),
});

export const SoldItemTable = pgTable('soldItem', {
    id: uuid('id').primaryKey().defaultRandom(),
    model: varchar('model', { length: 255 }).notNull(),
    quantity: integer('quantity').notNull(),
    companyId: uuid('companyId')
        .references(() => CompanyTable.id)
        .notNull(),
});
