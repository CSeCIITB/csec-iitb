import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "border-ink-500 bg-ink-800 text-fog-300",
        signal: "border-signal-500/30 bg-signal-500/10 text-signal-300",
        live: "border-pulse-500/30 bg-pulse-500/10 text-pulse-400",
        solved: "border-solved/30 bg-solved/10 text-solved",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
