"use client";

import { useEffect, useRef } from "react";

/**
 * Premium CSeC cursor - small precise dot + outer ring.
 * Ring expands and changes colour on interactive elements.
 * Completely disabled on touch/coarse-pointer devices.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let ringX = 0, ringY = 0;
    let targetX = 0, targetY = 0;
    let rafId: number;

    dot.style.opacity = "1";
    ring.style.opacity = "1";

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.transform = `translate(${targetX - 4}px, ${targetY - 4}px)`;
    };

    const animate = () => {
      ringX += (targetX - ringX) * 0.14;
      ringY += (targetY - ringY) * 0.14;
      ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      rafId = requestAnimationFrame(animate);
    };
    animate();

    const onEnterInteractive = () => { ring.setAttribute("data-hover", "true"); };
    const onLeaveInteractive = () => { ring.removeAttribute("data-hover"); };

    const attachListeners = () => {
      document.querySelectorAll("a, button, [role='button'], input, textarea, select, label").forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    };
    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-cyan-400 opacity-0 transition-none"
        style={{ boxShadow: "0 0 6px 2px rgba(0,207,255,0.6)" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 rounded-full border border-cyan-400/50 opacity-0 transition-[width,height,border-color,box-shadow] duration-200 ease-out"
      />
    </>
  );
}
