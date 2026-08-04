import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Users, Flag, GraduationCap, BookOpen } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading, SectionEyebrow } from "@/components/shared/section-heading";
import { GridBackdrop } from "@/components/shared/grid-backdrop";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { foundingYear } from "@/lib/content/achievements";

export const metadata: Metadata = {
  title: "About",
  description:
    "CSeC is IIT Bombay's community of cyber security enthusiasts, running workshops, CTFs, and competing worldwide as IITBreachers.",
};

const pillars = [
  {
    icon: GraduationCap,
    title: "Teach",
    body: "Basics of Hacking, Hacking via CTFs, and Hardware Hacking sessions take members from zero to their first solve.",
  },
  {
    icon: Flag,
    title: "Compete",
    body: "TyroCTF for freshers, Advanced CTF for the rest — and BreachCTF, run publicly for the wider CTF community.",
  },
  {
    icon: BookOpen,
    title: "Document",
    body: "Every CTF ends with write-ups — the club's way of turning one team's solve into everyone's reference.",
  },
  {
    icon: Users,
    title: "Represent",
    body: "As IITBreachers, the team plays internationally on CTFtime and has placed 1st in India three times since 2021.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pb-20 pt-20">
        <GridBackdrop className="h-[420px]" />
        <Container className="relative">
          <SectionEyebrow>about</SectionEyebrow>
          <h1 className="max-w-3xl text-balance font-display text-display-xl font-medium text-fog-50">
            Cyber security, taught the way it&apos;s actually practiced.
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-[16px] leading-relaxed text-fog-500">
            CSeC IITB is IIT Bombay&apos;s community of cyber security
            practitioners and enthusiasts. We treat security less like a
            subject and more like a habit — built through hands-on
            workshops, real Capture The Flag competitions, and a lot of
            reading other people&apos;s write-ups. Founded in {foundingYear},
            the club now runs a full tenure of teaching and competing every
            year, on campus and on CTFtime.
          </p>
        </Container>
      </section>

      <section className="border-t border-ink-700 py-20">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <Card className="h-full p-6">
                  <p.icon className="h-5 w-5 text-signal-400" />
                  <h3 className="mt-5 font-display text-[16px] font-medium text-fog-50">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-fog-500">
                    {p.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-ink-700 py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionEyebrow>who it&apos;s for</SectionEyebrow>
            <h2 className="text-balance font-display text-display-lg font-medium text-fog-50">
              Whether you&apos;re seasoned or starting today, there&apos;s a
              seat at the table.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-fog-500">
              We believe cyber security is a way of life, not just a field of
              study. Members who join with zero background sit next to
              members who&apos;ve placed top-10 globally — because both are
              still solving challenges together every week.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/contact">
                  Join CSeC <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/team">Meet the team</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="p-8">
              <p className="font-mono text-[12px] uppercase tracking-wider text-fog-700">
                Formats members compete in
              </p>
              <ul className="mt-5 space-y-4">
                {[
                  ["Tyro CTF", "Beginner-friendly, team-based, run every fall."],
                  ["Advanced CTF", "Tournament-grade challenges for returning players."],
                  ["Basics of Hacking", "A guided intro session before members touch a CTF."],
                  ["Hardware Hacking", "Physical security — probing boards, dumping firmware."],
                ].map(([title, body]) => (
                  <li key={title} className="border-t border-ink-700 pt-4 first:border-none first:pt-0">
                    <p className="font-display text-[15px] font-medium text-fog-100">{title}</p>
                    <p className="mt-1 text-[13.5px] text-fog-500">{body}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
