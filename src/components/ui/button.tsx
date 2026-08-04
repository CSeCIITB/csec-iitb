import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none border border-transparent",
    "text-sm font-medium tracking-wide",
    "transition-all duration-200 ease-out",
    "disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950",
    "select-none overflow-hidden",
  ].join(" "),
  {
    variants: {
      variant: {
        // ── Primary: gradient fill + glow + cyber border
        primary: [
          "bg-gradient-to-b from-cyan-600/90 to-signal-600 text-white border-cyan-400",
          "shadow-[0_0_0_1px_rgba(0,207,255,0.3),0_4px_24px_-4px_rgba(0,207,255,0.5)]",
          "hover:from-cyan-500/90 hover:to-signal-500 hover:shadow-[0_0_0_1px_rgba(0,207,255,0.6),0_8px_32px_-4px_rgba(0,207,255,0.7)] hover:-translate-y-px",
          "active:translate-y-0 active:shadow-glow active:from-cyan-600 active:to-signal-600",
          // Shine overlay and hover scanline effect
          "before:absolute before:inset-0",
          "before:bg-gradient-to-b before:from-white/10 before:to-transparent before:opacity-100",
          "hover:before:from-white/20",
          "after:absolute after:inset-0 after:-translate-x-full hover:after:animate-[marquee_1s_ease-in-out_infinite] after:bg-gradient-to-r after:from-transparent after:via-cyan-300/30 after:to-transparent after:pointer-events-none"
        ].join(" "),
        // ── Secondary: dark bg, subtle border, glow on hover
        secondary: [
          "bg-ink-800/80 text-fog-100 border border-ink-500",
          "backdrop-blur-sm",
          "hover:border-signal-500/60 hover:bg-ink-700 hover:text-white hover:shadow-glow-sm hover:-translate-y-px",
          "active:translate-y-0",
        ].join(" "),
        // ── Ghost: transparent, text only
        ghost: [
          "text-fog-400 bg-transparent",
          "hover:text-fog-50 hover:bg-ink-800/60",
          "active:bg-ink-700",
        ].join(" "),
        // ── Outline: border + transparent, for delineation
        outline: [
          "border border-ink-500 text-fog-100 bg-transparent",
          "hover:border-signal-500/60 hover:text-white hover:bg-ink-800/60 hover:-translate-y-px",
          "active:translate-y-0",
        ].join(" "),
        // ── Cyan: for logo/brand-coloured CTAs
        cyan: [
          "bg-gradient-to-b from-cyan-500/80 to-cyan-700 text-ink-950 font-semibold border-cyan-300",
          "shadow-[0_0_0_1px_rgba(0,207,255,0.5),0_8px_32px_-4px_rgba(0,207,255,0.7)]",
          "hover:from-cyan-400/80 hover:to-cyan-600 hover:-translate-y-px hover:shadow-[0_0_0_1px_rgba(0,207,255,0.8),0_12px_40px_-4px_rgba(0,207,255,0.9)]",
          "active:translate-y-0",
          "before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent",
        ].join(" "),
        // ── Danger: for critical actions
        danger: [
          "bg-gradient-to-b from-critical/90 to-critical text-white",
          "shadow-[0_0_0_1px_rgba(255,92,92,0.3),0_4px_20px_-4px_rgba(255,92,92,0.4)]",
          "hover:from-red-400 hover:to-red-600 hover:-translate-y-px",
          "active:translate-y-0",
        ].join(" "),
      },
      size: {
        xs: "h-7 px-3 text-[12px] gap-1.5",
        sm: "h-8 px-4 text-[13px] gap-1.5",
        md: "h-10 px-5 text-[14px]",
        lg: "h-12 px-7 text-[15px] gap-2.5",
        xl: "h-14 px-8 text-[16px] gap-3",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
