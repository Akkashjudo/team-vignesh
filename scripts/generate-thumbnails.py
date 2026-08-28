"""
TEAM VIGNESH — category thumbnail generator.

Produces the supporting artwork for every non-photographic image slot so no
card on the site is ever left with an empty container.

These are DESIGNED CATEGORY TILES, not photographs: a dark brand ground, a soft
light pool, a geometric motif that reads for the category, fine grain and a
vignette. They share one art direction so a grid of them reads as one system.

They are meant to be replaced by real photography when it exists — drop a file
into /public/images/ with the same name and it takes over automatically.

Motifs are drawn in a NORMALISED 0..1 box centred in the frame, so the same
motif keeps its proportions whether the slot is 4:5, 4:3, 3:2 or 16:9.
Everything is drawn at 3x and downsampled with LANCZOS for clean edges.

Run:  python scripts/generate-thumbnails.py
"""

from PIL import Image, ImageDraw, ImageFilter
import math
import os
import random

OUT = "public/images"
SS = 3

INK = (9, 9, 10)
RED = (204, 26, 42)
RED_HI = (232, 46, 62)

# Tonal ladder used for every motif, darkest → brightest.
T1, T2, T3, T4 = (34, 34, 37), (58, 59, 64), (92, 94, 100), (150, 153, 160)

GLOW_STEEL = (46, 49, 56)
GLOW_RED = (40, 16, 20)


# --------------------------------------------------------------------------- ground

