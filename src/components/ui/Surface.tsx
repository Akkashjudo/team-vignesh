import { cn } from "@/lib/utils";

/**
 * Section wrapper that sets the surface tone. The site paces dark and light
 * sections deliberately rather than running one long dark scroll.
 */
export function Surface({
  children,
  tone = "ink",
  className,
  id,
  grid = false,
  as: Tag = "section",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: {
  children: React.ReactNode;
  tone?: "ink" | "ink-elevated" | "bone";
  className?: string;
  id?: string;
  /** Render the fine technical grid behind the content (dark tones only). */
  grid?: boolean;
  as?: "section" | "div" | "footer";
  "aria-label"?: string;
  "aria-labelledby"?: string;
}) {
  const tones = {
    ink: "bg-ink text-bone",
    "ink-elevated": "bg-ink-elevated text-bone",
    bone: "on-bone bg-bone text-ink",
  }[tone];

  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn("relative isolate", tones, className)}
    >
      {grid && tone !== "bone" && (
        <div aria-hidden="true" className="absolute inset-0 -z-10 grid-field opacity-50" />
      )}
      {children}
    </Tag>
  );
}
