import { Figure } from "@/components/ui/Figure";
import type { ImageKey } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * The numbered image + title + body card used by nutrition, recovery and the
 * training grid. One component so padding, borders, type and the numbering
 * treatment stay identical everywhere.
 *
 * The important part is the responsive layout. Stacked, these cards ran to
 * ~450px on a 375px screen with the image taking 55–70% of that — a phone
 * showed barely one card per screen. Below `sm` they lay out horizontally with
 * a compact square thumbnail, which brings them to roughly a third of the
 * height while keeping the photograph meaningful. From `sm` up they return to
 * the stacked composition the desktop grid was designed around.
 */
export function MediaCard({
  index,
  title,
  body,
  image,
  tone = "dark",
  ratio = "4/3",
  sizes = "(max-width: 640px) 35vw, (max-width: 1024px) 45vw, 25vw",
  className,
}: {
  index: string;
  title: string;
  body: string;
  image: ImageKey;
  tone?: "dark" | "bone";
  ratio?: "4/3" | "3/2" | "4/5";
  sizes?: string;
  className?: string;
}) {
  const light = tone === "bone";

  return (
    <article
      className={cn(
        "hover-lift hover-zoom group flex h-full overflow-hidden rounded-sm border",
        "flex-row items-stretch sm:flex-col",
        light
          ? "border-bone-line bg-bone hover:border-ink/25"
          : "border-ink-line bg-ink-elevated hover:border-accent/45",
        className,
      )}
    >
      <Figure
        slot={image}
        ratio={ratio}
        ratioMobile="1/1"
        className={cn(
          // Fixed, compact width on a phone; full-bleed banner from sm up.
          "w-[7.25rem] shrink-0 rounded-none border-r sm:w-full sm:border-b sm:border-r-0",
          light ? "border-bone-line" : "border-ink-line",
        )}
        tone={tone}
        sizes={sizes}
        showNote={false}
      />

      <div className="flex min-w-0 flex-1 flex-col justify-center p-4 sm:justify-start sm:p-5">
        <span className={cn("index text-[0.6875rem]", light ? "text-accent-ink" : "text-accent-text")}>
          {index}
        </span>
        <h3 className={cn("display display-sm mt-2 sm:mt-3", light ? "text-ink" : "text-bone")}>
          {title}
        </h3>
        <p
          className={cn(
            "mt-2 text-[0.875rem] leading-relaxed sm:mt-2.5 sm:text-[0.9375rem]",
            light ? "text-ink/65" : "text-bone/60",
          )}
        >
          {body}
        </p>
      </div>
    </article>
  );
}
