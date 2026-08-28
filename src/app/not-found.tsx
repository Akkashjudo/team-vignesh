import Link from "next/link";
import { Surface } from "@/components/ui/Surface";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { primaryNav, site, waMessages, whatsappLink } from "@/lib/site";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Surface
      tone="ink"
      grid
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-[var(--header-h)]"
      aria-label="Page not found"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-1/2 -translate-y-1/2 opacity-[0.07]"
      >
        <LogoMark size={440} />
      </div>

      <div className="shell relative py-20">
        <p className="label flex items-center gap-3 text-bone/50">
          <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-accent" />
          Error 404
        </p>

        <h1 className="display mt-7 max-w-[16ch] text-[clamp(2rem,7vw,5rem)] text-bone">
          This page isn&rsquo;t part of the programme.
        </h1>

        <p className="copy mt-6 max-w-[46ch] text-bone/60">
          The link may be old or mistyped. Everything on {site.brand} is one
          step away.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="lg" className="w-full sm:w-auto">
            Back To Home
          </Button>
          <Button
            href={whatsappLink(waMessages.general)}
            variant="whatsapp"
            size="lg"
            className="w-full text-bone sm:w-auto"
            whatsapp
            arrow={false}
          >
            Message On WhatsApp
          </Button>
        </div>

        <nav aria-label="Site sections" className="mt-14">
          <p className="label text-bone/55">All pages</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-sm border border-ink-line px-3.5 py-2.5 font-display text-[0.75rem] font-bold uppercase tracking-[0.06em] text-bone/65 transition-colors hover:border-accent/60 hover:text-bone"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Surface>
  );
}
