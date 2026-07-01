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
  const update = (key: 'category' | 'risk', value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const toggleValue = (key: 'tags' | 'tools', value: string) => {
    const current = filters[key];
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value].sort((a, b) => a.localeCompare(b));

    onChange({ ...filters, [key]: next });
  };

  return (
    <section className="filter-bar" aria-label="SkillDex filters">
      <div className="select-row">
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
      </div>

      <fieldset className="multi-filter">
        <legend>Tags</legend>
        <div className="check-grid">
          {tags.map((tag) => (
            <label key={tag}>
              <input
                type="checkbox"
                checked={filters.tags.includes(tag)}
                onChange={() => toggleValue('tags', tag)}
              />
              <span>{tag}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="multi-filter">
        <legend>Compatible tools</legend>
        <div className="check-grid check-grid--tools">
          {tools.map((tool) => (
            <label key={tool}>
              <input
                type="checkbox"
                checked={filters.tools.includes(tool)}
                onChange={() => toggleValue('tools', tool)}
              />
              <span>{tool}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button className="reset-button" type="button" onClick={onReset}>
        Clear filters
      </button>
    </section>
  );
}
