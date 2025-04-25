import {
  doublePrecision,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { usersTable } from "./usersSchema.js";
import { productsTable } from "./productsSchema.js";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const ordersTable = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  status: varchar({ length: 50 }).notNull().default("New"),

  userId: integer()
    .references(() => usersTable.id)
    .notNull(),

  stripePaymentIntentId: varchar({ length: 255 }),
});

export const orderItemsTable = pgTable("order_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer()
    .references(() => ordersTable.id)
    .notNull(),
  productId: integer()
    .references(() => productsTable.id)
    .notNull(),

  quantity: integer().notNull(),
  price: doublePrecision().notNull(),
});

export const insertOrderSchema = z.object({
  stripePaymentIntentId: z.string().optional(),
});

export const insertOrderItemSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
  price: z.number(),
});

export const insertOrderWithItemsSchema = z.object({
  // order: insertOrderSchema,
  // items: z.array(insertOrderItemSchema),
  order: z.object({}).optional(), // Make it match the empty object you're sending
  items: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number(),
      price: z.number(),
    })
  ),
});

export const updateOrderSchema = createInsertSchema(ordersTable).pick({
  status: true,
});
