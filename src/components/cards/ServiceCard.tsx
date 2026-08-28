import Link from "next/link";
import { Figure } from "@/components/ui/Figure";
import type { Service } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Service card with two weights.
 *
 *  - `feature` — image-led, spans two columns. Used for Personal Training and
 *    Online Coaching so the two primary offers read first.
 *  - `standard` — type-led, compact. Used for the supporting four.
 */
export function ServiceCard({
  service,
  variant = "standard",
  className,
}: {
  service: Service;
  variant?: "feature" | "standard";
  className?: string;
}) {
  if (variant === "feature") {
    return (
      <Link
        href={service.href}
        className={cn(
          "hover-lift hover-zoom group relative flex flex-col overflow-hidden rounded-sm border border-ink-line bg-ink-elevated hover:border-accent/50",
          className,
        )}
      >
        <Figure
          slot={service.image}
          ratio="3/2"
          className="w-full rounded-none border-b border-ink-line"
          sizes="(max-width: 1024px) 100vw, 50vw"
          overlay="bottom"
          showNote={false}
        />

        <div className="flex flex-1 flex-col p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <span className="index text-[0.6875rem] text-accent-text">{service.index}</span>
            <span className="label rounded-sm border border-accent/40 px-2 py-1 text-accent-text">
              Primary
            </span>
          </div>

          <h3 className="display display-md mt-5 text-bone">{service.title}</h3>
          <p className="copy mt-3 max-w-[42ch] text-bone/60">{service.short}</p>

          <span className="mt-6 flex items-center gap-2.5 font-display text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-bone">
            {service.cta.label}
            <svg
              width="15"
              height="15"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-500 ease-out group-hover:translate-x-1"
            >
              <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
            </svg>
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={service.href}
      className={cn(
        "hover-lift group relative flex flex-col justify-between overflow-hidden rounded-sm border border-ink-line bg-ink p-5 hover:border-accent/50 sm:p-6",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="index text-[0.6875rem] text-bone/55">{service.index}</span>
        <svg
          width="15"
          height="15"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="mt-0.5 text-bone/55 transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:text-accent-text"
        >
          <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
        </svg>
      </div>

      <div className="mt-10">
        <h3 className="display display-sm text-bone">{service.title}</h3>
        <p className="mt-2.5 max-w-[34ch] text-[0.9375rem] leading-relaxed text-bone/55">
          {service.short}
        </p>
      </div>
    </Link>
  );
}
