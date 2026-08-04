import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { SectionEyebrow } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getWriteups, type WriteupCategory } from "@/lib/content/writeups";

export const metadata: Metadata = {
  title: "Writeups",
  description: "CTF write-ups published by CSeC members after every competition.",
};

const categories: (WriteupCategory | "all")[] = [
  "all",
  "web",
  "pwn",
  "crypto",
  "rev",
  "forensics",
  "osint",
  "misc",
];

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = (category ?? "all") as WriteupCategory | "all";
  const allWriteups = getWriteups();
  const filtered = active === "all" ? allWriteups : allWriteups.filter((w) => w.category === active);

  return (
    <>
      <section className="pb-12 pt-20">
        <Container>
          <SectionEyebrow>writeups</SectionEyebrow>
          <h1 className="max-w-2xl text-balance font-display text-display-xl font-medium text-fog-50">
            How the flags actually fell.
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-fog-500">
            Published after every CTF the club plays — technical, specific,
            and written by whoever solved it.
          </p>
        </Container>
      </section>

      <section className="border-t border-ink-700 py-4">
        <Container>
          <div className="flex flex-wrap gap-2 py-6">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={cat === "all" ? "/blog" : `/blog?category=${cat}`}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 font-mono text-[12px] transition-colors",
                  active === cat
                    ? "border-signal-500/50 bg-signal-500/10 text-signal-300"
                    : "border-ink-600 text-fog-500 hover:text-fog-100"
                )}
              >
                {cat}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-ink-700 py-12">
        <Container>
          {filtered.length === 0 ? (
            <p className="py-16 text-center text-[14px] text-fog-500">
              No write-ups in this category yet.
            </p>
          ) : (
            <div className="divide-y divide-ink-700 border-y border-ink-700">
              {filtered.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.03}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col items-start justify-between gap-3 py-6 sm:flex-row sm:items-center"
                  >
                    <div className="flex items-start gap-4 sm:items-center">
                      <Badge>{post.category}</Badge>
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
          )}
        </Container>
      </section>
    </>
  );
}
