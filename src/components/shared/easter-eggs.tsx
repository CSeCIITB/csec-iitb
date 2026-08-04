"use client";

import { useEffect } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function EasterEggs() {
  useEffect(() => {
    // Initial console message for developers
    console.log(
      "%c[SYSTEM ALERTS]",
      "color: #FF5C5C; font-weight: bold; font-size: 14px;"
    );
    console.log(
      "%cWARNING: Unauthorized access attempt detected from your IP.\nJust kidding. Welcome to the CSeC console.\n\nLooking for flags? You won't find them here so easily.",
      "color: #3DD68C; font-family: monospace; font-size: 12px;"
    );

    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === KONAMI_CODE[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === KONAMI_CODE.length) {
          triggerKonami();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerKonami = () => {
    console.log(
      "%c[ACCESS GRANTED] Konami Code accepted.",
      "color: #FFB648; font-weight: bold; font-size: 14px;"
    );
    alert("ACCESS GRANTED: csec{h4ck3r_m1nd53t_unl0ck3d}");
    document.body.classList.add("crt-flicker");
    setTimeout(() => {
      document.body.classList.remove("crt-flicker");
    }, 2000);
  };

  return null;
}
