import type { SkillStatus } from "@/types/skill";

const styles: Record<SkillStatus, string> = {
  active: "border-emerald-700/30 bg-emerald-100 text-emerald-900",
  draft: "border-stone-500/30 bg-stone-100 text-stone-800",
  experimental: "border-amber-700/30 bg-amber-100 text-amber-900",
  archived: "border-slate-500/30 bg-slate-100 text-slate-700",
};

type StatusBadgeProps = {
  status: SkillStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${styles[status]}`}>
      {status}
    </span>
  );
}
