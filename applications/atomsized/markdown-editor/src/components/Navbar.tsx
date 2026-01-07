import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        background: "#dc2626",
        padding: "12px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link
        href="/"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontSize: "18px",
          fontWeight: 600,
        }}
      >
        Markdown Editor
      </Link>
      <Link
        href="/new"
        style={{
          background: "#fff",
          color: "#dc2626",
          padding: "6px 14px",
          borderRadius: "6px",
          textDecoration: "none",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        New Document
      </Link>
    </nav>
  );
}
