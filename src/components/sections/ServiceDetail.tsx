import { Surface } from "@/components/ui/Surface";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealMask } from "@/components/ui/Motion";
import { Figure } from "@/components/ui/Figure";
import { images } from "@/lib/images";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/lib/content";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const COLUMNS = [
  { key: "who", title: "Who it is for" },
  { key: "work", title: "What we work on" },
  { key: "how", title: "How it works" },
  { key: "receive", title: "What you receive" },
] as const;

/**
 * Full service record used on the coaching page and the service pages.
 * Layout alternates side to side so the page never becomes six identical rows.
 * No pricing is shown anywhere — add it only when real pricing is supplied.
 */
export function ServiceDetail({
  service,
  flip = false,
  tone = "ink",
}: {
  service: Service;
  flip?: boolean;
  tone?: "ink" | "ink-elevated" | "bone";
}) {
  const light = tone === "bone";
  /* A photograph earns the tall 4/5 frame. A detail panel does not: at 4/5 it
     is mostly empty field, and this section already carries the same facts in
     the grid beside it. Give it a shorter frame instead. */
  const hasPhoto = Boolean(images[service.image].src);

  return (
    <Surface
      tone={tone}
      id={service.id}
      className="section scroll-mt-24"
      aria-labelledby={`${service.id}-heading`}
    >
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Image */}
          <div className={cn("lg:col-span-5", flip && "lg:order-2")}>
            <RevealMask className="rounded-sm">
              <Figure
                slot={service.image}
                ratio={hasPhoto ? "4/5" : "3/2"}
                className={cn(
                  "w-full rounded-none border",
                  light ? "border-bone-line" : "border-ink-line",
                )}
                sizes="(max-width: 1024px) 100vw, 40vw"
                tone={light ? "bone" : "dark"}
                showNote={false}
              />
            </RevealMask>

            <Reveal delay={0.1}>
              <div
                className={cn(
                  "mt-4 flex items-center justify-between gap-4 border-t pt-4",
                  light ? "border-bone-line" : "border-ink-line",
                )}
              >
                <span className={cn("label", light ? "text-ink/60" : "text-bone/55")}>
                  Service {service.index}
                </span>
                <span className={cn("label", light ? "text-ink/60" : "text-bone/55")}>
                  {service.title}
                </span>
              </div>
            </Reveal>
          </div>

          {/* Copy */}
          <div className={cn("lg:col-span-7", flip && "lg:order-1")}>
            <Reveal>
              <SectionLabel
                index={service.index}
                className={light ? "text-ink/60" : "text-bone/60"}
              >
                {service.title}
              </SectionLabel>
            </Reveal>

            <Reveal delay={0.05}>
              <h2
                id={`${service.id}-heading`}
                className={cn(
                  "display mt-6 text-[clamp(1.625rem,4vw,3rem)]",
                  light ? "text-ink" : "text-bone",
                )}
              >
                {service.title}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p
                className={cn(
                  "text-lead mt-5 max-w-[54ch]",
                  light ? "text-ink/75" : "text-bone/75",
                )}
              >
                {service.description}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div
                className={cn(
                  "mt-9 grid gap-px overflow-hidden rounded-sm border sm:grid-cols-2",
                  light ? "border-bone-line bg-bone-line" : "border-ink-line bg-ink-line",
                )}
              >
                {COLUMNS.map((col) => (
                  <div
                    key={col.key}
                    className={cn("p-5", light ? "bg-bone" : "bg-ink-elevated")}
                  >
                    <h3
                      className={cn(
                        "label border-b pb-3",
                        light ? "border-bone-line text-ink/60" : "border-ink-line text-bone/55",
                      )}
                    >
                      {col.title}
                    </h3>
                    <ul className="mt-4 flex flex-col gap-2.5">
                      {service[col.key].map((line) => (
                        <li
                          key={line}
                          className={cn(
                            "flex items-start gap-3 text-[0.9375rem] leading-relaxed",
                            light ? "text-ink/70" : "text-bone/65",
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-accent"
                          />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/contact" size="md" className="w-full sm:w-auto">
                  {service.cta.label}
                </Button>
                <Button
                  href={whatsappLink(service.cta.message)}
                  variant="whatsapp"
                  size="md"
                  className={cn("w-full sm:w-auto", light ? "text-ink" : "text-bone")}
                  whatsapp
                  arrow={false}
                >
                  Ask On WhatsApp
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Surface>
  );
}
