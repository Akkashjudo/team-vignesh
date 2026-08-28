"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Hydration-safe reduced-motion check.
 *
 * framer-motion's own `useReducedMotion()` returns `null` during SSR and the
 * real preference on the client. For anyone who actually has "reduce motion"
 * enabled that is a server/client mismatch, and React throws a hydration
 * error — on exactly the machines we are trying to be careful with.
 *
 * So: report `false` for the server render AND the first client render (they
 * match, hydration passes), then switch to the real preference once mounted.
 * Motion components re-render at that point and settle without animating.
 */
export function useReducedMotionSafe(): boolean {
  const reduced = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  return hydrated && reduced === true;
}

/**
 * True only on devices with a precise pointer. Used to gate parallax and other
 * scroll-heavy effects so phones stay smooth — and so nothing that matters is
 * ever hidden behind hover.
 */
export function usePointerFine(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return fine;
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return matches;
}
