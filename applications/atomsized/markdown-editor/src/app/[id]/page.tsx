import { db } from "@/db";
import { documents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Editor } from "./editor";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DocumentPage({ params }: PageProps) {
  const { id } = await params;

  const [doc] = await db.select().from(documents).where(eq(documents.id, id));

  if (!doc) {
    notFound();
  }

  return <Editor document={doc} />;
}
