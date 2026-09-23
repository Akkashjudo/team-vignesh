import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

/**
 * OFFICIAL TEAM VIGNESH LOGO
 * ---------------------------------------------------------------------------
 * Both files are the supplied artwork, unaltered — only the surrounding black
 * field was trimmed to the measured content bounds. Geometry, proportions and
 * every pixel of the mark are original. Do not redraw or rebuild these in CSS.
 *
 *   tv-logo-mark.png   764 × 788   emblem only (athlete + ring + TV monogram)
 *   tv-logo-full.png   948 × 1132  full stacked lockup incl. wordmark + tagline
 *
 * The artwork sits on a solid black field, so it is only ever placed on the
 * near-black surfaces (#080808 / #111111). At small sizes the stacked wordmark
 * would be illegible, so compact placements use the emblem and the full lockup
 * is reserved for places with room to breathe.
 */

const MARK = "/brand/tv-logo-mark.png";
const LOCKUP = "/brand/tv-logo-full.png";

/** Compact emblem — header, mobile bar, small brand marks. */
export function LogoMark({
  className,
  size = 40,
  priority = false,
  sizes,
}: {
  className?: string;
  /** Rendered height in px; width follows the artwork's own ratio. */
  size?: number;
  priority?: boolean;
  /**
   * Override the rendered width hint. Needed when the height is set by a
   * responsive class rather than by `size` — otherwise a phone would be
   * handed the desktop-sized render.
   */
  sizes?: string;
}) {
  /* A caller can drive the height with breakpoint classes instead of `size`.
     The inline height would beat any class, and `h-auto` would fight it in
     the cascade, so step out of the way when they do. */
  const heightFromClass = /(^|\s|:)h-\[/.test(className ?? "");

  return (
    <Image
      src={MARK}
      alt=""
      aria-hidden="true"
      width={764}
      height={788}
      priority={priority}
      /* `sizes` is in CSS pixels — the browser applies the device pixel ratio
         itself. Doubling it here double-counted DPR and made the large
         decorative watermark pull a 1600px render of a 764px file. */
      sizes={sizes ?? `${Math.round(size)}px`}
      className={cn(
        !heightFromClass && "h-auto",
        "w-auto select-none object-contain",
        className,
      )}
      style={heightFromClass ? { width: "auto" } : { height: size, width: "auto" }}
    />
  );
}

/** Full stacked lockup — footer, mobile menu, loading and CTA brand areas. */
export function LogoLockup({
  className,
  width = 260,
  priority = false,
  sizes = "260px",
}: {
  className?: string;
  width?: number;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={LOCKUP}
      alt={`${site.brand} — ${site.trainer}`}
      width={948}
      height={1132}
      priority={priority}
      sizes={sizes}
      className={cn("h-auto select-none object-contain", className)}
      style={{ width, maxWidth: "100%" }}
    />
  );
}

/**
 * Brand link used in the header. The emblem carries the identity; the brand
 * name is exposed to assistive tech through the link's accessible name.
 */
export function Logo({
  className,
  size = 40,
  priority = false,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
}) {
  return (
    <span className={cn("flex items-center", className)}>
      <LogoMark size={size} priority={priority} />
      <span className="sr-only">{site.brand}</span>
    </span>
  );
}
