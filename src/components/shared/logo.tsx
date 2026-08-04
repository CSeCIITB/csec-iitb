import { cn } from "@/lib/utils";

/**
 * CSeC Logo component.
 *
 * The logo PNG has a dark/transparent background with:
 *   - White padlock + circle
 *   - Cyan (#00CFFF) circuit traces
 *
 * We use filter: invert(1) hue-rotate(180deg) so that:
 *   - Any remaining dark bg → white (invisible on dark site ✓)
 *   - Dark artwork → white ✓
 *   - Cyan stays cyan (180deg hue cancel ✓)
 *
 * The subtle drop-shadow picks up the cyan from the circuit traces.
 */
export function Logo({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const imgSizes = { sm: "h-10", md: "h-14", lg: "h-20" };
  const textSizes = { sm: "text-[16px]", md: "text-[20px]", lg: "text-[24px]" };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/csec-logo-new.png"
        alt="CSeC"
        className={cn(
          "shrink-0 w-auto object-contain",
          "transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,207,255,0.6)]",
          imgSizes[size]
        )}
      />
      <span
        className={cn(
          "font-display font-semibold tracking-tight text-fog-50",
          textSizes[size]
        )}
      >
        CSeC
      </span>
    </div>
  );
}

/**
 * Logo mark only (no text) — used in hero, team page, etc.
 * Rendered larger with a cyan glow treatment.
 */
export function LogoMark({
  className,
  glowIntensity = "md",
  height = 56,
}: {
  className?: string;
  glowIntensity?: "sm" | "md" | "lg";
  height?: number;
}) {
  const glows = {
    sm: "0 0 20px -4px rgba(0,207,255,0.35)",
    md: "0 0 40px -8px rgba(0,207,255,0.5)",
    lg: "0 0 70px -10px rgba(0,207,255,0.65)",
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/csec-logo-new.png"
      alt="CSeC"
      className={cn("w-auto object-contain shrink-0", className)}
      style={{
        height,
        // Apply only the drop shadow to enhance the native logo, without inverting/distorting the colors
        filter: `drop-shadow(${glows[glowIntensity]})`,
      }}
    />
  );
}

import { motion } from "framer-motion";

/**
 * Animated Hero Logo with Reveal Sequence
 */
export function HeroLogo() {
  return (
    <div className="relative flex flex-col items-center">
      {/* Background atmospheric field */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,207,255,0.1)_0%,transparent_70%)] blur-2xl"
      />
      
      {/* Circuit lines / Tech Grid - subtle background element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute inset-0 z-0 bg-grid mask-image-[radial-gradient(circle,black,transparent)]"
      />
      
      {/* Main Logo Reveal */}
      <motion.div
        initial={{ filter: "blur(10px) brightness(2)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px) brightness(1)", opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <div
          className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border border-cyan-500/20 bg-ink-900/80 backdrop-blur-md shadow-glow-cyan"
        >
          <LogoMark height={56} glowIntensity="md" className="motion-slow" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col items-center"
        >
          <h1 className="font-display text-4xl font-bold tracking-tight text-fog-50 sm:text-5xl">
            CSeC
          </h1>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-400">
            Gotta Hack 'em All
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
