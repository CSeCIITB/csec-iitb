import { cn } from "@/lib/utils";

/**
 * The signature structural device: section labels rendered like a
 * source-code comment (`# about`), the way every write-up and README
 * in this community actually gets annotated. It's a deliberate
 * alternative to generic numbered eyebrows (01 / 02 / 03) since the
 * sections here aren't a sequence.
 */
export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-mono text-[13px] text-signal-400">
      <span className="text-fog-700">#</span> {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h2 className="text-balance font-display text-display-lg font-medium text-fog-50">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-balance text-[15px] leading-relaxed text-fog-500">
          {description}
        </p>
      )}
    </div>
  );
}
