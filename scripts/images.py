"""Erzeugt die ausgelieferten Bildgrößen aus assets-source/.

Einmalig bzw. nach dem Austausch eines Fotos ausführen:
    python3 scripts/images.py
Benötigt Pillow (pip install pillow). Die erzeugten Dateien werden mit committet,
damit der Webserver kein Python braucht.
"""
from pathlib import Path
from PIL import Image, ImageEnhance

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'assets-source'
OUT = ROOT / 'assets' / 'img'
OUT.mkdir(parents=True, exist_ok=True)

# Quelldatei -> sprechender Dateiname (Dateinamen fließen in die Bildersuche ein).
PHOTOS = {
    'hero-building': 'buerogebaeude-glasfassade',
    'about': 'empfang-koenig-schriftzug',
    'glasreinigung': 'glasfront-flur',
    'sanitaerreinigung': 'waschraum',
    'treppenhausreinigung': 'treppenhaus',
    'bodenreinigung': 'bueroflaeche-boden',
    'sonderreinigung': 'bodenreinigung-maschine',
}
WIDTHS = [480, 768, 1200, 1536]

for src, name in PHOTOS.items():
    im = Image.open(SRC / f'{src}.webp').convert('RGB')
    for w in WIDTHS:
        if w > im.width:
            continue
        h = round(im.height * w / im.width)
        im.resize((w, h), Image.LANCZOS).save(OUT / f'{name}-{w}.webp', 'WEBP', quality=74, method=6)
    if im.width not in WIDTHS:
        im.save(OUT / f'{name}-{im.width}.webp', 'WEBP', quality=74, method=6)

# Logo: weiße Schrift auf transparentem Grund, für dunkle Flächen.
logo = Image.open(SRC / 'logo.webp').convert('RGBA')
logo = logo.crop(logo.getbbox())
for w in (180, 360):
    h = round(logo.height * w / logo.width)
    logo.resize((w, h), Image.LANCZOS).save(OUT / f'logo-{w}.webp', 'WEBP', quality=90, method=6)
print('logo', logo.size)

# Vorschaubild für soziale Netzwerke (1200 x 630): Gebäudefoto, abgedunkelt, Logo mittig.
bg = Image.open(SRC / 'hero-building.webp').convert('RGB')
scale = 1200 / bg.width
bg = bg.resize((1200, round(bg.height * scale)), Image.LANCZOS)
top = (bg.height - 630) // 2
bg = bg.crop((0, top, 1200, top + 630))
bg = ImageEnhance.Brightness(bg).enhance(0.55).convert('RGBA')
lw = 620
lg = logo.resize((lw, round(logo.height * lw / logo.width)), Image.LANCZOS)
bg.alpha_composite(lg, ((1200 - lg.width) // 2, (630 - lg.height) // 2))
bg.convert('RGB').save(ROOT / 'assets' / 'og-image.jpg', 'JPEG', quality=82, optimize=True, progressive=True)

# Logo auf dunklem Grund als PNG für strukturierte Daten (Google erwartet ein Rasterbild).
pad = Image.new('RGBA', (logo.width + 120, logo.height + 120), (17, 21, 28, 255))
pad.alpha_composite(logo, (60, 60))
pad.thumbnail((600, 600))
pad.convert('RGB').save(ROOT / 'assets' / 'logo.png', 'PNG', optimize=True)
