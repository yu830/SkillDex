import type { ProjectCardData } from '../data/schema';

interface ProjectCardProps {
  project: ProjectCardData;
}

function linkOrPending(label: string, href: string) {
  return href ? (
    <a href={href} target="_blank" rel="noreferrer">
      {label}
    </a>
  ) : (
    <span className="pending-link">{label} TBD</span>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="card project-card">
      <div className="card-heading">
        <div>
          <p className="card-kicker">{project.status}</p>
          <h3>{project.name}</h3>
        </div>
      </div>
      <p>{project.summary}</p>
      <dl className="meta-list">
        <div>
          <dt>Status</dt>
          <dd>{project.status}</dd>
        </div>
        <div>
          <dt>Updated</dt>
          <dd>{project.updated_at}</dd>
        </div>
      </dl>
      <div className="tag-row">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="tool-row" aria-label={`${project.name} tools`}>
        {project.tools.map((tool) => (
          <span key={tool}>{tool}</span>
        ))}
      </div>
      <div className="link-row">
        {linkOrPending('Repo', project.links.repo)}
        {linkOrPending('Demo', project.links.demo)}
        {linkOrPending('Docs', project.links.docs)}
        {linkOrPending('Case study', project.links.caseStudy)}
      </div>
      <details className="project-details">
        <summary aria-label={`Show details for ${project.name}`}>Details</summary>
        <div className="detail-grid">
          <section>
            <h4>Evidence</h4>
            <ul>
              {project.evidence.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h4>Highlights</h4>
            <ul>
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </details>
    </article>
  );
}
