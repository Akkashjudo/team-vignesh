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

## Supporting imagery

Every image slot on the site is filled — there are no blank containers.

**These are generated category tiles, not photographs.** No image-generation
tool was available, so rather than leave 21 cards empty they are filled with
designed artwork produced by `scripts/generate-thumbnails.py`: a dark brand
ground, a soft light pool, a geometric motif that reads for the category, fine
grain and a vignette. They share one art direction, so a grid of them reads as
one system.

```bash
python scripts/generate-thumbnails.py
```

**To replace one with a photograph**, drop a file into `public/images/` with
the same name — it takes over automatically. Then set that slot's
`decorative: false` in `images.ts` and write a real `alt`.

Each support slot still carries a written `prompt`, and `ART_DIRECTION` at the
top of `images.ts` is the shared style preamble, so photography can be
generated or briefed consistently:

```
<ART_DIRECTION>  +  <the slot's prompt>
```

Generated tiles take an **empty alt**: they are illustrative and the card
heading beside them already carries the meaning, so a description would only
add screen-reader noise — and would wrongly imply a photograph exists.

**The one exception:** the six client before/after slots stay empty on purpose.
Fabricating a transformation result is not something the site will do. They
only ever appear inside the "reserved for real client results" block, rendered
as deliberate empty frames.

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
- No horizontal overflow, and no text clipped by an overflow container, at
  320 / 375 / 390 / 430 / 768 / 1024 / 1280 / 1440.
- One `<h1>` per page, labelled sections, skip link, focus-visible rings,
  Escape closes the mobile menu and returns focus to the toggle, scroll lock
  while it is open.
- Tap targets ≥44px. Hover-only effects are gated behind `@media (pointer: fine)`
  and never carry meaning.
- A `<noscript>` block makes scroll-revealed content visible with JS off.

---

## Performance

Work done against the "feels slow" report, all measured rather than guessed:

- **Removed two `blur-3xl` filters** from the hero. A 64px blur on a 70vh
  element forces a large offscreen buffer every frame; a radial-gradient with a
  soft falloff looks the same and costs nothing.
- **Dropped `mix-blend-mode: soft-light`** from the grain layer. It forced a
  compositing pass over the whole hero. Plain low opacity replaces it.
- **Gated the header's `backdrop-blur` to desktop.** A blurred fixed bar
  repaints on every scroll frame, which is exactly where mobile scrolling loses
  its smoothness.
- **Consolidated two scroll listeners into one rAF-throttled hook**
  (`useScrollPast`). The header and WhatsApp button each ran their own handler
  on every scroll event; state now changes only when the boolean flips.
- **Removed three `mix-blend-screen` layers** on large decorative logo
  watermarks — each created a stacking context for no visible gain on near-black.
- **Goal cards no longer fetch a hover-only image.** Six images were downloaded
  on touch devices to power an effect those devices can never trigger. The tile
  is now part of the design at rest and simply brightens on hover.
- **Trimmed two unused font weights** (Archivo 600 and 900 are never used).
- Image delivery verified in the browser: nothing over-fetching, only five
  images load above the fold, the rest lazy-load on approach.

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
