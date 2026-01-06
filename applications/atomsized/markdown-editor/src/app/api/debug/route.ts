import { db } from "@/db";
import { getDocumentsTable } from "@/db/schema";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const schemaName = process.env.DATABASE_SCHEMA || "public";
  const documents = getDocumentsTable();

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
    tableSchema: schemaName === "public" ? "public.documents" : `${schemaName}.documents`,
    documentCount: docs.length,
    documents: docs,
  });
}
