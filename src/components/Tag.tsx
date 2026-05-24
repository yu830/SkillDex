type TagProps = {
  children: React.ReactNode;
};

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center border border-[var(--line-soft)] bg-[rgba(255,255,255,0.28)] px-2.5 py-1 font-mono text-xs font-medium text-[var(--ink)]">
      {children}
    </span>
  );
}
