import type { Evidence, LocalizedText, ToolScope } from "./skill";

export interface ProjectEvidenceRecord {
  slug: string;
  name: string;
  summary: LocalizedText;
  problem: LocalizedText[];
  approach: LocalizedText[];
  highlights: LocalizedText[];
  nextSteps: LocalizedText[];
  tags: string[];
  toolScopes: ToolScope[];
  evidence: Evidence;
  updatedAt: string;
}
