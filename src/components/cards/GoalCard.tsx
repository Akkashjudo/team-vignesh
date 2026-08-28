import Link from "next/link";
import { Figure } from "@/components/ui/Figure";
import type { Goal } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Goal cell. Square corners, hairline border.
 *
 * The category tile is always visible at a low level rather than being fetched
 * purely for a hover state — touch users previously downloaded six images they
 * could never see. On a fine pointer it simply lifts toward full strength.
 */
export function GoalCard({ goal, className }: { goal: Goal; className?: string }) {
  return (
    <Link
      href={goal.href}
      className={cn(
        "hover-lift group relative flex min-h-[10.5rem] flex-col justify-between overflow-hidden rounded-sm border border-ink-line bg-ink-elevated p-5 sm:min-h-[15.5rem] sm:p-6",
        "hover:border-accent/60",
        className,
      )}
    >
      {/* Category tile — part of the design at rest, brighter on hover. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45 transition-opacity duration-700 ease-out [@media(pointer:fine)]:group-hover:opacity-100"
      >
        <Figure
          slot={goal.image}
          className="absolute inset-0 h-full w-full rounded-none"
          imageClassName="object-cover"
          sizes="(max-width: 440px) 92vw, (max-width: 1024px) 46vw, 30vw"
          showNote={false}
        />
        {/* Scrim keeps the copy at full contrast over the tile. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/65" />
      </div>

      <div className="relative flex items-start justify-between">
        <span className="index text-[0.6875rem] text-bone/55">{goal.index}</span>
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rotate-45 bg-bone/25 transition-colors duration-500 group-hover:bg-accent"
        />
      </div>

      <div className="relative mt-6 sm:mt-8">
        <h3 className="display display-sm text-bone">{goal.title}</h3>
        <p className="mt-2.5 max-w-[26ch] text-[0.875rem] leading-relaxed text-bone/60 transition-colors duration-500 group-hover:text-bone/80">
          {goal.blurb}
        </p>

        {/* Arrow is always present — the label is the only hover extra, and it
            is decorative reinforcement, never the card's only affordance. */}
        <span className="mt-4 flex items-center gap-2 text-accent-text">
          <span className="label opacity-0 transition-opacity duration-500 [@media(pointer:fine)]:group-hover:opacity-100">
            Explore
          </span>
          <svg
            width="14"
            height="14"
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
