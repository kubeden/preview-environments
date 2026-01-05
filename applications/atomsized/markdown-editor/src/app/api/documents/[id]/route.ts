import { db } from "@/db";
import { getDocumentsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();
  const documents = getDocumentsTable();

  const updateData: { content?: string; title?: string; updatedAt: Date } = {
    updatedAt: new Date(),
  };

  if (typeof body.content === "string") {
    updateData.content = body.content;
  }

  if (typeof body.title === "string") {
    updateData.title = body.title;
  }

  const [updated] = await db
    .update(documents)
    .set(updateData)
    .where(eq(documents.id, id))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const documents = getDocumentsTable();

  const [deleted] = await db
    .delete(documents)
    .where(eq(documents.id, id))
    .returning();

  if (!deleted) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
