"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { Figure } from "@/components/ui/Figure";
import { Button } from "@/components/ui/Button";
import { EASE, FadeIn, HeroLines } from "@/components/ui/Motion";
import { usePointerFine, useReducedMotionSafe } from "@/lib/hooks";
import { HERO_GRADE } from "@/lib/images";
import { hero } from "@/lib/content";

/**
 * SIGNATURE MOTION 01 — the hero.
 *
 * Load order: background settles → eyebrow → headline line 1 → headline
 * line 2 → supporting copy → CTA group → accent line draws.
 * 90ms stagger, 850ms headline reveal, one easing curve.
 *
 * On desktop, scroll gently un-zooms the background and lifts the text ~30px.
 * Scroll scrub is off entirely on touch devices and under reduced motion.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionSafe();
  const pointerFine = usePointerFine();
  const scrub = pointerFine && !reduced;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const textFade = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink pt-[var(--header-h)]"
      aria-label="TEAM VIGNESH — personal training, nutrition and performance"
    >
      {/* ---- Background: scroll-scrubbed wrapper, load-settle inner ---- */}
      <m.div
        aria-hidden="true"
        style={scrub ? { scale: bgScale } : undefined}
        className="absolute inset-0 -z-10"
      >
        <m.div
          className="h-full w-full"
          initial={{ scale: reduced ? 1 : 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: reduced ? 0.4 : 1.6, ease: EASE }}
        >
          <Figure
            slot="heroVignesh"
            className="absolute inset-0 h-full w-full rounded-none"
            imageClassName={`object-cover object-[62%_center] lg:object-[68%_center] ${HERO_GRADE}`}
            sizes="100vw"
            priority
            showNote={false}
          />
        </m.div>
      </m.div>

      {/* Scrims — vertical for legibility, horizontal to protect the type
          column, plus a top band so the header and logo always read. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/72 to-ink/50" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-ink via-ink/78 to-transparent lg:block" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink to-transparent" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 grid-field opacity-25" />

      {/* ---- Content ---- */}
      <m.div
        style={scrub ? { y: textY, opacity: textFade } : undefined}
        className="shell relative w-full pb-24 pt-16 sm:pb-28 lg:pb-32"
      >
        <FadeIn delay={0.35}>
          <p className="label flex flex-wrap items-center gap-x-3 gap-y-1.5 text-bone/70">
            <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-accent" />
            {hero.eyebrow.map((word, i) => (
              <span key={word} className="flex items-center gap-3">
                {i > 0 && (
                  <span aria-hidden="true" className="opacity-40">
                    ·
                  </span>
                )}
                {word}
              </span>
            ))}
          </p>
        </FadeIn>

        <HeroLines
          lines={hero.lines}
          className="display mt-6 max-w-[15ch] text-[clamp(2rem,8.4vw,6.75rem)] text-bone sm:mt-8"
          delay={0.45}
          stagger={0.09}
        />

        <FadeIn delay={0.72} className="mt-7 max-w-[52ch] sm:mt-9">
          <p className="copy text-bone/75">{hero.supporting}</p>
        </FadeIn>

        <FadeIn delay={0.82} className="mt-8 sm:mt-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button href={hero.primary.href} size="lg" className="w-full sm:w-auto">
              {hero.primary.label}
            </Button>
            <Button
              href={hero.secondary.href}
              variant="outline"
              size="lg"
              className="w-full text-bone sm:w-auto"
              arrow={false}
            >
              <span className="flex items-center gap-2.5">
                {hero.secondary.label}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform duration-500 ease-out group-hover/btn:translate-y-1"
                >
                  <path d="M8 2v11M3.5 9 8 13.5 12.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                </svg>
              </span>
            </Button>
          </div>
        </FadeIn>

        {/* Accent line — the last beat of the sequence. */}
        <m.span
          aria-hidden="true"
          className="mt-12 hidden h-px w-full max-w-[22rem] origin-left bg-gradient-to-r from-accent to-transparent sm:block"
          initial={{ scaleX: reduced ? 1 : 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: reduced ? 0 : 1.1, delay: reduced ? 0 : 0.95, ease: EASE }}
        />
      </m.div>

      {/* ---- Scroll cue ---- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 right-gutter hidden items-center gap-3 lg:flex"
      >
        <span className="label rotate-180 text-bone/55 [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative block h-16 w-px overflow-hidden bg-bone/20">
          <span className="absolute inset-x-0 top-0 block h-6 animate-scroll-cue bg-accent" />
        </span>
      </div>
    </section>
  );
}
