import Link from "next/link";

export function Navbar() {
  const isPreview = process.env.DATABASE_SCHEMA && process.env.DATABASE_SCHEMA !== "public";

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg-secondary)",
      }}
    >
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          textDecoration: "none",
          color: "var(--text-primary)",
        }}
      >
        <span style={{ fontSize: "18px", fontWeight: 600 }}>
          Atomsized
        </span>
        {isPreview && (
          <span
            style={{
              fontSize: "11px",
              padding: "2px 6px",
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border)",
              borderRadius: "4px",
              color: "var(--text-muted)",
            }}
          >
            Preview
          </span>
        )}
      </Link>

      <Link
        href="/new"
        style={{
          padding: "8px 16px",
          background: "#fff",
          color: "#000",
          textDecoration: "none",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        New Document
      </Link>
    </nav>
  );
}
