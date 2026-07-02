import type { Evidence, LocalizedText, ToolScope } from "./skill";

export interface ProjectEvidenceRecord {
  slug: string;
  name: string;
  summary: LocalizedText;
  highlights: LocalizedText[];
  tags: string[];
  toolScopes: ToolScope[];
  evidence: Evidence;
  updatedAt: string;
}
