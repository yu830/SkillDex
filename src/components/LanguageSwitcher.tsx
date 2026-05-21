import Link from "next/link";

import type { Locale } from "@/types/skill";

type LanguageSwitcherProps = {
  locale: Locale;
  path: string;
};

export function LanguageSwitcher({ locale, path }: LanguageSwitcherProps) {
  const otherLocale = locale === "en" ? "zh" : "en";
  const label = otherLocale === "en" ? "English" : "中文";

  return (
    <Link
      href={`/${otherLocale}${path}`}
      className="rounded-full border border-stone-400 bg-amber-50/70 px-3 py-1.5 text-sm font-semibold text-stone-800 transition hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-700/30"
    >
      {label}
    </Link>
  );
}
