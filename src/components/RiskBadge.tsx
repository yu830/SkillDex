import type { RiskLevel } from '../data/schema';

interface RiskBadgeProps {
  level: RiskLevel;
}

export function RiskBadge({ level }: RiskBadgeProps) {
  return <span className={`risk-badge risk-badge--${level}`}>{level} risk</span>;
}
