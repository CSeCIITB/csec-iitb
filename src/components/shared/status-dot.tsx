import { cn } from "@/lib/utils";

const toneClasses = {
  live: "bg-pulse-500",
  solved: "bg-solved",
  idle: "bg-fog-700",
  signal: "bg-signal-400",
} as const;

export function StatusDot({
  tone = "idle",
  pulse = false,
  className,
}: {
  tone?: keyof typeof toneClasses;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("relative inline-flex h-2 w-2", className)}>
      {pulse && (
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
            toneClasses[tone]
          )}
        />
      )}
      <span
        className={cn(
          "relative inline-flex h-2 w-2 rounded-full",
          toneClasses[tone]
        )}
      />
    </span>
  );
}
