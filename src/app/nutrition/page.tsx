import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Surface } from "@/components/ui/Surface";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealItem, RevealMask } from "@/components/ui/Motion";
import { Figure } from "@/components/ui/Figure";
import { MediaCard } from "@/components/cards/MediaCard";
import { Button } from "@/components/ui/Button";
import { nutritionCards, nutritionPage, nutritionTopics } from "@/lib/content";
import { waMessages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nutrition Coaching — Protein, Meal Structure & Indian Food",
  description:
    "Sustainable nutrition coaching with TEAM VIGNESH: daily protein, meal structure, pre-workout and post-workout meals, and practical Indian food options. No crash diets.",
  alternates: { canonical: "/nutrition" },
};

export default function NutritionPage() {
  return (
    <>
      <PageHero
        label="Nutrition"
        index="01"
        lines={["Eat to", "support the goal."]}
        supporting="Protein, structure and food you already eat. Nutrition guidance designed to survive a normal working week — not a two-week diet you abandon."
        placeholder="minimal"
        primary={{ label: "Get Nutrition Guidance", href: "/contact" }}
        secondary={{ label: "See Coaching", href: "/coaching#nutrition" }}
        meta={["Protein-led", "Indian food friendly", "No crash dieting"]}
      />

      {/* --- Philosophy --- */}
      <Surface tone="bone" className="section" aria-labelledby="nutrition-philosophy">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel index="02" className="text-ink/60">
                Nutrition philosophy
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionHeading id="nutrition-philosophy" size="md" className="mt-6 text-ink">
                Simple things,
                <span className="block text-ink/50">done for long enough.</span>
              </SectionHeading>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            {nutritionPage.philosophy.map((para, i) => (
              <Reveal key={i} delay={0.05 + i * 0.05}>
                <p
                  className={
                    i === 0 ? "text-lead max-w-[54ch] text-ink/80" : "copy mt-6 max-w-[58ch] text-ink/65"
                  }
                >
                  {para}
                </p>
              </Reveal>
            ))}

            <RevealGroup
              as="ul"
              stagger={0.06}
              className="mt-10 grid gap-px overflow-hidden rounded-sm border border-bone-line bg-bone-line sm:grid-cols-2"
            >
              {nutritionPage.pillars.map((p) => (
                <RevealItem key={p.title} as="li" className="bg-bone p-5 sm:p-6">
                  <span className="index text-[0.6875rem] text-accent-ink">{p.index}</span>
                  <h3 className="display display-sm mt-6 text-ink">{p.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink/60">{p.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Surface>

      {/* --- Protein + meal structure --- */}
      <Surface tone="ink" grid className="section" aria-labelledby="structure-heading">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel index="03" className="text-bone/60">
                Protein &amp; meal structure
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionHeading id="structure-heading" size="md" className="mt-6 text-bone">
                Build the day around protein.
              </SectionHeading>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="copy mt-6 max-w-[40ch] text-bone/60">
                Set protein first, then fit carbohydrate and fat around training
                and appetite. Your exact targets are set during coaching, based
                on your bodyweight, goal and training load.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <RevealMask className="mt-8 rounded-sm">
                <Figure
                  slot="nutritionProtein"
                  ratio="4/3"
                  className="w-full rounded-none border border-ink-line"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  showNote={false}
                />
              </RevealMask>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <ol className="border-t border-ink-line">
                {nutritionPage.mealStructure.map((row, i) => (
                  <li
                    key={row.slot}
                    className="grid grid-cols-[auto_1fr] items-baseline gap-4 border-b border-ink-line py-5 sm:grid-cols-[3rem_10rem_1fr] sm:gap-6"
                  >
                    <span className="index text-[0.6875rem] text-accent-text">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-[1rem] font-bold uppercase tracking-[0.05em] text-bone">
                      {row.slot}
                    </h3>
                    <p className="col-span-2 max-w-[52ch] text-[0.9375rem] leading-relaxed text-bone/55 sm:col-span-1">
                      {row.body}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-[64ch] border-l-2 border-ink-muted pl-4 text-[0.8125rem] leading-relaxed text-bone/55">
                {nutritionPage.disclaimer}
              </p>
            </Reveal>
          </div>
        </div>
      </Surface>

      {/* --- Around training --- */}
      <Surface tone="bone" className="section" aria-labelledby="meals-heading">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionLabel index="04" className="text-ink/60">
                  Around training
                </SectionLabel>
              </Reveal>
              <Reveal delay={0.05}>
                <SectionHeading id="meals-heading" className="mt-6 text-ink">
                  Train hard.
                  <span className="block text-ink/50">Eat with purpose.</span>
                </SectionHeading>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5 lg:pb-2">
              <p className="copy max-w-[42ch] text-ink/70">
                Four practical areas that make the biggest difference to how you
                train and recover.
              </p>
            </Reveal>
          </div>

          <RevealGroup
            as="ul"
            stagger={0.07}
            className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
          >
            {nutritionCards.map((card) => (
              <RevealItem key={card.title} as="li">
                <MediaCard
                  index={card.index}
                  title={card.title}
                  body={card.body}
                  image={card.image}
                  tone="bone"
                  sizes="(max-width: 640px) 30vw, 25vw"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Surface>

      {/* --- Topics covered in coaching --- */}
      <Surface tone="ink-elevated" className="section" aria-labelledby="topics-heading">
        <div className="shell">
          <Reveal>
            <SectionLabel index="05" className="text-bone/60">
              Covered in nutrition coaching
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <SectionHeading id="topics-heading" size="md" className="mt-6 max-w-[24ch] text-bone">
              Practical, not theoretical.
            </SectionHeading>
          </Reveal>

          <RevealGroup
            as="ul"
            stagger={0.05}
            className="mt-11 grid gap-px overflow-hidden rounded-sm border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-3"
          >
            {nutritionTopics.map((topic, i) => (
              <RevealItem key={topic.title} as="li" className="bg-ink-elevated p-5 sm:p-6">
                <span className="index text-[0.6875rem] text-bone/55">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display display-sm mt-6 text-bone">{topic.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-bone/55">
                  {topic.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <Button href="/contact" size="md" className="mt-10">
              Get Nutrition Guidance
            </Button>
          </Reveal>
        </div>
      </Surface>

      <ContactCTA
        heading={["Stop guessing", "what to eat."]}
        supporting="Send your goal and a normal day of eating. Vignesh will tell you what actually needs to change."
        primaryLabel="Get Nutrition Guidance"
        whatsappMessage={waMessages.nutrition}
      />
    </>
  );
}
