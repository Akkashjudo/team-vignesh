import { cn } from "@/lib/utils";

/**
 * Client quote. Rendered only from words a real client has actually given and
 * agreed to publish — never written on their behalf.
 */
export function TestimonialCard({
  quote,
  author,
  meta,
  className,
  compact = false,
}: {
  quote: string;
  author: string;
  meta?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <figure
      className={cn(
        "relative rounded-sm border border-ink-line bg-ink",
        compact ? "p-4 sm:p-5" : "p-6 sm:p-8",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-8 w-[2px] bg-accent"
      />

      <blockquote
        className={cn(
          "text-bone/80",
          compact ? "text-[0.9375rem] leading-relaxed" : "copy sm:text-lead",
        )}
      >
        {quote}
      </blockquote>

      <figcaption className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-display text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-bone">
          {author}
        </span>
        {meta && (
          <>
            <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-bone/25" />
            <span className="label text-bone/55">{meta}</span>
          </>
        )}
      </figcaption>
    </figure>
  );
}
