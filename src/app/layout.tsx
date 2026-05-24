import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillDex",
  description: "Personal AI Skills Hub for browsing reference-only Claude Code and Codex Skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-paper text-ink">{children}</body>
    </html>
  );
}
