/**
 * IMAGE SLOT REGISTRY
 * ---------------------------------------------------------------------------
 * Every photograph on the site is referenced through a named slot below.
 *
 * THREE CLASSES OF SLOT, WITH DIFFERENT RULES:
 *
 *  1. FOUNDER  — real photographs of Vigneshwaran. Already live. These must
 *                never be replaced with stock or AI-generated people.
 *  2. CLIENT   — before/after and testimonial imagery. Stays `null` until real,
 *                consented client photography exists. Never fabricate these.
 *  3. SUPPORT  — generic training / nutrition / recovery imagery. These may be
 *                AI-generated or licensed, and each carries a `prompt` written
 *                against one shared art direction (see ART_DIRECTION below).
 *
 * TO FILL A SLOT:
 *   1. Put the file in /public/images/ using the name in `file`.
 *   2. Set `src` to that path.
 *   3. Update `alt` to describe the actual picture.
 *
 * Until `src` is set the site renders a designed placeholder of exactly the
 * same shape, so nothing shifts when the real image lands.
 */

export type Ratio = "1/1" | "3/4" | "4/5" | "4/3" | "3/2" | "16/9" | "21/9" | "9/16";

/**
 * One shared photographic grade. Every photograph on the site is monochrome,
 * so founder portraits, coaching shots taken on a phone under purple gym
 * lighting, and the award photo all read as a single body of work — and none
 * of their colour casts compete with the brand red.
 * Change these two lines to restyle all photography at once.
 */
export const FOUNDER_GRADE = "grayscale contrast-[1.06] brightness-[0.98]";
export const HERO_GRADE = "grayscale-[0.9] contrast-[1.08] brightness-[0.75]";

/**
 * The single art direction every SUPPORT image must share. Prepend this to any
 * slot's `prompt` when generating, so the whole site looks like one shoot.
 */
export const ART_DIRECTION =
  "Editorial fitness photography, 35mm/50mm look, realistic and believable, " +
  "natural skin texture, South Asian / Indian subjects where people appear, " +
  "modern charcoal-and-black gym environment, controlled directional lighting, " +
  "deep controlled shadows, neutral desaturated palette with warm skin tones, " +
  "a single small deep-red environmental accent at most. " +
  "No text, no logos, no watermarks, no signage. No exaggerated bodybuilder " +
  "physiques, no distorted anatomy, no plastic AI skin, no stock-photo smiling, " +
  "no lens flare, no neon, no shallow gimmick bokeh.";

export interface ImageSlot {
  id: string;
  file: string;
  src: string | null;
  alt: string;
  ratio: Ratio;
  /** What the picture should be — for a photographer or an image generator. */
  note: string;
  /** Generation prompt body. Combine with ART_DIRECTION. Founder/client slots
   *  have none on purpose: those must be real photographs. */
  prompt?: string;
  kind: "founder" | "client" | "support";
  /**
   * True while the slot is filled by a generated category tile rather than a
   * photograph. Those are rendered with an empty alt: they are illustrative,
   * and the card heading beside them already carries the meaning. Set this to
   * false when you swap in real photography, and write a real alt.
   */
  decorative?: boolean;
  /**
   * Photographic grade, applied by <Figure> to this slot everywhere it is
   * used. One source of truth: the site's photography is monochrome, so a
   * colour phone snapshot from the gym sits beside the founder frames without
   * its purple lighting fighting the brand red.
   */
  grade?: string;
  /**
   * Shown INSTEAD of a photograph while `src` is null.
   *
   * Several topics on this site have no photograph and cannot honestly borrow
   * one: a coaching shot on a "Sports Massage" card is a mismatch, and the
   * generated abstract tiles that used to fill these slots read as broken
   * images. So the frame carries the topic's own specifics instead — real
   * information, set in the label type, in exactly the same box the photograph
   * will occupy. Drop a file into `src` and the panel disappears with no
   * layout change.
   *
   * Omit it to get the plain hairline field, which is what a slot used only as
   * scrimmed background texture wants.
   */
  panel?: string[];
}

