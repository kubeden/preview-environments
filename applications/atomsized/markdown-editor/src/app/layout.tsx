import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Markdown Editor",
  description: "A minimal markdown editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
