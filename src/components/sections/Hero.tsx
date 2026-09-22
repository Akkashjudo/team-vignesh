"use client";

import { useRef } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import { Figure } from "@/components/ui/Figure";
import { Button } from "@/components/ui/Button";
import { EASE, FadeIn, HeroLines } from "@/components/ui/Motion";
import { usePointerFine, useReducedMotionSafe } from "@/lib/hooks";
import { hero, qualificationList } from "@/lib/content";

/**
 * SIGNATURE MOTION 01 — the hero.
 *
 * Load order: background settles → eyebrow → headline line 1 → headline
 * line 2 → supporting copy → CTA group → accent line → credentials strip.
 * 90ms stagger, 850ms headline reveal, one easing curve.
 *
 * Depth is built in layers, all of them pure CSS so they cost nothing at
 * runtime: photograph → directional scrims → radial light pool → technical
 * grid → grain. On desktop, scroll gently un-zooms the background and lifts
 * the text 30px. Scroll scrub is off on touch and under reduced motion.
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
      className="noise relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink pt-[var(--header-h)]"
      aria-label="TEAM VIGNESH — personal training, nutrition and performance"
    >
      {/* ---------- Layer 1: photograph ---------- */}
      <m.div
        aria-hidden="true"
        style={scrub ? { scale: bgScale } : undefined}
        className="absolute inset-0 -z-30"
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
            imageClassName="object-cover object-[62%_center] lg:object-[68%_center]"
            sizes="100vw"
            priority
            showNote={false}
          />
        </m.div>
      </m.div>

      {/* ---------- Layer 2: directional scrims ---------- */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-gradient-to-t from-ink via-ink/75 to-ink/45 lg:via-ink/48 lg:to-ink/26"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-20 hidden bg-gradient-to-r from-ink via-ink/88 to-transparent lg:block" />
      {/* Top band so the header and logo always read against the photograph. */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-20 h-44 bg-gradient-to-b from-ink to-transparent" />

      {/* ---------- Layer 3: soft light pool behind the headline ---------- */}
      <div
        aria-hidden="true"
        className="absolute -z-10 h-[78vh] w-[78vh] rounded-full bg-[radial-gradient(circle,rgba(150,153,160,0.15),rgba(150,153,160,0.05)_38%,transparent_68%)] left-[-22vh] bottom-[-10vh] lg:left-[-12vh] lg:bottom-[0]"
      />
      <div
        aria-hidden="true"
        className="absolute -z-10 hidden h-[52vh] w-[52vh] rounded-full bg-[radial-gradient(circle,rgba(225,29,46,0.12),rgba(225,29,46,0.04)_40%,transparent_70%)] right-[4vw] top-[10vh] lg:block"
      />

      {/* ---------- Layer 4: technical grid, kept faint ---------- */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 grid-field opacity-[0.55]" />

      {/* ---------- Floating technical marks ---------- */}
      <FloatingMarks reduced={reduced} />

      {/* ---------- Content ---------- */}
      <m.div
        style={scrub ? { y: textY, opacity: textFade } : undefined}
        className="shell relative w-full pb-10 pt-16 sm:pb-12 lg:pb-14"
      >
        <FadeIn delay={0.35}>
          <p className="label flex flex-wrap items-center gap-x-3 gap-y-1.5 text-bone/75">
            <span aria-hidden="true" className="h-3 w-[2px] shrink-0 bg-accent" />
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
          className="display mt-7 max-w-[15ch] text-[clamp(2.125rem,8.6vw,7rem)] text-bone sm:mt-9"
          delay={0.45}
          stagger={0.09}
        />

        <FadeIn delay={0.72} className="mt-6 max-w-[50ch] sm:mt-8">
          <p className="copy text-bone/75">{hero.supporting}</p>
        </FadeIn>

        {/* Primary carries the accent; secondary stays quiet beside it. */}
        <FadeIn delay={0.82} className="mt-9 sm:mt-11">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button href={hero.primary.href} size="lg" className="w-full sm:w-auto">
              {hero.primary.label}
            </Button>
            <Button
              href={hero.secondary.href}
              variant="ghost"
              size="lg"
              className="w-full justify-center !px-0 text-bone/85 hover:text-bone sm:w-auto sm:justify-start"
              arrow={false}
            >
              <span className="flex items-center gap-2.5">
                <span className="link-underline">{hero.secondary.label}</span>
                <svg
                  width="15"
                  height="15"
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
      </m.div>

      {/* ---------- Credentials strip: real qualifications, no invented stats ---------- */}
      <m.div
        initial={{ opacity: 0, y: reduced ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.98, ease: EASE }}
        className="relative z-10 border-t border-bone/12 bg-ink/55"
      >
        {/* Wraps rather than scrolls: a horizontal scroller here would hide
            half the credentials on a phone with no affordance that they exist. */}
        <div className="shell flex flex-wrap items-center gap-x-5 gap-y-2 py-4 sm:gap-x-8 sm:py-5">
          <span className="label text-accent-text">Certified</span>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-8">
            {qualificationList.map((q, i) => (
              <li key={q} className="flex items-center gap-x-5 sm:gap-x-8">
                <span className="label text-bone/60">{q.replace(/^Certified /, "")}</span>
                {i < qualificationList.length - 1 && (
                  <span aria-hidden="true" className="hidden h-1 w-1 shrink-0 rotate-45 bg-bone/25 sm:block" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </m.div>

      {/* ---------- Scroll cue ---------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-28 right-gutter hidden items-center gap-3 lg:flex"
      >
        <span className="label rotate-180 text-bone/55 [writing-mode:vertical-rl]">Scroll</span>
        <span className="relative block h-16 w-px overflow-hidden bg-bone/20">
          <span className="absolute inset-x-0 top-0 block h-6 animate-scroll-cue bg-accent" />
        </span>
      </div>
    </section>
  );
}

/**
 * Static technical framing — corner brackets and a hairline rule. Pure CSS,
 * decorative, and they fade in with the rest of the sequence rather than
 * animating on a loop.
 */
function FloatingMarks({ reduced }: { reduced: boolean }) {
  return (
    <m.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0 : 1.2, delay: reduced ? 0 : 1.05, ease: EASE }}
      className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
    >
      <span className="absolute left-gutter top-[calc(var(--header-h)+3rem)] h-10 w-10 border-l border-t border-bone/15" />
      <span className="absolute right-gutter top-[calc(var(--header-h)+3rem)] h-10 w-10 border-r border-t border-bone/15" />
      <span className="absolute right-[calc(theme(spacing.gutter)+3.5rem)] top-[calc(var(--header-h)+3rem)] label text-bone/25">
        TV / 01
      </span>
      <span className="absolute left-1/2 top-0 h-24 w-px bg-gradient-to-b from-accent/45 to-transparent" />
    </m.div>
  );
}
