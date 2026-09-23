/**
 * SITE COPY
 * ---------------------------------------------------------------------------
 * All written content lives here so it can be edited without touching layout.
 *
 * Nothing in this file invents credentials, awards, client numbers, years of
 * experience or results. Client testimonials are reproduced from what the
 * clients themselves wrote.
 */

import { waMessages } from "./site";
import type { ImageKey } from "./images";

/* ==========================================================================
   HERO
   ========================================================================== */

export const hero = {
  eyebrow: ["Personal Training", "Nutrition", "Performance"],
  lines: ["Build a stronger", "version of you."],
  supporting:
    "Personalized coaching for fat loss, muscle gain, strength, body recomposition and better overall fitness — built around your body, lifestyle and goals.",
  primary: { label: "Start Your Transformation", href: "/contact" },
  secondary: { label: "Meet Your Coach", href: "#the-coach" },
};

/* ==========================================================================
   FOUNDER — sits directly beneath the hero
   ========================================================================== */

export const founder = {
  label: "The Coach",
  index: "01",
  heading: "Meet Vignesh.",
  positioning: "The coach behind TEAM VIGNESH.",
  body: [
    "Vigneshwaran combines structured training, nutrition guidance, recovery and individual coaching to help clients build stronger, healthier and more sustainable lifestyles.",
    "His approach is simple: understand the person first, build the right plan, train with purpose, track progress and continue improving.",
  ],
  primary: { label: "Train With Vignesh", href: "/contact" },
  instagramCta: "Follow Vignesh On Instagram",
};

/* ==========================================================================
   COACHING POSITIONING — the short statement after the founder
   ========================================================================== */

export const positioning = {
  label: "How coaching works here",
  index: "02",
  heading: ["Coaching is a relationship,", "not a download."],
  body: "You are not buying a workout file. You are working with a coach who knows your starting point, your schedule and what you are actually trying to change — and who adjusts the plan as you go.",
  pillars: [
    { title: "Built for you", body: "Your programme starts from your assessment, not from a template." },
    { title: "Coached, not sent", body: "Technique, load and effort are guided — in person or online." },
    { title: "Reviewed honestly", body: "Progress is measured against your baseline, not against how a session felt." },
    { title: "Adjusted over time", body: "What works continues. What does not gets changed." },
  ],
};

/* ==========================================================================
   GOALS
   ========================================================================== */

export interface Goal {
  index: string;
  title: string;
  blurb: string;
  image: ImageKey;
  href: string;
}

export const goalsHeading = "What are you working toward?";

export const goals: Goal[] = [
  {
    index: "01",
    title: "Fat Loss",
    blurb: "Build habits, training capacity and consistency around sustainable fat loss.",
    image: "conditioning",
    href: "/coaching#body-recomposition",
  },
  {
    index: "02",
    title: "Muscle Gain",
    blurb: "Progressive resistance training designed around muscular development.",
    image: "hypertrophy",
    href: "/coaching#personal-training",
  },
  {
    index: "03",
    title: "Strength",
    blurb: "Build stronger movement patterns and measurable physical capability.",
    image: "strengthTraining",
    href: "/coaching#personal-training",
  },
  {
    index: "04",
    title: "Body Recomposition",
    blurb: "Improve the balance between lean mass and body fat through structured training and nutrition.",
    image: "personalTraining",
    href: "/coaching#body-recomposition",
  },
  {
    index: "05",
    title: "General Fitness",
    blurb: "Move better, train consistently and improve overall physical capacity.",
    image: "functional",
    href: "/coaching#personal-training",
  },
  {
    index: "06",
    title: "Athletic Performance",
    blurb: "Build strength, conditioning, movement and recovery around performance.",
    image: "fundamentals",
    href: "/coaching#offline-coaching",
  },
];

/* ==========================================================================
   SERVICES
   ========================================================================== */

export interface Service {
  id: string;
  index: string;
  title: string;
  short: string;
  description: string;
  who: string[];
  work: string[];
  how: string[];
  receive: string[];
  cta: { label: string; message: string };
  image: ImageKey;
  featured?: boolean;
  href: string;
}

export const servicesHeading = "Coaching built around your goal.";
export const servicesSupporting =
  "Whether the goal is fat loss, muscle gain, strength, better movement or simply becoming more consistent, your training should be built around you — not copied from someone else.";

