import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/sections/PageHero";
import { Qualifications } from "@/components/sections/Qualifications";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Surface } from "@/components/ui/Surface";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionLabel";
import { Reveal, RevealMask } from "@/components/ui/Motion";
import { Figure } from "@/components/ui/Figure";
import { about, services } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `About ${site.trainer} — Personal Trainer & Coach`,
  description:
    "Vigneshwaran is a certified personal trainer, sports coach, fitness nutrition coach and sports massage therapist. Coaching built around the person, not just the programme.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        index="01"
        lines={["Coaching built", "around the person.", "Not just the programme."]}
        supporting={about.intro}
        image="vigneshPortrait"
        primary={{ label: "Train With Vignesh", href: "/contact" }}
        secondary={{ label: "See Coaching", href: "/coaching" }}
        meta={["Personal training", "Nutrition", "Recovery", "Online coaching"]}
      />

      {/* --- Who is Vignesh / philosophy --- */}
      <Surface tone="bone" className="section" aria-labelledby="philosophy-heading">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel index="02" className="text-ink/60">
                Training philosophy
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionHeading id="philosophy-heading" size="md" className="mt-6 text-ink">
                Understand the person.
                <span className="block text-ink/50">Then build the plan.</span>
              </SectionHeading>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            {about.philosophy.map((para, i) => (
              <Reveal key={i} delay={0.05 + i * 0.05}>
                <p
                  className={
                    i === 0
                      ? "text-lead max-w-[54ch] text-ink/80"
                      : "copy mt-6 max-w-[58ch] text-ink/65"
                  }
                >
                  {para}
                </p>
              </Reveal>
            ))}

            <Reveal delay={0.15}>
              <div className="mt-10 grid gap-px overflow-hidden rounded-sm border border-bone-line bg-bone-line sm:grid-cols-2">
                {about.approach.map((item) => (
                  <div key={item.title} className="bg-bone p-5 sm:p-6">
                    <h3 className="font-display text-[0.9375rem] font-bold uppercase tracking-[0.05em] text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink/60">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Surface>

      {/* --- Qualifications (shared with the homepage) --- */}
      <Qualifications />

      {/* --- Fitness journey — awaiting Vignesh's own words --- */}
      <Surface tone="ink" className="section" aria-labelledby="journey-heading">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <RevealMask className="rounded-sm">
              <Figure
                slot="vigneshGymWide"
                ratio="3/2"
                className="w-full rounded-none border border-ink-line"
                sizes="(max-width: 1024px) 100vw, 48vw"
                showNote={false}
              />
            </RevealMask>
          </div>

          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel index="04" className="text-bone/60">
                Fitness journey
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionHeading id="journey-heading" size="md" className="mt-6 text-bone">
                The story behind {site.brand}.
              </SectionHeading>
            </Reveal>

            {/*
              EDITABLE PLACEHOLDER — see `about.journeyPlaceholder` in
              src/lib/content.ts. Deliberately not filled with an invented
              backstory; replace it with Vignesh's own account.
            */}
            <Reveal delay={0.1}>
              <p className="copy mt-7 max-w-[52ch] border-l-2 border-accent/50 pl-5 text-bone/60">
                {about.journeyPlaceholder}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <dl className="mt-9 grid gap-px overflow-hidden rounded-sm border border-ink-line bg-ink-line sm:grid-cols-2">
                <div className="bg-ink-elevated p-5">
                  <dt className="label text-bone/55">Coach</dt>
                  <dd className="mt-2 text-[1.0625rem] text-bone">{site.trainer}</dd>
                </div>
                <div className="bg-ink-elevated p-5">
                  <dt className="label text-bone/55">Practice</dt>
                  <dd className="mt-2 text-[1.0625rem] text-bone">{site.brand}</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </Surface>

      {/* --- Services --- */}
      <Surface tone="ink-elevated" className="section" aria-labelledby="about-services-heading">
        <div className="shell">
          <Reveal>
            <SectionLabel index="05" className="text-bone/60">
              What Vignesh coaches
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <SectionHeading id="about-services-heading" size="md" className="mt-6 max-w-[20ch] text-bone">
              Six services. One method.
            </SectionHeading>
          </Reveal>

          <ul className="mt-12 border-t border-ink-line">
            {services.map((service, i) => (
              <Reveal key={service.id} as="li" delay={i * 0.04}>
                <Link
                  href={service.href}
                  className="hover-arrow group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-ink-line py-5 transition-colors hover:bg-ink/60 sm:gap-8 sm:py-7"
                >
                  <span className="index text-[0.6875rem] text-bone/55 transition-colors group-hover:text-accent-text">
                    {service.index}
                  </span>

                  <div className="min-w-0">
                    <h3 className="display display-sm text-bone">{service.title}</h3>
                    <p className="mt-1.5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-bone/50">
                      {service.short}
                    </p>
                  </div>

                  <span className="arrow shrink-0 text-bone/55 transition-colors group-hover:text-accent-text">
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Surface>

      {/* --- Values --- */}
      <Surface tone="bone" className="section" aria-labelledby="values-heading">
        <div className="shell">
          <Reveal>
            <SectionLabel index="06" className="text-ink/60">
              Personal values
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <SectionHeading id="values-heading" size="md" className="mt-6 max-w-[22ch] text-ink">
              What the coaching is built on.
            </SectionHeading>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-bone-line bg-bone-line sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.05}>
                <div className="h-full bg-bone p-5 sm:p-7">
                  <span className="index text-[0.6875rem] text-accent-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display display-sm mt-6 text-ink">{value.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink/60">
                    {value.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Surface>

      <ContactCTA
        heading={["Train with a coach", "who has a system."]}
        supporting="Tell Vignesh where you are now and what you want to change. The plan follows from there."
        primaryLabel="Book A Consultation"
      />
    </>
  );
}
