import { pgSchema, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Get schema from environment - defaults to public for production
const schemaName = process.env.DATABASE_SCHEMA || "public";

// Table definition
const tableColumns = {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull().default("Untitled"),
  content: text("content").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
};

// Use pgSchema for non-public schemas (preview envs), pgTable for public (production)
export const documents = schemaName === "public"
  ? pgTable("documents", tableColumns)
  : pgSchema(schemaName).table("documents", tableColumns);

export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;
