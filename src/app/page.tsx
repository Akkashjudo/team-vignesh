import type { Metadata } from "next";

import { Hero } from "@/components/sections/Hero";
import { FounderSection } from "@/components/sections/FounderSection";
import { Positioning } from "@/components/sections/Positioning";
import { GoalSelector } from "@/components/sections/GoalSelector";
import { CoachingServices } from "@/components/sections/CoachingServices";
import { MethodTimeline } from "@/components/sections/MethodTimeline";
import { Testimonials } from "@/components/sections/Testimonials";
import { WorkoutSystem } from "@/components/sections/WorkoutSystem";
import { NutritionSection } from "@/components/sections/NutritionSection";
import { RecoveryStrip } from "@/components/sections/RecoveryStrip";
import { Qualifications } from "@/components/sections/Qualifications";
import { OnlineCoachingSection } from "@/components/sections/OnlineCoachingSection";
import { Faq } from "@/components/sections/Faq";
import { ContactCTA } from "@/components/sections/ContactCTA";

import { faqs } from "@/lib/content";
import { faqStructuredData } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.brand} — Personal Trainer & Fitness Coach | ${site.trainer}`,
  description:
    "Personalized coaching with Vigneshwaran for fat loss, muscle gain, strength, body recomposition and better overall fitness. Personal training, nutrition guidance, recovery and online coaching.",
  alternates: { canonical: "/" },
};

/**
 * Homepage.
 *
 * The founder sits directly beneath the hero so trust is established before
 * anything is sold:
 *   hero → founder → positioning → goals → services → method → client stories
 *   → training → nutrition → recovery → qualifications → online → FAQ → CTA
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData(faqs)) }}
      />

      <Hero />
      <FounderSection />
      <Positioning />
      <GoalSelector />
      <CoachingServices />
      <MethodTimeline />
      <Testimonials />
      <WorkoutSystem />
      <NutritionSection />
      <RecoveryStrip />
      <Qualifications />
      <OnlineCoachingSection />
      <Faq />
      <ContactCTA />
    </>
  );
}
