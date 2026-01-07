export function Footer() {
  return (
    <footer
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "12px 24px",
        borderTop: "1px solid var(--border)",
        background: "var(--bg-secondary)",
        marginTop: "auto",
      }}
    >
      <span
        style={{
          fontSize: "14px",
          color: "var(--text-muted)",
        }}
      >
        Built with ❤️ by Atomsized
      </span>
    </footer>
  );
}
