import Link from "next/link";
import { ArrowUpRight, Flag, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { events } from "@/lib/content/events";

const upcoming = events.filter((e) => e.status === "upcoming");

export function EventsPreview() {
  return (
    <section className="border-t border-ink-700 py-24">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="events"
            title="Workshops and competitions, back to back"
            description="From your first `flag{...}` to onsite finals — the tenure runs on a rhythm of teaching and testing."
          />
          <Link
            href="/events"
            className="inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-signal-400 hover:text-signal-300"
          >
            All events <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {upcoming.map((event, i) => (
            <Reveal key={event.slug} delay={i * 0.08}>
              <Card className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-600 bg-ink-900 text-signal-400">
                    {event.kind === "ctf" ? (
                      <Flag className="h-4 w-4" />
                    ) : (
                      <GraduationCap className="h-4 w-4" />
                    )}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-fog-700">
                    {event.kind}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-medium text-fog-50">
                  {event.title}
                </h3>
                <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-fog-500">
                  {event.description}
                </p>
                <div className="mt-6 border-t border-ink-700 pt-4 font-mono text-[12px] text-fog-700">
                  {event.dateLabel}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