export const services: Service[] = [
  {
    id: "personal-training",
    index: "01",
    title: "Personal Training",
    short: "One-to-one coaching built around your current ability, goals and progression.",
    description:
      "One-to-one coaching built around your current ability, goals and progression. The programme starts from where you actually are, and moves as you move.",
    who: [
      "Beginners who want to start correctly",
      "Working professionals with limited time",
      "Gym-goers who have stopped progressing",
      "Anyone restarting after a long break",
    ],
    work: ["Fat loss", "Muscle gain", "Strength development", "Personalised programming"],
    how: [
      "Assessment of goals, training history, schedule and current condition",
      "A programme written for you rather than pulled from a template",
      "Coaching on technique, progression and effort",
      "Regular review and adjustment as you progress",
    ],
    receive: [
      "A structured training programme",
      "Technique coaching and correction",
      "Progression tracking",
      "Direct access to your coach",
    ],
    cta: { label: "Start Personal Training", message: waMessages.personalTraining },
    image: "personalTraining",
    featured: true,
    href: "/coaching#personal-training",
  },
  {
    id: "online-coaching",
    index: "05",
    title: "Online Coaching",
    short: "Structured coaching for clients who want TEAM VIGNESH guidance from anywhere.",
    description:
      "Structured coaching for clients who want TEAM VIGNESH guidance from anywhere. The same system — assessment, programming, nutrition structure, check-ins and adjustments — delivered around your schedule and the equipment you actually have.",
    who: [
      "Clients outside the city",
      "People with unpredictable schedules",
      "Anyone training at home or in a limited gym",
      "Clients who want structure without a fixed session time",
    ],
    work: ["Personalised programming", "Nutrition guidance", "Progress monitoring", "Ongoing coach support"],
    how: [
      "Apply with your goals, history and available equipment",
      "A consultation to set direction and expectations",
      "Receive your training and nutrition structure",
      "Train, log your sessions and check in",
      "Progress is reviewed and the plan is adjusted",
    ],
    receive: [
      "A personalised training plan",
      "Nutrition guidance for your goal",
      "Scheduled check-ins and progress reviews",
      "Coach support between sessions",
    ],
    cta: { label: "Join Online Coaching", message: waMessages.online },
    image: "onlineCoaching",
    featured: true,
    href: "/online-coaching",
  },
  {
    id: "body-recomposition",
    index: "02",
    title: "Body Recomposition",
    short: "A structured approach combining training, nutrition and consistency to improve body composition.",
    description:
      "A structured approach combining training, nutrition and consistency to improve body composition — lowering body fat while building muscle and strength. It is slower than a crash diet and considerably more durable.",
    who: [
      "People who want to change shape, not just weight",
      "Clients who have lost weight before and regained it",
      "Anyone who wants an approach they can keep",
    ],
    work: [
      "Body fat reduction",
      "Muscle development",
      "Strength retained through a fat-loss phase",
      "Habits that hold after the programme ends",
    ],
    how: [
      "Baseline assessment and measurements",
      "Resistance training as the foundation",
      "Nutrition structured around protein and total intake",
      "Reviews at day 30 and day 60 to check direction",
    ],
    receive: [
      "A training and nutrition structure",
      "Progress tracking across the programme",
      "Adjustments based on your actual response",
    ],
    cta: { label: "Start Body Recomposition", message: waMessages.recomposition },
    image: "hypertrophy",
    href: "/coaching#body-recomposition",
  },
  {
    id: "nutrition",
    index: "03",
    title: "Nutrition Guidance",
    short: "Practical nutrition support designed to complement your training and lifestyle.",
    description:
      "Practical nutrition support designed to complement your training and lifestyle. The focus is protein, a daily structure you can repeat, and what to eat around training — using food you already have at home.",
    who: [
      "Anyone unsure what to eat around training",
      "People who struggle to hit protein",
      "Clients who want to eat normal food and still progress",
    ],
    work: [
      "A sustainable daily structure",
      "Daily protein intake",
      "Meal timing around training",
      "Practical Indian food options",
    ],
    how: [
      "Review of what you currently eat and when",
      "A structure built around your routine",
      "Practical swaps rather than restriction",
      "Adjustment as training and goals change",
    ],
    receive: [
      "A daily nutrition structure",
      "Protein and meal guidance",
      "Pre and post-workout recommendations",
      "Food options that fit your household",
    ],
    cta: { label: "Get Nutrition Guidance", message: waMessages.nutrition },
    image: "nutrition",
    href: "/nutrition",
  },
  {
    id: "recovery",
    index: "04",
    title: "Sports Massage & Deep Tissue",
    short: "Recovery-focused sessions supporting mobility, muscle relaxation and readiness between training sessions.",
    description:
      "Recovery-focused sessions supporting mobility, muscle relaxation and readiness between training sessions. The work targets general muscle tightness and accumulated training stress so you can keep training consistently.",
    who: [
      "People training several times a week",
      "Clients carrying general muscle tightness",
      "Anyone whose recovery is lagging behind their training",
    ],
    work: ["Recovery between training blocks", "Muscle tightness", "Mobility and movement quality", "Training stress"],
    how: [
      "A short conversation about your training and how you feel",
      "Targeted soft tissue and deep tissue work",
      "Mobility guidance to carry into your week",
    ],
    receive: [
      "A focused recovery session",
      "Practical mobility guidance",
      "Recommendations for training around tight areas",
    ],
    cta: { label: "Book A Recovery Session", message: waMessages.recovery },
    image: "recovery",
    href: "/recovery",
  },
  {
    id: "offline-coaching",
    index: "06",
    title: "Offline Coaching",
    short: "Hands-on training with direct coaching, technique feedback and accountability.",
    description:
      "Hands-on training with direct coaching, technique feedback and accountability. The advantage is immediate correction — technique fixed as it happens and effort managed set by set.",
    who: [
      "Clients who want hands-on coaching",
      "Beginners building technique from day one",
      "People who train better with someone in the room",
    ],
    work: ["Direct coaching", "Technique correction", "Structured progression", "Accountability"],
    how: [
      "In-person assessment",
      "Sessions coached directly",
      "Technique and load adjusted live",
      "Progress reviewed together",
    ],
    receive: [
      "Coached sessions in person",
      "Real-time technique correction",
      "A progression plan you can follow",
    ],
    cta: { label: "Train With Vignesh", message: waMessages.offline },
    image: "offlineCoaching",
    href: "/coaching#offline-coaching",
  },
];

