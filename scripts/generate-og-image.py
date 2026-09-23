"""
TEAM VIGNESH — social preview (Open Graph) image.

Produces a STATIC 1200x630 PNG at src/app/opengraph-image.png.

Static on purpose. The previous version was a runtime next/og ImageResponse,
and WhatsApp and iMessage in particular are unreliable with those: their
crawlers have short timeouts and often fall back to no preview at all. A plain
file is fetched once, cached by every scraper, and costs nothing to serve.

Built from the real brand assets — the official lockup and a real photograph —
so the preview matches the site rather than restating it in a different style.

Run:  python scripts/generate-og-image.py
"""

from PIL import Image, ImageDraw, ImageFont, ImageEnhance
import os

W, H = 1200, 630
INK = (8, 8, 8)
BONE = (245, 243, 238)
RED = (225, 29, 46)

FONT_BOLD = r"C:\Windows\Fonts\arialbd.ttf"
OUT = "src/app/opengraph-image.png"


def font(size):
    try:
        return ImageFont.truetype(FONT_BOLD, size)
    except OSError:
        return ImageFont.load_default()


canvas = Image.new("RGB", (W, H), INK)

# Technical grid FIRST, so the photograph pasted later covers it rather than
# having grid lines ruled across the subject's face.
_g = ImageDraw.Draw(canvas)
for _x in range(0, W, 88):
    _g.line([(_x, 0), (_x, H)], fill=(20, 20, 22))
for _y in range(0, H, 88):
    _g.line([(0, _y), (W, _y)], fill=(20, 20, 22))

# ---------------------------------------------------------------- photograph
# Sits on the right and fades into the ground, so the type side stays clean.
photo = Image.open("public/images/vignesh-portrait.jpg").convert("RGB")
photo = ImageEnhance.Color(photo).enhance(0.0)          # match the site's mono grade
photo = ImageEnhance.Contrast(photo).enhance(1.06)
photo = ImageEnhance.Brightness(photo).enhance(0.92)

PANEL_W = int(W * 0.44)
scale = max(PANEL_W / photo.width, H / photo.height)
photo = photo.resize((int(photo.width * scale), int(photo.height * scale)), Image.LANCZOS)
# Keep the face: crop from the upper portion of the frame.
left = max(0, (photo.width - PANEL_W) // 2)
top = max(0, int((photo.height - H) * 0.18))
photo = photo.crop((left, top, left + PANEL_W, top + H))
canvas.paste(photo, (W - PANEL_W, 0))

# Horizontal fade from the ground into the photograph.
fade = Image.new("L", (PANEL_W, H), 0)
fd = ImageDraw.Draw(fade)
for x in range(PANEL_W):
    t = x / PANEL_W
    fd.line([(x, 0), (x, H)], fill=int(255 * max(0.0, 1 - t * 2.1)))
canvas.paste(Image.new("RGB", (PANEL_W, H), INK), (W - PANEL_W, 0), fade)

d = ImageDraw.Draw(canvas)

# ---------------------------------------------------------------- accent rule
d.rectangle([0, 0, W, 6], fill=RED)

# ---------------------------------------------------------------- lockup
lockup = Image.open("public/brand/tv-logo-full.png").convert("RGB")
lh = 238
lockup = lockup.resize((int(lockup.width * lh / lockup.height), lh), Image.LANCZOS)
# The artwork sits on solid black, so screen-blending drops its field cleanly.
region = canvas.crop((72, 62, 72 + lockup.width, 62 + lockup.height))
from PIL import ImageChops
canvas.paste(ImageChops.screen(region, lockup), (72, 62))

# ---------------------------------------------------------------- type
X = 72
y = 62 + lh + 40

d.text((X, y), "PERSONAL TRAINING  ·  NUTRITION  ·  PERFORMANCE",
       font=font(22), fill=(255, 86, 97))

y += 42
d.text((X, y), "Build a stronger", font=font(58), fill=BONE)
d.text((X, y + 62), "version of you.", font=font(58), fill=BONE)

y += 142
d.line([(X, y), (X + 300, y)], fill=(60, 60, 64), width=1)
d.text((X, y + 20), "Vigneshwaran  ·  +91 96001 38336",
       font=font(24), fill=(150, 150, 152))

os.makedirs(os.path.dirname(OUT), exist_ok=True)
canvas.save(OUT, "PNG", optimize=True)
print(f"{OUT}  {W}x{H}  {os.path.getsize(OUT)/1024:.0f} KB")
