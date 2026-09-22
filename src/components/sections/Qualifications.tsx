import { Surface } from "@/components/ui/Surface";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Motion";
import { Figure } from "@/components/ui/Figure";
import { QualificationCard } from "@/components/cards/QualificationCard";
import { qualifications, qualificationsHeading } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * SECTION 10 — credentials, presented as a technical record rather than a wall
 * of certificate graphics. Only the four supplied certifications appear here;
 * nothing else is claimed.
 */
export function Qualifications() {
  return (
    <Surface tone="ink-elevated" className="section" aria-labelledby="quals-heading">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel index="10" className="text-bone/60">
                Qualifications
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionHeading id="quals-heading" className="mt-6 text-bone">
                {qualificationsHeading}
              </SectionHeading>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5 lg:pb-2">
            <p className="copy max-w-[40ch] text-bone/60">
              Four certifications covering training, coaching, nutrition and
              soft tissue therapy — the full span of what {site.trainerShort}{" "}
              works on with clients.
            </p>
          </Reveal>
        </div>

        {/* Registry header — mono, technical, deliberately understated. */}
        <Reveal delay={0.05}>
          <div className="mt-12 hidden items-center gap-6 border-b border-ink-line pb-3 sm:flex">
            <span className="label w-10 text-bone/55">No.</span>
            <span className="label flex-1 text-bone/55">Credential</span>
            <span className="label text-bone/55">Holder — {site.trainer}</span>
          </div>
        </Reveal>

        {/* A real certificate presentation, rather than a certificate graphic:
            it is evidence for the claim the section is making. */}
        <Reveal delay={0.08}>
          <figure className="mt-4 overflow-hidden rounded-sm border border-ink-line">
            <Figure
              slot="qualificationAward"
              ratio="3/2"
              className="w-full rounded-none"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-ink-line bg-ink px-4 py-3">
              <span className="label text-accent-text">On record</span>
              <span className="text-[0.875rem] leading-relaxed text-bone/65">
                {site.trainer} receiving certification at a sports and fitness
                education event.
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <RevealGroup
          as="ul"
          stagger={0.07}
          className="mt-4 grid gap-3 sm:gap-4 lg:grid-cols-2"
        >
          {qualifications.map((q) => (
            <RevealItem key={q.title} as="li">
              <QualificationCard
                index={q.index}
                kind={q.kind}
                title={q.title}
                body={q.body}
                className="h-full"
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Surface>
  );
}