export const homeServiceOrder = [
  "personal-training",
  "online-coaching",
  "body-recomposition",
  "nutrition",
  "recovery",
  "offline-coaching",
];

/* ==========================================================================
   THE METHOD
   ========================================================================== */

export const methodHeading = ["A simple system.", "Executed consistently."];

export const method = [
  {
    index: "01",
    title: "Assess",
    body: "Understand goals, lifestyle, fitness level and current condition.",
    detail:
      "Before anything is written down we establish where you actually are — training history, injuries, work schedule, sleep, food and what you want to change.",
  },
  {
    index: "02",
    title: "Plan",
    body: "Build the training and nutrition strategy.",
    detail:
      "A programme is built from that assessment: how often you can train, what equipment you have, and what your body responds to.",
  },
  {
    index: "03",
    title: "Train",
    body: "Execute with proper technique, progression and accountability.",
    detail:
      "The work gets done. Technique is coached, load progresses deliberately, and effort is managed so the plan stays repeatable.",
  },
  {
    index: "04",
    title: "Review",
    body: "Track progress and adjust the programme when needed.",
    detail: "Progress is reviewed against the baseline. What is working continues. What is not gets changed.",
  },
];

/* ==========================================================================
   TESTIMONIALS — reproduced from what clients wrote.
   Do not edit the substance of a quote. Do not add clients who have not
   given permission.
   ========================================================================== */

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  /** Short pull-out shown at large size on the featured card. */
  headline: string;
  /** Optional real client photograph. Never fabricate one. */
  image: ImageKey | null;
}

export const testimonialsHeading = "Progress, in their words.";

