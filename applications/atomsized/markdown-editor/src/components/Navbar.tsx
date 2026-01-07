"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

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
          display: "flex",
          alignItems: "center",
          gap: "8px",
          textDecoration: "none",
          color: "var(--text-primary)",
        }}
      >
        <span
          style={{
            fontSize: "18px",
            fontWeight: 600,
            letterSpacing: "-0.5px",
          }}
        >
          Atomsized
        </span>
        <span
          style={{
            fontSize: "14px",
            color: "var(--text-muted)",
            fontWeight: 400,
          }}
        >
          / Markdown Editor
        </span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {!isHome && (
          <Link
            href="/"
            style={{
              fontSize: "14px",
              color: "var(--text-secondary)",
              textDecoration: "none",
            }}
          >
            Documents
          </Link>
        )}
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
          New
        </Link>
      </div>
    </nav>
  );
}
