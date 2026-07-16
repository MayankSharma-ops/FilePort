export function AmbientBackground() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute -right-24 top-20 h-72 w-72 rounded-full border-[56px] border-signal/10" />
      <div className="absolute left-[7%] top-36 h-24 w-16 -rotate-12 border-2 border-foreground/10 bg-surface/70 shadow-[6px_6px_0_oklch(var(--foreground)/0.06)]" />
      <div className="absolute bottom-16 right-[14%] h-32 w-24 rotate-6 border-2 border-foreground/10 bg-surface/60" />
      <div className="absolute inset-x-0 top-0 h-px bg-foreground/10" />
    </div>
  );
}