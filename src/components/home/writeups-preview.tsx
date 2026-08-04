import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { getWriteups } from "@/lib/content/writeups";

export function WriteupsPreview() {
  const allWriteups = getWriteups();
  const recent = allWriteups.slice(0, 4);
  return (
    <section className="border-t border-ink-700 py-24">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="writeups"
            title="Notes from the last solve"
            description="After every CTF, the team documents how the hard challenges actually fell — for the next player who hits the same wall."
          />
          <Link
            href="/blog"
            className="inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-signal-400 hover:text-signal-300"
          >
            All write-ups <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-12 divide-y divide-ink-700 border-y border-ink-700">
          {recent.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col items-start justify-between gap-3 py-6 sm:flex-row sm:items-center"
              >
                <div className="flex items-start gap-4 sm:items-center">
                  <Badge variant="default">{post.category}</Badge>
                  <div>
                    <h3 className="font-display text-[16px] font-medium text-fog-100 transition-colors group-hover:text-signal-300">
                      {post.title}
                    </h3>
                    <p className="mt-1 text-[13px] text-fog-500">{post.excerpt}</p>
                  </div>
                </div>
                <span className="shrink-0 font-mono text-[12px] text-fog-700">
                  {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
