import { Surface } from "@/components/ui/Surface";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn, HeroLines, RevealMask } from "@/components/ui/Motion";
import { Figure } from "@/components/ui/Figure";
import { Button } from "@/components/ui/Button";
import type { ImageKey } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Shared hero for inner pages. Same headline treatment as the homepage but at
 * a smaller scale, so the home hero stays the loudest moment on the site.
 */
export function PageHero({
  label,
  index,
  lines,
  supporting,
  image,
  primary,
  secondary,
  meta,
  className,
  imageClassName,
  placeholder = "detailed",
}: {
  label: string;
  index?: string;
  lines: string[];
  supporting?: string;
  image?: ImageKey;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** Short mono facts shown under the copy, e.g. "Online · In person". */
  meta?: string[];
  className?: string;
  /** Grade/crop applied to the hero image (e.g. the shared founder grade). */
  imageClassName?: string;
  placeholder?: "detailed" | "minimal";
}) {
  return (
    <Surface
      tone="ink"
      grid
      className={cn("relative overflow-hidden pt-[var(--header-h)]", className)}
      aria-label={label}
    >
      <div className="shell grid gap-10 pb-16 pt-14 sm:pb-20 sm:pt-20 lg:grid-cols-12 lg:gap-12 lg:pb-28 lg:pt-24">
        <div className={cn(image ? "lg:col-span-7" : "lg:col-span-9")}>
          <FadeIn delay={0.05}>
            <SectionLabel index={index} className="text-bone/60">
              {label}
            </SectionLabel>
          </FadeIn>

          <HeroLines
            lines={lines}
            className="display mt-7 text-[clamp(1.75rem,6.4vw,4.75rem)] text-bone"
            delay={0.15}
            stagger={0.08}
          />

          {supporting && (
            <FadeIn delay={0.45} className="mt-7 max-w-[52ch]">
              <p className="copy text-bone/65">{supporting}</p>
            </FadeIn>
          )}

          {meta && meta.length > 0 && (
            <FadeIn delay={0.55} className="mt-8">
              <ul className="flex flex-wrap gap-2">
                {meta.map((m) => (
                  <li
                    key={m}
                    className="label rounded-sm border border-ink-line px-3 py-2 text-bone/55"
                  >
                    {m}
                  </li>
                ))}
              </ul>
            </FadeIn>
          )}

          {(primary || secondary) && (
            <FadeIn delay={0.62} className="mt-9">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {primary && (
                  <Button href={primary.href} size="lg" className="w-full sm:w-auto">
                    {primary.label}
                  </Button>
                )}
                {secondary && (
                  <Button
                    href={secondary.href}
                    variant="outline"
                    size="lg"
                    className="w-full text-bone sm:w-auto"
                  >
                    {secondary.label}
                  </Button>
                )}
              </div>
            </FadeIn>
          )}
        </div>

        {image && (
          <div className="lg:col-span-5">
            <RevealMask className="rounded-sm">
              <Figure
                slot={image}
                ratio="4/5"
                className="w-full rounded-none border border-ink-line"
                imageClassName={imageClassName}
                sizes="(max-width: 1024px) 100vw, 42vw"
                placeholder={placeholder}
                priority
                showNote={false}
              />
            </RevealMask>
          </div>
        )}
      </div>
    </Surface>
  );
}
