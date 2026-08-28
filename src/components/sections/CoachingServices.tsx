import { Surface } from "@/components/ui/Surface";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Motion";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { Button } from "@/components/ui/Button";
import { services, servicesHeading, servicesSupporting } from "@/lib/content";

const FEATURED = ["personal-training", "online-coaching"];

/**
 * SECTION 04 — the coaching system.
 * Deliberately not six identical cards: the two primary offers are image-led
 * and span two columns, the supporting four are compact and type-led.
 */
export function CoachingServices() {
  const featured = FEATURED.map((id) => services.find((s) => s.id === id)!).filter(Boolean);
  const rest = services.filter((s) => !FEATURED.includes(s.id));

  return (
    <Surface tone="ink" className="section" id="coaching" aria-labelledby="services-heading">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel index="04" className="text-bone/60">
                Coaching services
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <SectionHeading id="services-heading" className="mt-6 text-bone">
                {servicesHeading}
              </SectionHeading>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5 lg:pb-2">
            <p className="copy max-w-[46ch] text-bone/65">{servicesSupporting}</p>
          </Reveal>
        </div>

        <RevealGroup
          as="ul"
          stagger={0.08}
          className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
        >
          {featured.map((service) => (
            <RevealItem key={service.id} as="li" className="sm:col-span-2">
              <ServiceCard service={service} variant="feature" className="h-full" />
            </RevealItem>
          ))}

          {rest.map((service) => (
            <RevealItem key={service.id} as="li">
              <ServiceCard service={service} className="h-full min-h-[13rem]" />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/coaching" size="md" className="w-full sm:w-auto">
              See Every Service
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="md"
              className="w-full text-bone sm:w-auto"
            >
              Book A Consultation
            </Button>
          </div>
        </Reveal>
      </div>
    </Surface>
  );
}
