"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Logo, LogoLockup } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/components/ui/Motion";
import { useReducedMotionSafe, useScrollPast } from "@/lib/hooks";
import { primaryNav, site, telLink, waMessages, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Surface transition threshold, per the brief. */
const SCROLL_THRESHOLD = 90;

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrollPast(SCROLL_THRESHOLD);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotionSafe();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll lock, Escape to close, and focus returned to the toggle.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    // Move focus into the panel so keyboard users land in the menu.
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = useCallback(
    (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href)),
    [pathname],
  );

  const solid = scrolled || open;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-3 focus:font-display focus:text-sm focus:uppercase focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-out",
          solid
            // Blur is desktop-only: a blurred fixed bar repaints every scroll
            // frame, which is exactly where mobile scrolling loses its smoothness.
            ? "border-b border-ink-line bg-ink/95 lg:bg-ink/90 lg:backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "shell flex items-center justify-between gap-4 transition-[height] duration-500 ease-out",
            solid ? "h-[64px] lg:h-[74px]" : "h-[var(--header-h)]",
          )}
        >
          <Link
            href="/"
            aria-label={`${site.brand} — home`}
            className="relative z-10 -my-2 shrink-0 py-2 transition-opacity duration-300 hover:opacity-85"
          >
            {/* Official emblem. Scales down slightly once the header compresses. */}
            <span
              className={cn(
                "block origin-left transition-transform duration-500 ease-out",
                solid ? "scale-[0.86]" : "scale-100",
              )}
            >
              <Logo size={46} priority />
            </span>
          </Link>

          {/* ---- Desktop nav ---- */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-7 xl:gap-9">
              {primaryNav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative block py-2 font-display text-[0.8125rem] font-bold uppercase tracking-[0.08em] transition-colors duration-300",
                        active ? "text-bone" : "text-bone/70 hover:text-bone",
                      )}
                    >
                      {item.label}
                      {/* Active: persistent brand-red rule. Hover: draws L→R. */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-0 -bottom-0.5 block h-[2px] origin-left bg-accent transition-transform duration-500 ease-out",
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button href="/contact" size="sm" className="hidden sm:inline-flex" arrow>
              Start Now
            </Button>

            {/* ---- Mobile toggle ---- */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="relative z-10 -mr-2 flex h-11 w-11 items-center justify-center text-bone lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="relative block h-[14px] w-6">
                <span
                  className={cn(
                    "absolute left-0 block h-[2px] w-full bg-current transition-transform duration-[400ms] ease-out",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-[2px] bg-current transition-all duration-[400ms] ease-out",
                    open ? "top-1.5 w-full -rotate-45" : "top-3 w-4/5",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ---- Mobile full-height panel ---- */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-nav"
            key="mobile-nav"
            ref={panelRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.15 : 0.35, ease: EASE }}
            /* z-45 is deliberate: above the floating WhatsApp button (z-40),
               which otherwise painted over the panel and swallowed taps on the
               right end of "Start Your Coaching", and still below the header
               (z-50) so the close control stays reachable. */
            className="fixed inset-0 z-[45] flex flex-col overflow-y-auto bg-ink lg:hidden"
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-field opacity-50" />

            <div className="shell relative flex min-h-full flex-col pb-10 pt-[calc(var(--header-h)+1.5rem)]">
              {/* Full official lockup — there is room for it here. */}
              <m.div
                initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.04, ease: EASE }}
                className="mb-8"
              >
                <LogoLockup width={132} sizes="132px" />
              </m.div>

              <nav aria-label="Mobile" className="flex-1">
                <ul className="flex flex-col">
                  {primaryNav.map((item, i) => (
                    <m.li
                      key={item.href}
                      initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reduced ? 0.2 : 0.5,
                        // 45ms stagger, inside the 40–50ms brief.
                        delay: reduced ? 0 : 0.1 + i * 0.045,
                        ease: EASE,
                      }}
                      className="border-b border-ink-line"
                    >
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "flex items-baseline gap-4 py-4 font-display text-[1.75rem] font-extrabold uppercase leading-none tracking-display transition-colors",
                          isActive(item.href) ? "text-accent-text" : "text-bone",
                        )}
                      >
                        <span className="index text-[0.6875rem] opacity-45">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </Link>
                    </m.li>
                  ))}
                </ul>
              </nav>

              <m.div
                initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: reduced ? 0 : 0.42, ease: EASE }}
                className="mt-9 flex flex-col gap-3"
              >
                <Button href="/contact" size="lg" className="w-full">
                  Start Your Coaching
                </Button>
                <Button
                  href={whatsappLink(waMessages.general)}
                  variant="whatsapp"
                  size="lg"
                  className="w-full text-bone"
                  whatsapp
                  arrow={false}
                >
                  Chat On WhatsApp
                </Button>
                <a
                  href={telLink}
                  className="index mt-2 py-2 text-center text-sm text-bone/60 transition-colors hover:text-bone"
                >
                  {site.phoneDisplay}
                </a>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
