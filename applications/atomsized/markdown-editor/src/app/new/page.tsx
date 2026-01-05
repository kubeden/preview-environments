import { db } from "@/db";
import { getDocumentsTable } from "@/db/schema";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function NewDocument() {
  const documents = getDocumentsTable();

  const [doc] = await db
    .insert(documents)
    .values({
      title: "Untitled",
      content: "",
    })
    .returning();

  redirect(`/${doc.id}`);
}
