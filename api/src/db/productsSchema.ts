import {
  integer,
  pgTable,
  varchar,
  text,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";


export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  image: varchar({ length: 255 }),
  price: doublePrecision().notNull(),
});

// export const createProductSchema = createInsertSchema(productsTable).omit({
//   id: true,
// });
export const createProductSchema = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  price: z.number(),
});

// export const updateProductSchema = createInsertSchema(productsTable)
//   .omit({
//     id: true,
//   })
//   .partial();
export const updateProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  price: z.number().optional(),
});
