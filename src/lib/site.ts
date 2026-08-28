/**
 * TEAM VIGNESH — single source of truth for brand + contact details.
 * Everything a non-developer might need to change lives in this file.
 */

/**
 * The site's own origin, used for canonical URLs, the sitemap, robots.txt and
 * the OpenGraph/structured data. Resolved rather than hardcoded so a Vercel
 * deployment is correct with no edit:
 *
 *   1. NEXT_PUBLIC_SITE_URL          — set this once a custom domain is live.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — the project's production domain.
 *   3. VERCEL_URL                    — the per-deployment preview domain.
 *   4. localhost                     — local development.
 *
 * Only read on the server (metadata, sitemap, robots, seo), so the non-public
 * Vercel variables are available.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return `https://${production}`;

  const deployment = process.env.VERCEL_URL;
  if (deployment) return `https://${deployment}`;

  return "http://localhost:3000";
}

export const site = {
  brand: "TEAM VIGNESH",
  brandTop: "TEAM",
  brandMain: "VIGNESH",
  trainer: "Vigneshwaran",
  trainerShort: "Vignesh",
  tagline: "Train with purpose. Progress with consistency.",
  description:
    "Personalized coaching for fat loss, muscle gain, strength, body recomposition and better overall fitness — built around your body, lifestyle and goals.",

  /** Contact ------------------------------------------------------------- */
  phoneDisplay: "+91 96001 38336",
  /** Digits only, with country code — used to build wa.me and tel: links. */
  phoneRaw: "919600138336",

  /** EDITABLE — add when supplied. Empty values are simply not rendered. */
  email: "",
  addressLine: "",
  city: "",
  region: "",
  country: "India",

  /**
   * Resolved automatically — see resolveSiteUrl() above. To pin a custom
   * domain, set NEXT_PUBLIC_SITE_URL in the Vercel project's env vars
   * (e.g. https://teamvignesh.com) rather than editing this line.
   */
  url: resolveSiteUrl(),

  socials: {
    instagram: "https://www.instagram.com/vicky_judo_ka?igsi=N20yMjhzbXVhNTk3",
    instagramHandle: "@vicky_judo_ka",
    /** EDITABLE — leave blank to hide. */
    youtube: "",
  },
} as const;

/** Build a prefilled WhatsApp deep link. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.phoneRaw}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const telLink = `tel:+${site.phoneRaw}`;

/** Default enquiry openers used by CTAs across the site. */
export const waMessages = {
  general: `Hi ${site.trainerShort}, I found TEAM VIGNESH online and I'd like to know more about coaching.`,
  transformation: `Hi ${site.trainerShort}, I'd like to start coaching with TEAM VIGNESH. Can you tell me how to begin?`,
  consultation: `Hi ${site.trainerShort}, I'd like to book a consultation with TEAM VIGNESH.`,
  personalTraining: `Hi ${site.trainerShort}, I'm interested in personal training with TEAM VIGNESH.`,
  online: `Hi ${site.trainerShort}, I'd like to apply for online coaching with TEAM VIGNESH.`,
  offline: `Hi ${site.trainerShort}, I'd like to train with you in person. Can you share the details?`,
  nutrition: `Hi ${site.trainerShort}, I'm looking for nutrition guidance with TEAM VIGNESH.`,
  recovery: `Hi ${site.trainerShort}, I'd like to book a sports massage / recovery session.`,
  recomposition: `Hi ${site.trainerShort}, I'm interested in a body recomposition programme.`,
} as const;

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Coaching", href: "/coaching" },
  { label: "Transformations", href: "/transformations" },
  { label: "Nutrition", href: "/nutrition" },
  { label: "Recovery", href: "/recovery" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Coaching",
    items: [
      { label: "Personal Training", href: "/coaching#personal-training" },
      { label: "Online Coaching", href: "/online-coaching" },
      { label: "Nutrition", href: "/nutrition" },
      { label: "Body Recomposition", href: "/coaching#body-recomposition" },
      { label: "Recovery", href: "/recovery" },
    ],
  },
  {
    title: "Explore",
    items: [
      { label: "About", href: "/about" },
      { label: "Transformations", href: "/transformations" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
