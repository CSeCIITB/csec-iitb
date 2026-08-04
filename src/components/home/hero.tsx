"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DecryptText } from "@/components/shared/decrypt-text";
import { StatusDot } from "@/components/shared/status-dot";
import { LogoMark } from "@/components/shared/logo";
import { foundingYear, ctfTeamName } from "@/lib/content/achievements";
import { ctfdUrl, site } from "@/lib/constants";

// ── Main Hero ─────────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-16 sm:pt-20">
      {/* Global canvas handles background */}

      {/* Grid + radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid"
        style={{
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[50vh]"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,207,255,0.07) 0%, rgba(59,127,255,0.08) 40%, transparent 100%)",
        }}
      />

      <div className="container relative">
        {/* ── Logo reveal ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-8 flex justify-center"
        >
          <div className="relative group">
            {/* Atmospheric glow behind logo */}
            <div
              aria-hidden
              className="absolute inset-0 scale-[2] rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
              style={{ background: "radial-gradient(circle, rgba(0,207,255,0.15), transparent 70%)" }}
            />
            <div
              className="relative flex items-center justify-center rounded-2xl border border-cyan-500/15 bg-ink-900/70 p-6 backdrop-blur-md"
              style={{ boxShadow: "0 0 0 1px rgba(0,207,255,0.08), 0 0 80px -10px rgba(0,207,255,0.3)" }}
            >
              <LogoMark height={120} glowIntensity="lg" />
            </div>
          </div>
        </motion.div>

        {/* ── Status badge ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto flex w-fit items-center gap-2 rounded-full border border-ink-500/80 bg-ink-900/70 px-4 py-1.5 font-mono text-[11px] text-fog-400 backdrop-blur-sm"
        >
          <StatusDot tone="signal" pulse />
          IIT BOMBAY &nbsp;·&nbsp; CYBER SECURITY CLUB
        </motion.div>

        {/* ── Main headline ── */}
        <h1 className="mx-auto mt-7 max-w-4xl text-balance text-center font-display text-display-2xl font-medium text-fog-50">
          <DecryptText text="We break things" as="span" className="block" />
          <span className="block bg-gradient-to-r from-signal-300 via-cyan-400 to-signal-400 bg-clip-text text-transparent">
            <DecryptText text="so you don't have to." delayMs={500} as="span" />
          </span>
        </h1>

        {/* ── Tagline ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mx-auto mt-2 w-fit font-mono text-[13px] tracking-widest text-cyan-500/80"
        >
          &ldquo;{site.tagline}&rdquo;
        </motion.p>

        {/* ── Description ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.15 }}
          className="mx-auto mt-5 max-w-xl text-balance text-center text-[15px] leading-relaxed text-fog-500"
        >
          CSeC is IIT Bombay&apos;s club of CTF players and security enthusiasts —
          training members through workshops and competitions, competing worldwide
          as <span className="font-medium text-fog-300">{ctfTeamName}</span>.
        </motion.p>

        {/* ── CTA buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.35 }}
          className="mx-auto mt-9 flex w-fit flex-col items-center gap-3 sm:flex-row"
        >
          <Button size="lg" asChild>
            <Link href={ctfdUrl}>
              <Flag className="h-4 w-4" />
              Weekly Challenges
            </Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/about">
              About the club <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mx-auto mt-16 flex max-w-2xl flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-widest text-fog-700"
        >
          <span>est. {foundingYear}</span>
          <span className="hidden h-px w-4 bg-ink-600 sm:block" />
          <span>1st in India — SekaiCTF 2023</span>
          <span className="hidden h-px w-4 bg-ink-600 sm:block" />
          <span>1st in India — THC CTF 2021</span>
          <span className="hidden h-px w-4 bg-ink-600 sm:block" />
          <span>32+ open-source repos</span>
        </motion.div>

        {/* ── HUD floating elements ── */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-8 hidden font-mono text-[9px] leading-relaxed text-fog-800 xl:block"
        >
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-cyan-600/50">NODE: IITB-POWAI</span>
            <span>STATUS: ACTIVE</span>
            <span>CONN: SECURE</span>
            <span className="text-signal-700/60">v2.0.26</span>
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-8 hidden font-mono text-[9px] leading-relaxed text-fog-800 xl:block"
        >
          <div className="flex flex-col gap-0.5">
            <span>0x43 0x53 0x65 0x43</span>
            <span className="text-cyan-600/50">CSC // IITB</span>
            <span>ENC: TLS 1.3</span>
          </div>
        </div>
      </div>
    </section>
  );
}
