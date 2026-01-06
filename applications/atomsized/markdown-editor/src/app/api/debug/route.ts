import { db } from "@/db";
import { getDocumentsTable } from "@/db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const schemaName = process.env.DATABASE_SCHEMA || "public";
  const documents = getDocumentsTable();

  // Get the actual search_path from the database
  const searchPathResult = await db.execute(sql`SHOW search_path`);

  // Query with explicit schema to compare
  const publicDocs = await db.execute(
    sql`SELECT id, title FROM public.documents ORDER BY updated_at DESC LIMIT 3`
  );

  const docs = await db
    .select({ id: documents.id, title: documents.title })
    .from(documents)
    .limit(5);

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    env: {
      DATABASE_SCHEMA: schemaName,
      NODE_ENV: process.env.NODE_ENV,
    },
    searchPath: searchPathResult,
    publicDocsRaw: publicDocs,
    drizzleDocs: docs,
  });
}
