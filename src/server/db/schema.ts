import {
    boolean,
    date,
    integer,
    pgEnum,
    pgTable,
    text,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core';

export const PreCategory = pgEnum('preCategory', [
    'Electronics',
    'Furniture',
    'Clothing',
    'Food',
    'Books',
    'Other',
]);

export const UserTable = pgTable('user', {
    id: text('id').primaryKey().notNull(),
    name: varchar('name', { length: 255 }),
    email: varchar('email', { length: 255 }).notNull(),
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
    manufactureDate: date('manufactureDate').notNull(),
    expiryDate: date('expiryDate').notNull(),
    quantity: integer('quantity').notNull(),
    category: PreCategory('category').notNull(),
    customCategory: varchar('customCategory', { length: 255 }),
    price: integer('price').notNull(),
    companyId: uuid('companyId')
        .references(() => CompanyTable.id)
        .notNull(),
});

export const SoldItemTable = pgTable('soldItem', {
    id: uuid('id').primaryKey().defaultRandom(),
    model: varchar('model', { length: 255 }).notNull(),
    quantity: integer('quantity').notNull(),
    soldDate: date('soldDate').notNull(),
    soldPrice: integer('soldPrice').notNull(),
    companyId: uuid('companyId')
        .references(() => CompanyTable.id)
        .notNull(),
});
