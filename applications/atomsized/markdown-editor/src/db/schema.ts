import { pgSchema, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Get schema from environment - defaults to public for production
const schemaName = process.env.DATABASE_SCHEMA || "public";

// Create schema reference for schema-qualified queries
const dbSchema = pgSchema(schemaName);

export const documents = dbSchema.table("documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull().default("Untitled"),
  content: text("content").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;
