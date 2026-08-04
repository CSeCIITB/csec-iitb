import type { Metadata } from "next";
import { Github, MessageCircle, Instagram, MapPin, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionEyebrow } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/contact-form";
import { socials } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with CSeC — join the club, propose a collaboration, or say hello.",
};

const directLinks = [
  { label: "Discord — fastest response", href: socials.discord, icon: MessageCircle },
  { label: "Instagram", href: socials.instagram, icon: Instagram },
  { label: "GitHub", href: socials.github, icon: Github },
];

export default function ContactPage() {
  return (
    <section className="py-20">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <SectionEyebrow>contact</SectionEyebrow>
          <h1 className="text-balance font-display text-display-lg font-medium text-fog-50">
            Say hello.
          </h1>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-fog-500">
            Whether you want to join, collaborate on a CTF, or just ask a
            question — Discord is where the club actually lives, but the
            form works too.
          </p>

          <div className="mt-8 space-y-3">
            {directLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-xl2 border border-ink-600 bg-ink-800/60 px-5 py-4 transition-colors hover:border-signal-500/40"
              >
                <span className="flex items-center gap-3 text-[14px] text-fog-100">
                  <link.icon className="h-4 w-4 text-signal-400" />
                  {link.label}
                </span>
                <ArrowUpRight className="h-4 w-4 text-fog-700 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal-300" />
              </a>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-3 text-[13.5px] text-fog-500">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-fog-700" />
            <span>
              Lecture Hall Complex (LHC), IIT Bombay, Powai, Mumbai 400076
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="p-7 sm:p-8">
            <ContactForm />
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}
