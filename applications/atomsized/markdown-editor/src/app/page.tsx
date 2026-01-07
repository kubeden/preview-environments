import { db } from "@/db";
import { getDocumentsTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const documents = getDocumentsTable();
  const isPreview = process.env.DATABASE_SCHEMA && process.env.DATABASE_SCHEMA !== "public";

  const docs = await db
    .select()
    .from(documents)
    .orderBy(desc(documents.updatedAt))
    .limit(50);

  return (
    <main
      style={{
        minHeight: "calc(100vh - 49px)",
        padding: "40px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <header
        style={{
          marginBottom: "32px",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: 500 }}>
          My Documents{isPreview ? " (Preview)" : ""}
        </h1>
      </header>

      {docs.length === 0 ? (
        <p style={{ color: "var(--text-secondary)" }}>
          No documents yet. Create your first one.
        </p>
      ) : (
        <ul style={{ listStyle: "none" }}>
          {docs.map((doc) => (
            <li key={doc.id}>
              <Link
                href={`/${doc.id}`}
                style={{
                  display: "block",
                  padding: "16px",
                  marginBottom: "8px",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ fontWeight: 500, marginBottom: "4px" }}>
                  {doc.title}
                </div>
                <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                  Updated {doc.updatedAt.toLocaleDateString()}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
