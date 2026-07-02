import type { Evidence, EvidenceArtifact, EvidenceArtifactKind, EvidenceStatus } from "#types/skill";

export const EVIDENCE_STATUSES: EvidenceStatus[] = ["implemented", "prototype", "planned", "research"];

export const EVIDENCE_ARTIFACT_KINDS: EvidenceArtifactKind[] = ["repo", "demo", "doc", "case-study", "workflow", "benchmark", "note"];

export function isEvidenceStatus(value: unknown): value is EvidenceStatus {
  return typeof value === "string" && EVIDENCE_STATUSES.includes(value as EvidenceStatus);
}

export function isEvidenceArtifactKind(value: unknown): value is EvidenceArtifactKind {
  return typeof value === "string" && EVIDENCE_ARTIFACT_KINDS.includes(value as EvidenceArtifactKind);
}

export function isEvidenceArtifact(value: unknown): value is EvidenceArtifact {
  if (!value || typeof value !== "object") return false;
  const artifact = value as Partial<EvidenceArtifact>;

  return (
    typeof artifact.label === "string" &&
    artifact.label.length > 0 &&
    isEvidenceArtifactKind(artifact.kind) &&
    (artifact.href === undefined || typeof artifact.href === "string") &&
    (artifact.summary === undefined || typeof artifact.summary === "string")
  );
}

export function isEvidence(value: unknown): value is Evidence {
  if (!value || typeof value !== "object") return false;
  const evidence = value as Partial<Evidence>;

  return (
    isEvidenceStatus(evidence.status) &&
    (evidence.lastVerified === undefined || /^\d{4}-\d{2}-\d{2}$/.test(evidence.lastVerified)) &&
    (evidence.artifacts === undefined || (Array.isArray(evidence.artifacts) && evidence.artifacts.every(isEvidenceArtifact)))
  );
}
