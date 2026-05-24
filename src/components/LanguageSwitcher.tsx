import Link from "next/link";

import type { Locale } from "@/types/skill";

type LanguageSwitcherProps = {
  locale: Locale;
  path: string;
};

export function LanguageSwitcher({ locale, path }: LanguageSwitcherProps) {
  const otherLocale = locale === "en" ? "zh" : "en";
  const label = otherLocale === "en" ? "English" : "\u4e2d\u6587";

  return (
    <Link
      href={`/${otherLocale}${path}`}
      className="border border-[var(--line)] px-3 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--paper-soft)] focus:outline-none focus:ring-2 focus:ring-[rgba(23,21,17,0.22)]"
    >
      {label}
    </Link>
  );
}
