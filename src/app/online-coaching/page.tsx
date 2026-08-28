import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { OnlineCoachingSection } from "@/components/sections/OnlineCoachingSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Surface } from "@/components/ui/Surface";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Motion";
import { Button } from "@/components/ui/Button";
import { onlinePage, onlinePillars } from "@/lib/content";
import { waMessages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Online Fitness Coaching — Train From Anywhere",
  description:
    "Online fitness coaching with TEAM VIGNESH: a personalised training plan, nutrition guidance, progress monitoring and direct coach support, built around your schedule and equipment.",
  alternates: { canonical: "/online-coaching" },
};

export default function OnlineCoachingPage() {
  return (
    <>
      <PageHero
        label="Online Coaching"
        index="01"
        lines={["Structured coaching.", "Wherever", "you train."]}
        supporting={onlinePage.intro}
        image="onlineCoaching"
        placeholder="minimal"
        primary={{ label: "Apply For Online Coaching", href: "/contact" }}
        secondary={{ label: "Compare Services", href: "/coaching" }}
        meta={["Any location", "Any equipment", "Scheduled check-ins"]}
      />

      {/* --- What you get --- */}
      <Surface tone="bone" className="section" aria-labelledby="pillars-heading">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionLabel index="02" className="text-ink/60">
                  What is included
                </SectionLabel>
              </Reveal>
              <Reveal delay={0.05}>
                <SectionHeading id="pillars-heading" className="mt-6 text-ink">
                  Five things,
                  <span className="block text-ink/50">every single month.</span>
                </SectionHeading>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5 lg:pb-2">
              <p className="copy max-w-[42ch] text-ink/70">
                Online coaching is not a PDF. It is the same method Vignesh uses
                in person, run remotely with regular contact.
              </p>
            </Reveal>
          </div>

          <RevealGroup
            as="ul"
            stagger={0.06}
            className="mt-12 grid gap-px overflow-hidden rounded-sm border border-bone-line bg-bone-line sm:grid-cols-2 lg:grid-cols-5"
          >
            {onlinePillars.map((pillar, i) => (
              <RevealItem key={pillar.title} as="li" className="h-full bg-bone p-5 sm:p-6">
                <span className="index text-[0.6875rem] text-accent-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-7 text-[1.0625rem] text-ink">{pillar.title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink/60">
                  {pillar.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {onlinePage.includes.map((line) => (
                <li key={line} className="flex items-start gap-3 text-body-sm text-ink/70">
                  <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-accent" />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Surface>

      {/* --- The six-step process (shared with the homepage) --- */}
      <OnlineCoachingSection />

      {/* --- Honest fit check --- */}
      <Surface tone="ink-elevated" className="section" aria-labelledby="fit-heading">
        <div className="shell">
          <Reveal>
            <SectionLabel index="04" className="text-bone/60">
              Is it right for you?
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <SectionHeading id="fit-heading" size="md" className="mt-6 max-w-[26ch] text-bone">
              Online coaching suits some people better than others.
            </SectionHeading>
          </Reveal>

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-sm border border-accent/35 bg-ink p-5 sm:p-7">
                <p className="label text-accent-text">A good fit if</p>
                <ul className="mt-6 flex flex-col gap-3">
                  {onlinePage.suitedFor.map((line) => (
                    <li key={line} className="flex items-start gap-3 text-body-sm text-bone/75">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-accent" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              {/* Saying who it does NOT suit is what makes the rest credible. */}
              <div className="h-full rounded-sm border border-ink-line bg-ink p-5 sm:p-7">
                <p className="label text-bone/55">Probably not if</p>
                <ul className="mt-6 flex flex-col gap-3">
                  {onlinePage.notSuitedFor.map((line) => (
                    <li key={line} className="flex items-start gap-3 text-body-sm text-bone/60">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-bone/30" />
                      {line}
                    </li>
                  ))}
                </ul>

                <Button
                  href="/coaching#offline-coaching"
                  variant="outline"
                  size="sm"
                  className="mt-7 text-bone"
                >
                  See Offline Coaching
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Surface>

      <ContactCTA
        heading={["Your location", "is not the problem."]}
        supporting="Send your goal, your schedule and the equipment you can access. Vignesh will build the plan around it."
        primaryLabel="Apply For Online Coaching"
        whatsappMessage={waMessages.online}
      />
    </>
  );
}
