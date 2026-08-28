"use client";

import { useState } from "react";
import { m } from "framer-motion";
import { Surface } from "@/components/ui/Surface";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EASE, HeroLines, RevealImage, RevealText } from "@/components/ui/Motion";
import { useReducedMotionSafe } from "@/lib/hooks";
import { testimonials, testimonialsDisclaimer, testimonialsHeading } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * CLIENT STORIES — real testimonials, reproduced in the clients' own words.
 *
 * Typography-first by design: no invented client faces, no star ratings, no
 * fabricated metrics. One featured story with two supporting ones beside it.
 *
 * SIGNATURE MOTION 04 — the featured story opens through a vertical mask on
 * first view, and swapping stories crossfades. There is no autoplay: nothing
 * moves under the reader while they are reading.
 */
export function Testimonials() {
  const [activeId, setActiveId] = useState(testimonials[0].id);
  const reduced = useReducedMotionSafe();

  const active = testimonials.find((t) => t.id === activeId) ?? testimonials[0];
  const supporting = testimonials.filter((t) => t.id !== activeId);

  return (
    <Surface tone="ink-elevated" className="section" aria-labelledby="stories-heading">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <RevealText>
              <SectionLabel index="06" className="text-bone/60">
                Client stories
              </SectionLabel>
            </RevealText>
            <HeroLines
              as="h2"
              inView
              lines={[testimonialsHeading]}
              className="display display-lg mt-6 text-bone"
              id="stories-heading"
            />
          </div>

          <RevealText delay={0.1} className="lg:col-span-5 lg:pb-2">
            <p className="copy max-w-[40ch] text-bone/60">
              Written by clients who train with Vignesh. Nothing here is edited
              for marketing.
            </p>
          </RevealText>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          {/* ---------------- Featured ---------------- */}
          <RevealImage className="rounded-sm lg:col-span-7">
            <figure className="relative h-full overflow-hidden rounded-sm border border-ink-line bg-ink p-6 sm:p-9 lg:p-11">
              <QuoteMark className="absolute right-5 top-4 h-16 w-16 text-bone/[0.05] sm:h-24 sm:w-24" />

              {/* Keyed fade-in rather than AnimatePresence mode="wait": the
                  incoming quote mounts immediately, so the panel can never be
                  left empty if an exit animation is interrupted or stalled. */}
              <div className="relative">
                <m.div
                  key={active.id}
                  initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0.15 : 0.5, ease: EASE }}
                >
                  <span aria-hidden="true" className="block h-[2px] w-12 bg-accent" />

                  <blockquote className="mt-7">
                    <p className="display text-[clamp(1.375rem,2.6vw,2.125rem)] leading-[1.15] text-bone">
                      &ldquo;{active.headline}&rdquo;
                    </p>
                    <p className="copy mt-6 max-w-[62ch] text-bone/65">{active.quote}</p>
                  </blockquote>

                  <figcaption className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-ink-line pt-6">
                    <span className="font-display text-[0.9375rem] font-bold uppercase tracking-[0.08em] text-bone">
                      {active.name}
                    </span>
                    <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-accent" />
                    <span className="label text-bone/50">{active.role}</span>
                  </figcaption>
                </m.div>
              </div>
            </figure>
          </RevealImage>

          {/* ---------------- Supporting ---------------- */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {supporting.map((t, i) => (
              <RevealText key={t.id} delay={0.1 + i * 0.08} className="flex-1">
                <button
                  type="button"
                  onClick={() => setActiveId(t.id)}
                  aria-label={`Read the full story from ${t.name}`}
                  className={cn(
                    "hover-lift group flex h-full w-full flex-col rounded-sm border border-ink-line bg-ink p-5 text-left",
                    "transition-colors hover:border-accent/50 sm:p-7",
                  )}
                >
                  <span aria-hidden="true" className="block h-[2px] w-8 bg-accent/70 transition-all duration-500 group-hover:w-12" />

                  <p className="mt-5 font-display text-[1.0625rem] font-bold uppercase leading-tight tracking-[0.01em] text-bone sm:text-[1.1875rem]">
                    &ldquo;{t.headline}&rdquo;
                  </p>

                  {/* Full text stays in the DOM — clamped, never hidden. */}
                  <p className="mt-4 line-clamp-4 text-[0.9375rem] leading-relaxed text-bone/55">
                    {t.quote}
                  </p>

                  <span className="mt-auto flex items-center justify-between gap-4 pt-6">
                    <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span className="font-display text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-bone/90">
                        {t.name}
                      </span>
                      <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-bone/30" />
                      <span className="label text-bone/55">{t.role}</span>
                    </span>

                    <span className="flex shrink-0 items-center gap-2 text-accent-text">
                      <span className="label hidden sm:inline">Read</span>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className="transition-transform duration-500 ease-out group-hover:translate-x-1"
                      >
                        <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                      </svg>
                    </span>
                  </span>
                </button>
              </RevealText>
            ))}
          </div>
        </div>

        <RevealText delay={0.05}>
          <p className="mt-9 max-w-[76ch] border-l-2 border-ink-muted pl-4 text-[0.8125rem] leading-relaxed text-bone/50">
            {testimonialsDisclaimer}
          </p>
        </RevealText>
      </div>
    </Surface>
  );
}

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.6 8v9.2c-3 .5-5.2 1.8-6.5 3.9-1.1 1.7-1.6 4-1.6 6.9H19V40H4V29.7c0-6.2 1.2-10.9 3.6-14.2C10 12.2 13.6 9.7 18.6 8Zm25.4 0v9.2c-3 .5-5.2 1.8-6.5 3.9-1.1 1.7-1.6 4-1.6 6.9h8.5V40H29.4V29.7c0-6.2 1.2-10.9 3.6-14.2 2.4-3.3 6-5.8 11-7.5Z" />
    </svg>
  );
}
