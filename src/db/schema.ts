import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const testTable = pgTable("test", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  age: integer("age").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
});
