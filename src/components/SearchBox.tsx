interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <label className="search-box">
      <span>Search</span>
      <input
        type="search"
        placeholder="Search names, summaries, tags, or tools"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