def ground(W, H, glow_xy, glow_col):
    img = Image.new("RGB", (W, H), INK)

    mask = Image.new("L", (W, H), 0)
    md = ImageDraw.Draw(mask)
    cx, cy = int(W * glow_xy[0]), int(H * glow_xy[1])
    r = int(max(W, H) * 0.72)
    steps = 40
    for i in range(steps):
        rr = int(r * (1 - i / steps))
        md.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=int(255 * (i / steps) ** 1.6))
    mask = mask.filter(ImageFilter.GaussianBlur(radius=max(W, H) // 9))

    return Image.composite(Image.new("RGB", (W, H), glow_col), img, mask)


def hairgrid(d, W, H, alpha=16):
    c = tuple(int(INK[i] + (255 - INK[i]) * (alpha / 255)) for i in range(3))
    step = int(W / 8)
    for x in range(step, W, step):
        d.line([(x, 0), (x, H)], fill=c, width=SS)
    for y in range(step, H, step):
        d.line([(0, y), (W, y)], fill=c, width=SS)


def grain(img, amount=26):
    w, h = img.size
    rnd = random.Random(7)
    n = Image.new("L", (w // 2, h // 2))
    n.putdata([128 + rnd.randint(-amount, amount) for _ in range((w // 2) * (h // 2))])
    n = n.resize((w, h), Image.BILINEAR)
    return Image.blend(img, Image.merge("RGB", (n, n, n)), 0.05)


def vignette(img, strength=0.42):
    w, h = img.size
    mask = Image.new("L", (w, h), 0)
    md = ImageDraw.Draw(mask)
    steps = 36
    for i in range(steps):
        t = i / steps
        ix, iy = int(w * 0.52 * t), int(h * 0.52 * t)
        md.ellipse([-w * 0.18 + ix, -h * 0.18 + iy, w * 1.18 - ix, h * 1.18 - iy],
                   fill=int(255 * (1 - t)))
    mask = mask.filter(ImageFilter.GaussianBlur(radius=min(w, h) // 7))
    return Image.composite(img, Image.blend(img, Image.new("RGB", (w, h), (0, 0, 0)), strength), mask)


# --------------------------------------------------------------------------- motif box

class Box:
    """Normalised 0..1 drawing surface centred in the frame."""

    def __init__(self, d, W, H, scale=0.58):
        self.d = d
        self.s = min(W, H) * scale
        self.ox = (W - self.s) / 2
        self.oy = (H - self.s) / 2
        self.unit = self.s

    def p(self, x, y):
        return (self.ox + x * self.s, self.oy + y * self.s)

    def u(self, v):
        return max(int(v * self.unit), SS)

    def line(self, pts, fill, w, joint=None):
        self.d.line([self.p(*q) for q in pts], fill=fill, width=self.u(w), joint=joint)

    def rect(self, x0, y0, x1, y1, fill, radius=0.006):
        self.d.rounded_rectangle([*self.p(x0, y0), *self.p(x1, y1)],
                                 radius=self.u(radius), fill=fill)

    def ellipse(self, cx, cy, r, fill=None, outline=None, w=0.01):
        self.d.ellipse([*self.p(cx - r, cy - r), *self.p(cx + r, cy + r)],
                       fill=fill, outline=outline, width=self.u(w))

    def arc(self, cx, cy, r, a0, a1, fill, w=0.012):
        self.d.arc([*self.p(cx - r, cy - r), *self.p(cx + r, cy + r)],
                   a0, a1, fill=fill, width=self.u(w))

    def pie(self, cx, cy, r, a0, a1, fill):
        self.d.pieslice([*self.p(cx - r, cy - r), *self.p(cx + r, cy + r)], a0, a1, fill=fill)


# --------------------------------------------------------------------------- motifs

def m_barbell(b):
    """Loaded barbell, viewed square on."""
    cy = 0.5
    b.rect(0.02, cy - 0.016, 0.98, cy + 0.016, T3, 0.008)           # bar
    # Both ends mirror: largest plate innermost, stepping down outward.
    for side, (x0, out) in enumerate(((0.22, -1), (0.78, +1))):
        for i, (ph, pw, tone) in enumerate([(0.30, 0.032, T4), (0.23, 0.028, T2), (0.16, 0.024, T1)]):
            x = x0 + out * i * 0.072
            col = RED if i == 0 else tone      # accent on the heaviest plate, both ends
            b.rect(x - pw, cy - ph, x + pw, cy + ph, col, 0.008)
    for x in (0.05, 0.95):                                           # collars
        b.rect(x - 0.012, cy - 0.055, x + 0.012, cy + 0.055, T2, 0.005)


def m_bars(b):
    """Ascending bars — progressive overload."""
    n = 6
    for i in range(n):
        x = 0.06 + i * 0.156
        h = 0.16 + 0.115 * i
        col = RED if i == n - 1 else (T1, T1, T2, T2, T3, T3)[i]
        b.rect(x, 0.86 - h, x + 0.095, 0.86, col, 0.006)
    b.line([(0.02, 0.87), (0.98, 0.87)], T2, 0.008)


def m_pulse(b):
    """Interval trace."""
    pts = []
    for i in range(121):
        t = i / 120
        y = 0.5
        for c, amp in ((0.32, 1.0), (0.66, 0.62)):
            dd = abs(t - c)
            if dd < 0.07:
                y -= math.cos(dd / 0.07 * math.pi / 2) ** 2 * 0.30 * amp
        pts.append((0.02 + t * 0.96, y + math.sin(t * 14) * 0.012))
    b.line(pts, T2, 0.016, joint="curve")
    b.line(pts[:52], RED, 0.020, joint="curve")


def m_arcs(b):
    """Concentric output arcs."""
    for i in range(5):
        r = 0.20 + i * 0.14
        b.arc(0.5, 0.86, r, 200, 340, RED if i == 1 else (T3, T3, T2, T2, T1)[i],
              0.020 if i == 1 else 0.013)


def m_plate(b, split=(45, 165)):
    """Divided plate — nutrition."""
    b.ellipse(0.5, 0.5, 0.46, outline=T2, w=0.014)
    r = 0.34
    b.pie(0.5, 0.5, r, -90, split[0], T1)
    b.pie(0.5, 0.5, r, split[0], split[1], RED)
    b.pie(0.5, 0.5, r, split[1], 270, T2)
    b.ellipse(0.5, 0.5, 0.46, outline=T3, w=0.008)


def m_stack(b):
    """Stacked units — portions / protein."""
    cols, rows = 5, 3
    cw, ch, gap = 0.165, 0.115, 0.028
    for r_ in range(rows):
        for c_ in range(cols - r_):
            x = 0.03 + c_ * (cw + gap) + r_ * (cw + gap) / 2
            y = 0.82 - r_ * (ch + gap)
            top = (r_ == rows - 1 and c_ == 0)
            b.rect(x, y - ch, x + cw, y, RED if top else (T1, T2, T3)[r_], 0.006)


def m_wave(b):
    """Soft waves — recovery."""
    for i in range(5):
        pts = []
        for j in range(81):
            t = j / 80
            pts.append((0.02 + t * 0.96,
                        0.22 + i * 0.14 + math.sin(t * math.pi * 2 + i * 0.6) * 0.055))
        b.line(pts, RED if i == 2 else (T2, T3, T4, T3, T2)[i],
               0.022 if i == 2 else 0.014, joint="curve")


def m_rings(b):
    """Concentric pressure rings — deep tissue."""
    for i in range(6):
        b.ellipse(0.5, 0.5, 0.08 + i * 0.082,
                  outline=RED if i == 1 else (T3, T3, T2, T2, T1, T1)[i],
                  w=0.020 if i == 1 else 0.010)


def m_range(b):
    """Range-of-motion diagram."""
    px, py, r = 0.16, 0.84, 0.80
    b.arc(px, py, r, 268, 356, RED, 0.016)
    for ang, tone in ((-86, T3), (-45, T2), (-6, T3)):
        a = math.radians(ang)
        b.line([(px, py), (px + math.cos(a) * r * 0.92, py + math.sin(a) * r * 0.92)], tone, 0.012)
    b.ellipse(px, py, 0.026, fill=T4)


def m_device(b):
    """Handset + signal — online coaching."""
    x, y, dw, dh = 0.30, 0.5, 0.15, 0.34
    b.d.rounded_rectangle([*b.p(x - dw, y - dh), *b.p(x + dw, y + dh)],
                          radius=b.u(0.035), outline=T4, width=b.u(0.018))
    for i in range(3):
        yy = y - 0.17 + i * 0.15
        b.line([(x - 0.09, yy), (x + 0.09 - i * 0.055, yy)], RED if i == 0 else T2, 0.014)
    for i in range(3):
        b.arc(0.72, y, 0.16 + i * 0.13, 300, 60, (T4, T3, T2)[i], 0.016)


def m_pair(b):
    """Coach and client."""
    for cx, sc, hit in ((0.34, 1.0, False), (0.66, 0.82, True)):
        hr = 0.085 * sc
        top = 0.24 + (0.06 if hit else 0)
        col = RED if hit else T4
        b.ellipse(cx, top, hr, fill=col)
        b.rect(cx - hr * 1.2, top + hr * 1.6, cx + hr * 1.2, 0.80,
               RED if hit else T2, radius=0.05)
    b.line([(0.10, 0.87), (0.90, 0.87)], T1, 0.008)


def m_milestone(b, filled=0.33):
    """Milestone ring — the Day 01 / 30 / 60 markers. `filled` is progress."""
    b.ellipse(0.5, 0.5, 0.40, outline=T1, w=0.030)
    sweep = 360 * filled
    b.arc(0.5, 0.5, 0.40, -90, -90 + sweep, RED, 0.030)
    b.ellipse(0.5, 0.5, 0.26, outline=T2, w=0.010)
    a = math.radians(-90 + sweep)
    b.ellipse(0.5 + math.cos(a) * 0.40, 0.5 + math.sin(a) * 0.40, 0.045, fill=RED)
    for i in range(12):                       # tick ring
        ang = math.radians(i * 30)
        c, s_ = math.cos(ang), math.sin(ang)
        b.line([(0.5 + c * 0.50, 0.5 + s_ * 0.50), (0.5 + c * 0.55, 0.5 + s_ * 0.55)], T2, 0.010)


def m_mark(b):
    """Editorial mark — journal thumbs."""
    b.line([(0.03, 0.42), (0.40, 0.42)], RED, 0.026)
    for i, tone in enumerate((T3, T2, T1)):
        b.line([(0.03, 0.56 + i * 0.115), (0.03 + (0.72 - i * 0.16), 0.56 + i * 0.115)], tone, 0.016)
    b.arc(0.80, 0.24, 0.20, 0, 360, T2, 0.012)


# --------------------------------------------------------------------------- build

SPEC = {
    "strength-training":      (4, 5, m_barbell, (0.70, 0.24), GLOW_STEEL, 0.62),
    "hypertrophy":            (4, 5, m_bars,    (0.30, 0.26), GLOW_STEEL, 0.60),
    "conditioning":           (4, 3, m_pulse,   (0.24, 0.30), GLOW_RED,   0.66),
    "functional-training":    (4, 3, m_range,   (0.74, 0.28), GLOW_STEEL, 0.56),
    "fundamental-movement":   (4, 3, m_range,   (0.30, 0.24), GLOW_STEEL, 0.56),
    "personal-training":      (4, 5, m_pair,    (0.62, 0.24), GLOW_STEEL, 0.60),
    "online-coaching":        (3, 2, m_device,  (0.72, 0.30), GLOW_STEEL, 0.58),
    "offline-coaching":       (3, 2, m_pair,    (0.28, 0.26), GLOW_STEEL, 0.58),
    "nutrition":              (4, 5, m_plate,   (0.66, 0.26), GLOW_STEEL, 0.60),
    "nutrition-protein":      (4, 3, m_stack,   (0.28, 0.26), GLOW_STEEL, 0.60),
    "nutrition-pre-workout":  (4, 3, m_arcs,    (0.70, 0.30), GLOW_STEEL, 0.58),
    "nutrition-post-workout": (4, 3, m_plate,   (0.32, 0.28), GLOW_RED,   0.58),
    "nutrition-indian":       (4, 3, m_plate,   (0.68, 0.24), GLOW_STEEL, 0.58),
    "recovery":               (3, 2, m_wave,    (0.30, 0.28), GLOW_STEEL, 0.62),
    "recovery-deep-tissue":   (4, 5, m_rings,   (0.66, 0.30), GLOW_RED,   0.58),
    "recovery-mobility":      (4, 3, m_wave,    (0.72, 0.26), GLOW_STEEL, 0.62),
    "journal-01":             (16, 9, m_mark,   (0.74, 0.28), GLOW_STEEL, 0.62),
    "journal-02":             (16, 9, m_stack,  (0.28, 0.26), GLOW_STEEL, 0.62),
    "journal-03":             (16, 9, m_bars,   (0.72, 0.30), GLOW_STEEL, 0.62),
    "journal-04":             (16, 9, m_wave,   (0.30, 0.24), GLOW_STEEL, 0.62),
    # Programme milestones — process markers, not client photographs.
    "day-01":                 (1, 1, m_milestone, (0.30, 0.26), GLOW_STEEL, 0.60),
    "day-30":                 (1, 1, m_milestone, (0.70, 0.28), GLOW_STEEL, 0.60),
    "day-60":                 (1, 1, m_milestone, (0.50, 0.24), GLOW_RED,   0.60),
}

MILESTONE_FILL = {"day-01": 0.06, "day-30": 0.50, "day-60": 0.92}

# Different plate splits so the three nutrition plates are not identical.
PLATE_SPLIT = {
    "nutrition": (45, 165),
    "nutrition-post-workout": (10, 150),
    "nutrition-indian": (70, 200),
}

BASE_W = 1080
os.makedirs(OUT, exist_ok=True)
total = 0

for name, (rw, rh, motif, glow_xy, glow_col, scale) in SPEC.items():
    w = BASE_W
    h = int(round(BASE_W * rh / rw))
    W, H = w * SS, h * SS

    img = ground(W, H, glow_xy, glow_col)
    d = ImageDraw.Draw(img)
    hairgrid(d, W, H)

    b = Box(d, W, H, scale=scale)
    if motif is m_plate:
        m_plate(b, PLATE_SPLIT.get(name, (45, 165)))
    elif motif is m_milestone:
        m_milestone(b, MILESTONE_FILL[name])
    else:
        motif(b)

    img = img.resize((w, h), Image.LANCZOS)
    img = grain(img)
    img = vignette(img)

    path = f"{OUT}/{name}.jpg"
    img.save(path, "JPEG", quality=86, optimize=True, progressive=True)
    total += os.path.getsize(path)
    print(f"  {name:24s} {w}x{h}  {os.path.getsize(path)/1024:5.0f} KB")

print(f"\n{len(SPEC)} tiles, {total/1024:.0f} KB total")
