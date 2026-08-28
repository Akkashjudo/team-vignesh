# TEAM VIGNESH

Personal training, nutrition, recovery and online coaching website for
**Vigneshwaran**.

Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion.
Eight pages, all statically prerendered, ~138–158 kB first-load JS.

---

## Run it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run lint
```

> Don't run `build` while `dev` is running — they share `.next` and clobber
> each other.

---

## Brand assets

The supplied logo artwork is used **unaltered**. Only the surrounding black
field was trimmed to the measured content bounds — geometry, proportions and
every pixel of the mark are original. Nothing is redrawn in CSS or rebuilt from
type.

| File | Size | Used in |
|---|---|---|
| `public/brand/tv-logo-mark.png` | 764 × 788 | Header, mobile bar, oversized watermarks, favicon |
| `public/brand/tv-logo-full.png` | 948 × 1132 | Footer, mobile menu, social card |
| `src/app/icon.png` / `apple-icon.png` | 256 / 180 | Browser tab + home screen |

**Why the header uses the emblem, not the full lockup.** The official lockup is
a stacked, portrait-format composition. In a 64–88px header the word "VIGNESH"
would render around 5px tall — unreadable. So compact placements use the
circular emblem (a region of the same artwork, at its own proportions) and the
full lockup appears wherever there is room for it: the footer, the mobile menu
overlay, and the social preview card. This is the standard primary-lockup /
icon-mark split, not a redraw.

The artwork sits on a solid black field, so it is only ever placed on the
near-black surfaces. The hero carries a top gradient scrim specifically so the
header and logo always read against the photograph.

---

## Founder photography

The three supplied photographs of Vigneshwaran are the only images of him on
the site. No AI-generated or stock person is ever substituted.

| Slot | File | Role |
|---|---|---|
| `heroVignesh` | `vignesh-gym.jpg` | Hero background — the training environment |
| `vigneshPortrait` | `vignesh-portrait.jpg` | Primary founder portrait |
| `vigneshMotion` | `vignesh-motion.jpg` | Secondary accent frame |
| `vigneshGymWide` | `vignesh-gym-wide.jpg` | Wide training band (a genuinely different crop of the gym shot, so it never reads as a repeat of the hero) |
| `vigneshSquare` | `vignesh-portrait-square.jpg` | Tight crop for compact placements |

Two of the three originals are monochrome and one is colour under purple gym
lighting. To make them read as a single shoot they share one grade, defined
once in `src/lib/images.ts`:

```ts
export const FOUNDER_GRADE = "grayscale contrast-[1.06] brightness-[0.98]";
export const HERO_GRADE = "grayscale-[0.92] contrast-[1.1] brightness-[0.82]";
```

Change those two lines to restyle every founder frame at once.

---

## Images I could not produce

**The generic supporting imagery is not generated.** I had no image-generation
tool available in this session, so the training / nutrition / recovery /
online-coaching slots still render designed placeholders.

Everything needed to fill them is in place. Each support slot in
`src/lib/images.ts` carries a written `prompt`, and `ART_DIRECTION` at the top
of that file is the shared style preamble. Generate with:

```
<ART_DIRECTION>  +  <the slot's prompt>
```

That keeps all of it on one art direction. Then drop the file into
`public/images/` and change the slot's `src` from `null` to that path.

Slots waiting on imagery: `strengthTraining`, `hypertrophy`, `conditioning`,
`functional`, `fundamentals`, `personalTraining`, `onlineCoaching`,
`offlineCoaching`, `nutrition`, `nutritionProtein`, `nutritionPre`,
`nutritionPost`, `nutritionIndian`, `recovery`, `recoveryDeepTissue`,
`recoveryMobility`, `journal01`–`journal04`.

Placeholders come in two forms so none of them reads as an empty box:
`detailed` (crop marks and a frame, for content slots) and `minimal` (a
designed dark panel, for full-bleed backgrounds behind a scrim). In production
the placeholder shows only the word "Photography" — slot ids and art-direction
notes appear in development only.

---

## Page order

The founder now sits directly beneath the hero, so the person behind the brand
is the second thing a visitor meets:

```
Hero → The Coach → Positioning → Goals → Services → Method
     → Client Stories → Training → Nutrition → Recovery
     → Qualifications → Online Coaching → FAQ → Final CTA → Footer
```

The hero's secondary CTA, **Meet Your Coach**, scrolls to `#the-coach`.

---

## Client stories

Three real testimonials live in `testimonials` in `src/lib/content.ts`,
reproduced in the clients' own words: **Avtansh Sharma**, **Nithu** and
**Yashpal Sharma**.

Layout is one featured story plus two supporting ones. Clicking a supporting
card promotes it — no autoplay, nothing moves while someone is reading. All
three full quotes are always in the DOM (the supporting ones are line-clamped,
never hidden), so nothing is lost to a screen reader or with JS off.

