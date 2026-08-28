"use client";

import { useState } from "react";
import { Surface } from "@/components/ui/Surface";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Motion";
import { TextLink } from "@/components/ui/Button";
import { faqs } from "@/lib/content";
import { site, telLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * SECTION 14 — FAQ.
 * Height animates via a 0fr → 1fr grid row, so there is no JS measurement and
 * nothing to jank. Micro-interaction only; no entrance choreography.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Surface tone="bone" id="faq" className="section" aria-labelledby="faq-heading">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
            <Reveal>
              <SectionLabel index="12" className="text-ink/60">
                Questions
              </SectionLabel>
            </Reveal>

            <Reveal delay={0.05}>
              <SectionHeading id="faq-heading" size="md" className="mt-6 text-ink">
                Before you start.
              </SectionHeading>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="copy mt-5 max-w-[34ch] text-ink/65">
                Anything not covered here — just ask. Straight answers, no sales
                script.
              </p>
              <a
                href={telLink}
                className="index mt-5 inline-block py-2.5 text-[0.9375rem] text-ink/70 transition-colors hover:text-accent-ink"
              >
                {site.phoneDisplay}
              </a>
              <TextLink href="/contact" className="mt-5 text-ink hover:text-accent-ink">
                Send an enquiry
              </TextLink>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <ul className="border-t border-bone-line">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="border-b border-bone-line">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-trigger-${i}`}
                      className="group flex w-full items-start justify-between gap-5 py-5 text-left sm:py-6"
                    >
                      <span className="flex items-baseline gap-4">
                        <span
                          className={cn(
                            "index text-[0.6875rem] transition-colors duration-300",
                            isOpen ? "text-accent-ink" : "text-ink/60",
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "font-display text-[1.0625rem] font-bold uppercase leading-tight tracking-[0.01em] transition-colors duration-300 sm:text-[1.25rem]",
                            isOpen ? "text-ink" : "text-ink/75 group-hover:text-ink",
                          )}
                        >
                          {item.q}
                        </span>
                      </span>

                      <span
                        aria-hidden="true"
                        className={cn(
                          "relative mt-1.5 block h-3.5 w-3.5 shrink-0 transition-transform duration-500 ease-out",
                          isOpen && "rotate-45",
                        )}
                      >
                        <span
                          className={cn(
                            "absolute left-0 top-1/2 h-px w-full -translate-y-1/2 transition-colors duration-300",
                            isOpen ? "bg-accent" : "bg-ink/45",
                          )}
                        />
                        <span
                          className={cn(
                            "absolute left-1/2 top-0 h-full w-px -translate-x-1/2 transition-colors duration-300",
                            isOpen ? "bg-accent" : "bg-ink/45",
                          )}
                        />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="copy max-w-[62ch] pb-6 pl-0 pr-6 text-ink/65 sm:pl-[3.25rem]">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Surface>
  );
}
