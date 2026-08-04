import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { resourceCategories } from "@/lib/content/resources";

const notes: Record<string, string> = {
  general: "Where every member starts — Linux, tooling, CTF fundamentals.",
  cryptography: "Breaking ciphers, RSA, and classical & modern crypto schemes.",
  "digital-forensics": "Memory dumps, disk images, and reconstructing what happened.",
  "reverse-engineering": "Disassembling binaries to understand what they actually do.",
  "binary-exploitation": "Memory corruption, stack & heap exploitation, pwn.",
  "web-exploitation": "Finding and chaining vulnerabilities in web applications.",
  cloud: "Misconfigurations and attack paths across cloud infrastructure.",
};

// Shorthand the way CTF scoreboards tag categories (crypto, rev, pwn, web…)
const codes: Record<string, string> = {
  general: "misc",
  cryptography: "crypto",
  "digital-forensics": "forensics",
  "reverse-engineering": "rev",
  "binary-exploitation": "pwn",
  "web-exploitation": "web",
  cloud: "cloud",
};

export function FocusAreas() {
  return (
    <section className="border-t border-ink-700 py-24">
      <div className="container">
        <SectionHeading
          eyebrow="focus_areas"
          title="Seven categories, one mindset"
          description="Every workshop and CTF at CSeC maps back to these disciplines — the same taxonomy we use to curate learning resources."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-xl2 border border-ink-600 bg-ink-600 sm:grid-cols-2 lg:grid-cols-4">
          {resourceCategories.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 0.04}>
              <a
                href="/resources"
                className="group flex h-full flex-col justify-between gap-8 bg-ink-900 p-6 transition-colors hover:bg-ink-800"
              >
                <span className="w-fit rounded-md border border-ink-600 bg-ink-800 px-2 py-1 font-mono text-[11px] text-fog-500">
                  {codes[cat.slug]}
                </span>
                <div>
                  <h3 className="font-display text-[17px] font-medium text-fog-50 transition-colors group-hover:text-signal-300">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-fog-500">
                    {notes[cat.slug]}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
