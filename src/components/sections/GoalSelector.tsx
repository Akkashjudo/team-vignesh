import { Surface } from "@/components/ui/Surface";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Motion";
import { GoalCard } from "@/components/cards/GoalCard";
import { TextLink } from "@/components/ui/Button";
import { goals, goalsHeading } from "@/lib/content";

/**
 * SECTION 03 — goal selector.
 * MOTION MOMENT 2: the cards arrive in a controlled stagger, once.
 */
export function GoalSelector() {
  return (
    <Surface tone="ink" grid className="section" aria-labelledby="goals-heading">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[24ch]">
            <Reveal>
              <SectionLabel index="03" className="text-bone/60">
                Choose your direction
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionHeading id="goals-heading" className="mt-6 text-bone">
                {goalsHeading}
              </SectionHeading>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:pb-2">
            <p className="copy max-w-[38ch] text-bone/60">
              Every programme starts with the goal. Pick the one closest to yours
              and see how it is coached.
            </p>
            <TextLink href="/coaching" className="mt-6 text-bone hover:text-accent-text">
              All coaching options
            </TextLink>
          </Reveal>
        </div>

        <RevealGroup
          as="ul"
          stagger={0.06}
          className="mt-12 grid grid-cols-1 gap-3 min-[440px]:grid-cols-2 sm:gap-4 lg:grid-cols-3"
        >
          {goals.map((goal) => (
            <RevealItem key={goal.title} as="li">
              <GoalCard goal={goal} className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Surface>
  );
}
