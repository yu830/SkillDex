"use client";

import { useMemo, useState } from "react";

import { SearchBar } from "@/components/SearchBar";
import { SkillCard } from "@/components/SkillCard";
import { SkillFilter } from "@/components/SkillFilter";
import { getCategoryLabel, getLocalizedText } from "@/lib/skills";
import type { Locale, Skill, SkillCategoryId, SkillStatus, ToolScope } from "@/types/skill";

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
    search: "按名称、摘要、标签、作者或许可证搜索",
    count: "个匹配 Skills",
    empty: "没有 Skills 符合这些筛选条件。",
  },
};

export function SkillsExplorer({ locale, skills, categories, tags }: SkillsExplorerProps) {
  const [query, setQuery] = useState("");
  const [toolScope, setToolScope] = useState<ToolScope | "all">("all");
  const [categoryId, setCategoryId] = useState<SkillCategoryId | "all">("all");
  const [status, setStatus] = useState<SkillStatus | "all">("all");
  const [tag, setTag] = useState<string | "all">("all");

  const visibleSkills = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return skills.filter((skill) => {
      if (toolScope !== "all" && skill.toolScope !== toolScope) return false;
      if (categoryId !== "all" && skill.categoryId !== categoryId) return false;
      if (status !== "all" && skill.status !== status) return false;
      if (tag !== "all" && !skill.tags.includes(tag)) return false;
      if (!normalizedQuery) return true;

      const searchableText = [
        skill.name,
        getLocalizedText(skill.summary, locale),
        getLocalizedText(skill.description, locale),
        getCategoryLabel(skill.categoryId, locale),
        skill.toolScope,
        skill.source.author,
        skill.source.license,
        ...skill.tags,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [categoryId, locale, query, skills, status, tag, toolScope]);

  return (
    <section className="space-y-5">
      <SearchBar value={query} onChange={setQuery} placeholder={copy[locale].search} />
      <SkillFilter
        toolScope={toolScope}
        categoryId={categoryId}
        status={status}
        tag={tag}
        categories={categories.map((category) => ({ value: category, label: getCategoryLabel(category, locale) }))}
        tags={tags}
        onToolScopeChange={setToolScope}
        onCategoryChange={setCategoryId}
        onStatusChange={setStatus}
        onTagChange={setTag}
      />
      <p className="font-mono text-sm font-semibold text-stone-500">
        {visibleSkills.length} {copy[locale].count}
      </p>
      {visibleSkills.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleSkills.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-stone-400 bg-amber-50/80 p-8 text-center text-stone-600">{copy[locale].empty}</div>
      )}
    </section>
  );
}
