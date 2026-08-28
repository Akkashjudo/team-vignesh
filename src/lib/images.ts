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
}

function founder(id: string, file: string, alt: string, ratio: Ratio, note: string): ImageSlot {
  return { id, file, src: file, alt, ratio, note, kind: "founder" };
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
  ),
  vigneshPortrait: founder(
    "vigneshPortrait",
    "/images/vignesh-portrait.jpg",
    "Vigneshwaran, founder and coach at TEAM VIGNESH",
    "3/4",
    "Primary founder portrait. The face of the brand.",
  ),
  vigneshMotion: founder(
    "vigneshMotion",
    "/images/vignesh-motion.jpg",
    "Vigneshwaran between sets",
    "4/5",
    "Secondary founder frame. Offset accent in the founder composition.",
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
  strengthTraining: support(
    "strengthTraining",
    "/images/strength-training.jpg",
    "Barbell strength training",
    "4/5",
    "Controlled compound lift in a premium training environment.",
    "A lean, athletic South Asian man mid-set on a barbell back squat in a dark charcoal gym, " +
      "hard side light raking across the shoulders, chalk dust in the air, loaded plates, " +
      "shot from a low three-quarter angle, focused expression, not posing.",
  ),
  hypertrophy: support(
    "hypertrophy",
    "/images/hypertrophy.jpg",
    "Resistance training for muscle development",
    "4/5",
    "Clean resistance training focused on the movement, not on posing.",
    "Close three-quarter frame of a South Asian athlete performing a controlled dumbbell row, " +
      "tension visible through the back and forearm, matte black equipment, single soft key light " +
      "from the left, deep shadow behind, no eye contact with camera.",
  ),
  conditioning: support(
    "conditioning",
    "/images/conditioning.jpg",
    "Cardiovascular conditioning work",
    "4/3",
    "Sled, rower or bike intervals. Effort and motion, still readable.",
    "A South Asian athlete driving a weighted sled across dark rubber gym flooring, slight motion " +
      "blur in the legs, sweat on the forearms, wide industrial gym behind falling into shadow, " +
      "cool neutral grade with one small red accent light far in the background.",
  ),
  functional: support(
    "functional",
    "/images/functional-training.jpg",
    "Functional movement training",
    "4/3",
    "Dynamic but realistic functional work — carry, kettlebell or bodyweight pattern.",
    "A South Asian athlete mid-stride in a heavy farmer's carry with two kettlebells, level camera, " +
      "dark gym, controlled overhead lighting, grounded and realistic, no jumping or acrobatics.",
  ),
  fundamentals: support(
    "fundamentals",
    "/images/fundamental-movement.jpg",
    "Coaching fundamental movement patterns",
    "4/3",
    "Teaching a hinge or squat pattern with a dowel or light load.",
    "A fitness coach guiding a client through a hip hinge with a wooden dowel along the spine, " +
      "coach's hand indicating position, both South Asian, dark gym, calm instructional moment, " +
      "soft directional light, documentary feel.",
  ),

  /* ------------------------- SUPPORT — coaching -------------------------- */
  personalTraining: support(
    "personalTraining",
    "/images/personal-training.jpg",
    "One-to-one personal training session",
    "4/5",
    "Coach and client working a set together.",
    "A personal trainer spotting a client through the last rep of a dumbbell press on an incline " +
      "bench, both South Asian, dark charcoal gym, hard side light, genuine effort on the client's " +
      "face, coach focused on the bar path.",
  ),
  onlineCoaching: support(
    "onlineCoaching",
    "/images/online-coaching.jpg",
    "Online coaching check-in",
    "3/2",
    "A phone with a training plan in the foreground, gym behind. No stock laptops.",
    "A hand holding a phone in a dark gym, screen glow lighting the fingers, a blurred athlete " +
      "training in the background, screen content abstract and unreadable with no text or UI, " +
      "shallow but natural depth of field, editorial and understated.",
  ),
  offlineCoaching: support(
    "offlineCoaching",
    "/images/offline-coaching.jpg",
    "In-person coaching on the gym floor",
    "3/2",
    "Coach beside a client between sets, talking through the plan.",
    "A coach and client standing together between sets on a dark gym floor, mid-conversation, " +
      "coach gesturing toward a rack, both South Asian, warm practical lighting, natural posture, " +
      "documentary rather than posed.",
  ),

  /* ------------------------- SUPPORT — nutrition ------------------------- */
  nutrition: support(
    "nutrition",
    "/images/nutrition.jpg",
    "A balanced high-protein meal prepared for training days",
    "4/5",
    "Real food, honest lighting. Indian components welcome.",
    "An overhead editorial photograph of a balanced Indian meal on a dark ceramic plate — grilled " +
      "chicken, dal, brown rice, sautéed vegetables and curd — on a charcoal stone surface, " +
      "single soft window light from the left, natural food texture, no garnish styling tricks.",
  ),
  nutritionProtein: support(
    "nutritionProtein",
    "/images/nutrition-protein.jpg",
    "High-protein breakfast options",
    "4/3",
    "Eggs, paneer, curd, sprouts — daylight, three-quarter angle.",
    "A three-quarter angle photograph of a high-protein Indian breakfast — boiled eggs, paneer " +
      "cubes, a bowl of curd and sprouted moong — on dark stoneware, soft morning window light, " +
      "matte surfaces, restrained composition.",
  ),
  nutritionPre: support(
    "nutritionPre",
    "/images/nutrition-pre-workout.jpg",
    "A light pre-workout meal",
    "4/3",
    "Simple carbohydrate plus protein. Light and uncluttered.",
    "A small simple pre-training plate — banana, a slice of brown toast with peanut butter and a " +
      "black coffee — on a dark surface, minimal props, soft side light, generous negative space.",
  ),
  nutritionPost: support(
    "nutritionPost",
    "/images/nutrition-post-workout.jpg",
    "A post-workout recovery meal",
    "4/3",
    "Full plate — rice, protein, vegetables.",
    "A full post-training plate — grilled fish, steamed rice and green vegetables — on dark " +
      "stoneware, warm directional light from the upper left, steam just visible, honest home " +
      "cooking rather than restaurant plating.",
  ),
  nutritionIndian: support(
    "nutritionIndian",
    "/images/nutrition-indian.jpg",
    "Everyday Indian food portioned for training goals",
    "4/3",
    "Familiar Indian dishes, portioned sensibly. The trust-builder image.",
    "An everyday Indian thali portioned for a training goal — two rotis, dal, a vegetable sabzi, " +
      "curd and salad — on a dark metal plate, overhead, soft even light, familiar and unstyled.",
  ),

  /* ------------------------- SUPPORT — recovery -------------------------- */
  recovery: support(
    "recovery",
    "/images/recovery.jpg",
    "A sports massage and recovery session",
    "3/2",
    "Treatment table, hands-on soft tissue work. Calm and professional.",
    "A sports massage therapist working on an athlete's calf on a treatment table, therapist's " +
      "hands and forearms in focus, clean dark treatment room, single soft overhead light, towel " +
      "draped respectfully, clinical and calm, no faces required.",
  ),
  recoveryDeepTissue: support(
    "recoveryDeepTissue",
    "/images/recovery-deep-tissue.jpg",
    "Deep tissue therapy on the shoulder",
    "4/5",
    "Close, respectful crop on the working area.",
    "A close respectful crop of deep tissue work on an athlete's upper back and shoulder, " +
      "therapist's hands applying pressure, dark room, low warm key light, matte skin texture, " +
      "professional and restrained.",
  ),
  recoveryMobility: support(
    "recoveryMobility",
    "/images/recovery-mobility.jpg",
    "Mobility work between training sessions",
    "4/3",
    "Foam rolling or an assisted mobility drill on the floor.",
    "An athlete foam rolling a quadricep on dark rubber gym flooring, side-on camera at floor " +
      "level, dark gym falling away behind, single hard light from the right, real effort in the " +
      "posture.",
  ),

  /* ------------------------- SUPPORT — content --------------------------- */
  journal01: support("journal01", "/images/journal-01.jpg", "Training education content", "16/9", "Thumbnail for a training-education post.", "A rack of barbells and plates in a dark gym, shot as a clean graphic composition, no people, hard side light, deep shadow."),
  journal02: support("journal02", "/images/journal-02.jpg", "Nutrition education content", "16/9", "Thumbnail for a nutrition post.", "A simple overhead of portioned whole foods on a charcoal surface — eggs, rice, greens, curd — arranged as a clean grid, no text."),
  journal03: support("journal03", "/images/journal-03.jpg", "Weekly progress update", "16/9", "Thumbnail for a weekly progress update.", "A worn training notebook and a pencil on a gym bench beside a chalk-dusted hand, dark environment, single warm light, documentary."),
  journal04: support("journal04", "/images/journal-04.jpg", "Recovery education content", "16/9", "Thumbnail for a recovery post.", "A foam roller and massage tools laid out on a dark treatment table, top-down, soft even light, clean and clinical, no people."),

  /* ======================================================================
     CLIENT — real, consented photography only. Never fabricate.
     ====================================================================== */
  transformation01Before: client("transformation01Before", "/images/transformation-01-before.jpg", "Client transformation, before", "4/5", "Day 1 baseline. Match pose, lighting and framing to the after shot."),
  transformation01After: client("transformation01After", "/images/transformation-01-after.jpg", "Client transformation, after", "4/5", "Progress photo. Match the before shot exactly."),
  transformation02Before: client("transformation02Before", "/images/transformation-02-before.jpg", "Client transformation, before", "4/5", "Day 1 baseline photo."),
  transformation02After: client("transformation02After", "/images/transformation-02-after.jpg", "Client transformation, after", "4/5", "Progress photo."),
  transformation03Before: client("transformation03Before", "/images/transformation-03-before.jpg", "Client transformation, before", "4/5", "Day 1 baseline photo."),
  transformation03After: client("transformation03After", "/images/transformation-03-after.jpg", "Client transformation, after", "4/5", "Progress photo."),

  /* Programme milestone markers. These illustrate the PROCESS, not a client's
     body, so they are filled with generated tiles rather than left blank. */
  dayOne: support("dayOne", "/images/day-01.jpg", "Day 1 milestone marker", "1/1",
    "Baseline milestone marker.",
    "Assessment day: notebook, tape measure and the first session, dark gym, documentary."),
  dayThirty: support("dayThirty", "/images/day-30.jpg", "Day 30 milestone marker", "1/1",
    "Mid-programme milestone marker.",
    "Mid-programme check-in: coach and client reviewing numbers together, dark gym."),
  daySixty: support("daySixty", "/images/day-60.jpg", "Day 60 milestone marker", "1/1",
    "Sixty-day milestone marker.",
    "Sixty-day review session: measurements being taken, calm and factual, dark gym."),
} satisfies Record<string, ImageSlot>;

export type ImageKey = keyof typeof images;

/** Aspect-ratio class map — keeps Tailwind aware of every value in use. */
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

/**
 * One shared photographic grade, so the founder photography (two frames are
 * already monochrome) and any later imagery read as a single body of work.
 * Change here to restyle every founder frame at once.
 */
export const FOUNDER_GRADE = "grayscale contrast-[1.06] brightness-[0.98]";
export const HERO_GRADE = "grayscale-[0.92] contrast-[1.1] brightness-[0.82]";
