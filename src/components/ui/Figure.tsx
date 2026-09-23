import Image from "next/image";
import { images, ratioClass, ratioClassSm, type ImageKey } from "@/lib/images";
import { blurDataUrls } from "@/lib/blur";
import { cn } from "@/lib/utils";

/**
 * Renders a registered image slot.
 *
 * If the slot has a real `src` it renders next/image with responsive sizes and
 * lazy loading. If it does not, it renders a designed placeholder of exactly
 * the same shape — so swapping in the photograph never shifts the layout.
 */
export function Figure({
  slot,
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  ratio,
  ratioMobile,
  tone = "dark",
  showNote = true,
  placeholder = "detailed",
  overlay,
  children,
}: {
  slot: ImageKey;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Override the slot's default aspect ratio for a particular layout. */
  ratio?: keyof typeof ratioClass;
  /**
   * A shorter crop below the `sm` breakpoint. Card images that look right at
   * 4/3 on a desktop grid are 250px of dead height on a 375px phone, so most
   * cards pass a wide ratio here and their designed one above.
   */
  ratioMobile?: keyof typeof ratioClass;
  tone?: "dark" | "bone";
  showNote?: boolean;
  /**
   * "minimal" drops the crop marks and slot label — for decorative full-bleed
   * backgrounds that sit behind a heavy scrim, where a labelled placeholder
   * would read as an empty box rather than as art direction.
   */
  placeholder?: "detailed" | "minimal";
  /**
   * Gradient/scrim rendered above the image.
   *  - "bottom" — gentle fade, decorative only, nothing readable sits on it.
   *  - "scrim"  — heavy ramp for text laid OVER the image. Strong enough that
   *               the copy stays legible on a light photograph too, so the
   *               contrast never depends on which picture gets dropped in.
   */
  overlay?: "none" | "bottom" | "scrim" | "full";
  children?: React.ReactNode;
}) {
  const meta = images[slot];
  const resolved = ratio ?? meta.ratio;
  const aspect = ratioMobile
    ? `${ratioClass[ratioMobile]} ${ratioClassSm[resolved]}`
    : ratioClass[resolved];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-sm",
        !className?.includes("aspect-") && !className?.includes("h-full") && aspect,
        className,
      )}
    >
      {meta.src ? (
        <Image
          src={meta.src}
          /* Generated category tiles are illustrative and always sit beside a
             heading that carries the meaning, so they take an empty alt rather
             than repeating it. Real photographs keep their description. */
          alt={meta.decorative ? "" : meta.alt}
          aria-hidden={meta.decorative || undefined}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          /* An LQIP means the frame is never an empty box while the file
             decodes — the main thing that read as "slow images". */
          placeholder={blurDataUrls[meta.src] ? "blur" : "empty"}
          blurDataURL={blurDataUrls[meta.src]}
          /* meta.grade first so a caller can still override it per placement. */
          className={cn("object-cover", meta.grade, imageClassName)}
        />
      ) : (
        <Placeholder id={meta.id} note={meta.note} tone={tone} showNote={showNote} variant={placeholder} />
      )}

      {overlay === "bottom" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent"
        />
      )}
      {overlay === "scrim" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink from-[30%] via-ink/80 via-[62%] to-ink/15"
        />
      )}
      {overlay === "full" && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink/45" />
      )}

      {children}
    </div>
  );
}

const isDev = process.env.NODE_ENV === "development";

function Placeholder({
  id,
  note,
  tone,
  showNote,
  variant,
}: {
  id: string;
  note: string;
  tone: "dark" | "bone";
  showNote: boolean;
  variant: "detailed" | "minimal";
}) {
  const dark = tone === "dark";

  if (variant === "minimal") {
    return (
      <div
        aria-hidden="true"
        className={cn(
          "noise absolute inset-0 overflow-hidden",
          dark ? "bg-ink-elevated" : "bg-[#E7E3DA]",
        )}
      >
        <div className={cn("absolute inset-0 grid-field", dark ? "opacity-90" : "opacity-0")} />
        <div
          className={cn(
            "absolute inset-0",
            dark
              ? "bg-[radial-gradient(120%_90%_at_70%_20%,rgba(225,29,46,0.10),transparent_60%)]"
              : "bg-[radial-gradient(120%_90%_at_70%_20%,rgba(8,8,8,0.06),transparent_60%)]",
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "noise absolute inset-0 flex flex-col justify-between overflow-hidden p-4 sm:p-6",
        dark ? "bg-ink-elevated text-bone/55" : "bg-[#E7E3DA] text-ink/60",
      )}
      role="img"
      aria-label={`Image placeholder: ${id}`}
    >
      {/* hairline field */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 grid-field",
          dark ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0",
          !dark &&
            "bg-[linear-gradient(to_right,rgba(8,8,8,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(8,8,8,0.05)_1px,transparent_1px)] bg-[size:88px_88px]",
        )}
      />
      {/* corner crop marks */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-3 sm:inset-4">
        {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "left-0 bottom-0 border-l border-b", "right-0 bottom-0 border-r border-b"].map(
          (pos) => (
            <span
              key={pos}
              className={cn(
                "absolute h-4 w-4 sm:h-5 sm:w-5",
                pos,
                dark ? "border-bone/25" : "border-ink/20",
              )}
            />
          ),
        )}
      </div>

      <div className="relative flex items-start justify-between gap-3">
        <span className="label opacity-70">Image slot</span>
        <span
          aria-hidden="true"
          className={cn(
            "h-2 w-2 shrink-0 rotate-45",
            dark ? "bg-accent/70" : "bg-accent/60",
          )}
        />
      </div>

      <div className="relative">
        {/* Art-direction notes are a build-time aid only — they never ship. */}
        {isDev ? (
          <>
            <p className="index text-[0.8125rem] font-medium sm:text-sm">{id}</p>
            {showNote && (
              <p className="mt-1.5 hidden max-w-[36ch] text-[0.6875rem] leading-relaxed opacity-60 sm:block">
                {note}
              </p>
            )}
          </>
        ) : (
          <p className="label opacity-45">Photography</p>
        )}
      </div>
    </div>
  );
}
