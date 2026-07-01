interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <label className="search-box">
      <span>Search</span>
      <input
        aria-describedby="search-help"
        type="search"
        placeholder="Search names, summaries, tags, or tools"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <small id="search-help">Search updates the shareable URL automatically.</small>
    </label>
  );
}
