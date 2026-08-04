"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEF0123456789#$%&*+=/\\";

function scramble(target: string, revealedUpTo: number) {
  return target
    .split("")
    .map((char, i) => {
      if (char === " ") return " ";
      if (i < revealedUpTo) return char;
      return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    })
    .join("");
}

/**
 * Renders `text`, animating in from scrambled cipher-like noise to the
 * final plaintext, left to right — evoking the moment a flag resolves.
 * Runs once on mount/first view. Falls back to plain static text when
 * the user prefers reduced motion.
 */
export function DecryptText({
  text,
  className,
  delayMs = 0,
  speedMs = 28,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delayMs?: number;
  speedMs?: number;
  as?: keyof JSX.IntrinsicElements;
}) {
  const [display, setDisplay] = useState(text);
  const doneRef = useRef(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced || doneRef.current) {
      setDisplay(text);
      return;
    }

    let revealed = 0;
    let frame: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      frame = setInterval(() => {
        revealed += 1;
        setDisplay(scramble(text, revealed));
        if (revealed >= text.length) {
          clearInterval(frame);
          doneRef.current = true;
        }
      }, speedMs);
    }, delayMs);

    return () => {
      clearTimeout(start);
      clearInterval(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <Tag className={className} aria-label={text}>
      {display}
    </Tag>
  );
}
