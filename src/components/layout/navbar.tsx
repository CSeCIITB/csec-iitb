"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { StatusDot } from "@/components/shared/status-dot";
import { primaryNav, ctfdUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Reset the mobile menu when the route actually changes (e.g. browser
  // back/forward) — adjusted during render per React's guidance, rather
  // than via a setState-in-effect, which reacts one render late.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-cyan-500/20 bg-ink-950/85 backdrop-blur-lg shadow-[0_1px_12px_rgba(0,207,255,0.1)]"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" aria-label="CSeC home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-[13.5px] font-medium text-fog-500 transition-colors hover:text-fog-50",
                  active && "text-fog-50"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={ctfdUrl}
            className="flex items-center gap-2 rounded-full border border-ink-500 px-3.5 py-2 text-[13px] font-medium text-fog-300 transition-colors hover:border-signal-500/50 hover:text-fog-50"
          >
            <StatusDot tone="live" pulse />
            Weekly Challenges
          </Link>
          <Button size="sm" asChild>
            <Link href="/contact">
              Join CSeC <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center text-fog-100 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-cyan-500/20 bg-ink-900/95 backdrop-blur-xl lg:hidden shadow-[inset_0_1px_12px_rgba(0,207,255,0.05)]">
          <nav className="container flex flex-col py-4">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group relative border-b border-ink-700/50 py-4 text-[15px] font-medium text-fog-100 last:border-none hover:text-cyan-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2.5">
              <Button variant="secondary" asChild>
                <Link href={ctfdUrl}>Weekly Challenges</Link>
              </Button>
              <Button asChild>
                <Link href="/contact">Join CSeC</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
