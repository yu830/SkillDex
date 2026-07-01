import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ProjectCard } from '../src/components/ProjectCard';
import projects from '../src/data/projects.json';
import type { ProjectCardData } from '../src/data/schema';

const project = (projects as ProjectCardData[])[0];

describe('ProjectCard details', () => {
  it('renders a same-page details section with auditable project fields', () => {
    const html = renderToStaticMarkup(<ProjectCard project={project} />);

    expect(html).toContain('<details');
    expect(html).toContain(`aria-label="Show details for ${project.name}"`);
    expect(html).toContain('Evidence');
    expect(html).toContain('Highlights');
    expect(html).toContain('Repo TBD');
    expect(html).toContain(project.updated_at);
  });
});
