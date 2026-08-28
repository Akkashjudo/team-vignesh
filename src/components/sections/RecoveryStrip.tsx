import { Surface } from "@/components/ui/Surface";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HeroLines, RevealGroup, RevealItem, RevealText } from "@/components/ui/Motion";
import { Figure } from "@/components/ui/Figure";
import { Button } from "@/components/ui/Button";
import { recoveryNote, recoveryServices } from "@/lib/content";

/**
 * RECOVERY — the third leg of the system, kept compact on the homepage.
 * The full treatment lives on /recovery.
 */
export function RecoveryStrip() {
  return (
    <Surface tone="ink" className="section" aria-labelledby="recovery-heading">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <RevealText>
            <SectionLabel index="09" className="text-bone/60">
              Recovery
            </SectionLabel>
          </RevealText>

          <HeroLines
            as="h2"
            inView
            id="recovery-heading"
            lines={["Recovery is what", "lets you repeat it."]}
            className="display display-md mt-6 text-bone"
            lineClassName="[&:nth-child(2)]:text-bone/45"
          />

          <RevealText delay={0.12}>
            <p className="copy mt-6 max-w-[40ch] text-bone/65">
              Sports massage and deep tissue sessions for people who train —
              scheduled around your week rather than only when something already
              hurts.
            </p>
          </RevealText>

          <RevealText delay={0.18}>
            <Button href="/recovery" variant="outline" size="md" className="mt-8 text-bone">
              Explore Recovery
            </Button>
          </RevealText>

          <RevealText delay={0.22}>
            <p className="mt-8 max-w-[46ch] border-l-2 border-ink-muted pl-4 text-[0.8125rem] leading-relaxed text-bone/50">
              {recoveryNote}
            </p>
          </RevealText>
        </div>

        <RevealGroup
          as="ul"
          stagger={0.07}
          className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:col-span-7"
        >
          {recoveryServices.map((service) => (
            <RevealItem key={service.title} as="li">
              <article className="hover-lift hover-zoom group flex h-full flex-col overflow-hidden rounded-sm border border-ink-line bg-ink-elevated hover:border-accent/45">
                <Figure
                  slot={service.image}
                  ratio="4/3"
                  className="w-full rounded-none border-b border-ink-line"
                  sizes="(max-width: 640px) 100vw, 30vw"
                  showNote={false}
                />
                <div className="flex flex-1 flex-col p-5">
                  <span className="index text-[0.6875rem] text-accent-text">{service.index}</span>
                  <h3 className="display display-sm mt-3 text-bone">{service.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-bone/60">
                    {service.body}
                  </p>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Surface>
  );
}
