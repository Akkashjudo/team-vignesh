import Link from "next/link";
import { LogoLockup } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { footerNav, site, telLink, waMessages, whatsappLink } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-ink-line bg-ink text-bone">
      <div aria-hidden="true" className="absolute inset-0 grid-field opacity-35" />

      <div className="shell relative py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ---- Brand ---- */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              aria-label={`${site.brand} — home`}
              className="inline-block transition-opacity hover:opacity-85"
            >
              <LogoLockup width={168} sizes="168px" />
            </Link>

            {/* Large typography, as the brand's own line rather than a re-drawn
                logo — the official lockup sits directly above it. */}
            <p className="display mt-8 text-[clamp(2rem,5.6vw,3.25rem)] text-bone">
              Team Vignesh
            </p>

            <p className="mt-5 max-w-[34ch] font-display text-[0.875rem] font-bold uppercase leading-relaxed tracking-[0.12em] text-bone/60">
              Train with purpose.
              <br />
              Progress with consistency.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="md">
                Start Your Coaching
              </Button>
              <Button
                href={whatsappLink(waMessages.general)}
                variant="whatsapp"
                size="md"
                className="text-bone"
                whatsapp
                arrow={false}
              >
                WhatsApp
              </Button>
            </div>
          </div>

          {/* ---- Links ---- */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
            {footerNav.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="label border-b border-ink-line pb-3 text-bone/55">{col.title}</h2>
                <ul className="mt-4 flex flex-col gap-1">
                  {col.items.map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={item.href}
                        className="link-underline -my-1 inline-block py-1.5 text-body-sm text-bone/70 transition-colors hover:text-bone"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* ---- Connect ---- */}
            <nav aria-label="Connect">
              <h2 className="label border-b border-ink-line pb-3 text-bone/55">Connect</h2>
              <ul className="mt-4 flex flex-col gap-1">
                <li>
                  <a
                    href={site.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline -my-1 inline-flex items-center gap-2 py-1.5 text-body-sm text-bone/70 transition-colors hover:text-bone"
                  >
                    Instagram
                    <span className="index text-[0.6875rem] text-bone/55">
                      {site.socials.instagramHandle}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappLink(waMessages.general)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline -my-1 inline-block py-1.5 text-body-sm text-bone/70 transition-colors hover:text-bone"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={telLink}
                    className="index -my-1 inline-block py-1.5 text-body-sm text-bone/70 transition-colors hover:text-bone"
                  >
                    {site.phoneDisplay}
                  </a>
                </li>
                {site.email && (
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="link-underline -my-1 inline-block break-words py-1.5 text-body-sm text-bone/70 transition-colors hover:text-bone"
                    >
                      {site.email}
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>

        {/* ---- Bottom ---- */}
        <div className="mt-14 flex flex-col gap-4 border-t border-ink-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-bone/50">
            © {year} {site.brand}
          </p>
          <p className="label text-bone/50">Personal Training · Performance · Nutrition</p>
        </div>

        <p className="mt-5 max-w-[74ch] text-[0.6875rem] leading-relaxed text-bone/55">
          Coaching and nutrition guidance for healthy, active people. Not medical
          advice. Individual results vary.
        </p>
      </div>
    </footer>
  );
}
