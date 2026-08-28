import type { Metadata, Viewport } from "next";
import { Archivo, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { MotionProvider } from "@/components/ui/Motion";
import { site } from "@/lib/site";
import { structuredData } from "@/lib/seo";

const display = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["700", "800"], // 600/900 are never used — see .display and font-bold
  display: "swap",
});

const body = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} — Personal Trainer & Fitness Coach | ${site.trainer}`,
    template: `%s — ${site.brand}`,
  },
  description: site.description,
  applicationName: site.brand,
  keywords: [
    "TEAM VIGNESH",
    "Vigneshwaran personal trainer",
    "personal trainer",
    "fitness coach",
    "personal training",
    "online fitness coaching",
    "fat loss coaching",
    "muscle gain coaching",
    "strength training",
    "body recomposition",
    "nutrition coaching",
    "sports massage",
    "deep tissue therapy",
    "transformation coaching",
  ],
  authors: [{ name: site.trainer }],
  creator: site.trainer,
  publisher: site.brand,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.brand,
    title: `${site.brand} — Personal Training, Nutrition & Performance`,
    description: site.description,
    locale: "en_IN",
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.brand} — Personal Training, Nutrition & Performance`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before hydration so reduced-motion visitors never see an
            element waiting on an animation to become visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)" +
              "document.documentElement.classList.add('reduce-motion')}catch(e){}",
          }}
        />
      </head>
      <body className="bg-ink text-bone antialiased">
        {/* Reveal animations render at opacity 0 and are brought in by JS.
            Without JS, show everything immediately. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>

        <script
          type="application/ld+json"
          // Structured data is generated from site.ts — nothing is invented,
          // and the address block only appears once a real address is set.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  );
}
