import { cn } from "@/lib/utils";

/**
 * Numbered section marker — `01 / TEAM VIGNESH` with a hairline that runs to
 * the edge of the column. Used to index every major section of the site.
 */
export function SectionLabel({
  index,
  children,
  className,
  rule = true,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
  rule?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3 sm:gap-4", className)}>
      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
      <p className="label flex items-baseline gap-2 whitespace-nowrap">
        {index && <span className="index opacity-45">{index}</span>}
        {index && <span aria-hidden="true" className="opacity-30">/</span>}
        <span>{children}</span>
      </p>
      {rule && (
        <span
          aria-hidden="true"
          className="hidden h-px flex-1 bg-current opacity-[0.14] sm:block"
        />
      )}
    </div>
  );
}

/**
 * Section headline. Accepts either a string or lines that break deliberately.
 */
export function SectionHeading({
  children,
  className,
  size = "lg",
  as: Tag = "h2",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  as?: "h1" | "h2" | "h3";
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "display",
        {
          sm: "display-sm",
          md: "display-md",
          lg: "display-lg",
          xl: "display-xl",
        }[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Full-bleed hairline divider that respects the current surface tone. */
export function Rule({ className }: { className?: string }) {
  return <hr className={cn("h-px w-full border-0 bg-current opacity-[0.12]", className)} />;
}
