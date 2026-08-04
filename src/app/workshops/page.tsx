import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionEyebrow, SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { events } from "@/lib/content/events";

export const metadata: Metadata = {
  title: "Workshops",
  description: "Hands-on sessions CSeC runs to take members from zero to their first CTF solve.",
};

const workshops = events.filter((e) => e.kind === "workshop");

// A genuine sequence — this is the order a new member actually moves
// through, so numbered steps encode real information here.
const steps = [
  { step: "01", title: "Show up", body: "No sign-up, no background needed. Sessions run in LHC and are open to the whole institute." },
  { step: "02", title: "Follow along live", body: "Every workshop is hands-on — you're solving alongside the person presenting, not just watching slides." },
  { step: "03", title: "Take the challenge set home", body: "Each session ends with practice challenges so the concepts stick before the next CTF." },
];

export default function WorkshopsPage() {
  return (
    <>
      <section className="pb-16 pt-20">
        <Container>
          <SectionEyebrow>workshops</SectionEyebrow>
          <h1 className="max-w-2xl text-balance font-display text-display-xl font-medium text-fog-50">
            Learn by doing, in the room.
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-fog-500">
            CSeC&apos;s workshops exist for one reason: to turn &quot;I don&apos;t
            know where to start&quot; into a first flag captured, in under
            two hours.
          </p>
        </Container>
      </section>

      <section className="border-t border-ink-700 py-16">
        <Container>
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((s) => (
              <Reveal key={s.step}>
                <p className="font-mono text-[13px] text-signal-400">{s.step}</p>
                <h3 className="mt-3 font-display text-[17px] font-medium text-fog-50">{s.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-fog-500">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-ink-700 py-20">
        <Container>
          <SectionHeading eyebrow="lineup" title="Current & past sessions" />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
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

          <Reveal className="mt-12">
            <Card className="flex flex-col items-start justify-between gap-4 p-7 sm:flex-row sm:items-center">
              <p className="max-w-md text-[14px] text-fog-300">
                Can&apos;t make it in person? Everything covered in a workshop
                also lives in our curated resources.
              </p>
              <Button variant="secondary" asChild>
                <Link href="/resources">
                  Browse resources <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
