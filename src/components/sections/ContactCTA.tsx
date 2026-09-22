import { Surface } from "@/components/ui/Surface";
import { Reveal } from "@/components/ui/Motion";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { site, telLink, waMessages, whatsappLink } from "@/lib/site";
import { finalCta } from "@/lib/content";

/**
 * SECTION 15 — the closing conversion block. Reused at the foot of every page,
 * with the headline swappable per page.
 */
export function ContactCTA({
  heading = finalCta.heading,
  supporting = finalCta.supporting,
  primaryLabel = finalCta.primary.label,
  primaryHref = finalCta.primary.href,
  whatsappMessage = waMessages.transformation,
}: {
  heading?: string[];
  supporting?: string;
  primaryLabel?: string;
  primaryHref?: string;
  whatsappMessage?: string;
}) {
  return (
    <Surface tone="ink" className="relative overflow-hidden" aria-labelledby="cta-heading">
      <div aria-hidden="true" className="absolute inset-0 grid-field opacity-60" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-px w-[min(60rem,90%)] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent to-transparent"
      />
      {/* Oversized watermark mark — sits behind the type, never competes with it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-1/2 -translate-y-1/2 opacity-[0.07] sm:-right-8"
      >
        <LogoMark size={520} />
      </div>

      <div className="shell relative section">
        <div>
          <Reveal>
            <h2
              id="cta-heading"
              /* max-w in ch sits HERE, on the display font, not on a wrapper
                 using the 16px body font where 24ch would be ~192px. */
              className="display max-w-[15ch] text-[clamp(2rem,6.4vw,5.5rem)] text-bone"
            >
              {heading.map((line, i) => (
                <span key={line} className={i > 0 ? "block text-bone/55" : "block"}>
                  {line}
                </span>
              ))}
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <p className="copy mt-8 max-w-[44ch] text-bone/65">{supporting}</p>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button href={primaryHref} size="lg" className="w-full sm:w-auto">
              {primaryLabel}
            </Button>
            <Button
              href={whatsappLink(whatsappMessage)}
              variant="whatsapp"
              size="lg"
              className="w-full text-bone sm:w-auto"
              whatsapp
              arrow={false}
            >
              {finalCta.secondary}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink-line pt-6">
            <div>
              <p className="label text-bone/55">Call or message</p>
              <a
                href={telLink}
                className="index -mb-2 mt-0.5 inline-block py-2 text-[1.0625rem] text-bone transition-colors hover:text-accent-text"
              >
                {site.phoneDisplay}
              </a>
            </div>
            <div>
              <p className="label text-bone/55">Coaching</p>
              <p className="mt-1.5 text-[1.0625rem] text-bone/80">Online &amp; in person</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Surface>
  );
}
