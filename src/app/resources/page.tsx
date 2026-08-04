import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionEyebrow } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { resourceCategories } from "@/lib/content/resources";

export const metadata: Metadata = {
  title: "Learning Resources",
  description: "A curated collection of introductory CTF resources, maintained by CSeC.",
};

export default function ResourcesPage() {
  return (
    <>
      <section className="pb-16 pt-20">
        <Container>
          <SectionEyebrow>resources</SectionEyebrow>
          <h1 className="max-w-2xl text-balance font-display text-display-xl font-medium text-fog-50">
            Everything we point new members to.
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-fog-500">
            A curated set of platforms, guides, and challenge sets — organized
            by category, the same way CTF challenges themselves are.
          </p>
        </Container>
      </section>

      <section className="border-t border-ink-700 py-16">
        <Container>
          <div className="space-y-14">
            {resourceCategories.map((cat) => (
              <Reveal key={cat.slug}>
                <div id={cat.slug} className="grid gap-6 lg:grid-cols-[220px_1fr]">
                  <h2 className="font-display text-xl font-medium text-fog-50">{cat.title}</h2>
                  <ul className="divide-y divide-ink-700 border-t border-ink-700">
                    {cat.links.map((link) => (
                      <li key={link.url} className="py-4">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3"
                        >
                          <span className="inline-flex shrink-0 items-center gap-1.5 font-medium text-fog-100 group-hover:text-signal-300">
                            {link.label}
                            <ExternalLink className="h-3 w-3 text-fog-700" />
                          </span>
                          <span className="text-[13.5px] text-fog-500">{link.description}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
