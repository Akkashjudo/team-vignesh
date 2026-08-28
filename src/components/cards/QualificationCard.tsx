import { cn } from "@/lib/utils";

/**
 * Certification entry styled like a technical archive record rather than a
 * decorative certificate graphic. Only the four supplied credentials appear.
 */
export function QualificationCard({
  index,
  kind,
  title,
  body,
  className,
}: {
  index: string;
  kind: string;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "hover-lift group relative grid grid-cols-[auto_1fr] gap-4 rounded-sm border border-ink-line bg-ink-elevated p-5 hover:border-accent/45 sm:gap-6 sm:p-7",
        className,
      )}
    >
      {/* index rail */}
      <div className="flex flex-col items-center">
        <span className="index text-[0.6875rem] text-accent-text">{index}</span>
        <span
          aria-hidden="true"
          className="mt-3 w-px flex-1 bg-[repeating-linear-gradient(to_bottom,currentColor_0_3px,transparent_3px_7px)] text-bone/20"
        />
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="label rounded-sm border border-accent/40 px-2 py-1 text-accent-text">
            {kind}
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-bone/12" />
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-bone/50 transition-colors duration-500 group-hover:text-accent">
            <path d="M2 8.4 6.2 12.5 14 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square" />
          </svg>
        </div>

        <h3 className="display display-sm mt-4 text-bone">{title}</h3>
        <p className="mt-2.5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-bone/55">
          {body}
        </p>
      </div>
    </article>
  );
}
