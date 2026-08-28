import { Figure } from "@/components/ui/Figure";
import type { JourneyPost } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Journey / content card. Ready to point at an Instagram post, a reel, a video
 * or an article — set `href` in content.ts and the card becomes a live link.
 * Until then it renders as a non-interactive placeholder rather than a dead link.
 */
export function ContentCard({
  post,
  className,
}: {
  post: JourneyPost;
  className?: string;
}) {
  const live = Boolean(post.href);

  const inner = (
    <>
      <Figure
        slot={post.image}
        ratio="16/9"
        className="w-full rounded-none border-b border-ink-line"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        showNote={false}
        overlay="bottom"
      >
        {live && (
          <span className="absolute right-3 top-3 flex h-8 items-center gap-1.5 rounded-sm border border-bone/20 bg-ink/70 px-2 backdrop-blur-sm">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="label text-bone/80">View</span>
          </span>
        )}
      </Figure>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center gap-2.5">
          <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-accent" />
          <span className="label text-bone/55">{post.category}</span>
        </div>

        <h3 className="mt-3 text-[1rem] font-semibold leading-snug text-bone sm:text-[1.0625rem]">
          {post.title}
        </h3>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <span className="index text-[0.6875rem] text-bone/55">
            {post.date || "Coming soon"}
          </span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className={cn(
              "shrink-0 transition-all duration-500 ease-out",
              live
                ? "text-bone/55 group-hover:translate-x-1 group-hover:text-accent-text"
                : "text-bone/15",
            )}
          >
            <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
          </svg>
        </div>
      </div>
    </>
  );

  const classes = cn(
    "group relative flex flex-col overflow-hidden rounded-sm border border-ink-line bg-ink-elevated",
    live && "hover-lift hover-zoom hover:border-accent/50",
    className,
  );

  if (!live) {
    return <article className={classes}>{inner}</article>;
  }

  return (
    <a
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      className={classes}
    >
      {inner}
    </a>
  );
}
