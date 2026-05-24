"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <label className="block">
      <span className="mb-3 block font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--muted-ink)]">Search</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--muted-ink)] focus:ring-2 focus:ring-[rgba(23,21,17,0.22)]"
        type="search"
      />
    </label>
  );
}
