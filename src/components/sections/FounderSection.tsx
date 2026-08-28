"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { Surface } from "@/components/ui/Surface";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Figure } from "@/components/ui/Figure";
import { Button } from "@/components/ui/Button";
import {
  EASE,
  HeroLines,
  RevealGroup,
  RevealImage,
  RevealItem,
  RevealLine,
} from "@/components/ui/Motion";
import { useReducedMotionSafe, usePointerFine } from "@/lib/hooks";
import { FOUNDER_GRADE } from "@/lib/images";
import { founder, qualificationList } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * THE COACH — sits directly beneath the hero so the person behind the brand is
 * the second thing a visitor meets.
 *
 * Uses only the three real photographs of Vigneshwaran, graded to one look so
 * they read as a single shoot. Composition is deliberately unequal: a dominant
 * portrait, a supporting environment band and a small motion accent.
 *
 * SIGNATURE MOTION 02 — the whole block resolves as one composed idea:
 * the portrait mask-reveals, the two supporting frames follow behind it, and
 * the copy arrives as a single group. Nothing flies in from three directions.
 */
export function FounderSection() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const pointerFine = usePointerFine();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Very subtle drift on the oversized background wordmark. Desktop only.
  const drift = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const driftActive = pointerFine && !reduced;

  return (
    <Surface tone="ink" id="the-coach" className="section scroll-mt-20 overflow-hidden">
      <div ref={ref} className="shell">
        {/* Oversized brand word, sitting behind the composition. */}
        <m.span
          aria-hidden="true"
          style={driftActive ? { y: drift } : undefined}
          className="pointer-events-none absolute right-[-4%] top-1/2 hidden -translate-y-1/2 select-none font-display text-[22vw] font-extrabold uppercase leading-none tracking-tightest text-bone/[0.028] lg:block"
        >
          Vignesh
        </m.span>

        <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ---------------- Copy ---------------- */}
          <div className="lg:col-span-5">
            <RevealGroup stagger={0.09}>
              <RevealItem>
                <SectionLabel index={founder.index} className="text-bone/60">
                  {founder.label}
                </SectionLabel>
              </RevealItem>

              <RevealItem>
                <HeroLines
                  as="h2"
                  inView
                  lines={[founder.heading]}
                  className="display mt-7 text-[clamp(2.25rem,6.4vw,4.75rem)] text-bone"
                  delay={0.05}
                />
              </RevealItem>

              <RevealItem>
                <p className="mt-4 font-display text-[0.9375rem] font-bold uppercase tracking-[0.14em] text-accent-text">
                  {founder.positioning}
                </p>
              </RevealItem>

              <RevealItem>
                <div className="mt-7 max-w-[46ch] space-y-5">
                  {founder.body.map((para) => (
                    <p key={para} className="copy text-bone/70">
                      {para}
                    </p>
                  ))}
                </div>
              </RevealItem>

              {/* Qualifications — technical register, no certificate graphics. */}
              <RevealItem>
                <div className="mt-10">
                  <div className="flex items-center gap-4">
                    <span className="label whitespace-nowrap text-bone/55">Qualifications</span>
                    <RevealLine className="text-bone/20" delay={0.15} />
                  </div>

                  <ul className="mt-5 flex flex-col">
                    {qualificationList.map((q, i) => (
                      <li
                        key={q}
                        className="grid grid-cols-[2.25rem_1fr] items-baseline gap-3 border-b border-ink-line py-3.5 last:border-b-0"
                      >
                        <span className="index text-[0.6875rem] text-accent-text">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-body-sm text-bone/80">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>

              <RevealItem>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Button href={founder.primary.href} size="lg" className="w-full sm:w-auto">
                    {founder.primary.label}
                  </Button>
                  <a
                    href={site.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 py-3 font-display text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-bone/80 transition-colors hover:text-accent-text"
                  >
                    <InstagramGlyph />
                    <span className="link-underline">{founder.instagramCta}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-500 ease-out group-hover:translate-x-1"
                    >
                      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                    </svg>
                  </a>
                </div>
              </RevealItem>
            </RevealGroup>
          </div>

          {/* ---------------- Composition ---------------- */}
          <div className="lg:col-span-7">
            {/* Desktop: layered editorial composition. */}
            <div className="relative hidden aspect-[4/5] w-full lg:block">
              {/* Training environment band */}
              <RevealImage
                delay={0.18}
                direction="left"
                className="absolute right-0 top-0 z-0 w-[58%] rounded-sm border border-ink-line"
              >
                <Figure
                  slot="vigneshGymWide"
                  ratio="16/9"
                  className="w-full rounded-none"
                  imageClassName={FOUNDER_GRADE}
                  sizes="34vw"
                  showNote={false}
                />
              </RevealImage>

              {/* Primary portrait — the dominant frame */}
              <RevealImage className="absolute left-0 top-[22%] z-10 w-[62%] rounded-sm border border-ink-line shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
                <Figure
                  slot="vigneshPortrait"
                  ratio="3/4"
                  className="w-full rounded-none"
                  imageClassName={FOUNDER_GRADE}
                  sizes="36vw"
                  showNote={false}
                />
              </RevealImage>

              {/* Motion accent */}
              <RevealImage
                delay={0.3}
                className="absolute bottom-0 right-0 z-20 w-[36%] rounded-sm border border-ink-line shadow-[0_24px_60px_-18px_rgba(0,0,0,0.9)]"
              >
                <Figure
                  slot="vigneshMotion"
                  ratio="4/5"
                  className="w-full rounded-none"
                  imageClassName={FOUNDER_GRADE}
                  sizes="22vw"
                  showNote={false}
                />
              </RevealImage>

              {/* Caption rail in the negative space */}
              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
                className="absolute right-[2%] top-[36%] z-10 flex flex-col items-end gap-2 text-right"
              >
                <span className="label text-bone/55">{site.trainer}</span>
                <span className="h-10 w-px bg-accent/70" />
                <span className="label text-bone/55">Founder &amp; Coach</span>
              </m.div>
            </div>

            {/* Mobile / tablet: stacked, large, no cropping games. */}
            <div className="lg:hidden">
              <RevealImage className="rounded-sm border border-ink-line">
                <Figure
                  slot="vigneshPortrait"
                  ratio="3/4"
                  className="w-full rounded-none"
                  imageClassName={FOUNDER_GRADE}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  showNote={false}
                />
              </RevealImage>

              <div className="mt-3 grid grid-cols-[1.55fr_1fr] gap-3">
                <RevealImage delay={0.12} className="rounded-sm border border-ink-line">
                  <Figure
                    slot="vigneshGymWide"
                    ratio="4/3"
                    className="w-full rounded-none"
                    imageClassName={FOUNDER_GRADE}
                    sizes="60vw"
                    showNote={false}
                  />
                </RevealImage>
                <RevealImage delay={0.2} className="rounded-sm border border-ink-line">
                  <Figure
                    slot="vigneshMotion"
                    ratio="4/3"
                    className="h-full w-full rounded-none"
                    imageClassName={FOUNDER_GRADE}
                    sizes="40vw"
                    showNote={false}
                  />
                </RevealImage>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 border-t border-ink-line pt-4">
                <span className="label text-bone/55">{site.trainer}</span>
                <span className="label text-bone/55">Founder &amp; Coach</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function InstagramGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}
