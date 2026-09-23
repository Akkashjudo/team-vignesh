import { Surface } from "@/components/ui/Surface";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Motion";
import { MediaCard } from "@/components/cards/MediaCard";
import { Button } from "@/components/ui/Button";
import { nutritionCards, nutritionHeading, nutritionSupporting } from "@/lib/content";

/**
 * SECTION 08 — nutrition, framed as education rather than a diet plan.
 * No restriction language, no crash dieting, no meal-plan gimmicks.
 */
export function NutritionSection() {
  return (
    <Surface tone="ink" className="section" aria-labelledby="nutrition-heading">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        {/* Left rail */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
            <Reveal>
              <SectionLabel index="08" className="text-bone/60">
                Nutrition
              </SectionLabel>
            </Reveal>

            <Reveal delay={0.05}>
              <SectionHeading id="nutrition-heading" size="md" className="mt-6 text-bone">
                {nutritionHeading}
              </SectionHeading>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="copy mt-6 max-w-[42ch] text-bone/65">{nutritionSupporting}</p>
            </Reveal>

            <Reveal delay={0.15}>
              <Button href="/nutrition" size="md" className="mt-8">
                Explore Nutrition
              </Button>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 max-w-[38ch] border-l-2 border-ink-muted pl-4 text-[0.8125rem] leading-relaxed text-bone/55">
                General nutrition guidance for healthy, active people — not
                clinical or medical dietary advice.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Cards */}
        <RevealGroup
          as="ul"
          stagger={0.07}
          className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:col-span-8"
        >
          {nutritionCards.map((card) => (
            <RevealItem key={card.title} as="li">
              <MediaCard
                index={card.index}
                title={card.title}
                body={card.body}
                image={card.image}
                sizes="(max-width: 640px) 30vw, 34vw"
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Surface>
  );
}
