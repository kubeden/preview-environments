import Link from "next/link";

export function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 24px",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg-secondary)",
      }}
    >
      <Link
        href="/"
        style={{
          fontSize: "16px",
          fontWeight: 600,
          color: "var(--text-primary)",
          textDecoration: "none",
        }}
      >
        Atomsized
      </Link>
      <Link
        href="/new"
        style={{
          padding: "6px 12px",
          background: "var(--accent)",
          color: "#000",
          textDecoration: "none",
          borderRadius: "6px",
          fontSize: "13px",
          fontWeight: 500,
        }}
      >
        New Document
      </Link>
    </nav>
  );
}
