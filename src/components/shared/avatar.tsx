import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export function Avatar({
  name,
  src,
  size = 56,
  className,
}: {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        className={cn("h-full w-full object-cover object-center", className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-ink-900",
        className
      )}
      title={`${name} — photo coming soon`}
    >
      {/* Diagonal grid lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.07]"
        aria-hidden
      >
        <defs>
          <pattern id={`grid-${name.replace(/\s/g, "-")}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#5E9BFF" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${name.replace(/\s/g, "-")})`} />
      </svg>

      {/* Initials */}
      <span className="relative z-10 font-display text-[40px] font-bold text-ink-600 select-none">
        {initials(name)}
      </span>

      {/* Bottom bar */}
      <div className="absolute inset-x-0 bottom-0 border-t border-signal-500/10 bg-ink-950/80 px-3 py-2 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-signal-500/60">
            ID PENDING
          </span>
          <div className="flex gap-1">
            <div className="h-1 w-1 rounded-full bg-signal-500/40" />
            <div className="h-1 w-1 rounded-full bg-signal-500/30" />
            <div className="h-1 w-1 rounded-full bg-signal-500/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
