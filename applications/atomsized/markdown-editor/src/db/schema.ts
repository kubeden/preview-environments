import { pgSchema, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Table columns definition
const tableColumns = {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull().default("Untitled"),
  content: text("content").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
};

// Create both table definitions - one for public schema, one for custom schemas
const publicDocuments = pgTable("documents", tableColumns);

// Function to get documents table with correct schema at runtime
// This ensures DATABASE_SCHEMA is read at runtime, not build time
export function getDocumentsTable() {
  const schemaName = process.env.DATABASE_SCHEMA || "public";
  console.log("[schema] DATABASE_SCHEMA:", schemaName);
  if (schemaName === "public") {
    return publicDocuments;
  }
  const customTable = pgSchema(schemaName).table("documents", tableColumns);
  console.log("[schema] Using schema-qualified table for:", schemaName);
  return customTable;
}

// Export static reference for types (uses public schema)
export const documents = publicDocuments;

export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;
