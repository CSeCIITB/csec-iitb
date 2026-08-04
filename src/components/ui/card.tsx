import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "group relative overflow-hidden bg-ink-900 cyber-frame cursor-none transition-colors duration-500 hover:bg-ink-800/80",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 scan-container opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 pointer-events-none" />
      <div className="relative z-10 h-full w-full">
        {props.children}
      </div>
    </div>
  )
);
Card.displayName = "Card";

export { Card };
