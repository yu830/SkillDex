import { describe, expect, it } from 'vitest';
import { ALL_VALUE } from '../src/lib/filters';
import { DEFAULT_FILTERS, parseFiltersFromSearch, serializeFiltersToSearch } from '../src/lib/urlState';

const options = {
  categories: ['testing', 'workflow'],
  risks: ['low', 'medium', 'high'],
  tags: ['regression', 'testing', 'workflow'],
  tools: ['Claude Code', 'Codex', 'GitHub'],
};

describe('URL filter state', () => {
  it('parses query params into filter state', () => {
    const filters = parseFiltersFromSearch(
      '?query=review&category=testing&risk=medium&tags=testing&tags=regression&tools=Codex&tools=Claude+Code',
      options,
    );

    expect(filters).toEqual({
      query: 'review',
      category: 'testing',
      risk: 'medium',
      tags: ['testing', 'regression'],
      tools: ['Codex', 'Claude Code'],
    });
  });

  it('drops unknown query params and invalid filter values', () => {
    const filters = parseFiltersFromSearch(
      '?query=&category=unknown&risk=urgent&tags=missing&tags=workflow&tools=Other&tools=GitHub',
      options,
    );

    expect(filters).toEqual({
      query: '',
      category: ALL_VALUE,
      risk: ALL_VALUE,
      tags: ['workflow'],
      tools: ['GitHub'],
    });
  });

  it('deduplicates repeated valid values while preserving first-seen order', () => {
    const filters = parseFiltersFromSearch(
      '?tags=workflow&tags=workflow&tags=testing&tools=Codex&tools=Codex&tools=GitHub',
      options,
    );

    expect(filters.tags).toEqual(['workflow', 'testing']);
    expect(filters.tools).toEqual(['Codex', 'GitHub']);
  });

  it('serializes only active filters to a shareable query string', () => {
    const search = serializeFiltersToSearch({
      query: 'scope',
      category: 'workflow',
      risk: ALL_VALUE,
      tags: ['workflow', 'testing'],
      tools: ['Codex'],
    });

    expect(search).toBe('?query=scope&category=workflow&tags=workflow&tags=testing&tools=Codex');
  });

  it('serializes defaults to an empty query string', () => {
    expect(serializeFiltersToSearch(DEFAULT_FILTERS)).toBe('');
  });

  it('round trips parsed and serialized filters', () => {
    const firstParse = parseFiltersFromSearch(
      '?query=scope%20control&category=workflow&tags=workflow&tags=testing&tools=Codex&tools=Claude+Code',
      options,
    );
    const serialized = serializeFiltersToSearch(firstParse);
    const secondParse = parseFiltersFromSearch(serialized, options);

    expect(secondParse).toEqual(firstParse);
  });
});
