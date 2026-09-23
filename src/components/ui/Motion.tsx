"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/hooks";

/**
 * One LazyMotion boundary for the whole app. `strict` means only the light
 * `m` components are allowed, which keeps the animation bundle small.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

/**
 * ACCESSIBILITY NOTE
 * With `prefers-reduced-motion`, every primitive renders straight to its final
 * state — no fade, no translate, zero duration. Content is simply present.
 * That also means a stalled or interrupted animation can never leave anything
 * invisible for that audience.
 */

/** One easing language across the entire site. */
export const EASE = [0.22, 1, 0.36, 1] as const;
export const DUR = {
  line: 0.85, // headline mask reveal
  text: 0.7, // copy + supporting
  image: 1.1, // image mask
  quick: 0.45, // micro-interaction
} as const;
export const STAGGER = 0.09; // 90ms — inside the 80–100ms brief

type Tag = "div" | "section" | "li" | "article" | "header" | "figure" | "p" | "span";

/* ==========================================================================
   RevealText — the workhorse. opacity 0 → 1, y 24 → 0.
   ========================================================================== */

export function RevealText({
  children,
  className,
  delay = 0,
  y = 24,
  as: Tag = "div",
  amount = 0.2,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: Tag;
  amount?: number;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  const Comp = m[Tag];

  return (
    <Comp
      className={cn("reveal-safe", className)}
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: reduced ? 0 : DUR.text, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/** Kept as the historical name so existing sections keep working. */
export const Reveal = RevealText;

/* ==========================================================================
   RevealLine — a hairline or accent rule drawing itself in.
   ========================================================================== */

export function RevealLine({
  className,
  delay = 0,
  origin = "left",
  duration = 0.9,
}: {
  className?: string;
  delay?: number;
  origin?: "left" | "right" | "center";
  duration?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <m.span
      aria-hidden="true"
      className={cn(
        "block h-px w-full bg-current",
        { left: "origin-left", right: "origin-right", center: "origin-center" }[origin],
        className,
      )}
      initial={{ scaleX: reduced ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: EASE }}
    />
  );
}

/* ==========================================================================
   RevealGroup / RevealItem — controlled stagger.
   ========================================================================== */

export function RevealGroup({
  children,
  className,
  stagger = STAGGER,
  delay = 0,
  amount = 0.15,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  as?: "div" | "ul" | "ol" | "section";
}) {
  const Comp = m[Tag];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  y = 24,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li" | "article";
}) {
  const reduced = useReducedMotion();
  const Comp = m[Tag];
  return (
    <Comp
      className={cn("reveal-safe", className)}
      variants={{
        hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: reduced ? 0 : DUR.text, ease: EASE },
        },
      }}
    >
      {children}
    </Comp>
  );
}

/* ==========================================================================
   RevealImage — the frame wipes open, the picture settles back from a small
   scale. The element tree is identical in both motion modes, so switching to
   reduced motion never remounts the image.
   ========================================================================== */

export function RevealImage({
  children,
  className,
  delay = 0,
  direction = "up",
  scale = 1.08,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left";
  scale?: number;
}) {
  const reduced = useReducedMotion();
  const open = "inset(0% 0% 0% 0%)";
  const closed =
    direction === "up"
      ? "inset(100% 0% 0% 0%)"
      : direction === "down"
        ? "inset(0% 0% 100% 0%)"
        : "inset(0% 100% 0% 0%)";

  return (
    <m.div
      className={cn("reveal-clip overflow-hidden", className)}
      initial={{ clipPath: reduced ? open : closed }}
      whileInView={{ clipPath: open }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduced ? 0 : DUR.image, delay: reduced ? 0 : delay, ease: EASE }}
    >
      <m.div
        className="reveal-safe h-full w-full"
        initial={{ scale: reduced ? 1 : scale }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduced ? 0 : DUR.image + 0.25, delay: reduced ? 0 : delay, ease: EASE }}
      >
        {children}
      </m.div>
    </m.div>
  );
}

/** Historical name. */
export const RevealMask = RevealImage;

/* ==========================================================================
   HeroLines — headline lines rising out of their own mask.
   ========================================================================== */

export function HeroLines({
  lines,
  className,
  lineClassName,
  delay = 0.15,
  stagger = STAGGER,
  as: Tag = "h1",
  inView = false,
  id,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2";
  /** Trigger on scroll instead of on mount. */
  inView?: boolean;
  id?: string;
}) {
  const reduced = useReducedMotion();

  const anim = (i: number) => {
    const transition = {
      duration: reduced ? 0 : DUR.line,
      delay: reduced ? 0 : delay + i * stagger,
      ease: EASE,
    };
    const from = reduced ? { y: 0, opacity: 1 } : { y: "108%", opacity: 1 };
    const to = { y: 0, opacity: 1 };
    return inView
      ? { initial: from, whileInView: to, viewport: { once: true, amount: 0.4 }, transition }
      : { initial: from, animate: to, transition };
  };

  return (
    <Tag id={id} className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <m.span className={cn("reveal-safe block", lineClassName)} {...anim(i)}>
            {line}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}

/* ==========================================================================
   FadeIn — on-mount entrance for above-the-fold content.
   ========================================================================== */

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 18,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: Tag;
}) {
  const reduced = useReducedMotion();
  const Comp = m[Tag];
  return (
    <Comp
      className={cn("reveal-safe", className)}
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : DUR.text, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}
