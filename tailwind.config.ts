import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1120px",
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Base — near-black, blue-slate tinted (not pure neutral, not warm)
        ink: {
          950: "#05070B",
          900: "#090C13",
          850: "#0D111A",
          800: "#10141F",
          700: "#161B29",
          600: "#1E2536",
          500: "#2B3349",
          400: "#414C69",
        },
        // Foreground
        fog: {
          50: "#F6F7F9",
          100: "#E9EBEF",
          300: "#B6BBC9",
          500: "#868DA0",
          700: "#565D6E",
        },
        // Primary brand accent — "signal" blue, evokes a packet / carrier signal
        signal: {
          300: "#8CB8FF",
          400: "#5E9BFF",
          500: "#3B7FFF",
          600: "#265FDB",
          700: "#1A46A8",
        },
        // Secondary accent — used only for live / active state (the pulse)
        pulse: {
          400: "#FFB648",
          500: "#FF9A1F",
          600: "#E67E00",
        },
        // Cyan — matches the circuit trace colour in the CSeC logo exactly
        cyan: {
          300: "#67E8F9",
          400: "#00CFFF",
          500: "#00B4E6",
          600: "#0891B2",
        },
        // Semantic status — challenge/CTF states
        solved: "#3DD68C",
        critical: "#FF5C5C",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 2.2rem + 3.5vw, 6rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(2.25rem, 1.8rem + 2vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(1.75rem, 1.5rem + 1.2vw, 2.75rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
      },
      backgroundImage: {
        "grid-fine":
          "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(circle at 50% 0%, rgba(59,127,255,0.16), transparent 60%)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(59,127,255,0.25), 0 0 40px -8px rgba(59,127,255,0.35)",
        "glow-cyan": "0 0 0 1px rgba(0,207,255,0.2), 0 0 50px -10px rgba(0,207,255,0.45)",
        "glow-sm": "0 0 20px -6px rgba(59,127,255,0.4)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 12px 24px -12px rgba(0,0,0,0.5)",
        "btn-primary": "0 0 0 1px rgba(59,127,255,0.4), 0 4px 24px -4px rgba(59,127,255,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        "btn-primary-hover": "0 0 0 1px rgba(59,127,255,0.6), 0 8px 32px -4px rgba(59,127,255,0.6), inset 0 1px 0 rgba(255,255,255,0.15)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4", filter: "blur(8px)" },
          "50%": { opacity: "1", filter: "blur(12px)" },
        },
        "circuit-draw": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.8" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        blink: "blink 1.6s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        scan: "scan 4s linear infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        float: "float 4s ease-in-out infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "scale-in": "scale-in 0.3s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};

export default config;