function founder(
  id: string, file: string, alt: string, ratio: Ratio, note: string,
  grade: string = FOUNDER_GRADE,
): ImageSlot {
  return { id, file, src: file, alt, ratio, note, kind: "founder", grade };
}

/**
 * A real photograph that is not of the founder alone — coaching in action at
 * the studio, or evidence of a credential. Unlike a generated tile these carry
 * descriptive alt text, because they show something a screen-reader user would
 * otherwise miss.
 */
function photo(id: string, file: string, alt: string, ratio: Ratio, note: string): ImageSlot {
  return {
    id, file, src: file, alt, ratio, note,
    kind: "support", decorative: false, grade: FOUNDER_GRADE,
  };
}

/**
 * A SUPPORT slot with no photograph yet. Unlike `support()` this ships EMPTY on
 * purpose — `<Figure>` renders the slot's `panel` facts in the image's box
 * rather than a stand-in picture. `prompt` and `note` stay, so the slot is
 * ready the moment real photography exists.
 */
function pending(
  id: string, file: string, alt: string, ratio: Ratio, note: string,
  prompt: string, panel?: string[],
): ImageSlot {
  return { id, file, src: null, alt, ratio, note, prompt, kind: "support", panel };
}

function client(id: string, file: string, alt: string, ratio: Ratio, note: string): ImageSlot {
  return { id, file, src: null, alt, ratio, note, kind: "client" };
}

function support(
  id: string,
  file: string,
  alt: string,
  ratio: Ratio,
  note: string,
  prompt: string,
): ImageSlot {
  // Ships filled with a generated category tile (scripts/generate-thumbnails.py)
  // so no card is ever blank. Replace the file with a photograph and flip
  // `decorative` to false.
  return { id, file, src: file, alt, ratio, note, prompt, kind: "support", decorative: true };
}

