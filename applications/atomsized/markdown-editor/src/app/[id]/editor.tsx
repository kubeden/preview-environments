"use client";

import { Document } from "@/db/schema";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface EditorProps {
  document: Document;
}

export function Editor({ document }: EditorProps) {
  const [content, setContent] = useState(document.content);
  const [title, setTitle] = useState(document.title);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const save = useCallback(
    async (newContent: string, newTitle: string) => {
      setSaving(true);
      try {
        await fetch(`/api/documents/${document.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: newContent, title: newTitle }),
        });
        setLastSaved(new Date());
      } catch (err) {
        console.error("Failed to save:", err);
      } finally {
        setSaving(false);
      }
    },
    [document.id]
  );

  const debouncedSave = useCallback(
    (newContent: string, newTitle: string) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(() => {
        save(newContent, newTitle);
      }, 1000);
    },
    [save]
  );

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const handleContentChange = (value: string | undefined) => {
    const newContent = value ?? "";
    setContent(newContent);
    debouncedSave(newContent, title);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    debouncedSave(content, newTitle);
  };

  return (
    <div
      style={{
        height: "calc(100vh - 49px)",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg-primary)",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "12px 20px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <Link
          href="/"
          style={{
            color: "var(--text-secondary)",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          ← Back
        </Link>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Untitled"
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: "16px",
            fontWeight: 500,
            color: "var(--text-primary)",
          }}
        />
        <span
          style={{
            fontSize: "12px",
            color: "var(--text-muted)",
          }}
        >
          {saving
            ? "Saving..."
            : lastSaved
              ? `Saved ${lastSaved.toLocaleTimeString()}`
              : ""}
        </span>
      </header>

      <div style={{ flex: 1, padding: "20px", overflow: "hidden" }}>
        <MDEditor
          value={content}
          onChange={handleContentChange}
          height="100%"
          preview="live"
          hideToolbar={false}
          data-color-mode="dark"
        />
      </div>
    </div>
  );
}
