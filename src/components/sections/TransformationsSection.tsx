import { Surface } from "@/components/ui/Surface";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealItem, RevealMask } from "@/components/ui/Motion";
import { TransformationCard } from "@/components/cards/TransformationCard";
import { Button, TextLink } from "@/components/ui/Button";
import { Figure } from "@/components/ui/Figure";
import { transformations, resultsDisclaimer } from "@/lib/content";
import { waMessages, whatsappLink } from "@/lib/site";

/**
 * SECTION 12 — transformations.
 *
 * The full UI exists and is wired up, but `transformations` in content.ts is
 * empty by design. Until a real, consented client story is added the section
 * shows an honest empty state instead of invented before/after photography or
 * fabricated testimonials.
 *
 * MOTION MOMENT 4 (once populated): the featured transformation image opens
 * with a mask reveal.
 */
export function TransformationsSection({ compact = false }: { compact?: boolean }) {
  const hasStories = transformations.length > 0;
  const [featured, ...rest] = transformations;

  return (
    <Surface tone="bone" className="section" aria-labelledby="transformations-heading">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel index="11" className="text-ink/60">
                Transformations
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionHeading id="transformations-heading" className="mt-6 text-ink">
                Real people.
                <span className="block text-ink/50">Real progress.</span>
              </SectionHeading>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5 lg:pb-2">
            <p className="copy max-w-[42ch] text-ink/70">
              Every transformation published here belongs to an actual client,
              shared with their permission.
            </p>
          </Reveal>
        </div>

        {hasStories ? (
          <>
            <RevealMask className="mt-12 rounded-sm">
              <TransformationCard item={featured} className="border-bone-line bg-[#EFECE5]" />
            </RevealMask>

            {rest.length > 0 && !compact && (
              <RevealGroup
                as="ul"
                stagger={0.08}
                className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {rest.map((item) => (
                  <RevealItem key={item.id} as="li">
                    <TransformationCard
                      item={item}
                      className="h-full border-bone-line bg-[#EFECE5]"
                      showTestimonial={false}
                    />
                  </RevealItem>
                ))}
              </RevealGroup>
            )}

            <Reveal>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href="/transformations" size="md">
                  See All Transformations
                </Button>
              </div>
            </Reveal>
          </>
        ) : (
          <EmptyState />
        )}

        <Reveal delay={0.05}>
          <p className="mt-10 max-w-[70ch] border-l-2 border-ink/15 pl-4 text-[0.8125rem] leading-relaxed text-ink/60">
            {resultsDisclaimer}
          </p>
        </Reveal>
      </div>
    </Surface>
  );
}

/**
 * Honest placeholder. It does not pretend clients exist, and it does not fill
 * the space with stock bodies — it explains the standard and offers the next step.
 */
function EmptyState() {
  return (
    <Reveal delay={0.05}>
      <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-bone-line bg-bone-line lg:grid-cols-2">
        <div className="flex flex-col justify-center bg-bone p-6 sm:p-10">
          <span className="label text-accent-ink">Coming soon</span>

          <h3 className="display display-sm mt-4 text-ink">
            This space is reserved for real client results.
          </h3>

          <p className="copy mt-4 max-w-[46ch] text-ink/65">
            No stock photography, no borrowed before-and-afters, no testimonials
            written on someone else&rsquo;s behalf. Client transformations are
            published here as programmes complete — with the client&rsquo;s
            written permission, their own words, and matching photographs from
            day one.
          </p>

          <ul className="mt-7 flex flex-col gap-2.5">
            {[
              "Baseline photographs taken on day one",
              "Same pose, same lighting, same framing",
              "Goal, programme and duration stated",
              "The client's own words, unedited",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3 text-[0.9375rem] text-ink/70">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-accent" />
                {line}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" size="md" className="w-full sm:w-auto">
              Start Your Transformation
            </Button>
            <TextLink
              href={whatsappLink(waMessages.transformation)}
              className="self-center text-ink hover:text-accent-ink"
            >
              Ask about the programme
            </TextLink>
          </div>
        </div>

        {/* Slot preview — shows the shape the real photographs will take. */}
        <div className="grid grid-cols-2 gap-px bg-bone-line">
          <div className="relative bg-bone">
            <Figure
              slot="transformation01Before"
              ratio="4/5"
              className="h-full w-full rounded-none"
              sizes="(max-width: 1024px) 50vw, 25vw"
              tone="bone"
              showNote={false}
            />
            <span className="label absolute left-3 top-3 rounded-sm bg-bone/80 px-2 py-1 text-ink/60 backdrop-blur-sm">
              Before
            </span>
          </div>
          <div className="relative bg-bone">
            <Figure
              slot="transformation01After"
              ratio="4/5"
              className="h-full w-full rounded-none"
              sizes="(max-width: 1024px) 50vw, 25vw"
              tone="bone"
              showNote={false}
            />
            <span className="label absolute left-3 top-3 rounded-sm bg-accent px-2 py-1 text-white">
              After
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
