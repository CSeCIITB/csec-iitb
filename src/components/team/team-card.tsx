"use client";

import { useState } from "react";
import { Avatar } from "@/components/shared/avatar";
import { TeamMember } from "@/lib/content/team";
import { cn } from "@/lib/utils";
import { Terminal, Github, Linkedin, ExternalLink } from "lucide-react";
import { DossierModal } from "./dossier-modal";

interface TeamCardProps {
  member: TeamMember;
  isManager?: boolean;
}

export function TeamCard({ member, isManager = false }: TeamCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const photoHeight = isManager ? 320 : 260;

  const hasPhoto = member.image && !imgError;

  return (
    <>
      <div
        role="button"
        onClick={() => setIsModalOpen(true)}
        className={cn(
          "group relative flex flex-col overflow-hidden bg-ink-900 cyber-frame cursor-none",
          "transition-all duration-500 ease-out",
        )}
      >
        {/* Scan line overlay on hover */}
        <div className="absolute inset-0 scan-container opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none" />

        {/* Photo area */}
        <div
          className="relative flex-shrink-0 overflow-hidden bg-ink-950 transition-transform duration-700 ease-out"
          style={{ height: photoHeight }}
        >
          {hasPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.image!}
              alt={member.name}
              onError={() => setImgError(true)}
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center text-center p-6 bg-ink-900 group-hover:scale-[1.03] transition-transform duration-700 ease-out">
              <Terminal className="h-10 w-10 text-ink-700 mb-3" />
              <div className="font-mono text-[9px] text-fog-600 uppercase tracking-widest border border-dashed border-ink-700/50 px-2 py-1 mb-1">
                Identity Verified
              </div>
              <div className="font-mono text-[8px] text-ink-600 uppercase tracking-widest">
                Photo Pending
              </div>
            </div>
          )}

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent mix-blend-overlay group-hover:opacity-50 transition-opacity" />

          {/* Role badge */}
          <div className="absolute left-3 top-3 z-30 transition-transform duration-500 group-hover:translate-x-1">
            <span className="inline-flex items-center gap-1.5 border border-cyan-500/30 bg-ink-950/90 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-cyan-400 backdrop-blur-md shadow-glow-sm">
              <span className="h-1 w-1 bg-cyan-400 animate-pulse" />
              {member.role || "Core"}
            </span>
          </div>

          {/* Socials - Slide in on hover */}
          <div className="absolute right-3 top-3 z-30 flex flex-col gap-2 opacity-0 translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
            {member.socials?.github && (
              <div className="flex items-center justify-center h-7 w-7 border border-ink-700 bg-ink-900/80 text-cyan-400 backdrop-blur-sm">
                <Github className="h-3 w-3" />
              </div>
            )}
            {member.socials?.linkedin && (
              <div className="flex items-center justify-center h-7 w-7 border border-ink-700 bg-ink-900/80 text-cyan-400 backdrop-blur-sm">
                <Linkedin className="h-3 w-3" />
              </div>
            )}
          </div>
        </div>

        {/* Info area */}
        <div className="relative px-5 py-5 bg-ink-900 transition-colors duration-500 group-hover:bg-ink-800/80 z-10 border-t border-ink-800 group-hover:border-cyan-500/30">
          <h3 className="font-display text-[16px] font-semibold leading-tight text-fog-50 transition-colors duration-200 group-hover:text-white">
            {member.name}
          </h3>

          {member.tagline && (
            <p className="mt-1 text-[12px] leading-relaxed text-fog-500 transition-colors duration-200 group-hover:text-fog-300 line-clamp-2">
              {member.tagline}
            </p>
          )}

          {/* Technical Metadata - Fades in on hover */}
          <div className="mt-3 overflow-hidden h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-4 transition-all duration-500">
            <div className="flex flex-col gap-1.5 font-mono text-[9px] uppercase tracking-widest text-fog-600">
              <div className="flex justify-between border-b border-ink-700/50 pb-1">
                <span>Dept</span>
                <span className="text-cyan-400 text-right">{member.department || "N/A"}</span>
              </div>
              <div className="flex justify-between pt-0.5">
                <span>Batch</span>
                <span className="text-cyan-400">{member.batch || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DossierModal
        member={member}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
