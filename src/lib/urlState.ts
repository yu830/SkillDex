import type { FilterState } from '../data/schema';
import { ALL_VALUE } from './filters';

interface FilterOptions {
  categories: string[];
  risks: string[];
  tags: string[];
  tools: string[];
}

const QUERY_PARAM = 'query';
const CATEGORY_PARAM = 'category';
const RISK_PARAM = 'risk';
const TAG_PARAM = 'tags';
const TOOL_PARAM = 'tools';

export const DEFAULT_FILTERS: FilterState = {
  query: '',
  category: ALL_VALUE,
  risk: ALL_VALUE,
  tags: [],
  tools: [],
};

function firstAllowed(value: string | null, allowed: string[]): string {
  return value && allowed.includes(value) ? value : ALL_VALUE;
}

function allowedList(values: string[], allowed: string[]): string[] {
  const allowedSet = new Set(allowed);
  return Array.from(new Set(values.filter((value) => allowedSet.has(value))));
}

export function parseFiltersFromSearch(search: string, options: FilterOptions): FilterState {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);

  return {
    query: params.get(QUERY_PARAM)?.trim() ?? '',
    category: firstAllowed(params.get(CATEGORY_PARAM), options.categories),
    risk: firstAllowed(params.get(RISK_PARAM), options.risks),
    tags: allowedList(params.getAll(TAG_PARAM), options.tags),
    tools: allowedList(params.getAll(TOOL_PARAM), options.tools),
  };
}

export function serializeFiltersToSearch(filters: FilterState): string {
  const params = new URLSearchParams();
  const query = filters.query.trim();

  if (query) {
    params.set(QUERY_PARAM, query);
  }

  if (filters.category !== ALL_VALUE) {
    params.set(CATEGORY_PARAM, filters.category);
  }

  if (filters.risk !== ALL_VALUE) {
    params.set(RISK_PARAM, filters.risk);
  }

  filters.tags.forEach((tag) => params.append(TAG_PARAM, tag));
  filters.tools.forEach((tool) => params.append(TOOL_PARAM, tool));

  const serialized = params.toString();
  return serialized ? `?${serialized}` : '';
}
