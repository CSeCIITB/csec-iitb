"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Trophy, ArrowLeft, Terminal, Database, Shield, Activity, Fingerprint } from "lucide-react";
import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { HeroLogo } from "@/components/shared/logo";
import { TeamCard } from "./team-card";
import { DossierModal } from "./dossier-modal";
import { manager, conveners, iitBreachers, archives, TeamMember } from "@/lib/content/team";
import { achievements } from "@/lib/content/achievements";

// ── Stagger children helper ──────────────────────────────────────────────────
const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  },
};

export function TeamClient() {
  const [view, setView] = useState<"current" | "archive">("current");
  const [selectedArchiveYear, setSelectedArchiveYear] = useState<string | null>(
    archives[0]?.year || null
  );
  
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [decryptText, setDecryptText] = useState("");

  const activeArchive = archives.find((a) => a.year === selectedArchiveYear);

  // Transition effect for archive
  const handleYearChange = (year: string) => {
    if (year === selectedArchiveYear) return;
    setIsTransitioning(true);
    setDecryptText("ACCESSING ARCHIVE -> DECRYPTING...");
    
    setTimeout(() => {
      setDecryptText("LOADED SECURE DATA");
      setTimeout(() => {
        setSelectedArchiveYear(year);
        setIsTransitioning(false);
      }, 300);
    }, 600);
  };

  const [managerModalOpen, setManagerModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {view === "current" ? (
          <motion.div
            key="current"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* ── HERO BANNER ── */}
            <section className="relative overflow-hidden border-b border-ink-800 bg-ink-950 pb-24 pt-28">
              <Container className="relative">
                <HeroLogo />
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                  className="mt-16 flex flex-col items-center text-center max-w-2xl mx-auto"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <span className="h-px w-8 bg-cyan-500/50" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400">Personnel Database</span>
                    <span className="h-px w-8 bg-cyan-500/50" />
                  </div>
                  
                  <h2 className="font-display text-2xl md:text-3xl font-medium text-fog-50 leading-snug mb-4">
                    We are a group of students driven by curiosity, competition, and the desire to understand how systems work — and how they break.
                  </h2>
                  <p className="text-[15px] leading-relaxed text-fog-400">
                    From organizing specialized workshops and intense CTFs to competing globally through IITBreachers, the CSeC core team works to build a formidable cybersecurity culture at IIT Bombay.
                  </p>
                  
                  <div className="mt-12 inline-flex items-center gap-3 border border-ink-800 bg-ink-900/50 px-4 py-2 rounded-full backdrop-blur-sm">
                    <Activity className="h-4 w-4 text-cyan-400 animate-pulse" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog-300">
                      Current Tenure: <span className="text-cyan-400 font-semibold">2026 — 27</span>
                    </span>
                  </div>
                </motion.div>
              </Container>
            </section>

            {/* ── TEAM CONTENT ── */}
            <section className="pb-32 pt-20">
              <Container>
                {/* ── Manager Profile ── */}
                <div className="mb-24">
                  <div className="mb-10 flex items-center gap-4">
                    <Fingerprint className="h-5 w-5 text-cyan-400" />
                    <h3 className="font-mono text-[14px] uppercase tracking-[0.3em] text-cyan-400">Command / Leadership</h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-cyan-900/50 to-transparent" />
                  </div>

                  <Reveal>
                    <div 
                      role="button"
                      onClick={() => setManagerModalOpen(true)}
                      className="group relative grid lg:grid-cols-[1fr_1.5fr] gap-0 overflow-hidden bg-ink-900 cyber-frame cursor-none transition-colors hover:bg-ink-800/80"
                    >
                      {/* Photo side */}
                      <div className="relative aspect-[4/5] lg:aspect-auto h-full w-full overflow-hidden border-r border-ink-800">
                        {manager.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img 
                            src={manager.image} 
                            alt={manager.name}
                            className="h-full w-full object-cover object-center grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-ink-950">
                            <Terminal className="h-12 w-12 text-ink-700" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent opacity-80" />
                        <div className="absolute inset-0 scan-container opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        
                        <div className="absolute bottom-6 left-6 flex items-center gap-2">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400">Status Active</span>
                        </div>
                      </div>

                      {/* Info side */}
                      <div className="relative p-8 lg:p-12 flex flex-col justify-center">
                        <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-20">
                          <Shield className="h-32 w-32 text-cyan-400" />
                        </div>
                        
                        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-fog-500 border border-ink-700 self-start px-3 py-1 bg-ink-950">
                          ID: CSEC-MGR-001
                        </div>
                        
                        <h2 className="font-display text-4xl lg:text-5xl font-bold text-fog-50 mb-2 mt-4 transition-colors group-hover:text-white">
                          {manager.name}
                        </h2>
                        
                        <p className="font-mono text-cyan-400 text-sm uppercase tracking-widest mb-6">
                          Manager, Cyber Security Club
                        </p>

                        <p className="text-[15px] leading-relaxed text-fog-400 max-w-lg mb-8">
                          {manager.bio || manager.tagline || "Leading the vision and execution of cybersecurity initiatives at IIT Bombay."}
                        </p>

                        <div className="grid grid-cols-2 gap-y-4 gap-x-8 font-mono text-[11px] uppercase tracking-widest text-fog-500 mb-8 max-w-md">
                          <div className="flex flex-col gap-1">
                            <span className="text-ink-500">Affiliation</span>
                            <span className="text-fog-200">IIT Bombay</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-ink-500">Tenure</span>
                            <span className="text-fog-200">2026 — 27</span>
                          </div>
                          {manager.department && (
                            <div className="flex flex-col gap-1">
                              <span className="text-ink-500">Department</span>
                              <span className="text-fog-200">{manager.department}</span>
                            </div>
                          )}
                          {manager.batch && (
                            <div className="flex flex-col gap-1">
                              <span className="text-ink-500">Batch</span>
                              <span className="text-fog-200">{manager.batch}</span>
                            </div>
                          )}
                        </div>

                        <div className="mt-auto flex items-center gap-2 text-cyan-400 font-mono text-[11px] uppercase tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                          <span className="h-px w-8 bg-cyan-400" />
                          View Complete Dossier
                        </div>
                      </div>
                    </div>
                  </Reveal>
                  
                  <DossierModal member={manager} isOpen={managerModalOpen} onClose={() => setManagerModalOpen(false)} />
                </div>

                {/* ── Conveners ── */}
                <div className="mb-24">
                  <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <Terminal className="h-5 w-5 text-cyan-400" />
                      <h3 className="font-mono text-[14px] uppercase tracking-[0.3em] text-cyan-400">The Conveners</h3>
                    </div>
                    <p className="text-[14px] text-fog-500 max-w-md md:text-right">
                      The core execution team responsible for operations, technical architecture, and community engagement.
                    </p>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-cyan-900/50 to-transparent mb-10" />

                  <motion.div
                    variants={stagger.container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  >
                    {conveners.map((c) => (
                      <motion.div key={c.name} variants={stagger.item}>
                        <TeamCard member={c} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Archive button */}
                <div className="flex justify-center mt-32">
                  <Reveal>
                    <button
                      onClick={() => setView("archive")}
                      className="group relative inline-flex items-center justify-center gap-3 bg-ink-900 px-8 py-4 font-mono text-[12px] uppercase tracking-[0.2em] text-cyan-400 transition-all duration-300 hover:bg-cyan-950/30 overflow-hidden"
                    >
                      <div className="absolute inset-0 border border-cyan-500/30" />
                      
                      {/* Corner accents */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400" />
                      
                      {/* Hover scanline */}
                      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent group-hover:animate-[marquee_1.5s_ease-in-out_infinite]" />

                      <Database className="h-4 w-4 relative z-10" />
                      <span className="relative z-10">Access Previous Tenures</span>
                      <ArrowUpRight className="h-4 w-4 relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </Reveal>
                </div>
              </Container>
            </section>
          </motion.div>
        ) : (
          /* ── ARCHIVE VIEW ── */
          <motion.div
            key="archive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Archive hero */}
            <section className="relative border-b border-ink-800 bg-ink-950 pb-16 pt-32">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(0,207,255,0.05),transparent)]" />
              <div className="pointer-events-none absolute inset-0 bg-grid opacity-20 mask-image-[linear-gradient(to_bottom,black,transparent)]" />

              <Container className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 flex items-center gap-3">
                    <Database className="h-5 w-5 text-cyan-500" />
                    <span className="font-mono text-[12px] uppercase tracking-[0.3em] text-cyan-400">Secure Archives</span>
                  </div>

                  <h1 className="font-display text-4xl lg:text-5xl font-bold text-fog-50">
                    Previous Tenures
                  </h1>
                  
                  <button
                    onClick={() => setView("current")}
                    className="mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-fog-500 transition-colors hover:text-cyan-400"
                  >
                    <ArrowLeft className="h-4 w-4" /> Return to Active Roster
                  </button>
                </div>
              </Container>
            </section>

            <section className="pb-32 pt-16 min-h-[60vh]">
              <Container>
                <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
                  {/* Year selector */}
                  <aside className="flex flex-row flex-wrap gap-2 lg:flex-col lg:border-r lg:border-ink-800 lg:pr-8 h-fit sticky top-32">
                    <p className="w-full font-mono text-[10px] uppercase tracking-[0.2em] text-fog-600 mb-4 flex items-center gap-2">
                      <span className="h-px w-4 bg-ink-700" /> Select Database
                    </p>
                    
                    {archives.map((archive) => (
                      <button
                        key={archive.year}
                        onClick={() => handleYearChange(archive.year)}
                        className={`relative w-full rounded-none border border-transparent px-4 py-3 text-left font-mono text-[13px] transition-all duration-200 ${
                          selectedArchiveYear === archive.year
                            ? "border-cyan-500/30 bg-cyan-950/20 text-cyan-400"
                            : "text-fog-500 hover:border-ink-700 hover:bg-ink-900 hover:text-fog-200"
                        }`}
                      >
                        {selectedArchiveYear === archive.year && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-cyan-400" />
                        )}
                        TENURE {archive.year}
                      </button>
                    ))}
                  </aside>

                  {/* Archive content */}
                  <div className="relative">
                    {isTransitioning && (
                      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-ink-950/80 backdrop-blur-sm border border-cyan-500/20">
                        <Terminal className="h-8 w-8 text-cyan-400 mb-4 animate-pulse" />
                        <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-cyan-400 animate-pulse">
                          {decryptText}
                        </p>
                      </div>
                    )}

                    <AnimatePresence mode="wait">
                      {activeArchive && !isTransitioning && (
                        <motion.div
                          key={activeArchive.year}
                          initial={{ opacity: 0, filter: "blur(4px)" }}
                          animate={{ opacity: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-16"
                        >
                          <div>
                            <div className="mb-6 flex items-center gap-3">
                              <h3 className="font-mono text-[13px] uppercase tracking-[0.2em] text-cyan-400">Manager</h3>
                              <div className="h-px flex-1 bg-ink-800" />
                            </div>
                            <div className="max-w-md">
                              <TeamCard member={activeArchive.manager} isManager={false} />
                            </div>
                          </div>

                          <div>
                            <div className="mb-6 flex items-center gap-3">
                              <h3 className="font-mono text-[13px] uppercase tracking-[0.2em] text-cyan-400">
                                {activeArchive.year === "2026 — 27" ? "Conveners" : "Core Team Members (CTM)"}
                              </h3>
                              <div className="h-px flex-1 bg-ink-800" />
                            </div>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                              {activeArchive.conveners.map((c) => (
                                <TeamCard key={c.name} member={{...c, role: activeArchive.year === "2026 — 27" ? c.role : "CTM"}} />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </Container>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
