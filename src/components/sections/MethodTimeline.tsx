"use client";

import { useRef, useState } from "react";
import {
  m,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useReducedMotionSafe as useReducedMotion } from "@/lib/hooks";
import { Surface } from "@/components/ui/Surface";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionLabel";
import { method, methodHeading } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * SECTION 06 — THE TEAM VIGNESH METHOD.
 * MOTION MOMENT 3: on desktop the section pins and a horizontal rail fills as
 * you scroll; each stage activates in turn. On mobile — and whenever reduced
 * motion is requested — it is a plain vertical timeline with everything
 * visible and no pinning.
 */
export function MethodTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const fill = useTransform(scrollYProgress, [0, 0.9], [0.04, 1], { clamp: true });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(method.length - 1, Math.max(0, Math.floor(v * method.length + 0.15)));
    setActive(next);
  });

  const pinned = !reduced;

  return (
    <Surface tone="ink" id="method" grid aria-label="The TEAM VIGNESH method">
      {/* ---------- Mobile / reduced-motion: vertical timeline ---------- */}
      <div className={cn("shell section", pinned && "lg:hidden")}>
        <Header />

        <ol className="mt-12 flex flex-col">
          {method.map((step, i) => (
            <li key={step.index} className="relative flex gap-5 pb-9 last:pb-0">
              {/* rail */}
              <div className="relative flex flex-col items-center">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-accent/50 bg-ink">
                  <span className="index text-[0.6875rem] text-accent-text">{step.index}</span>
                </span>
                {i < method.length - 1 && (
                  <span aria-hidden="true" className="mt-2 w-px flex-1 bg-ink-muted" />
                )}
              </div>

              <div className="flex-1 pb-1">
                <h3 className="display display-sm text-bone">{step.title}</h3>
                <p className="copy mt-2 max-w-[44ch] text-bone/65">{step.body}</p>
                <p className="mt-2.5 max-w-[46ch] text-[0.875rem] leading-relaxed text-bone/55">
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* ---------- Desktop: pinned, scroll-linked rail ---------- */}
      {pinned && (
        <div ref={ref} className="hidden lg:block lg:h-[280vh]">
          <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden py-20">
            <div className="shell w-full">
              <Header />

              {/* Rail */}
              <div className="relative mt-16">
                <div className="h-px w-full bg-ink-muted" />
                <m.div
                  className="absolute left-0 top-0 h-px w-full origin-left bg-accent"
                  style={{ scaleX: fill }}
                />

                <ol className="grid grid-cols-4">
                  {method.map((step, i) => {
                    const isActive = i <= active;
                    const isCurrent = i === active;
                    return (
                      <li key={step.index} className="relative pr-8 pt-8">
                        {/* node */}
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute -top-[5px] left-0 block h-[10px] w-[10px] rotate-45 transition-colors duration-500 ease-out",
                            isActive ? "bg-accent" : "bg-ink-muted",
                          )}
                        />

                        <span
                          className={cn(
                            "index block text-[0.75rem] transition-colors duration-500 ease-out",
                            isCurrent
                              ? "text-accent-text"
                              : isActive
                                ? "text-bone/70"
                                : "text-bone/50",
                          )}
                        >
                          {step.index}
                        </span>

                        <h3
                          className={cn(
                            "display mt-3 text-[clamp(1.5rem,2.4vw,2.375rem)] transition-colors duration-500 ease-out",
                            isCurrent ? "text-bone" : isActive ? "text-bone/75" : "text-bone/50",
                          )}
                        >
                          {step.title}
                        </h3>

                        <p
                          className={cn(
                            "mt-3 max-w-[30ch] text-[0.9375rem] leading-relaxed transition-colors duration-500 ease-out",
                            isCurrent ? "text-bone/80" : "text-bone/55",
                          )}
                        >
                          {step.body}
                        </p>

                        {/* Detail only for the current stage — keeps the rail calm. */}
                        <m.p
                          aria-hidden={!isCurrent}
                          animate={{ opacity: isCurrent ? 1 : 0, y: isCurrent ? 0 : 6 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="mt-4 max-w-[32ch] border-l border-accent/40 pl-3.5 text-[0.875rem] leading-relaxed text-bone/50"
                        >
                          {step.detail}
                        </m.p>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <p className="index mt-14 text-[0.6875rem] text-bone/50">
                Stage {String(active + 1).padStart(2, "0")} / {String(method.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      )}
    </Surface>
  );
}

function Header() {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <SectionLabel index="05" className="text-bone/60">
          The TEAM VIGNESH method
        </SectionLabel>
        <SectionHeading size="md" className="mt-6 text-bone lg:mt-7">
          {methodHeading[0]}
          <span className="block text-bone/45">{methodHeading[1]}</span>
        </SectionHeading>
      </div>
      <p className="copy max-w-[40ch] text-bone/60 lg:col-span-5 lg:pb-1">
        Four stages, run in order, every time. The programme changes — the
        process does not.
      </p>
    </div>
  );
}
