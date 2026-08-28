import Link from "next/link";
import { Figure } from "@/components/ui/Figure";
import type { Goal } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Goal cell. Square corners, hairline border. On a fine pointer the training
 * photograph fades up behind the type, the border takes the accent and the
 * whole cell lifts 2px — nothing more theatrical than that.
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
      {/* Image response — decorative, sits behind the type. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-out [@media(pointer:fine)]:group-hover:opacity-100"
      >
        <Figure
          slot={goal.image}
          className="absolute inset-0 h-full w-full rounded-none"
          imageClassName="scale-[1.03] object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          showNote={false}
        />
        <div className="absolute inset-0 bg-ink/70" />
      </div>

      <div className="relative flex items-start justify-between">
        <span className="index text-[0.6875rem] text-bone/55">{goal.index}</span>
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rotate-45 bg-bone/20 transition-colors duration-500 group-hover:bg-accent"
        />
      </div>

      <div className="relative mt-6 sm:mt-8">
        <h3 className="display display-sm text-bone">{goal.title}</h3>
        <p className="mt-2.5 max-w-[26ch] text-[0.875rem] leading-relaxed text-bone/55 transition-colors duration-500 group-hover:text-bone/75">
          {goal.blurb}
        </p>

        <span className="mt-4 flex items-center gap-2 text-accent-text opacity-0 transition-opacity duration-500 [@media(pointer:fine)]:group-hover:opacity-100">
          <span className="label">Explore</span>
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
