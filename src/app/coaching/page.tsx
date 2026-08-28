import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/sections/PageHero";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { MethodTimeline } from "@/components/sections/MethodTimeline";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Surface } from "@/components/ui/Surface";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Motion";
import { services } from "@/lib/content";
import { FOUNDER_GRADE } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Coaching — Personal Training, Online Coaching & Recovery",
  description:
    "Personal training, online coaching, body recomposition, nutrition, sports massage and offline coaching with Vigneshwaran. Who each service is for, what you work on and how it runs.",
  alternates: { canonical: "/coaching" },
};

/** Display order on this page — the two primary offers lead. */
const ORDER = [
  "personal-training",
  "online-coaching",
  "body-recomposition",
  "nutrition",
  "recovery",
  "offline-coaching",
];

const ordered = ORDER.map((id) => services.find((s) => s.id === id)!).filter(Boolean);

export default function CoachingPage() {
  return (
    <>
      <PageHero
        label="Coaching"
        index="01"
        lines={["One system.", "Six ways", "to work with it."]}
        supporting={`Every service at ${site.brand} runs on the same method — assess, plan, train, review. What changes is the format, the focus and how often you and Vignesh work together.`}
        primary={{ label: "Book A Consultation", href: "/contact" }}
        secondary={{ label: "Apply For Online Coaching", href: "/online-coaching" }}
        image="vigneshGymWide"
        imageClassName={FOUNDER_GRADE}
        meta={["No fixed templates", "Online & in person", "Nutrition included"]}
      />

      {/* --- Index of services --- */}
      <Surface tone="ink-elevated" className="section" aria-labelledby="index-heading">
        <div className="shell">
          <Reveal>
            <SectionLabel index="02" className="text-bone/60">
              Services index
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <SectionHeading id="index-heading" size="md" className="mt-6 max-w-[24ch] text-bone">
              Start with the one closest to your goal.
            </SectionHeading>
          </Reveal>

          <ul className="mt-11 grid gap-px overflow-hidden rounded-sm border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-3">
            {ordered.map((service, i) => (
              <Reveal key={service.id} as="li" delay={i * 0.04}>
                <Link
                  href={`#${service.id}`}
                  className="group flex h-full flex-col justify-between gap-8 bg-ink-elevated p-5 transition-colors duration-500 hover:bg-ink sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="index text-[0.6875rem] text-bone/55">{service.index}</span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="mt-0.5 text-bone/50 transition-all duration-500 ease-out group-hover:translate-y-1 group-hover:text-accent-text"
                    >
                      <path d="M8 2v11M3.5 9 8 13.5 12.5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="display display-sm text-bone">{service.title}</h3>
                    <p className="mt-2 max-w-[30ch] text-[0.875rem] leading-relaxed text-bone/50">
                      {service.short}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.1}>
            {/* Pricing is intentionally absent until real pricing is supplied. */}
            <p className="mt-9 max-w-[64ch] border-l-2 border-ink-muted pl-4 text-[0.8125rem] leading-relaxed text-bone/55">
              Programme structure and pricing are confirmed after a short
              consultation, once Vignesh understands your goal, schedule and
              starting point.
            </p>
          </Reveal>
        </div>
      </Surface>

      {/* --- Every service in full --- */}
      {ordered.map((service, i) => (
        <ServiceDetail
          key={service.id}
          service={service}
          flip={i % 2 === 1}
          tone={i % 2 === 1 ? "bone" : "ink"}
        />
      ))}

      <MethodTimeline />

      <ContactCTA
        heading={["Not sure which one", "fits you?"]}
        supporting="Send your goal and current training situation. Vignesh will tell you honestly which format makes sense — and if none of them do, he will say that too."
        primaryLabel="Book A Consultation"
      />
    </>
  );
}
