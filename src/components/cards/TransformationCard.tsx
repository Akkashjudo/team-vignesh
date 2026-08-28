import { Figure } from "@/components/ui/Figure";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import type { Transformation } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Before / after transformation record.
 *
 * This component is only ever rendered from a real entry in
 * `transformations` (content.ts), which ships empty. Nothing here fabricates
 * a client, a result or a quote.
 */
export function TransformationCard({
  item,
  className,
  showTestimonial = true,
}: {
  item: Transformation;
  className?: string;
  showTestimonial?: boolean;
}) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-sm border border-ink-line bg-ink-elevated",
        className,
      )}
    >
      <div className="grid grid-cols-2">
        <div className="relative border-r border-ink-line">
          <Figure
            slot={item.beforeImage}
            ratio="4/5"
            className="w-full rounded-none"
            sizes="(max-width: 640px) 50vw, 25vw"
            showNote={false}
          />
          <span className="label absolute left-3 top-3 rounded-sm bg-ink/75 px-2 py-1 text-bone/80 backdrop-blur-sm">
            Before
          </span>
        </div>
        <div className="relative">
          <Figure
            slot={item.afterImage}
            ratio="4/5"
            className="w-full rounded-none"
            sizes="(max-width: 640px) 50vw, 25vw"
            showNote={false}
          />
          <span className="label absolute left-3 top-3 rounded-sm bg-accent px-2 py-1 text-white">
            After
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="display display-sm text-bone">{item.name}</h3>

        <dl className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-ink-line bg-ink-line sm:grid-cols-3">
          {[
            { k: "Goal", v: item.goal },
            { k: "Programme", v: item.programme },
            { k: "Duration", v: item.duration },
          ].map((row) => (
            <div key={row.k} className="bg-ink p-3.5">
              <dt className="label text-bone/55">{row.k}</dt>
              <dd className="mt-1.5 text-[0.9375rem] leading-snug text-bone/85">{row.v}</dd>
            </div>
          ))}
        </dl>

        {showTestimonial && item.testimonial && (
          <TestimonialCard
            quote={item.testimonial}
            author={item.name}
            className="mt-5"
            compact
          />
        )}
      </div>
    </article>
  );
}
