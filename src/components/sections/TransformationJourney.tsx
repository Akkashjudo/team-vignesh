import { Surface } from "@/components/ui/Surface";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Motion";
import { Figure } from "@/components/ui/Figure";
import { journeyStages, resultsDisclaimer } from "@/lib/content";

/**
 * SECTION 05 — Day 1 → Day 30 → Day 60.
 * A process, not a promise. The disclaimer is part of the section, not
 * buried in the footer.
 */
export function TransformationJourney() {
  return (
    <Surface tone="bone" className="section" aria-labelledby="journey-heading">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel index="04" className="text-ink/60">
                The 60-day view
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionHeading id="journey-heading" className="mt-6 text-ink">
                Progress you can see.
                <span className="block text-ink/50">A process you can follow.</span>
              </SectionHeading>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5 lg:pb-2">
            <p className="copy max-w-[42ch] text-ink/70">
              Every client is measured on day one and reviewed against that
              baseline — not against how a session felt.
            </p>
          </Reveal>
        </div>

        {/* Timeline */}
        <RevealGroup
          as="ol"
          stagger={0.1}
          className="mt-14 grid gap-8 md:grid-cols-3 md:gap-5"
        >
          {journeyStages.map((stage, i) => (
            <RevealItem key={stage.day} as="li" className="relative">
              {/* Connector — horizontal on desktop, vertical on mobile */}
              <span
                aria-hidden="true"
                className="absolute left-[1.0625rem] top-[4.5rem] h-[calc(100%-2rem)] w-px bg-bone-line md:left-0 md:top-[1.0625rem] md:h-px md:w-full"
              />
              {i === 0 && (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[1.0625rem] hidden h-px w-1/2 bg-bone md:block"
                />
              )}
              {i === journeyStages.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-[1.0625rem] hidden h-px w-1/2 bg-bone md:block"
                />
              )}

              <div className="relative flex items-start gap-4 md:block">
                <span
                  aria-hidden="true"
                  className="mt-[0.4rem] flex h-[2.125rem] w-[2.125rem] shrink-0 items-center justify-center rounded-sm border border-ink/15 bg-bone md:mt-0"
                >
                  <span className="h-2 w-2 rotate-45 bg-accent" />
                </span>

                <div className="flex-1 md:mt-7">
                  <p className="index text-[0.75rem] font-medium uppercase tracking-[0.16em] text-accent-ink">
                    {stage.day}
                  </p>
                  <h3 className="display display-sm mt-2.5 text-ink">{stage.title}</h3>
                  <p className="copy mt-3 max-w-[36ch] text-ink/65">{stage.body}</p>

                  {/* Before / after photography drops in here. */}
                  <Figure
                    slot={stage.image}
                    ratio="4/3"
                    className="mt-6 w-full rounded-sm border border-bone-line"
                    sizes="(max-width: 768px) 100vw, 32vw"
                    tone="bone"
                  />
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.05}>
          <p className="mt-10 max-w-[70ch] border-l-2 border-ink/15 pl-4 text-[0.8125rem] leading-relaxed text-ink/60">
            {resultsDisclaimer}
          </p>
        </Reveal>
      </div>
    </Surface>
  );
}
