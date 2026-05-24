import type { SkillStatus } from "@/types/skill";

const styles: Record<SkillStatus, string> = {
  active: "border-[#3f6239] bg-[rgba(63,98,57,0.2)] text-[#213f1f]",
  draft: "border-[#8b4239] bg-[rgba(139,66,57,0.2)] text-[#5f2722]",
  experimental: "border-[#8b4239] bg-[rgba(139,66,57,0.2)] text-[#5f2722]",
  archived: "border-[#8b4239] bg-[rgba(139,66,57,0.2)] text-[#5f2722]",
};

type StatusBadgeProps = {
  status: SkillStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex border px-2.5 py-1 font-mono text-xs font-medium uppercase tracking-[0.1em] ${styles[status]}`}>
      {status}
    </span>
  );
}
