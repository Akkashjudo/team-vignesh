import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Surface } from "@/components/ui/Surface";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealItem, RevealMask } from "@/components/ui/Motion";
import { Figure } from "@/components/ui/Figure";
import { MediaCard } from "@/components/cards/MediaCard";
import { Button } from "@/components/ui/Button";
import { recoveryNote, recoveryPage, recoveryServices } from "@/lib/content";
import { waMessages, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Recovery — Sports Massage & Deep Tissue Therapy",
  description:
    "Sports massage, deep tissue therapy, training recovery and mobility support with Vigneshwaran, a certified sports massage and deep tissue therapist.",
  alternates: { canonical: "/recovery" },
};

export default function RecoveryPage() {
  return (
    <>
      <PageHero
        label="Recovery"
        index="01"
        lines={["Train.", "Recover.", "Repeat."]}
        supporting={recoveryPage.intro}
        placeholder="minimal"
        primary={{ label: "Book A Recovery Session", href: "/contact" }}
        secondary={{ label: "See Coaching", href: "/coaching#recovery" }}
        meta={["Sports massage", "Deep tissue", "Mobility support"]}
      />

      {/* --- Services --- */}
      <Surface tone="bone" className="section" aria-labelledby="recovery-services-heading">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionLabel index="02" className="text-ink/60">
                  Recovery services
                </SectionLabel>
              </Reveal>
              <Reveal delay={0.05}>
                <SectionHeading id="recovery-services-heading" className="mt-6 text-ink">
                  Recovery is part
                  <span className="block text-ink/50">of the programme.</span>
                </SectionHeading>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5 lg:pb-2">
              <p className="copy max-w-[42ch] text-ink/70">
                Soft tissue work for people who train — scheduled around your
                week rather than only when something already hurts.
              </p>
            </Reveal>
          </div>

          <RevealGroup
            as="ul"
            stagger={0.07}
            className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-4"
          >
            {recoveryServices.map((service) => (
              <RevealItem key={service.title} as="li">
                <MediaCard
                  index={service.index}
                  title={service.title}
                  body={service.body}
                  image={service.image}
                  tone="bone"
                  ratio="3/2"
                  sizes="(max-width: 640px) 30vw, 45vw"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Surface>

      {/* --- Who it suits + how a session runs --- */}
      <Surface tone="ink" grid className="section" aria-labelledby="session-heading">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel index="03" className="text-bone/60">
                Who it suits
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionHeading size="md" className="mt-6 text-bone">
                For people who train.
              </SectionHeading>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-8 flex flex-col gap-3">
                {recoveryPage.who.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-body-sm text-bone/70">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-accent" />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <RevealMask className="mt-9 rounded-sm">
                <Figure
                  slot="recovery"
                  ratio="3/2"
                  className="w-full rounded-none border border-ink-line"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  showNote={false}
                />
              </RevealMask>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel index="04" className="text-bone/60">
                How a session runs
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionHeading id="session-heading" size="md" className="mt-6 text-bone">
                Three parts. No mystery.
              </SectionHeading>
            </Reveal>

            <RevealGroup as="ol" stagger={0.07} className="mt-10 border-t border-ink-line">
              {recoveryPage.session.map((step) => (
                <RevealItem
                  key={step.index}
                  as="li"
                  className="grid grid-cols-[auto_1fr] gap-5 border-b border-ink-line py-6"
                >
                  <span className="index text-[0.6875rem] text-accent-text">{step.index}</span>
                  <div>
                    <h3 className="display display-sm text-bone">{step.title}</h3>
                    <p className="copy mt-2 max-w-[48ch] text-bone/60">{step.body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            {/* Careful wording — supportive, never a medical claim. */}
            <Reveal delay={0.1}>
              <div className="mt-9 rounded-sm border border-ink-line bg-ink-elevated p-5 sm:p-6">
                <p className="label text-bone/55">Important</p>
                <p className="mt-3 max-w-[64ch] text-[0.875rem] leading-relaxed text-bone/60">
                  {recoveryNote}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" size="md" className="w-full sm:w-auto">
                  Book A Recovery Session
                </Button>
                <Button
                  href={whatsappLink(waMessages.recovery)}
                  variant="whatsapp"
                  size="md"
                  className="w-full text-bone sm:w-auto"
                  whatsapp
                  arrow={false}
                >
                  Check Availability
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Surface>

      <ContactCTA
        heading={["Recover properly.", "Train again sooner."]}
        supporting="Book a session around your training week, or ask what would suit your current load."
        primaryLabel="Book A Recovery Session"
        whatsappMessage={waMessages.recovery}
      />
    </>
  );
}
