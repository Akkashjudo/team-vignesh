"""
TEAM VIGNESH — photograph preparation.

Every source photo is portrait (0.56–0.98). Several site slots are landscape,
so letting CSS `object-cover` do the cropping would cut heads off. Instead each
photo is cropped HERE to its target slot ratio, with the crop window chosen so
the faces and the coaching action stay in frame. The site then never has to
guess: the file already has the right shape.

Run:  python scripts/prepare-photos.py
"""

from PIL import Image, ImageOps
import os

SRC = ".tmp-assets/batch2"
FOUNDER_SRC = (
    r"C:\Users\AKKASH~1\AppData\Local\Temp\claude"
    r"\C--Users-AKKASH-RAJ-Desktop-team-vignesh"
    r"\7ecf8a31-af07-4162-8276-7997b0628970\images\1.jpg"
)
OUT = "public/images"

# Source files, in the order the contact sheet numbered them.
FILES = sorted(f for f in os.listdir(SRC) if f.lower().endswith((".jpeg", ".jpg")))


def crop_to(img, ratio, top_frac, zoom=1.0, x_frac=0.5):
    """
    Crop to `ratio` (w/h). `top_frac` places the crop window vertically:
    0.0 = flush to the top of the frame, 1.0 = flush to the bottom.
    `zoom` > 1 tightens in on the subject; `x_frac` places that tighter window
    horizontally. Only ever crops — nothing is stretched.
    """
    w, h = img.size

    if zoom > 1.0:
        new_w = w / zoom
        left = (w - new_w) * x_frac
        img = img.crop((int(left), 0, int(left + new_w), h))
        w, h = img.size

    target_h = w / ratio
    if target_h <= h:
        top = int(round((h - target_h) * top_frac))
        return img.crop((0, top, w, top + int(round(target_h))))
    # Source is not tall enough — crop width instead, centred.
    target_w = h * ratio
    left = int(round((w - target_w) / 2))
    return img.crop((left, 0, left + int(round(target_w)), h))


def build(source, out_name, ratio, top_frac, max_w=1200, q=84, zoom=1.0, x_frac=0.5):
    img = ImageOps.exif_transpose(Image.open(source)).convert("RGB")
    img = crop_to(img, ratio, top_frac, zoom, x_frac)
    if img.width > max_w:
        img = img.resize((max_w, int(round(max_w * img.height / img.width))), Image.LANCZOS)
    path = f"{OUT}/{out_name}"
    img.save(path, "JPEG", quality=q, optimize=True, progressive=True)
    print(f"  {out_name:34s} {img.width}x{img.height}  ratio {img.width/img.height:.3f}"
          f"  {os.path.getsize(path)/1024:5.0f}KB")


R_4_5, R_3_4, R_4_3, R_3_2 = 4 / 5, 3 / 4, 4 / 3, 3 / 2

# n -> (output name, ratio, top_frac, source override, zoom, x_frac)
# top_frac/zoom are tuned per photo so heads stay inside the frame and the
# subject is not lost in a wide room.
PLAN = [
    # --- founder -----------------------------------------------------------
    (None, "vignesh-portrait.jpg",      R_3_4, 0.17, FOUNDER_SRC, 1.0, 0.50),  # DISCIPLINE portrait
    # --- coaching in action ------------------------------------------------
    (14,   "personal-training.jpg",     R_4_5, 0.50, None, 1.00, 0.50),  # spotting a shoulder press
    (6,    "hypertrophy.jpg",           R_4_5, 0.25, None, 1.00, 0.50),  # coaching a seated press
    (3,    "strength-training.jpg",     R_4_5, 0.16, None, 1.00, 0.50),  # client, overhead barbell
    (16,   "fundamental-movement.jpg",  R_4_3, 0.24, None, 1.00, 0.50),  # correcting technique
    (15,   "functional-training.jpg",   R_4_3, 0.22, None, 1.10, 0.62),  # coaching a standing lift
    (1,    "offline-coaching.jpg",      R_3_2, 0.34, None, 1.75, 0.56),  # coach and client on the floor
    (5,    "vignesh-motion.jpg",        R_4_5, 0.10, None, 1.00, 0.50),  # founder accent: assisting a set
    # --- education ---------------------------------------------------------
    (13,   "qualification-award.jpg",   R_3_2, 0.31, None, 1.00, 0.50),  # certificate presentation
]

print(f"{len(PLAN)} photographs\n")
for n, out_name, ratio, top_frac, override, zoom, x_frac in PLAN:
    src = override if override else os.path.join(SRC, FILES[n - 1])
    build(src, out_name, ratio, top_frac, zoom=zoom, x_frac=x_frac)
