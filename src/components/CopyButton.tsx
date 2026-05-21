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
      className="inline-flex items-center rounded-full border border-stone-800 bg-stone-950 px-3 py-1.5 text-xs font-semibold text-amber-50 transition hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-offset-2 focus:ring-offset-amber-50"
    >
      {copied ? "Copied" : label}
    </button>
  );
}