export const testimonials: Testimonial[] = [
  {
    id: "avtansh",
    name: "Avtansh Sharma",
    role: "TEAM VIGNESH Client",
    headline: "Eight months later, I have lost 21 kg and I feel far more active, healthy and motivated.",
    quote:
      "I started training with Vignesh in December 2025 at 128 kg. At the time, my mobility was very limited and training felt extremely difficult. Vignesh took the time to understand my condition and started me with basic mobility work and structured weight training. Eight months later, I have lost 21 kg and I feel far more active, healthy and motivated. We are continuing to work toward my next target together. I'm extremely thankful for the time and effort Vignesh has invested in my progress and I highly recommend him to anyone serious about making a major change in their health and fitness.",
    image: null,
  },
  {
    id: "nithu",
    name: "Nithu",
    role: "TEAM VIGNESH Client",
    headline: "Every workout is well planned and tailored to my fitness level.",
    quote:
      "I've had a wonderful experience training with Vignesh. He is extremely knowledgeable, motivating and supportive. Every workout is well planned and tailored to my fitness level, making exercise both effective and enjoyable. His positive attitude and constant encouragement keep me motivated to push myself and stay consistent. I've seen a great improvement in my strength, stamina and overall fitness. I highly recommend him.",
    image: null,
  },
  {
    id: "hema",
    name: "Hema",
    role: "TEAM VIGNESH Client",
    headline: "Dynamic and holistic — tailored to what my training actually needs.",
    quote:
      "I have thoroughly enjoyed how dynamic and holistic these training sessions are. They are tailored with a multi-faceted approach, which addresses my training requirements, while helping me build strength, endurance, muscle, and better posture.",
    image: null,
  },
  {
    id: "yashpal",
    name: "Yashpal Sharma",
    role: "TEAM VIGNESH Client",
    headline: "Vignesh has completely changed my perspective.",
    quote:
      "Ten months ago, being 46 years old, I was sceptical about whether a 22-year-old trainer could guide me effectively. Vignesh has completely changed my perspective. His understanding of workouts, training structure and the way he handles each session have impressed me. I believe this is only the beginning of my fitness journey with him as my trainer, and I look forward to many more years of strong, consistent training together.",
    image: null,
  },
];

export const testimonialsDisclaimer =
  "These are individual client experiences shared in their own words. Results depend on your starting point, consistency, nutrition, sleep and health, and vary from person to person. Coaching is not a medical service.";

/* ==========================================================================
   TRAINING SYSTEM
   ========================================================================== */

export const trainingHeading = "Train with a reason behind every session.";
export const trainingSupporting =
  "Every session should have a purpose. Training is structured around what the client needs to improve — not around random exercises.";

export const workoutSystem: {
  index: string;
  title: string;
  body: string;
  image: ImageKey;
  size: "lg" | "md" | "sm";
}[] = [
  {
    index: "01",
    title: "Strength & Conditioning",
    body: "Build strength, movement quality and physical capacity you can use outside the gym.",
    image: "strengthTraining",
    size: "lg",
  },
  {
    index: "02",
    title: "Hypertrophy",
    body: "Structured resistance training focused on muscular development.",
    image: "hypertrophy",
    size: "md",
  },
  {
    index: "03",
    title: "Cardiovascular Training",
    body: "Improve endurance, work capacity and overall cardiovascular fitness.",
    image: "conditioning",
    size: "md",
  },
  {
    index: "04",
    title: "Functional Training",
    body: "Movement-led sessions built around real physical ability.",
    image: "functional",
    size: "sm",
  },
  {
    index: "05",
    title: "Fundamental Movement",
    body: "Strong movement foundations before any unnecessary complexity.",
    image: "fundamentals",
    size: "sm",
  },
  {
    index: "06",
    title: "Recovery",
    body: "Training is one part of progress. Recovery is what lets you repeat it.",
    image: "recoveryMobility",
    size: "sm",
  },
];

/* ==========================================================================
   NUTRITION
   ========================================================================== */

export const nutritionHeading = "Nutrition that fits real life.";
export const nutritionSupporting =
  "Good nutrition does not need to be complicated. The goal is to create a practical eating structure that supports training, recovery and long-term consistency.";

export const nutritionCards: {
  index: string;
  title: string;
  body: string;
  image: ImageKey;
}[] = [
  {
    index: "01",
    title: "High-Protein Meal Ideas",
    body: "Meals built around protein so you are not chasing it late at night. Eggs, curd, paneer, dal, chicken and fish.",
    image: "nutritionProtein",
  },
  {
    index: "02",
    title: "Pre-Workout Nutrition",
    body: "Enough carbohydrate to train well, light enough to move. Timed so you feel fuelled rather than full.",
    image: "nutritionPre",
  },
  {
    index: "03",
    title: "Post-Workout Nutrition",
    body: "Protein and carbohydrate after training to support recovery and the session after this one.",
    image: "nutritionPost",
  },
  {
    index: "04",
    title: "Healthy Indian Food Options",
    body: "You do not need to give up the food you grew up with. Portion it, balance it and build protein into it.",
    image: "nutritionIndian",
  },
];

