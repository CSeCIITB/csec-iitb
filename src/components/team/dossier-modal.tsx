"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Github, Linkedin, Mail, ExternalLink, Terminal, Shield } from "lucide-react";
import { TeamMember } from "@/lib/content/team";
import { Avatar } from "@/components/shared/avatar";

interface DossierModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DossierModal({ member, isOpen, onClose }: DossierModalProps) {
  if (!member) return null;

  const hasPhoto = member.image;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink-950/95"
            onClick={onClose}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="pointer-events-auto relative w-full max-w-4xl overflow-hidden rounded-xl border border-cyan-500/30 bg-ink-900 shadow-glow-cyan"
            >
              {/* Scanline overlay */}
              <div className="scan-container absolute inset-0 pointer-events-none opacity-50 z-50" />
              
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 opacity-50 m-2" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 opacity-50 m-2" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 opacity-50 m-2" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 opacity-50 m-2" />

              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-50 flex h-8 w-8 items-center justify-center rounded-full bg-ink-800 text-fog-400 transition-colors hover:bg-ink-700 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex flex-col lg:flex-row h-full max-h-[85vh] overflow-y-auto custom-scrollbar relative z-10">
                {/* Photo Column */}
                <div className="relative w-full lg:w-2/5 shrink-0 bg-ink-950 p-6 lg:p-8 border-r border-ink-800">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-ink-800 bg-ink-900 cyber-frame">
                    {hasPhoto ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={member.image!}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center text-center p-6 bg-ink-900">
                        <Terminal className="h-12 w-12 text-ink-600 mb-4" />
                        <div className="font-mono text-[10px] text-fog-500 uppercase tracking-widest border border-dashed border-ink-700 px-3 py-1 mb-2">
                          Identity Verified
                        </div>
                        <div className="font-mono text-[9px] text-ink-500 uppercase tracking-widest">
                          Photo Pending // ID: CSEC-{Math.floor(Math.random() * 900) + 100}
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 via-transparent to-transparent mix-blend-overlay" />
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3 justify-center">
                    {member.socials?.github && (
                      <a href={member.socials.github} target="_blank" rel="noreferrer" className="flex items-center justify-center h-10 w-10 rounded-full border border-ink-700 bg-ink-900 text-fog-400 hover:border-cyan-500/50 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(0,207,255,0.3)] transition-all">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {member.socials?.linkedin && (
                      <a href={member.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-center h-10 w-10 rounded-full border border-ink-700 bg-ink-900 text-fog-400 hover:border-cyan-500/50 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(0,207,255,0.3)] transition-all">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                    {member.socials?.twitter && (
                      <a href={member.socials.twitter} target="_blank" rel="noreferrer" className="flex items-center justify-center h-10 w-10 rounded-full border border-ink-700 bg-ink-900 text-fog-400 hover:border-cyan-500/50 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(0,207,255,0.3)] transition-all">
                        <X className="h-4 w-4" />
                      </a>
                    )}
                    {member.socials?.website && (
                      <a href={member.socials.website} target="_blank" rel="noreferrer" className="flex items-center justify-center h-10 w-10 rounded-full border border-ink-700 bg-ink-900 text-fog-400 hover:border-cyan-500/50 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(0,207,255,0.3)] transition-all">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Data Column */}
                <div className="flex-1 p-6 lg:p-10">
                  <div className="mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-cyan-400" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400">
                      Clearance: {member.role || "Core"}
                    </span>
                  </div>
                  
                  <h2 className="font-display text-3xl font-bold text-fog-50 mb-1">
                    {member.name}
                  </h2>
                  <p className="font-mono text-sm text-fog-400 mb-8 border-b border-ink-800 pb-4">
                    {member.tagline || "Cyber Security Enthusiast"}
                  </p>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-fog-600 mb-2">Department</h4>
                      <p className="text-[13px] text-fog-100">{member.department || "N/A"}</p>
                    </div>
                    <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-fog-600 mb-2">Programme</h4>
                      <p className="text-[13px] text-fog-100">{member.programme || "N/A"}</p>
                    </div>
                    <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-fog-600 mb-2">Batch</h4>
                      <p className="text-[13px] text-fog-100">{member.batch || "N/A"}</p>
                    </div>
                    <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-fog-600 mb-2">Status</h4>
                      <p className="text-[13px] text-cyan-400 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" /> Active
                      </p>
                    </div>
                  </div>

                  {member.bio && (
                    <div className="mb-8">
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-fog-600 mb-3 flex items-center gap-2">
                        <span className="h-px w-4 bg-ink-700" />
                        About
                      </h4>
                      <p className="text-[14px] leading-relaxed text-fog-300">
                        {member.bio}
                      </p>
                    </div>
                  )}

                  {member.interests && member.interests.length > 0 && (
                    <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-fog-600 mb-3 flex items-center gap-2">
                        <span className="h-px w-4 bg-ink-700" />
                        Domains of Interest
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.interests.map((interest, idx) => (
                          <span
                            key={idx}
                            className="rounded-sm border border-ink-700 bg-ink-800/50 px-2.5 py-1 font-mono text-[11px] text-fog-400"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
