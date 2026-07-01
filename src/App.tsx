import { useEffect, useMemo, useState } from 'react';
import { FilterBar } from './components/FilterBar';
import { ProjectCard } from './components/ProjectCard';
import { SearchBox } from './components/SearchBox';
import { SkillCard } from './components/SkillCard';
import rawProjects from './data/projects.json';
import rawSkills from './data/skills.json';
import type { FilterState, ProjectCardData, RiskLevel, SkillCardData } from './data/schema';
import {
  countActiveFilters,
  getSkillCategories,
  getProjectTools,
  getTags,
  getTools,
  projectMatchesFilters,
  skillMatchesFilters,
  uniqueSorted,
} from './lib/filters';
import { DEFAULT_FILTERS, parseFiltersFromSearch, serializeFiltersToSearch } from './lib/urlState';
import './App.css';

const skills = rawSkills as SkillCardData[];
const projects = rawProjects as ProjectCardData[];

const filterOptions = {
  categories: getSkillCategories(skills),
  tags: getTags(skills, projects),
  tools: uniqueSorted([...getTools(skills), ...getProjectTools(projects)]),
  risks: uniqueSorted(skills.map((skill) => skill.risk_level)) as RiskLevel[],
};

function App() {
  const [filters, setFilters] = useState<FilterState>(() =>
    parseFiltersFromSearch(typeof window === 'undefined' ? '' : window.location.search, filterOptions),
  );

  useEffect(() => {
    const nextSearch = serializeFiltersToSearch(filters);
    const nextUrl = `${window.location.pathname}${nextSearch}${window.location.hash}`;

    if (nextUrl !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
      window.history.replaceState(null, '', nextUrl);
    }
  }, [filters]);

  useEffect(() => {
    const restoreFromUrl = () => {
      setFilters(parseFiltersFromSearch(window.location.search, filterOptions));
    };

    window.addEventListener('popstate', restoreFromUrl);
    return () => window.removeEventListener('popstate', restoreFromUrl);
  }, []);

  const filteredSkills = useMemo(
    () => skills.filter((skill) => skillMatchesFilters(skill, filters)),
    [filters],
  );

  const filteredProjects = useMemo(
    () => projects.filter((project) => projectMatchesFilters(project, filters)),
    [filters],
  );

  const totalCards = skills.length + projects.length;
  const visibleCards = filteredSkills.length + filteredProjects.length;
  const activeFilterCount = countActiveFilters(filters);

  return (
    <main className="app-shell">
      <header className="hero">
        <nav className="top-nav" aria-label="Primary navigation">
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#safety">Safety</a>
        </nav>
        <div className="hero-grid">
          <section>
            <h1>SkillDex</h1>
            <p>
              A static, searchable index for AI coding skills, compatibility notes, risk levels, and
              portfolio-ready engineering projects.
            </p>
          </section>
          <aside className="stats-panel" aria-label="SkillDex dataset summary">
            <div>
              <strong>{skills.length}</strong>
              <span>Skill cards</span>
            </div>
            <div>
              <strong>{projects.length}</strong>
              <span>Project cards</span>
            </div>
            <div>
              <strong>{filterOptions.tags.length}</strong>
              <span>Tags</span>
            </div>
            <div>
              <strong>{visibleCards}</strong>
              <span>Visible now</span>
            </div>
          </aside>
        </div>
      </header>

      <section className="controls" aria-label="Search and filters">
        <SearchBox value={filters.query} onChange={(query) => setFilters({ ...filters, query })} />
        <FilterBar
          filters={filters}
          categories={filterOptions.categories}
          tags={filterOptions.tags}
          tools={filterOptions.tools}
          risks={filterOptions.risks}
          onChange={setFilters}
          onReset={() => setFilters(DEFAULT_FILTERS)}
        />
        <p className="result-note" aria-live="polite">
          Showing {visibleCards} of {totalCards} cards with {activeFilterCount} active filter
          {activeFilterCount === 1 ? '' : 's'}. Project cards match search and tag filters; category, risk, and
          compatible-tool filters hide project cards unless their project tools match the selected tool.
        </p>
      </section>

      {visibleCards === 0 ? (
        <section className="empty-state" aria-live="polite">
          <h2>No matching cards</h2>
          <p>
            Clear filters, remove one selected tag/tool, or shorten the search term. The URL will update when
            filters change, so the recovered state is shareable too.
          </p>
          <button className="reset-button" type="button" onClick={() => setFilters(DEFAULT_FILTERS)}>
            Clear all filters
          </button>
        </section>
      ) : null}

      <section id="skills" className="content-section">
        <div className="section-heading">
          <h2>AI Skills</h2>
          <p>Structured cards for workflow, testing, frontend, data, documentation, and deployment skills.</p>
        </div>
        <div className="card-grid">
          {filteredSkills.map((skill) => (
            <SkillCard skill={skill} key={skill.id} />
          ))}
        </div>
      </section>

      <section id="projects" className="content-section">
        <div className="section-heading">
          <h2>Portfolio Projects</h2>
          <p>Project entries stay conservative until repository, demo, or documentation links are confirmed.</p>
        </div>
        <div className="card-grid project-grid">
          {filteredProjects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </section>

      <section id="safety" className="safety-section">
        <h2>Safety and Scope</h2>
        <p>
          SkillDex indexes skills and projects only. It does not execute skills, store accounts, store API
          keys, provide user login, or claim official certification.
        </p>
      </section>
    </main>
  );
}

export default App;