export const nutritionTopics = [
  { title: "What I Eat In A Day", body: "A realistic full day of eating around training." },
  { title: "High-Protein Meal Ideas", body: "Meals that hit protein without becoming a chore." },
  { title: "Pre-Workout Nutrition", body: "What to eat before training, and how long before." },
  { title: "Post-Workout Nutrition", body: "Practical recovery meals from a normal kitchen." },
  { title: "Healthy Indian Food Options", body: "Everyday Indian dishes adjusted for a training goal." },
  { title: "Simple Daily Protein Ideas", body: "Small repeatable additions that raise daily protein." },
];

/* ==========================================================================
   ONLINE COACHING
   ========================================================================== */

export const onlineHeading = "Your location shouldn't limit your coaching.";
export const onlineSupporting =
  "TEAM VIGNESH online coaching gives you structured training, guidance and progress monitoring even when you cannot train directly with Vignesh.";

export const onlineProcess = [
  { index: "01", title: "Apply", body: "Tell us your goals and current situation." },
  { index: "02", title: "Consult", body: "Understand your training background, schedule and requirements." },
  { index: "03", title: "Plan", body: "Receive your structured training approach." },
  { index: "04", title: "Train", body: "Execute the plan consistently." },
  { index: "05", title: "Track", body: "Monitor progress." },
  { index: "06", title: "Adjust", body: "Update the plan based on progress and feedback." },
];

export const onlinePillars = [
  { title: "Personalised Plan", body: "Programming built around your goal, schedule and available equipment." },
  { title: "Coach Support", body: "Direct access to Vignesh for questions between sessions." },
  { title: "Progress Monitoring", body: "Structured check-ins so progress is tracked, not guessed." },
  { title: "Nutrition Guidance", body: "A daily structure for eating that supports the training." },
  { title: "Workout Programming", body: "Sessions written, progressed and adjusted over time." },
];

/* ==========================================================================
   QUALIFICATIONS — only the four supplied certifications.
   Do not add to this list, and do not name accrediting bodies.
   ========================================================================== */

export const qualificationsHeading = "Education behind the coaching.";

export const qualifications = [
  {
    index: "01",
    kind: "Certified",
    title: "Advanced Sports Coaching",
    body: "Coaching athletic qualities — strength, conditioning and physical performance.",
  },
  {
    index: "02",
    kind: "Certified",
    title: "Advanced Personal Trainer",
    body: "Programme design, assessment and one-to-one coaching practice.",
  },
  {
    index: "03",
    kind: "Certified",
    title: "Fitness Nutrition",
    body: "Nutrition applied to training goals, body composition and recovery.",
  },
  {
    index: "04",
    kind: "Certified",
    title: "Sports Massage & Deep Tissue Therapist",
    body: "Soft tissue and deep tissue work for training recovery and mobility.",
  },
];

/** Compact list used in the founder block. */
export const qualificationList = [
  "Certified Advanced Sports Coaching",
  "Certified Advanced Personal Trainer",
  "Certified Fitness Nutrition",
  "Certified Sports Massage & Deep Tissue Therapist",
];

/* ==========================================================================
   FAQ
   ========================================================================== */

export const faqs = [
  {
    q: "Is TEAM VIGNESH suitable for beginners?",
    a: "Yes. Coaching should be adapted to the client's current fitness level rather than expecting everyone to start at the same point.",
  },
  {
    q: "Can I train for fat loss?",
    a: "Yes. Training can be structured around fat loss alongside practical nutrition and lifestyle guidance.",
  },
  {
    q: "Can I train specifically for muscle gain?",
    a: "Yes. Programming can focus on progressive resistance training and muscular development based on your current level.",
  },
  {
    q: "Does Vignesh provide online coaching?",
    a: "Yes. Online coaching is available for clients who cannot train directly in person.",
  },
  {
    q: "Is nutrition guidance included?",
    a: "Nutrition guidance is available depending on the coaching service selected.",
  },
  {
    q: "Do you offer recovery services?",
    a: "TEAM VIGNESH offers sports massage and deep tissue recovery-focused services. These support training recovery and are not a medical treatment — anything that needs medical attention should be seen by a doctor or physiotherapist.",
  },
  {
    q: "How do I start?",
    a: "Use the enquiry form or WhatsApp TEAM VIGNESH to discuss your goal and a suitable coaching option.",
  },
];

