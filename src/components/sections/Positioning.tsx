import { Surface } from "@/components/ui/Surface";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HeroLines, RevealGroup, RevealItem, RevealLine, RevealText } from "@/components/ui/Motion";
import { TextLink } from "@/components/ui/Button";
import { positioning } from "@/lib/content";

/**
 * COACHING POSITIONING — the short statement between the founder and the
 * services. Deliberately typographic: the founder block above is image-dense,
 * so this section earns its place with whitespace rather than another photo.
 */
export function Positioning() {
  return (
    <Surface tone="bone" className="section" aria-labelledby="positioning-heading">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <RevealText>
            <SectionLabel index={positioning.index} className="text-ink/60">
              {positioning.label}
            </SectionLabel>
          </RevealText>

          <HeroLines
            as="h2"
            inView
            id="positioning-heading"
            lines={positioning.heading}
            className="display mt-8 text-[clamp(1.875rem,5.2vw,4rem)] text-ink"
            lineClassName="[&:nth-child(2)]:text-ink/50"
          />

          <RevealText delay={0.12}>
            <p className="text-lead mt-8 max-w-[54ch] text-ink/75">{positioning.body}</p>
          </RevealText>
        </div>

        <div className="lg:col-span-5">
          <RevealText>
            <div className="flex items-center gap-4 text-ink/25">
              <span className="label shrink-0 text-ink/60">The difference</span>
              <RevealLine delay={0.1} />
            </div>
          </RevealText>

          <RevealGroup as="ul" stagger={0.08} className="mt-2 flex flex-col">
            {positioning.pillars.map((pillar, i) => (
              <RevealItem
                key={pillar.title}
                as="li"
                className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-bone-line py-5"
              >
                <span className="index pt-1 text-[0.6875rem] text-accent-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-[1rem] font-bold uppercase tracking-[0.05em] text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 max-w-[38ch] text-[0.9375rem] leading-relaxed text-ink/60">
                    {pillar.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealText delay={0.1}>
            <TextLink href="/coaching" className="mt-6 text-ink hover:text-accent-ink">
              See how coaching works
            </TextLink>
          </RevealText>
        </div>
      </div>
    </Surface>
  );
}