export const images = {
  /* ======================================================================
     FOUNDER — real photographs of Vigneshwaran. Live.
     ====================================================================== */
  heroVignesh: founder(
    "heroVignesh",
    "/images/vignesh-gym.jpg",
    "Vigneshwaran training on the gym floor",
    "3/4",
    "Hero background. Full-body training frame in the gym, used behind the headline scrim.",
    HERO_GRADE,
  ),
  vigneshPortrait: founder(
    "vigneshPortrait",
    "/images/vignesh-portrait.jpg",
    "Vigneshwaran, founder and coach at TEAM VIGNESH, at the studio",
    "3/4",
    "Primary founder portrait — studio shot, pre-cropped so the face keeps headroom at both 3/4 and 4/5.",
  ),
  vigneshMotion: founder(
    "vigneshMotion",
    "/images/vignesh-motion.jpg",
    "Vigneshwaran supporting a client through a leg press set",
    "4/5",
    "Secondary founder frame — coaching in action, which positions him better than a physique shot.",
  ),
  vigneshGymWide: founder(
    "vigneshGymWide",
    "/images/vignesh-gym-wide.jpg",
    "The training floor where Vigneshwaran coaches",
    "16/9",
    "Wide training-environment band. Third frame in the founder composition.",
  ),
  vigneshSquare: founder(
    "vigneshSquare",
    "/images/vignesh-portrait-square.jpg",
    "Vigneshwaran, personal trainer and coach",
    "1/1",
    "Tight portrait crop for compact placements.",
  ),

  /* ======================================================================
     SUPPORT — training. AI-generated or licensed, one shared art direction.
     ====================================================================== */
  strengthTraining: photo(
    "strengthTraining",
    "/images/strength-training.jpg",
    "A client pressing a barbell overhead during a coached session",
    "4/5",
    "Real: coached overhead press. Pre-cropped to 4/5.",
  ),
  hypertrophy: photo(
    "hypertrophy",
    "/images/hypertrophy.jpg",
    "Vigneshwaran coaching a client through a seated barbell press",
    "4/5",
    "Real: resistance work with hands-on coaching. Pre-cropped to 4/5.",
  ),
  conditioning: pending(
    "conditioning",
    "/images/conditioning.jpg",
    "Cardiovascular conditioning work",
    "4/3",
    "Sled, rower or bike intervals. Effort and motion, still readable.",
    "A South Asian athlete driving a weighted sled across dark rubber gym flooring, slight motion " +
      "blur in the legs, sweat on the forearms, wide industrial gym behind falling into shadow, " +
      "cool neutral grade with one small red accent light far in the background.",
    ["Intervals", "Work capacity", "Endurance"],
  ),
  functional: photo(
    "functional",
    "/images/functional-training.jpg",
    "Vigneshwaran cueing a client’s position during a standing lift",
    "4/3",
    "Real: coaching cue mid-set on the training floor. Pre-cropped to 4/3.",
  ),
  fundamentals: photo(
    "fundamentals",
    "/images/fundamental-movement.jpg",
    "Vigneshwaran correcting a client’s technique on a barbell movement",
    "4/3",
    "Real: technique correction. Pre-cropped to 4/3.",
  ),

  /* ------------------------- SUPPORT — coaching -------------------------- */
  personalTraining: photo(
    "personalTraining",
    "/images/personal-training.jpg",
    "Vigneshwaran spotting a client through a dumbbell shoulder press",
    "4/5",
    "Real: one-to-one coaching, the clearest shot of the service. Pre-cropped to 4/5.",
  ),
  onlineCoaching: photo(
    "onlineCoaching",
    "/images/online-coaching.jpg",
    "Vigneshwaran checking a training plan on his phone at the gym",
    "3/2",
    "Real: the one frame where he is holding a phone — which is what online coaching is. " +
      "Edge-extended to 3/2 so the card's 16/9 mobile crop still keeps his face and the phone.",
  ),
  onlineCoachingHero: photo(
    "onlineCoachingHero",
    "/images/online-coaching-hero.jpg",
    "Vigneshwaran with his phone, reviewing training at the gym",
    "4/5",
    "Real: the same frame cropped tall for the /online-coaching page hero.",
  ),
  transformationsHero: photo(
    "transformationsHero",
    "/images/transformations-hero.jpg",
    "Vigneshwaran with a client on the training floor",
    "4/5",
    "Real: coach and client together. An honest lead image for the transformations page — " +
      "no fabricated before/after is implied by it.",
  ),
  offlineCoaching: photo(
    "offlineCoaching",
    "/images/offline-coaching.jpg",
    "Vigneshwaran on the gym floor with a client after a session",
    "3/2",
    "Real: coach and client rapport in the studio. Pre-cropped to 3/2.",
  ),

  /* ------------------------- Credential evidence ------------------------- */
  qualificationAward: photo(
    "qualificationAward",
    "/images/qualification-award.jpg",
    "Vigneshwaran receiving a certificate at a sports and fitness education event",
    "3/2",
    "Real: certificate presentation. Supports the qualifications section rather than a certificate graphic.",
  ),

  /* ------------------------- SUPPORT — nutrition ------------------------- */
  nutrition: pending(
    "nutrition",
    "/images/nutrition.jpg",
    "A balanced high-protein meal prepared for training days",
    "4/5",
    "Real food, honest lighting. Indian components welcome.",
    "An overhead editorial photograph of a balanced Indian meal on a dark ceramic plate — grilled " +
      "chicken, dal, brown rice, sautéed vegetables and curd — on a charcoal stone surface, " +
      "single soft window light from the left, natural food texture, no garnish styling tricks.",
      ["Daily protein", "Meal timing", "Indian food options", "No restriction"],
  ),
  nutritionProtein: pending(
    "nutritionProtein",
    "/images/nutrition-protein.jpg",
    "High-protein breakfast options",
    "4/3",
    "Eggs, paneer, curd, sprouts — daylight, three-quarter angle.",
    "A three-quarter angle photograph of a high-protein Indian breakfast — boiled eggs, paneer " +
      "cubes, a bowl of curd and sprouted moong — on dark stoneware, soft morning window light, " +
      "matte surfaces, restrained composition.",
      ["Eggs", "Curd & paneer", "Dal", "Chicken & fish"],
  ),
  nutritionPre: pending(
    "nutritionPre",
    "/images/nutrition-pre-workout.jpg",
    "A light pre-workout meal",
    "4/3",
    "Simple carbohydrate plus protein. Light and uncluttered.",
    "A small simple pre-training plate — banana, a slice of brown toast with peanut butter and a " +
      "black coffee — on a dark surface, minimal props, soft side light, generous negative space.",
      ["Carbohydrate led", "Light enough to move", "Timed before training"],
  ),
  nutritionPost: pending(
    "nutritionPost",
    "/images/nutrition-post-workout.jpg",
    "A post-workout recovery meal",
    "4/3",
    "Full plate — rice, protein, vegetables.",
    "A full post-training plate — grilled fish, steamed rice and green vegetables — on dark " +
      "stoneware, warm directional light from the upper left, steam just visible, honest home " +
      "cooking rather than restaurant plating.",
      ["Protein", "Carbohydrate", "Recovery focused"],
  ),
  nutritionIndian: pending(
    "nutritionIndian",
    "/images/nutrition-indian.jpg",
    "Everyday Indian food portioned for training goals",
    "4/3",
    "Familiar Indian dishes, portioned sensibly. The trust-builder image.",
    "An everyday Indian thali portioned for a training goal — two rotis, dal, a vegetable sabzi, " +
      "curd and salad — on a dark metal plate, overhead, soft even light, familiar and unstyled.",
      ["Everyday Indian food", "Portioned", "Protein built in"],
  ),

  /* ------------------------- SUPPORT — recovery -------------------------- */
  recovery: pending(
    "recovery",
    "/images/recovery.jpg",
    "A sports massage and recovery session",
    "3/2",
    "Treatment table, hands-on soft tissue work. Calm and professional.",
    "A sports massage therapist working on an athlete's calf on a treatment table, therapist's " +
      "hands and forearms in focus, clean dark treatment room, single soft overhead light, towel " +
      "draped respectfully, clinical and calm, no faces required.",
      ["Soft tissue work", "General tightness", "Training stress"],
  ),
  recoveryDeepTissue: pending(
    "recoveryDeepTissue",
    "/images/recovery-deep-tissue.jpg",
    "Deep tissue therapy on the shoulder",
    "4/5",
    "Close, respectful crop on the working area.",
    "A close respectful crop of deep tissue work on an athlete's upper back and shoulder, " +
      "therapist's hands applying pressure, dark room, low warm key light, matte skin texture, " +
      "professional and restrained.",
      ["Slower, deeper work", "Restricted areas", "Persistent tightness"],
  ),
  recoveryMobility: pending(
    "recoveryMobility",
    "/images/recovery-mobility.jpg",
    "Mobility work between training sessions",
    "4/3",
    "Foam rolling or an assisted mobility drill on the floor.",
    "An athlete foam rolling a quadricep on dark rubber gym flooring, side-on camera at floor " +
      "level, dark gym falling away behind, single hard light from the right, real effort in the " +
      "posture.",
      ["Scheduled around training", "Consistency", "Readiness"],
  ),

  recoveryGuidance: pending(
    "recoveryGuidance",
    "/images/recovery-guidance.jpg",
    "Mobility guidance to continue between sessions",
    "4/3",
    "A coach talking a client through a mobility drill they will repeat at home.",
    "A therapist demonstrating a hip mobility drill to an athlete on a dark gym floor, both " +
      "mid-conversation rather than posed, single soft key light, instructional and calm.",
    ["Mobility work", "Between sessions", "Guidance you continue"],
  ),

  /* ------------------------- SUPPORT — content --------------------------- */
  journal01: pending("journal01", "/images/journal-01.jpg", "Training education content", "16/9", "Thumbnail for a training-education post.", "A rack of barbells and plates in a dark gym, shot as a clean graphic composition, no people, hard side light, deep shadow."),
  journal02: pending("journal02", "/images/journal-02.jpg", "Nutrition education content", "16/9", "Thumbnail for a nutrition post.", "A simple overhead of portioned whole foods on a charcoal surface — eggs, rice, greens, curd — arranged as a clean grid, no text."),
  journal03: pending("journal03", "/images/journal-03.jpg", "Weekly progress update", "16/9", "Thumbnail for a weekly progress update.", "A worn training notebook and a pencil on a gym bench beside a chalk-dusted hand, dark environment, single warm light, documentary."),
  journal04: pending("journal04", "/images/journal-04.jpg", "Recovery education content", "16/9", "Thumbnail for a recovery post.", "A foam roller and massage tools laid out on a dark treatment table, top-down, soft even light, clean and clinical, no people."),

  /* ======================================================================
     CLIENT — real, consented photography only. Never fabricate.
     ====================================================================== */
  transformation01Before: client("transformation01Before", "/images/transformation-01-before.jpg", "Client transformation, before", "4/5", "Day 1 baseline. Match pose, lighting and framing to the after shot."),
  transformation01After: client("transformation01After", "/images/transformation-01-after.jpg", "Client transformation, after", "4/5", "Progress photo. Match the before shot exactly."),
  transformation02Before: client("transformation02Before", "/images/transformation-02-before.jpg", "Client transformation, before", "4/5", "Day 1 baseline photo."),
  transformation02After: client("transformation02After", "/images/transformation-02-after.jpg", "Client transformation, after", "4/5", "Progress photo."),
  transformation03Before: client("transformation03Before", "/images/transformation-03-before.jpg", "Client transformation, before", "4/5", "Day 1 baseline photo."),
  transformation03After: client("transformation03After", "/images/transformation-03-after.jpg", "Client transformation, after", "4/5", "Progress photo."),

  /* Programme milestone markers. These describe the PROCESS, not a client's
     body — so each frame lists what actually happens at that review rather
     than showing a stand-in picture of it. */
  dayOne: pending("dayOne", "/images/day-01.jpg", "Day 1 milestone marker", "1/1",
    "Baseline milestone marker.",
    "Assessment day: notebook, tape measure and the first session, dark gym, documentary.",
    ["Assessment", "Measurements", "Starting photographs"],
  ),
  dayThirty: pending("dayThirty", "/images/day-30.jpg", "Day 30 milestone marker", "1/1",
    "Mid-programme milestone marker.",
    "Mid-programme check-in: coach and client reviewing numbers together, dark gym.",
    ["Training loads", "Measurements", "Lifestyle fit"],
  ),
  daySixty: pending("daySixty", "/images/day-60.jpg", "Day 60 milestone marker", "1/1",
    "Sixty-day milestone marker.",
    "Sixty-day review session: measurements being taken, calm and factual, dark gym.",
    ["Composition", "Strength", "Habits"],
  ),
} satisfies Record<string, ImageSlot>;

export type ImageKey = keyof typeof images;

/**
 * Aspect-ratio class maps. Every class is written out in full so Tailwind's
 * scanner can see it — these are never composed from fragments at runtime.
 *
 * `ratioClassSm` exists so a card can carry a short, wide crop on a phone and
 * its designed ratio from `sm:` up. Without it a 4/3 image on a 375px screen
 * is 250px tall and swallows the card.
 */
export const ratioClass: Record<Ratio, string> = {
  "1/1": "aspect-square",
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "16/9": "aspect-video",
  "21/9": "aspect-[21/9]",
  "9/16": "aspect-[9/16]",
};

export const ratioClassSm: Record<Ratio, string> = {
  "1/1": "sm:aspect-square",
  "3/4": "sm:aspect-[3/4]",
  "4/5": "sm:aspect-[4/5]",
  "4/3": "sm:aspect-[4/3]",
  "3/2": "sm:aspect-[3/2]",
  "16/9": "sm:aspect-video",
  "21/9": "sm:aspect-[21/9]",
  "9/16": "sm:aspect-[9/16]",
};
