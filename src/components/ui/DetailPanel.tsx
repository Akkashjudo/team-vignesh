/**
 * What fills an image frame when there is no honest photograph for it.
 *
 * Several topics here — food, soft-tissue work, conditioning — have no
 * photograph, and borrowing one would be worse than having none: a coaching
 * shot on a "Sports Massage" card is exactly the mismatch this site was
 * criticised for. The frame keeps its exact shape and carries the topic's own
 * specifics instead, so it reads as information rather than as a missing
 * picture.
 *
 * It renders dark on every surface, including the bone ones. All photography
 * here is dark monochrome, so a dark frame is what the page expects in that
 * position — a pale panel on a pale card just read as blank space, and the
 * facts had nothing to sit against.
 *
 * It sizes itself against ITS OWN BOX, not the viewport, because the same panel
 * appears at 116px in a phone thumbnail and at ~500px in a page hero. That is
 * what `.panel-frame` / `.panel-facts` do in globals.css.
 */
export function DetailPanel({
  facts,
  label,
}: {
  /** Short, factual lines, taken from the section's own copy. */
  facts?: string[];
  /** Accessible name — the slot's alt text. */
  label?: string;
}) {
  const hasFacts = Boolean(facts?.length);

  return (
    <div
      /* Decorative unless it carries facts: when it does, the text is real
         content a screen reader should reach. */
      role={hasFacts ? "group" : undefined}
      aria-label={hasFacts ? label : undefined}
      aria-hidden={hasFacts ? undefined : "true"}
      className="panel-frame absolute inset-0 flex flex-col justify-end overflow-hidden bg-ink-elevated"
    >
      {/* Hairline field — the same grid used behind the dark sections, so the
          panel belongs to the page rather than sitting on top of it. */}
      <div aria-hidden="true" className="absolute inset-0 grid-field opacity-60" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_18%_12%,rgba(225,29,46,0.055),transparent_62%)]"
      />

      {/* Corner tick. The one mark that still reads at thumbnail size. */}
      <span
        aria-hidden="true"
        className="panel-tick absolute h-1.5 w-1.5 rotate-45 bg-accent"
      />

      {hasFacts && (
        <ul className="panel-facts relative m-0 list-none p-5">
          {facts!.map((fact) => (
            <li key={fact} className="label flex items-center gap-2 leading-tight text-bone/70">
              <span aria-hidden="true" className="h-px w-3 shrink-0 bg-accent/70" />
              {fact}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