/* ==========================================================================
   FINAL CTA
   ========================================================================== */

export const finalCta = {
  heading: ["Ready to train", "with a plan?"],
  supporting: "Tell us your goal. We'll help you understand the right place to start.",
  primary: { label: "Start Your Coaching", href: "/contact" },
  secondary: "Chat On WhatsApp",
};

/* ==========================================================================
   CONTENT FEED
   ========================================================================== */

export interface JourneyPost {
  category: string;
  title: string;
  date: string;
  image: ImageKey;
  /** EDITABLE — Instagram / YouTube / article URL. Empty renders as inactive. */
  href: string;
}

export const journeyPosts: JourneyPost[] = [
  { category: "Training", title: "Why your first four weeks should feel easier than you expect", date: "", image: "journal01", href: "" },
  { category: "Nutrition", title: "Building protein into food you already eat", date: "", image: "journal02", href: "" },
  { category: "Progress", title: "What actually changes in the first thirty days", date: "", image: "journal03", href: "" },
  { category: "Recovery", title: "Recovery is not a rest day. It is part of the programme.", date: "", image: "journal04", href: "" },
];

export const journeyCategories = [
  "Training Education",
  "Nutrition Education",
  "Weekly Progress",
  "Recovery",
  "Client Stories",
];

/* ==========================================================================
   TRANSFORMATIONS — intentionally empty.
   Add an entry only for a real client who has given written permission for
   their photographs and words to be published.
   ========================================================================== */

export interface Transformation {
  id: string;
  name: string;
  goal: string;
  programme: string;
  duration: string;
  beforeImage: ImageKey;
  afterImage: ImageKey;
  testimonial: string;
}

export const transformations: Transformation[] = [];

/* ==========================================================================
   ABOUT
   ========================================================================== */

export const about = {
  headline: "Coaching built around the person — not just the programme.",
  intro:
    "TEAM VIGNESH is the coaching practice of Vigneshwaran — a certified personal trainer, sports coach, fitness nutrition coach and sports massage therapist.",
  philosophy: [
    "Most people do not fail because they lack effort. They fail because they are following something that was never built for them — a plan copied from someone with different goals, a different schedule and a different body.",
    "The approach here is simpler. Understand the person first. Build the plan second. Then coach it properly, review it honestly, and change it when the evidence says to.",
  ],
  approach: [
    { title: "Structure over intensity", body: "A programme you can repeat for months beats one that destroys you for two weeks." },
    { title: "Technique before load", body: "Movement quality is built first. Weight is added to a pattern that already works." },
    { title: "Honest reviews", body: "Progress is measured against the baseline, not against how the session felt." },
    { title: "Recovery counts", body: "Training, nutrition and recovery are one system. Ignoring one holds back the other two." },
  ],
  values: [
    { title: "Discipline", body: "Showing up on the ordinary days is what produces results." },
    { title: "Clarity", body: "You should always know what you are doing and why." },
    { title: "Patience", body: "Real change is measured in months, not days." },
    { title: "Respect", body: "Every client starts somewhere. Nobody gets judged for their starting point." },
  ],
  /** EDITABLE — replace with Vignesh's own account when supplied. */
  journeyPlaceholder:
    "Vignesh's own training and coaching story will be published here. This section is intentionally left for his words rather than filled with something written on his behalf.",
};

/* ==========================================================================
   RECOVERY PAGE
   ========================================================================== */

export const recoveryServices = [
  { index: "01", title: "Sports Massage", body: "Soft tissue work for general muscle tightness and the accumulated stress of regular training.", image: "recovery" as ImageKey },
  { index: "02", title: "Deep Tissue Therapy", body: "Slower, deeper work on specific areas that feel restricted or persistently tight.", image: "recoveryDeepTissue" as ImageKey },
  { index: "03", title: "Training Recovery", body: "Sessions scheduled around your training week to support consistency and readiness.", image: "recoveryMobility" as ImageKey },
  { index: "04", title: "Mobility Support", body: "Practical mobility work and guidance you can continue between sessions.", image: "functional" as ImageKey },
];

export const recoveryNote =
  "These sessions support recovery and training consistency for healthy, active people. They are not a medical service and are not a substitute for diagnosis or treatment. If you have pain, an injury or a medical condition, please see a doctor or physiotherapist first.";

