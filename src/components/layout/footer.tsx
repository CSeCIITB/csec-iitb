import Link from "next/link";
import { Github, MessageCircle, Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { primaryNav, socials, ctfdUrl, site } from "@/lib/constants";

const socialLinks = [
  { label: "GitHub", href: socials.github, icon: Github },
  { label: "Discord", href: socials.discord, icon: MessageCircle },
  { label: "Instagram", href: socials.instagram, icon: Instagram },
  { label: "LinkedIn", href: socials.linkedin, icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="relative border-t border-ink-700">
      <div className="container grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-fog-500">
            {site.description}
          </p>
          <div className="mt-6 flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-600 text-fog-500 transition-colors hover:border-signal-500/50 hover:text-signal-300"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-fog-700">Explore</p>
          <ul className="mt-4 space-y-3">
            {primaryNav.slice(0, 4).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[14px] text-fog-300 hover:text-fog-50">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-fog-700">Community</p>
          <ul className="mt-4 space-y-3">
            {primaryNav.slice(4).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[14px] text-fog-300 hover:text-fog-50">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-fog-700">Platform</p>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={ctfdUrl}
                className="inline-flex items-center gap-1 text-[14px] text-fog-300 hover:text-fog-50"
              >
                CTFd instance <ArrowUpRight className="h-3 w-3" />
              </a>
            </li>
            <li>
              <a
                href="https://ctftime.org/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[14px] text-fog-300 hover:text-fog-50"
              >
                CTFtime profile <ArrowUpRight className="h-3 w-3" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-700">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-[12.5px] text-fog-700 sm:flex-row">
          <p>© {new Date().getFullYear()} Cyber Security Community, IIT Bombay.</p>
          <p className="font-mono">est. 2017 · built by CSeC</p>
        </div>
      </div>
    </footer>
  );
}
