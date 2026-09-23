"use client";

import { AnimatePresence, m } from "framer-motion";
import { useReducedMotionSafe as useReducedMotion, useScrollPast } from "@/lib/hooks";
import { waMessages, whatsappLink } from "@/lib/site";

/**
 * Persistent WhatsApp entry point.
 *
 * Mobile: a compact circular button — a wide labelled bar sat over content and
 * read as a banner rather than part of the design.
 * Desktop: still compact by default; the label only expands on hover, so it
 * stops covering the page while staying instantly recognisable.
 *
 * Appears once past roughly the hero so it never competes with the hero CTA,
 * and respects the safe-area inset on notched phones.
 */
export function WhatsAppButton() {
  const reduced = useReducedMotion();
  const visible = useScrollPast(560);

  return (
    <AnimatePresence>
      {visible && (
        <m.a
          key="wa"
          href={whatsappLink(waMessages.general)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message TEAM VIGNESH on WhatsApp"
          initial={{ opacity: 0, scale: reduced ? 1 : 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: reduced ? 1 : 0.9 }}
          transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
          style={{
            right: "max(1rem, env(safe-area-inset-right))",
            bottom: "max(1rem, env(safe-area-inset-bottom))",
          }}
          className="group fixed z-40 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[#25D366]/40 bg-ink-elevated/95 text-bone shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-[width,background-color,border-color] duration-300 ease-out hover:border-[#25D366] hover:bg-[#25D366] hover:text-ink sm:bottom-6 sm:right-6 lg:hover:w-[13.5rem] lg:hover:justify-start lg:hover:pl-[1.05rem]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="shrink-0 text-[#25D366] transition-colors duration-300 group-hover:text-ink"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.16c-.24.68-1.4 1.3-1.94 1.34-.5.05-.98.24-3.3-.69-2.78-1.1-4.55-3.94-4.69-4.12-.13-.18-1.12-1.49-1.12-2.85s.71-2.02.96-2.3c.25-.27.55-.34.73-.34l.52.01c.17 0 .4-.06.62.48.24.57.8 1.98.87 2.13.07.14.12.31.02.5-.1.18-.15.29-.29.45l-.44.5c-.14.14-.29.3-.13.58.17.28.74 1.21 1.58 1.96 1.09.97 2 1.27 2.29 1.41.28.14.45.12.62-.07.17-.2.71-.83.9-1.11.19-.28.38-.23.64-.14.26.1 1.66.78 1.94.92.28.14.47.21.54.33.07.11.07.66-.17 1.34Z" />
          </svg>

          {/* Label is desktop-only and hover-only, so it never sits over content. */}
          <span className="pointer-events-none ml-3 hidden whitespace-nowrap font-display text-[0.75rem] font-bold uppercase tracking-[0.08em] opacity-0 transition-opacity duration-200 lg:inline lg:group-hover:opacity-100">
            Message Vignesh
          </span>
        </m.a>
      )}
    </AnimatePresence>
  );
}
