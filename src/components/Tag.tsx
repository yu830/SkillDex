type TagProps = {
  children: React.ReactNode;
};

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-stone-300 bg-amber-50/70 px-2.5 py-1 text-xs font-medium text-stone-700 shadow-[0_1px_0_rgba(60,45,25,0.08)]">
      {children}
    </span>
  );
}
