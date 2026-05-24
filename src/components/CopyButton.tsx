"use client";

import { useState } from "react";

type CopyButtonProps = {
  text: string;
  label?: string;
};

export function CopyButton({ text, label = "Copy" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copyText() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      type="button"
      onClick={copyText}
      className="inline-flex items-center border border-[var(--line)] bg-[var(--ink)] px-3 py-2 text-xs font-medium text-[var(--paper)] transition hover:bg-[var(--clay)] hover:text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[rgba(23,21,17,0.22)]"
    >
      {copied ? "Copied" : label}
    </button>
  );
}
