import { db } from "@/db";
import { getDocumentsTable } from "@/db/schema";
import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";

export async function GET() {
  const schemaName = process.env.DATABASE_SCHEMA || "public";
  const documents = getDocumentsTable();

  // Get the table name from drizzle
  const tableName = (documents as any)[Symbol.for("drizzle:Name")] || "unknown";

  // Query documents from the table
  const docs = await db.select().from(documents).limit(5);

  // Also query with raw SQL to compare
  const rawDocs = await db.execute(
    sql`SELECT id, title FROM ${sql.identifier(schemaName)}.documents LIMIT 5`
  );

  return NextResponse.json({
    env: {
      DATABASE_SCHEMA: schemaName,
      NODE_ENV: process.env.NODE_ENV,
    },
    tableName,
    docsFromDrizzle: docs.length,
    docsFromRawSQL: rawDocs.length,
    drizzleDocs: docs.map(d => ({ id: d.id, title: d.title })),
    rawDocs: rawDocs,
  });
}
