import { site } from "./site";
import { qualifications, services } from "./content";

/**
 * Structured data assembled only from verified detail in site.ts / content.ts.
 * Address, opening hours, ratings and review counts are deliberately omitted —
 * they are added only once real information is supplied.
 */
export function structuredData() {
  const sameAs = [site.socials.instagram, site.socials.youtube].filter(Boolean);

  const person = {
    "@type": "Person",
    "@id": `${site.url}/#vignesh`,
    name: site.trainer,
    alternateName: site.trainerShort,
    jobTitle: "Personal Trainer & Fitness Coach",
    telephone: `+${site.phoneRaw}`,
    url: `${site.url}/about`,
    ...(sameAs.length ? { sameAs } : {}),
    hasCredential: qualifications.map((q) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: q.title,
    })),
    knowsAbout: [
      "Personal training",
      "Strength training",
      "Body recomposition",
      "Fitness nutrition",
      "Sports massage",
      "Deep tissue therapy",
    ],
  };

  const businessAddress =
    site.addressLine || site.city
      ? {
          address: {
            "@type": "PostalAddress",
            ...(site.addressLine ? { streetAddress: site.addressLine } : {}),
            ...(site.city ? { addressLocality: site.city } : {}),
            ...(site.region ? { addressRegion: site.region } : {}),
            addressCountry: site.country,
          },
        }
      : {};

  const business = {
    "@type": ["ProfessionalService", "HealthAndBeautyBusiness"],
    "@id": `${site.url}/#business`,
    name: site.brand,
    description: site.description,
    url: site.url,
    telephone: `+${site.phoneRaw}`,
    ...(site.email ? { email: site.email } : {}),
    ...businessAddress,
    ...(sameAs.length ? { sameAs } : {}),
    founder: { "@id": `${site.url}/#vignesh` },
    employee: { "@id": `${site.url}/#vignesh` },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Online, worldwide" },
    ],
    slogan: site.tagline,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Coaching Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.short,
          url: `${site.url}${s.href}`,
          provider: { "@id": `${site.url}/#business` },
        },
      })),
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.brand,
    inLanguage: "en-IN",
    publisher: { "@id": `${site.url}/#business` },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, business, website],
  };
}

/** FAQPage graph — only rendered on pages that actually show the questions. */
export function faqStructuredData(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
