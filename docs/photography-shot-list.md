# Photography shot list

Every frame on this site is a named slot in [`src/lib/images.ts`](../src/lib/images.ts).
A slot with a real file shows the photograph. A slot with `src: null` shows a
`DetailPanel` — the same box, carrying the topic's own facts instead of a
stand-in picture.

**To fill a slot:** drop the file into `public/images/` under the name below,
change that slot's `src` from `null` to the path, swap `pending(` for `photo(`,
and write real `alt` text. Then run `python scripts/generate-blur.py`. Nothing
else moves — the panel and the photograph occupy an identical frame.

Shoot or source in **landscape or portrait as the ratio says**; the file is
cropped to that shape by `scripts/prepare-photos.py`, not by CSS, so faces are
never cut by a breakpoint.

## House style

All photography here is graded monochrome. Keep that in mind when shooting —
colour is discarded, so the picture has to work on contrast and light alone.

> Editorial fitness photography, 35mm/50mm look, realistic and believable,
> natural skin texture, South Asian / Indian subjects where people appear,
> modern charcoal-and-black gym environment, controlled directional lighting,
> deep controlled shadows, neutral desaturated palette with warm skin tones,
> a single small deep-red environmental accent at most.
>
> No text, no logos, no watermarks, no signage. No exaggerated bodybuilder
> physiques, no distorted anatomy, no plastic AI skin, no stock-photo smiling,
> no lens flare, no neon, no shallow gimmick bokeh.

---

## Priority 1 — nutrition (6 frames)

The nutrition page and the nutrition cards on the home page. Real food, honest
lighting, no food-styling tricks. Indian components welcome throughout.

| File | Ratio | What it shows |
|---|---|---|
| `nutrition.jpg` | 4/5 | A balanced high-protein meal prepared for a training day. Grilled chicken, dal, brown rice, sautéed vegetables and curd on dark ceramic, charcoal stone surface, single soft window light from the left. |
| `nutrition-protein.jpg` | 4/3 | High-protein breakfast at a three-quarter angle — boiled eggs, paneer cubes, a bowl of curd, sprouted moong. Dark stoneware, soft morning window light, matte surfaces. |
| `nutrition-pre-workout.jpg` | 4/3 | A small, light pre-training plate — banana, brown toast with peanut butter, black coffee. Minimal props, soft side light, generous negative space. |
| `nutrition-post-workout.jpg` | 4/3 | A full post-training plate — grilled fish, steamed rice, green vegetables. Warm directional light from upper left, steam just visible. Honest home cooking, not restaurant plating. |
| `nutrition-indian.jpg` | 4/3 | An everyday thali portioned for a training goal — two rotis, dal, a vegetable sabzi, curd, salad. Dark metal plate, overhead, soft even light, familiar and unstyled. |

## Priority 1 — recovery (4 frames)

The sports massage service is a real part of the business and currently has no
picture of itself anywhere on the site. Shoot respectfully: no faces are needed,
and the working area is the subject.

| File | Ratio | What it shows |
|---|---|---|
| `recovery.jpg` | 3/2 | A therapist working on an athlete's calf on a treatment table. Hands and forearms in focus, clean dark treatment room, single soft overhead light, towel draped respectfully. Clinical and calm. |
| `recovery-deep-tissue.jpg` | 4/5 | A close, respectful crop of deep tissue work on an upper back and shoulder. Hands applying pressure, dark room, low warm key light, matte skin texture. |
| `recovery-mobility.jpg` | 4/3 | An athlete foam rolling a quadricep on dark rubber flooring. Side-on camera at floor level, dark gym falling away behind, single hard light from the right, real effort in the posture. |
| `recovery-guidance.jpg` | 4/3 | A coach talking a client through a mobility drill they will repeat at home. Both mid-conversation rather than posed, single soft key light. Instructional and calm. |

## Priority 2 — conditioning (1 frame)

| File | Ratio | What it shows |
|---|---|---|
| `conditioning.jpg` | 4/3 | Sled, rower or bike intervals. A South Asian athlete driving a weighted sled across dark rubber flooring, slight motion blur in the legs, sweat on the forearms, wide industrial gym falling into shadow. Effort and motion, still readable. |

## Priority 3 — content and milestones (7 frames)

These carry the least weight: the journal cards are unpublished placeholders
(no `href` yet) and the milestone frames describe a process rather than a
person. The panels serve them adequately until there is a reason to shoot.

| File | Ratio | What it shows |
|---|---|---|
| `journal-01.jpg` | 16/9 | A rack of barbells and plates, shot as a clean graphic composition. No people, hard side light, deep shadow. |
| `journal-02.jpg` | 16/9 | Overhead of portioned whole foods on charcoal — eggs, rice, greens, curd — arranged as a clean grid. |
| `journal-03.jpg` | 16/9 | A worn training notebook and pencil on a gym bench beside a chalk-dusted hand. Single warm light, documentary. |
| `journal-04.jpg` | 16/9 | A foam roller and massage tools laid out on a dark treatment table, top-down, soft even light. |
| `day-01.jpg` | 1/1 | Assessment day — notebook, tape measure, the first session. Dark gym, documentary. |
| `day-30.jpg` | 1/1 | Mid-programme check-in — coach and client reviewing numbers together. |
| `day-60.jpg` | 1/1 | Sixty-day review — measurements being taken. Calm and factual. |

---

## Not to be filled without real clients

Six slots stay `null` permanently until there is genuine, consented client
photography:

`transformation01Before` / `After`, `transformation02Before` / `After`,
`transformation03Before` / `After`

Before and after frames must match each other in pose, lighting and framing, and
must be of real clients who have agreed to appear. **Do not fill these with
generated or stock imagery** — a fabricated transformation is a claim about
results the business has not made.