export const recoveryPage = {
  intro:
    "Training creates the stimulus. Recovery is what lets you repeat it. Sports massage and deep tissue sessions support that side of the work.",
  who: [
    "People training several times a week",
    "Clients carrying general muscle tightness",
    "Anyone whose recovery is lagging behind their training load",
    "Active people who sit at a desk all day",
  ],
  session: [
    { index: "01", title: "Short conversation", body: "How you have been training, what feels tight, and what you want from the session." },
    { index: "02", title: "Targeted work", body: "Sports massage and deep tissue work focused on the areas that need it." },
    { index: "03", title: "Mobility guidance", body: "A few practical things to carry into your own week." },
  ],
};

/* ==========================================================================
   NUTRITION PAGE
   ========================================================================== */

export const nutritionPage = {
  philosophy: [
    "Nutrition is the part most people overcomplicate. Before anything clever happens, three things need to be in place: enough protein, a daily structure you can repeat, and total intake that matches the goal.",
    "Nothing here asks you to give up the food you grew up with. It is easier to adjust a plate you already eat than to maintain one you do not enjoy.",
  ],
  pillars: [
    { index: "01", title: "Protein first", body: "Protein is set before anything else. It supports muscle through a fat-loss phase and gives every meal a fixed anchor." },
    { index: "02", title: "A repeatable day", body: "The same meal slots at roughly the same times. Structure removes most of the daily decisions that cause people to fall off." },
    { index: "03", title: "Food you already eat", body: "Rice, roti, dal, curd, eggs, paneer, chicken, fish, vegetables. Portioned and balanced rather than replaced." },
    { index: "04", title: "Adjust, do not restart", body: "When progress stalls, one variable changes. Starting over from zero every few weeks is what keeps people stuck." },
  ],
  mealStructure: [
    { slot: "Morning", body: "A protein-led start so the day is not spent catching up." },
    { slot: "Midday", body: "The largest balanced meal — protein, carbohydrate, vegetables." },
    { slot: "Pre-training", body: "Light and carbohydrate-focused, timed so you feel fuelled rather than full." },
    { slot: "Post-training", body: "Protein and carbohydrate to support recovery and the next session." },
    { slot: "Evening", body: "Protein and vegetables, portioned to fit the day's total." },
  ],
  disclaimer:
    "This is general nutrition guidance for healthy, active adults training toward a fitness goal. It is not medical or clinical dietary advice, and it is not a treatment for any condition. If you are pregnant, managing a medical condition, or taking medication, speak to your doctor or a registered dietitian before changing how you eat.",
};

/* ==========================================================================
   ONLINE COACHING PAGE
   ========================================================================== */

export const onlinePage = {
  intro:
    "Online coaching is the full system delivered remotely — assessment, programming, nutrition structure, check-ins and adjustments — built around the equipment and time you actually have.",
  suitedFor: [
    "You live outside the city or travel often",
    "Your schedule will not hold a fixed session time",
    "You train at home or in a limited gym",
    "You want structure and accountability without in-person sessions",
  ],
  notSuitedFor: [
    "You want hands-on technique correction in every session — offline coaching suits you better",
    "You are looking for a plan with no check-ins or communication",
  ],
  includes: [
    "A training programme written for your goal, schedule and equipment",
    "Nutrition structure and protein guidance",
    "Scheduled check-ins to review progress",
    "Direct access to Vignesh for questions between sessions",
    "Programme adjustments as you progress",
  ],
};

/* ==========================================================================
   DAY 1 / 30 / 60
   ========================================================================== */

export const journeyStages = [
  { day: "Day 01", title: "Baseline", body: "Assessment, measurements and starting photographs. Everything that follows is measured against this point.", image: "dayOne" as ImageKey },
  { day: "Day 30", title: "Progress Review", body: "First formal review. Training loads, body measurements and how the plan is fitting into your life.", image: "dayThirty" as ImageKey },
  { day: "Day 60", title: "Transformation Review", body: "A fuller review of composition, strength and habits — and the direction for the next block.", image: "daySixty" as ImageKey },
];

export const resultsDisclaimer =
  "Progress varies from person to person. Results depend on your starting point, consistency, nutrition, sleep, health and how long you train. No specific outcome is promised or guaranteed.";
