"use client";

import { useMemo, useState } from "react";

import { SearchBar } from "@/components/SearchBar";
import { SkillCard } from "@/components/SkillCard";
import { SkillFilter } from "@/components/SkillFilter";
import { getCategoryLabel, getSkillSearchText } from "@/lib/skills";
import type { Locale, Skill, SkillCategoryId, SkillStatus, SourceType, ToolScope } from "@/types/skill";

type SkillsExplorerProps = {
  locale: Locale;
  skills: Skill[];
  categories: SkillCategoryId[];
  tags: string[];
};

const copy = {
  en: {
    search: "Search by name, summary, tag, author, or license",
    count: "matching skills",
    empty: "No Skills match those filters.",
  },
  zh: {
    search: "\u6309\u540d\u79f0\u3001\u6458\u8981\u3001\u6807\u7b7e\u3001\u4f5c\u8005\u6216\u8bb8\u53ef\u8bc1\u641c\u7d22",
    count: "\u4e2a\u5339\u914d Skills",
    empty: "\u6ca1\u6709 Skills \u7b26\u5408\u8fd9\u4e9b\u7b5b\u9009\u6761\u4ef6\u3002",
  },
};

export function SkillsExplorer({ locale, skills, categories, tags }: SkillsExplorerProps) {
  const [query, setQuery] = useState("");
  const [toolScope, setToolScope] = useState<ToolScope | "all">("all");
  const [sourceType, setSourceType] = useState<SourceType | "all">("all");
  const [categoryId, setCategoryId] = useState<SkillCategoryId | "all">("all");
  const [status, setStatus] = useState<SkillStatus | "all">("all");
  const [tag, setTag] = useState<string | "all">("all");

  const visibleSkills = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return skills.filter((skill) => {
      if (toolScope !== "all" && !skill.toolScopes.includes(toolScope)) return false;
      if (sourceType !== "all" && skill.sourceType !== sourceType) return false;
      if (categoryId !== "all" && skill.categoryId !== categoryId) return false;
      if (status !== "all" && skill.status !== status) return false;
      if (tag !== "all" && !skill.tags.includes(tag)) return false;
      if (!normalizedQuery) return true;

      const searchableText = getSkillSearchText(skill, locale);

      return searchableText.includes(normalizedQuery);
    });
  }, [categoryId, locale, query, skills, sourceType, status, tag, toolScope]);

  return (
    <section>
      <div className="border-b border-[var(--line)] px-5 py-7 sm:px-8">
        <SearchBar value={query} onChange={setQuery} placeholder={copy[locale].search} />
      </div>
      <SkillFilter
        toolScope={toolScope}
        sourceType={sourceType}
        categoryId={categoryId}
        status={status}
        tag={tag}
        categories={categories.map((category) => ({ value: category, label: getCategoryLabel(category, locale) }))}
        tags={tags}
        onToolScopeChange={setToolScope}
        onSourceTypeChange={setSourceType}
        onCategoryChange={setCategoryId}
        onStatusChange={setStatus}
        onTagChange={setTag}
      />
      <p className="border-b border-[var(--line)] px-5 py-4 font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--muted-ink)] sm:px-8">
        {visibleSkills.length} {copy[locale].count}
      </p>
      {visibleSkills.length > 0 ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3">
          {visibleSkills.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="border-b border-[var(--line)] px-5 py-10 text-center text-[var(--muted-ink)] sm:px-8">{copy[locale].empty}</div>
      )}
    </section>
  );
}
