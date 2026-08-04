import type { Metadata } from "next";
import { Flag, GraduationCap, ExternalLink } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionEyebrow, SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { events } from "@/lib/content/events";
import { achievements } from "@/lib/content/achievements";

export const metadata: Metadata = {
  title: "Events & Workshops",
  description:
    "CSeC's workshops and competitions — plus the club's full competitive record.",
};

const workshops = events.filter((e) => e.kind === "workshop");
const competitions = events.filter((e) => e.kind === "ctf");

const byYear = achievements.reduce<Record<number, typeof achievements>>((acc, a) => {
  (acc[a.year] ??= []).push(a);
  return acc;
}, {});
const years = Object.keys(byYear).map(Number).sort((a, b) => b - a);

// A genuine sequence — the order a new member actually moves through,
// so numbered steps encode real information here.
const steps = [
  { step: "01", title: "Show up", body: "No sign-up, no background needed. Sessions run in LHC and are open to the whole institute." },
  { step: "02", title: "Follow along live", body: "Every workshop is hands-on — you're solving alongside the person presenting, not just watching slides." },
  { step: "03", title: "Take the challenge set home", body: "Each session ends with practice challenges so the concepts stick before the next CTF." },
];

function EventCard({ event }: { event: (typeof events)[number] }) {
  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-600 bg-ink-900 text-signal-400">
          {event.kind === "ctf" ? <Flag className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
        </span>
        <Badge variant={event.status === "upcoming" ? "signal" : "default"}>
          {event.status}
        </Badge>
      </div>
      <h3 className="mt-5 font-display text-lg font-medium text-fog-50">{event.title}</h3>
      <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-fog-500">{event.description}</p>
      <div className="mt-6 flex items-center justify-between border-t border-ink-700 pt-4 font-mono text-[12px] text-fog-700">
        <span>{event.dateLabel}</span>
        {event.location && <span>{event.location}</span>}
      </div>
    </Card>
  );
}

export default function EventsPage() {
  return (
    <>
      <section className="pb-16 pt-20">
        <Container>
          <SectionEyebrow>events &amp; workshops</SectionEyebrow>
          <h1 className="max-w-2xl text-balance font-display text-display-xl font-medium text-fog-50">
            The tenure&apos;s calendar.
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-fog-500">
            Hands-on sessions that take members from zero to their first
            flag, and the competitions where the club puts that training
            to the test.
          </p>
        </Container>
      </section>

      {/* Workshops */}
      <section id="workshops" className="border-t border-ink-700 py-20">
        <Container>
          <SectionHeading
            eyebrow="workshops"
            title="Learn by doing, in the room"
            description="CSeC's workshops exist for one reason: to turn “I don't know where to start” into a first flag captured, in under two hours."
          />

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((s) => (
              <Reveal key={s.step}>
                <p className="font-mono text-[13px] text-signal-400">{s.step}</p>
                <h3 className="mt-3 font-display text-[17px] font-medium text-fog-50">{s.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-fog-500">{s.body}</p>
              </Reveal>
            ))}
          </div>

          <p className="mt-16 font-mono text-[12px] uppercase tracking-wider text-fog-700">
            Current &amp; past sessions
          </p>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {workshops.map((w, i) => (
              <Reveal key={w.slug} delay={i * 0.06}>
                <Card className="flex items-start gap-5 p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-ink-600 bg-ink-900 text-signal-400">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-[16px] font-medium text-fog-50">{w.title}</h3>
                      <span className="font-mono text-[11px] text-fog-700">· {w.dateLabel}</span>
                    </div>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-fog-500">{w.description}</p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Competitions */}
      <section id="competitions" className="border-t border-ink-700 py-20">
        <Container>
          <SectionHeading
            eyebrow="competitions"
            title="Where the training gets tested"
            description="From TyroCTF's beginner bracket to IITBreachers competing worldwide on CTFtime."
          />

          <p className="mt-12 font-mono text-[12px] uppercase tracking-wider text-fog-700">Upcoming</p>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {competitions.filter((e) => e.status === "upcoming").map((event, i) => (
              <Reveal key={event.slug} delay={i * 0.06}>
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>

          <p className="mt-14 font-mono text-[12px] uppercase tracking-wider text-fog-700">Past</p>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {competitions.filter((e) => e.status === "past").map((event, i) => (
              <Reveal key={event.slug} delay={i * 0.06}>
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Achievements */}
      <section id="achievements" className="border-t border-ink-700 py-20">
        <Container>
          <SectionHeading
            eyebrow="achievements"
            title="The competitive record"
            description="Every ranked result IITBreachers has posted on CTFtime since 2021."
          />

          <div className="mt-12 space-y-10">
            {years.map((year) => (
              <Reveal key={year}>
                <div className="grid gap-4 sm:grid-cols-[80px_1fr]">
                  <p className="font-display text-2xl font-medium text-fog-700">{year}</p>
                  <ul className="space-y-3 border-l border-ink-700 pl-6">
                    {byYear[year]?.map((a) => (
                      <li key={a.event} className="flex flex-wrap items-baseline gap-x-3">
                        <span
                          className={
                            a.highlight
                              ? "font-mono text-[13px] text-signal-300"
                              : "font-mono text-[13px] text-fog-500"
                          }
                        >
                          {a.rank}
                        </span>
                        <a
                          href={a.ctftimeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[14px] text-fog-100 hover:text-signal-300"
                        >
                          {a.event} <ExternalLink className="h-3 w-3 text-fog-700" />
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
