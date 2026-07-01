import type { FilterState } from '../data/schema';
import { ALL_VALUE } from '../lib/filters';

interface FilterBarProps {
  filters: FilterState;
  categories: string[];
  tags: string[];
  tools: string[];
  risks: string[];
  onChange: (nextFilters: FilterState) => void;
  onReset: () => void;
}

function titleCase(value: string): string {
  return value.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function FilterBar({ filters, categories, tags, tools, risks, onChange, onReset }: FilterBarProps) {
  const update = (key: keyof FilterState, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <section className="filter-bar" aria-label="SkillDex filters">
      <label>
        <span>Category</span>
        <select value={filters.category} onChange={(event) => update('category', event.target.value)}>
          <option value={ALL_VALUE}>All categories</option>
          {categories.map((category) => (
            <option value={category} key={category}>
              {titleCase(category)}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Tag</span>
        <select value={filters.tag} onChange={(event) => update('tag', event.target.value)}>
          <option value={ALL_VALUE}>All tags</option>
          {tags.map((tag) => (
            <option value={tag} key={tag}>
              {tag}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Risk</span>
        <select value={filters.risk} onChange={(event) => update('risk', event.target.value)}>
          <option value={ALL_VALUE}>All risk levels</option>
          {risks.map((risk) => (
            <option value={risk} key={risk}>
              {titleCase(risk)}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Compatible tool</span>
        <select value={filters.tool} onChange={(event) => update('tool', event.target.value)}>
          <option value={ALL_VALUE}>All tools</option>
          {tools.map((tool) => (
            <option value={tool} key={tool}>
              {tool}
            </option>
          ))}
        </select>
      </label>

      <button className="reset-button" type="button" onClick={onReset}>
        Reset
      </button>
    </section>
  );
}
