"use client";

import type { SkillCategoryId, SkillStatus, ToolScope } from "@/types/skill";

type Option<T extends string> = {
  value: T;
  label: string;
};

type SkillFilterProps = {
  toolScope: ToolScope | "all";
  categoryId: SkillCategoryId | "all";
  status: SkillStatus | "all";
  tag: string | "all";
  categories: Option<SkillCategoryId>[];
  tags: string[];
  onToolScopeChange: (value: ToolScope | "all") => void;
  onCategoryChange: (value: SkillCategoryId | "all") => void;
  onStatusChange: (value: SkillStatus | "all") => void;
  onTagChange: (value: string | "all") => void;
};

const toolScopes: Option<ToolScope | "all">[] = [
  { value: "all", label: "All tools" },
  { value: "claude-code", label: "Claude Code" },
  { value: "codex", label: "Codex" },
];

const statuses: Option<SkillStatus | "all">[] = [
  { value: "all", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "experimental", label: "Experimental" },
  { value: "archived", label: "Archived" },
];

export function SkillFilter({
  toolScope,
  categoryId,
  status,
  tag,
  categories,
  tags,
  onToolScopeChange,
  onCategoryChange,
  onStatusChange,
  onTagChange,
}: SkillFilterProps) {
  return (
    <div className="grid gap-3 rounded-3xl border border-stone-300 bg-[#f8edcf]/80 p-4 shadow-sm md:grid-cols-4">
      <Select label="Tool" value={toolScope} options={toolScopes} onChange={onToolScopeChange} />
      <Select
        label="Category"
        value={categoryId}
        options={[{ value: "all", label: "All categories" }, ...categories]}
        onChange={onCategoryChange}
      />
      <Select label="Status" value={status} options={statuses} onChange={onStatusChange} />
      <Select
        label="Tag"
        value={tag}
        options={[{ value: "all", label: "All tags" }, ...tags.map((item) => ({ value: item, label: item }))]}
        onChange={onTagChange}
      />
    </div>
  );
}

type SelectProps<T extends string> = {
  label: string;
  value: T;
  options: Option<T>[];
  onChange: (value: T) => void;
};

function Select<T extends string>({ label, value, options, onChange }: SelectProps<T>) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-stone-500">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="w-full rounded-2xl border border-stone-300 bg-amber-50 px-3 py-2.5 text-sm font-medium text-stone-900 outline-none focus:border-stone-700 focus:ring-2 focus:ring-amber-700/30"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
