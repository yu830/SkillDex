"use client";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-stone-500">Search</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-stone-300 bg-amber-50/70 px-4 py-3 text-sm text-stone-950 outline-none shadow-inner placeholder:text-stone-400 focus:border-stone-700 focus:ring-2 focus:ring-amber-700/30"
        type="search"
      />
    </label>
  );
}
