import { useMemo, useState } from 'react';
import { FilterBar } from './components/FilterBar';
import { ProjectCard } from './components/ProjectCard';
import { SearchBox } from './components/SearchBox';
import { SkillCard } from './components/SkillCard';
import rawProjects from './data/projects.json';
import rawSkills from './data/skills.json';
import type { FilterState, ProjectCardData, RiskLevel, SkillCardData } from './data/schema';
import {
  ALL_VALUE,
  getSkillCategories,
  getTags,
  getTools,
  projectMatchesFilters,
  skillMatchesFilters,
  uniqueSorted,
} from './lib/filters';
import './App.css';

const skills = rawSkills as SkillCardData[];
const projects = rawProjects as ProjectCardData[];

const initialFilters: FilterState = {
  query: '',
  category: ALL_VALUE,
  tag: ALL_VALUE,
  risk: ALL_VALUE,
  tool: ALL_VALUE,
};

function App() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const categories = useMemo(() => getSkillCategories(skills), []);
  const tags = useMemo(() => getTags(skills, projects), []);
  const tools = useMemo(() => getTools(skills), []);
  const risks = useMemo(() => uniqueSorted(skills.map((skill) => skill.risk_level)) as RiskLevel[], []);

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
              <strong>{tags.length}</strong>
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
          categories={categories}
          tags={tags}
          tools={tools}
          risks={risks}
          onChange={setFilters}
          onReset={() => setFilters(initialFilters)}
        />
        <p className="result-note">
          Showing {visibleCards} of {totalCards} cards. Project cards appear when category, risk, and tool
          filters are set to all.
        </p>
      </section>

      {visibleCards === 0 ? (
        <section className="empty-state" aria-live="polite">
          <h2>No matching cards</h2>
          <p>Try clearing one filter or searching by a broader tool, tag, or workflow term.</p>
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
