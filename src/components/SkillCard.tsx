import type { SkillCardData } from '../data/schema';
import { RiskBadge } from './RiskBadge';

interface SkillCardProps {
  skill: SkillCardData;
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <article className="card skill-card">
      <div className="card-heading">
        <div>
          <p className="card-kicker">{skill.category}</p>
          <h3>{skill.name}</h3>
        </div>
        <RiskBadge level={skill.risk_level} />
      </div>
      <p>{skill.summary}</p>
      <dl className="meta-list">
        <div>
          <dt>Tools</dt>
          <dd>{skill.tools.join(', ')}</dd>
        </div>
        <div>
          <dt>License</dt>
          <dd>{skill.license}</dd>
        </div>
      </dl>
      <div className="tag-row">
        {skill.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <ul className="safety-list">
        {skill.safety_notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {skill.repo ? (
        <a href={skill.repo} target="_blank" rel="noreferrer">
          Repository
        </a>
      ) : (
        <span className="pending-link">Repository pending</span>
      )}
    </article>
  );
}
