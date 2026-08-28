import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 " +
  "font-display font-bold uppercase tracking-[0.06em] rounded-sm " +
  "transition-[background-color,color,border-color,transform] duration-300 ease-out " +
  "active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-[3px] " +
  "disabled:opacity-40 disabled:pointer-events-none text-center";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white border border-accent hover:bg-white hover:text-ink hover:border-white",
  outline:
    "bg-transparent text-current border border-current/25 hover:border-current/70 hover:bg-current/[0.06]",
  // Padding is left to the size class; call sites can override with !px-*.
  ghost: "bg-transparent text-current border border-transparent hover:text-accent-text",
  whatsapp:
    "bg-transparent text-current border border-current/25 hover:bg-[#25D366] hover:text-ink hover:border-[#25D366]",
};

const sizes: Record<Size, string> = {
  // min-height, not height: every target still clears 44px, but a long label
  // on a 320px screen wraps instead of being clipped.
  sm: "min-h-[2.75rem] px-4 py-2.5 text-[0.75rem]",
  md: "min-h-[3rem] px-5 py-3 text-[0.8125rem] sm:min-h-[3.25rem] sm:px-7",
  lg: "min-h-[3.25rem] px-6 py-3.5 text-sm sm:min-h-[4rem] sm:px-9 sm:text-base",
};

function Arrow() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-300 ease-out group-hover/btn:translate-x-1"
    >
      <path
        d="M2 8h11M9 3.5 13.5 8 9 12.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

function WhatsAppGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.16c-.24.68-1.4 1.3-1.94 1.34-.5.05-.98.24-3.3-.69-2.78-1.1-4.55-3.94-4.69-4.12-.13-.18-1.12-1.49-1.12-2.85s.71-2.02.96-2.3c.25-.27.55-.34.73-.34l.52.01c.17 0 .4-.06.62.48.24.57.8 1.98.87 2.13.07.14.12.31.02.5-.1.18-.15.29-.29.45l-.44.5c-.14.14-.29.3-.13.58.17.28.74 1.21 1.58 1.96 1.09.97 2 1.27 2.29 1.41.28.14.45.12.62-.07.17-.2.71-.83.9-1.11.19-.28.38-.23.64-.14.26.1 1.66.78 1.94.92.28.14.47.21.54.33.07.11.07.66-.17 1.34Z" />
    </svg>
  );
}

export interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Show the sliding arrow. On by default for primary/outline. */
  arrow?: boolean;
  /** Prefix with the WhatsApp glyph. */
  whatsapp?: boolean;
  external?: boolean;
  type?: ComponentProps<"button">["type"];
  onClick?: ComponentProps<"button">["onClick"];
  "aria-label"?: string;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  arrow,
  whatsapp,
  external,
  type = "button",
  onClick,
  ...rest
}: ButtonProps) {
  const showArrow = arrow ?? (variant === "primary" || variant === "outline");
  const classes = cn(base, variants[variant], sizes[size], className);

  const inner = (
    <>
      {whatsapp && <WhatsAppGlyph />}
      <span>{children}</span>
      {showArrow && <Arrow />}
    </>
  );

  if (href) {
    const isExternal = external ?? /^(https?:|tel:|mailto:)/.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          {...rest}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {inner}
    </button>
  );
}

/** Small inline text link with the animated underline. */
export function TextLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const classes = cn(
    // py-3 lifts the hit area to 44px; call sites set their own margins
    "link-underline hover-arrow inline-flex items-center gap-2 py-3 font-display text-[0.8125rem] font-bold uppercase tracking-[0.08em]",
    className,
  );
  const inner = (
    <>
      {children}
      <span className="arrow" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
        </svg>
      </span>
    </>
  );

  if (external || /^(https?:|tel:|mailto:)/.test(href)) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
