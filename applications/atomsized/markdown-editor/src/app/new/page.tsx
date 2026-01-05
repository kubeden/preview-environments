import { db } from "@/db";
import { documents } from "@/db/schema";
import { redirect } from "next/navigation";

export default async function NewDocument() {
  const [doc] = await db
    .insert(documents)
    .values({
      title: "Untitled",
      content: "",
    })
    .returning();

  redirect(`/${doc.id}`);
}