**On the medical wording.** Avtansh's original message mentioned a lower-back
disc bulge being resolved. That is deliberately **not** on the site. Coaching is
never presented as having treated a medical condition, and a disclaimer under
the section states that these are individual experiences and that coaching is
not a medical service.

To add a client, append to the array — and only with their written permission
for both the words and any photograph. Never write a testimonial on someone's
behalf.

---

## Motion

Four signature moments, everything else micro-interaction.

1. **Hero** — background settles, then eyebrow → headline line 1 → line 2 →
   copy → CTAs → accent line draws. 90ms stagger, 850ms headline reveal. On
   desktop, scroll un-zooms the background 1.05 → 1.00 and lifts the text 30px.
   No scroll scrub on touch.
2. **The Coach** — the block resolves as one composed idea: portrait
   mask-reveals, the two supporting frames follow behind it, copy arrives as a
   single group, and the oversized "VIGNESH" drifts on scroll. Nothing flies in
   from three directions.
3. **The Method** — pins on desktop with a rail that fills as you scroll,
   activating each stage. Plain vertical timeline on mobile, no pinning.
4. **Client Stories** — the featured quote opens through a vertical mask;
   swapping stories crossfades.

Primitives live in `src/components/ui/Motion.tsx`: `RevealText`, `RevealImage`,
`RevealGroup` / `RevealItem`, `RevealLine`, `HeroLines`, `FadeIn`. One easing
curve throughout — `cubic-bezier(.22, 1, .36, 1)`.

---

## Accessibility

- **Reduced motion is deterministic.** An inline script in `layout.tsx` sets
  `.reduce-motion` on `<html>` *before* hydration, and a CSS rule forces every
  animated element to its final state. This matters: Framer Motion reads
  `initial` only once at mount, so a React hook that resolves the preference a
  render later cannot un-hide an element that already mounted at `opacity: 0`.
  Verified — zero elements stuck invisible with reduced motion on.
  `useReducedMotionSafe()` in `src/lib/hooks.ts` handles the same problem for
  hydration (framer's own `useReducedMotion()` returns `null` on the server and
  the real value on the client, which throws a hydration error for exactly the
  people who enabled the setting). Don't swap either back.
- Contrast checked against WCAG AA at every surface — **0 failures across ~261
  text nodes** on the home page. Small text has a hard floor: 55% bone on the
  dark surfaces, 60% ink on the light one. The accent red ships in three tuned
  values because one red cannot clear AA on both near-black and off-white.
- Text over photography sits on a scrim strong enough to hold ~10:1 even
  against a light image, so contrast never depends on which photo goes in.
- No horizontal overflow at 360 / 375 / 390 / 768 / 1024 / 1440.
- One `<h1>` per page, labelled sections, skip link, focus-visible rings,
  Escape closes the mobile menu and returns focus to the toggle, scroll lock
  while it is open.
- Tap targets ≥44px. Hover-only effects are gated behind `@media (pointer: fine)`
  and never carry meaning.
- A `<noscript>` block makes scroll-revealed content visible with JS off.

---

## Structure

```
src/
├─ app/            8 routes + icon/apple-icon/opengraph/sitemap/robots/404
├─ components/
│  ├─ layout/      Header · Footer · WhatsAppButton
│  ├─ ui/          Button · Figure · Logo · Motion · SectionLabel · Surface
│  ├─ cards/       GoalCard · ServiceCard · QualificationCard ·
│  │               TransformationCard · TestimonialCard · ContentCard
│  └─ sections/    Hero · FounderSection · Positioning · GoalSelector ·
│                  CoachingServices · MethodTimeline · Testimonials ·
│                  WorkoutSystem · NutritionSection · RecoveryStrip ·
│                  Qualifications · OnlineCoachingSection · Faq ·
│                  ContactCTA · PageHero · ServiceDetail · EnquiryForm
└─ lib/            site.ts (brand/contact) · content.ts (all copy) ·
                   images.ts (slots + prompts) · seo.ts · hooks.ts · utils.ts
```

All copy is in `content.ts`. Brand, phone, Instagram and site URL are in
`site.ts`. Neither invents credentials, awards, client counts or results.

---

## Contact form

No backend, and it doesn't pretend otherwise: it assembles the fields into a
WhatsApp message and opens the chat with Vignesh pre-filled. Verified — empty
submits are blocked with three validation messages, and a filled one builds the
correct `wa.me` deep link. If a backend is added later, `buildMessage()` in
`EnquiryForm.tsx` is the only piece that changes.

---

## Before launch

- [ ] Generate the supporting imagery (see **Images I could not produce**).
- [ ] Set `site.url` to the real domain — metadata, sitemap and structured data
      all read from it.
- [ ] Add `site.email` if you want it shown; blank values are not rendered.
- [ ] Add `site.addressLine` / `city` / `region` only when confirmed. The
      `LocalBusiness` address block stays out of the structured data until then.
- [ ] Replace `about.journeyPlaceholder` with Vignesh's own story.
- [ ] Confirm pricing policy — no pricing appears anywhere on the site yet.
