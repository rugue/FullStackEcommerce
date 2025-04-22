import { integer, pgTable, varchar, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull().default("user"),

  name: varchar({ length: 255 }),
  address: text(),
});

// export const createUserSchema = createInsertSchema(usersTable).omit({
//   id: true,
//   role: true,
// });
export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  address: z.string().optional().nullable(),
});

// export const loginSchema = createInsertSchema(usersTable).pick({
//   email: true,
//   password: true,
// });
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
