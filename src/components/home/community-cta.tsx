import Link from "next/link";
import { Github, MessageCircle, Instagram, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { GridBackdrop } from "@/components/shared/grid-backdrop";
import { Button } from "@/components/ui/button";
import { socials } from "@/lib/constants";

const links = [
  {
    label: "Discord",
    description: "Where the team plans, argues, and live-solves together.",
    href: socials.discord,
    icon: MessageCircle,
  },
  {
    label: "GitHub",
    description: "32+ repos of tooling, infra, and past challenge sources.",
    href: socials.github,
    icon: Github,
  },
  {
    label: "Instagram",
    description: "Event recaps, workshop photos, and announcements.",
    href: socials.instagram,
    icon: Instagram,
  },
];

export function CommunityCta() {
  return (
    <section className="relative overflow-hidden border-t border-ink-700 py-24">
      <GridBackdrop className="h-full" />
      <div className="container relative">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="mb-4 font-mono text-[13px] text-signal-400">
            <span className="text-fog-700">#</span> join_csec
          </p>
          <h2 className="text-balance font-display text-display-lg font-medium text-fog-50">
            No prior experience required. Just curiosity.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-fog-500">
            Most members start at TyroCTF with zero security background.
            Everything after that is workshops, write-ups, and reps.
          </p>
          <div className="mt-8 flex justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                Get in touch <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-3xl gap-5 sm:grid-cols-3">
          {links.map((link, i) => (
            <Reveal key={link.label} delay={i * 0.06}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col justify-between rounded-xl2 border border-ink-600 bg-ink-800/60 p-5 transition-colors hover:border-signal-500/40"
              >
                <div className="flex items-center justify-between">
                  <link.icon className="h-4 w-4 text-fog-500 transition-colors group-hover:text-signal-300" />
                  <ArrowUpRight className="h-3.5 w-3.5 text-fog-700 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-300" />
                </div>
                <div className="mt-6">
                  <p className="font-display text-[15px] font-medium text-fog-50">{link.label}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-fog-500">
                    {link.description}
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
