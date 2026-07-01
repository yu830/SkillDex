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
      <div className="tag-row">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="link-row">
        {linkOrPending('Repo', project.repo)}
        {linkOrPending('Demo', project.demo)}
        {linkOrPending('Docs', project.docs)}
      </div>
    </article>
  );
}
