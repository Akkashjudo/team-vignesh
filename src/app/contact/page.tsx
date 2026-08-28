import type { Metadata } from "next";

import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { Surface } from "@/components/ui/Surface";
import { SectionLabel, SectionHeading } from "@/components/ui/SectionLabel";
import { FadeIn, Reveal } from "@/components/ui/Motion";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { services } from "@/lib/content";
import { site, telLink, waMessages, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Start Your Transformation",
  description:
    "Enquire about personal training, online coaching, nutrition, body recomposition or sports massage with TEAM VIGNESH. Message Vigneshwaran directly on WhatsApp.",
  alternates: { canonical: "/contact" },
};

const steps = [
  { index: "01", title: "Send your details", body: "Fill in the form or message directly on WhatsApp." },
  { index: "02", title: "Short conversation", body: "Vignesh asks about your goal, schedule and starting point." },
  { index: "03", title: "Pick the format", body: "Personal training, online, offline, nutrition or recovery." },
  { index: "04", title: "Begin the assessment", body: "Baseline, measurements and the first session." },
];

export default function ContactPage() {
  return (
    <>
      {/* --- Hero + form --- */}
      <Surface
        tone="ink"
        grid
        className="relative overflow-hidden pt-[var(--header-h)]"
        aria-label="Contact"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-28 top-32 opacity-[0.06] mix-blend-screen"
        >
          <LogoMark size={460} />
        </div>

        <div className="shell grid gap-12 pb-20 pt-14 sm:pt-20 lg:grid-cols-12 lg:gap-14 lg:pb-28">
          {/* Left: pitch + direct channels */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
              <FadeIn delay={0.05}>
                <SectionLabel index="01" className="text-bone/60">
                  Contact
                </SectionLabel>
              </FadeIn>

              <FadeIn delay={0.12}>
                <h1 className="display mt-7 text-[clamp(2rem,7vw,4.5rem)] text-bone">
                  Ready to start?
                </h1>
              </FadeIn>

              <FadeIn delay={0.22}>
                <p className="copy mt-6 max-w-[42ch] text-bone/65">
                  Tell Vignesh where you are now and what you want to change.
                  Every enquiry gets a straight answer — including if a different
                  format would suit you better.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="mt-9 flex flex-col gap-3">
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
                  <a
                    href={telLink}
                    className="group flex items-center justify-between gap-4 rounded-sm border border-ink-line bg-ink-elevated px-5 py-4 transition-colors hover:border-accent/50"
                  >
                    <span>
                      <span className="label block text-bone/55">Call directly</span>
                      <span className="index mt-1.5 block text-[1.0625rem] text-bone">
                        {site.phoneDisplay}
                      </span>
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0 text-bone/55 transition-all duration-500 group-hover:translate-x-1 group-hover:text-accent-text"
                    >
                      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                    </svg>
                  </a>
                </div>
              </FadeIn>

              <FadeIn delay={0.38}>
                <dl className="mt-9 grid gap-px overflow-hidden rounded-sm border border-ink-line bg-ink-line sm:grid-cols-2">
                  <div className="bg-ink-elevated p-4">
                    <dt className="label text-bone/55">Coach</dt>
                    <dd className="mt-2 text-body-sm text-bone/85">{site.trainer}</dd>
                  </div>
                  <div className="bg-ink-elevated p-4">
                    <dt className="label text-bone/55">Coaching</dt>
                    <dd className="mt-2 text-body-sm text-bone/85">Online &amp; in person</dd>
                  </div>
                  {site.email && (
                    <div className="bg-ink-elevated p-4">
                      <dt className="label text-bone/55">Email</dt>
                      <dd className="mt-2 break-words text-body-sm text-bone/85">
                        <a href={`mailto:${site.email}`} className="link-underline">
                          {site.email}
                        </a>
                      </dd>
                    </div>
                  )}
                  {site.city && (
                    <div className="bg-ink-elevated p-4">
                      <dt className="label text-bone/55">Location</dt>
                      <dd className="mt-2 text-body-sm text-bone/85">
                        {[site.addressLine, site.city, site.region].filter(Boolean).join(", ")}
                      </dd>
                    </div>
                  )}
                </dl>
              </FadeIn>
            </div>
          </div>

          {/* Right: the enquiry form */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.2}>
              <div className="rounded-sm border border-ink-line bg-ink-elevated p-5 sm:p-8">
                <div className="flex items-center justify-between gap-4 border-b border-ink-line pb-5">
                  <h2 className="display display-sm text-bone">Enquiry</h2>
                  <span className="label text-bone/55">Takes about a minute</span>
                </div>

                <div className="mt-7">
                  <EnquiryForm />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Surface>

      {/* --- What happens next --- */}
      <Surface tone="bone" className="section" aria-labelledby="next-heading">
        <div className="shell">
          <Reveal>
            <SectionLabel index="02" className="text-ink/60">
              What happens next
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <SectionHeading id="next-heading" size="md" className="mt-6 max-w-[22ch] text-ink">
              Four steps from enquiry to first session.
            </SectionHeading>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border border-bone-line bg-bone-line sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.index} delay={i * 0.05}>
                <div className="h-full bg-bone p-5 sm:p-6">
                  <span className="index text-[0.6875rem] text-accent-ink">{step.index}</span>
                  <h3 className="display display-sm mt-7 text-ink">{step.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink/60">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-12">
              <p className="label text-ink/60">Enquire about</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {services.map((service) => (
                  <li
                    key={service.id}
                    className="rounded-sm border border-bone-line px-3.5 py-2.5 font-display text-[0.75rem] font-bold uppercase tracking-[0.06em] text-ink/65"
                  >
                    {service.title}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Surface>
    </>
  );
}
