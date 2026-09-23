import type { Metadata } from "next";

import { PageHero } from "@/components/sections/PageHero";
import { TransformationsSection } from "@/components/sections/TransformationsSection";
import { TransformationJourney } from "@/components/sections/TransformationJourney";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Surface } from "@/components/ui/Surface";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Motion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Transformations — Real Client Progress",
  description:
    "Body transformation and body recomposition coaching with TEAM VIGNESH. How progress is measured, reviewed at day 30 and day 60, and published — with client permission only.",
  alternates: { canonical: "/transformations" },
};

/** What is actually tracked across a programme. Process, not promises. */
const measured = [
  {
    index: "01",
    title: "Baseline photographs",
    body: "Taken on day one in consistent lighting and framing so later photos are genuinely comparable.",
  },
  {
    index: "02",
    title: "Body measurements",
    body: "Weight and site measurements recorded at the start and revisited at each review point.",
  },
  {
    index: "03",
    title: "Training performance",
    body: "Loads, reps and session quality logged, so strength progress is visible even when the scale is not moving.",
  },
  {
    index: "04",
    title: "Consistency",
    body: "Sessions completed, nutrition followed, sleep and recovery. The inputs that explain the outputs.",
  },
];

export default function TransformationsPage() {
  return (
    <>
      <PageHero
        label="Transformations"
        index="01"
        lines={["The work", "shows."]}
        supporting={`Transformation at ${site.brand} is a measured process — a baseline on day one, a review at day 30, a fuller review at day 60, and honest adjustments in between.`}
        image="transformationsHero"
        primary={{ label: "Start Your Transformation", href: "/contact" }}
        secondary={{ label: "See The Method", href: "/coaching" }}
        meta={["Baseline on day 01", "Reviewed at day 30", "Reviewed at day 60"]}
      />

      {/* Real stories, or an honest empty state while there are none to show. */}
      <TransformationsSection />

      {/* --- What actually gets measured --- */}
      <Surface tone="ink" grid className="section" aria-labelledby="measured-heading">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionLabel index="03" className="text-bone/60">
                  What gets measured
                </SectionLabel>
              </Reveal>
              <Reveal delay={0.05}>
                <SectionHeading id="measured-heading" className="mt-6 text-bone">
                  Progress is tracked.
                  <span className="block text-bone/45">Not assumed.</span>
                </SectionHeading>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-5 lg:pb-2">
              <p className="copy max-w-[42ch] text-bone/60">
                A transformation is only real if it can be shown. Four things
                are recorded from day one so progress is a fact, not a feeling.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-4">
            {measured.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="h-full bg-ink-elevated p-5 sm:p-6">
                  <span className="index text-[0.6875rem] text-accent-text">{item.index}</span>
                  <h3 className="display display-sm mt-7 text-bone">{item.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-bone/55">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Surface>

      {/* --- The 60-day process --- */}
      <TransformationJourney />

      <ContactCTA
        heading={["The first photo", "is the hardest one."]}
        supporting="Day one is just a baseline. Everything after it is work you can actually see."
        primaryLabel="Start Your Transformation"
      />
    </>
  );
}
