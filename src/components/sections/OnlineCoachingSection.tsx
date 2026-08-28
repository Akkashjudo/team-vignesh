import { Surface } from "@/components/ui/Surface";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Motion";
import { Figure } from "@/components/ui/Figure";
import { Button } from "@/components/ui/Button";
import { onlineHeading, onlineProcess, onlineSupporting } from "@/lib/content";
import { waMessages, whatsappLink } from "@/lib/site";

/**
 * SECTION 11 — online coaching. The strongest dark block on the page, with the
 * six-step process laid out as a numbered rail.
 */
export function OnlineCoachingSection() {
  return (
    <Surface tone="ink" className="relative overflow-hidden" aria-labelledby="online-heading">
      {/* Full-bleed background photograph, heavily scrimmed. */}
      <Figure
        slot="onlineCoaching"
        className="absolute inset-0 h-full w-full rounded-none"
        imageClassName="object-cover object-center"
        sizes="100vw"
        placeholder="minimal"
        showNote={false}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-ink/88" />
      <div aria-hidden="true" className="absolute inset-0 grid-field opacity-50" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60"
      />

      <div className="shell relative section">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel index="11" className="text-bone/60">
                Online coaching
              </SectionLabel>
            </Reveal>

            <Reveal delay={0.05}>
              <h2
                id="online-heading"
                className="display mt-6 text-[clamp(1.75rem,5vw,4.25rem)] text-bone"
              >
                {onlineHeading}
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5 lg:pt-4">
            <p className="copy max-w-[46ch] text-bone/70">{onlineSupporting}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/online-coaching" size="md" className="w-full sm:w-auto">
                Apply For Online Coaching
              </Button>
              <Button
                href={whatsappLink(waMessages.online)}
                variant="whatsapp"
                size="md"
                className="w-full text-bone sm:w-auto"
                whatsapp
                arrow={false}
              >
                WhatsApp
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Six-step process rail */}
        <RevealGroup
          as="ol"
          stagger={0.05}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden border border-ink-line bg-ink-line sm:grid-cols-3 lg:grid-cols-6"
        >
          {onlineProcess.map((step) => (
            <RevealItem key={step.index} as="li" className="bg-ink/95">
              <div className="group h-full p-4 transition-colors duration-500 hover:bg-ink-elevated sm:p-5">
                <div className="flex items-center gap-2.5">
                  <span className="index text-[0.75rem] text-accent-text">{step.index}</span>
                  <span
                    aria-hidden="true"
                    className="h-px flex-1 bg-bone/12 transition-colors duration-500 group-hover:bg-accent/60"
                  />
                </div>
                <h3 className="display mt-5 text-[1.0625rem] text-bone sm:text-[1.125rem]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-bone/50">{step.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

      </div>
    </Surface>
  );
}
