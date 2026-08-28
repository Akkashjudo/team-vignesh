import { Surface } from "@/components/ui/Surface";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionLabel";
import { Reveal, RevealMask } from "@/components/ui/Motion";
import { Figure } from "@/components/ui/Figure";
import { trainingHeading, trainingSupporting, workoutSystem } from "@/lib/content";

/**
 * SECTION 07 — the training system.
 * Editorial, three different card weights. Deliberately not six icon tiles.
 */
export function WorkoutSystem() {
  const [lead, ...rest] = workoutSystem;
  const mid = rest.slice(0, 2);
  const small = rest.slice(2);

  return (
    <Surface tone="bone" className="section" aria-labelledby="training-heading">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel index="07" className="text-ink/60">
                The workout system
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionHeading id="training-heading" className="mt-6 text-ink">
                {trainingHeading}
              </SectionHeading>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5 lg:pb-2">
            <p className="copy max-w-[44ch] text-ink/70">{trainingSupporting}</p>
          </Reveal>
        </div>

        {/* --- Lead + two mid blocks --- */}
        <div className="mt-14 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7" delay={0.05}>
            <article className="hover-zoom group relative h-full overflow-hidden rounded-sm border border-bone-line">
              <RevealMask>
                <Figure
                  slot={lead.image}
                  ratio="3/2"
                  className="w-full rounded-none"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  tone="bone"
                  overlay="scrim"
                  showNote={false}
                />
              </RevealMask>

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <span className="index text-[0.6875rem] text-bone/70">{lead.index}</span>
                <h3 className="display display-md mt-2 text-bone">{lead.title}</h3>
                <p className="copy mt-2.5 max-w-[38ch] text-bone/75">{lead.body}</p>
              </div>
            </article>
          </Reveal>

          <div className="grid gap-4 lg:col-span-5">
            {mid.map((item, i) => (
              <Reveal key={item.title} delay={0.1 + i * 0.05}>
                <article className="hover-lift hover-zoom group flex h-full items-stretch gap-4 overflow-hidden rounded-sm border border-bone-line bg-bone hover:border-ink/25 sm:gap-5">
                  <Figure
                    slot={item.image}
                    ratio="1/1"
                    className="w-[6.5rem] shrink-0 rounded-none border-r border-bone-line sm:w-[9rem]"
                    sizes="(max-width: 640px) 30vw, 12vw"
                    tone="bone"
                    showNote={false}
                  />
                  <div className="flex flex-1 flex-col justify-center py-4 pr-4 sm:py-5 sm:pr-6">
                    <span className="index text-[0.6875rem] text-accent-ink">{item.index}</span>
                    <h3 className="display display-sm mt-2 text-ink">{item.title}</h3>
                    <p className="mt-2 max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink/60">
                      {item.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* --- Three type-led blocks --- */}
        <div className="mt-4 grid gap-px overflow-hidden rounded-sm border border-bone-line bg-bone-line sm:grid-cols-3">
          {small.map((item, i) => (
            <Reveal key={item.title} delay={0.05 + i * 0.05}>
              <article className="group h-full bg-bone p-5 transition-colors duration-500 hover:bg-[#EFECE5] sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="index text-[0.6875rem] text-ink/60">{item.index}</span>
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rotate-45 bg-ink/15 transition-colors duration-500 group-hover:bg-accent"
                  />
                </div>
                <h3 className="display display-sm mt-8 text-ink">{item.title}</h3>
                <p className="mt-2.5 max-w-[32ch] text-[0.9375rem] leading-relaxed text-ink/60">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Surface>
  );
}
