import {
    pgTable,
    serial,
    text,
    integer,
    boolean,
    timestamp,
    varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// =======================
// UserTable Table (Authentication & Role Management)
// =======================
export const UserTable = pgTable('user', {
    id: text('id').primaryKey().notNull(),
    name: varchar('name', { length: 255 }),
    email: varchar('email', { length: 255 }).notNull(),
});

// =======================
// Items Table (Inventory per User)
// =======================
export const items = pgTable('items', {
    id: serial('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => UserTable.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    category: text('category').notNull(),
    categoryId: integer('category_id')
        .notNull()
        .references(() => categories.id, { onDelete: 'cascade' }),
    quantity: integer('quantity').notNull(),
    price: integer('price').notNull(),
    costPrice: integer('cost_price').notNull(),
    hasExpiry: boolean('has_expiry').default(false),
    manufacturingDate: timestamp('manufacturing_date'),
    expiryDate: timestamp('expiry_date'),
    addedAt: timestamp('added_at').defaultNow(),
});

export const categories = pgTable('categories', {
    id: serial('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => UserTable.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
});

// =======================
// Sold Items Table (User-Specific Sales)
// =======================
export const soldItems = pgTable('sold_items', {
    id: serial('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => UserTable.id, { onDelete: 'cascade' }),
    itemId: integer('item_id')
        .notNull()
        .references(() => items.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    category: text('category').notNull(),
    quantity: integer('quantity').notNull(),
    salePrice: integer('sale_price').notNull(),
    soldAt: timestamp('sold_at').defaultNow().notNull(),
});

// =======================
// Expired Items Table (Tracks Expired Stock)
// =======================
export const expiredItems = pgTable('expired_items', {
    id: serial('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => UserTable.id, { onDelete: 'cascade' }),
    itemId: integer('item_id')
        .notNull()
        .references(() => items.id, { onDelete: 'cascade' }),
});

// =======================
// Purchases Table (Stock Replenishment per User)
// =======================
export const purchases = pgTable('purchases', {
    id: serial('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => UserTable.id, { onDelete: 'cascade' }),
    itemId: integer('item_id')
        .notNull()
        .references(() => items.id, { onDelete: 'cascade' }),
    quantity: integer('quantity').notNull(),
    name: text('name').notNull(),
    category: text('category').notNull(),
    costPrice: integer('cost_price').notNull(),
    purchasedAt: timestamp('purchased_at').defaultNow().notNull(),
});

// =======================
// Sales Reports Table (User-Specific Sales Analysis)
// =======================
export const salesReports = pgTable('sales_reports', {
    id: serial('id').primaryKey(),
    userId: text('user_id')
        .notNull()
        .references(() => UserTable.id, { onDelete: 'cascade' }),
    itemId: integer('item_id')
        .notNull()
        .references(() => items.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    category: text('category').notNull(),
    totalItemsSold: integer('total_items_sold').notNull(),
});

// =======================
// Define Relationships
// =======================
export const usersRelations = relations(UserTable, ({ many }) => ({
    items: many(items),
    categories: many(categories),
    soldItems: many(soldItems),
    expiredItems: many(expiredItems),
    purchases: many(purchases),
    salesReports: many(salesReports),
}));

export const itemsRelations = relations(items, ({ one, many }) => ({
    user: one(UserTable, {
        fields: [items.userId],
        references: [UserTable.id],
    }),
    category: one(categories, {
        fields: [items.categoryId],
        references: [categories.id],
    }),
    salesReports: one(salesReports, {
        fields: [items.id],
        references: [salesReports.itemId],
    }),
    soldItems: many(soldItems),
    expiredItems: many(expiredItems),
    purchases: many(purchases),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
    user: one(UserTable, {
        fields: [categories.userId],
        references: [UserTable.id],
    }),
    items: many(items),
}));

export const soldItemsRelations = relations(soldItems, ({ one }) => ({
    user: one(UserTable, {
        fields: [soldItems.userId],
        references: [UserTable.id],
    }),
    item: one(items, { fields: [soldItems.itemId], references: [items.id] }),
}));

export const salesReportRelations = relations(salesReports, ({ one }) => ({
    item: one(items, {
        fields: [salesReports.itemId],
        references: [items.id],
    }),
    user: one(UserTable, {
        fields: [salesReports.userId],
        references: [UserTable.id],
    }),
}));
